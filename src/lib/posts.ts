import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  likedBy: string[]; // store session IDs who liked
  comments: number;
  createdAt: string; // ISO string
  pinned?: boolean;
}

// ─── Session ID (to track likes per browser session) ─────────────────────────

function getSessionId(): string {
  let id = sessionStorage.getItem("amahlao-session-id");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("amahlao-session-id", id);
  }
  return id;
}

export const sessionId = getSessionId();

// ─── Firestore Collection ────────────────────────────────────────────────────

const POSTS_COLLECTION = "posts";

// ─── Create Post ─────────────────────────────────────────────────────────────

export async function createPost(
  post: Omit<Post, "id" | "likes" | "likedBy" | "comments">
): Promise<string | null> {
  if (!isFirebaseConfigured() || !db) {
    console.warn("Firebase not configured — post not saved to cloud.");
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...post,
      likes: 0,
      likedBy: [],
      comments: 0,
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.error("Error creating post:", err);
    return null;
  }
}

// ─── Toggle Like ─────────────────────────────────────────────────────────────

export async function toggleLike(
  postId: string,
  currentLikedBy: string[]
): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;

  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    const alreadyLiked = currentLikedBy.includes(sessionId);

    if (alreadyLiked) {
      await updateDoc(postRef, {
        likedBy: currentLikedBy.filter((id) => id !== sessionId),
        likes: increment(-1),
      });
    } else {
      await updateDoc(postRef, {
        likedBy: [...currentLikedBy, sessionId],
        likes: increment(1),
      });
    }
  } catch (err) {
    console.error("Error toggling like:", err);
  }
}

// ─── Delete Post ─────────────────────────────────────────────────────────────

export async function deletePost(postId: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;

  try {
    await deleteDoc(doc(db, POSTS_COLLECTION, postId));
  } catch (err) {
    console.error("Error deleting post:", err);
  }
}

// ─── Real-time Listener ─────────────────────────────────────────────────────

export function subscribeToPosts(
  callback: (posts: Post[]) => void
): () => void {
  if (!isFirebaseConfigured() || !db) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, POSTS_COLLECTION),
    orderBy("serverTimestamp", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const posts: Post[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          author: data.author || "Anonymous",
          avatar: data.avatar || "A",
          title: data.title || "",
          content: data.content || "",
          category: data.category || "Discussion",
          likes: data.likes || 0,
          likedBy: data.likedBy || [],
          comments: data.comments || 0,
          createdAt: data.createdAt || new Date().toISOString(),
          pinned: data.pinned || false,
        };
      });
      callback(posts);
    },
    (err) => {
      console.error("Error listening to posts:", err);
    }
  );

  return unsubscribe;
}
