import { initializeApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// ═══════════════════════════════════════════════════════════════════════════
// 🔥 FIREBASE CONFIG — Paste your values below after creating a Firebase project
//
// HOW TO GET THESE VALUES (read all steps first, then follow along):
//
//   1. Open a new tab and go to: https://console.firebase.google.com
//      Sign in with your Google account (create one if you don't have it)
//
//   2. Click the big "Add Project" button (or "Create Project")
//      - Type "Amahlao-Hub" as the project name
//      - Click "Continue"
//      - Turn OFF "Enable Google Analytics" (toggle it off)
//      - Click "Create Project"
//      - Wait ~30 seconds, then click "Continue"
//
//   3. Now you're in your project dashboard. Enable the database:
//      - On the left sidebar, click "Build" then "Firestore Database"
//      - Click "Create Database"
//      - Select "Start in Test Mode" → click "Next"
//      - Pick any location (the closest to you) → click "Done"
//      - Wait for it to create (you'll see an empty database page)
//
//   4. Get your config values:
//      - Click the ⚙️ gear icon (top left, near "Project Overview")
//      - Click "Project Settings"
//      - Scroll all the way down to "Your apps" section
//      - Click the </> icon (it's the web app icon, 3rd one)
//      - Type "web" as the app nickname
//      - Leave "Firebase Hosting" unchecked
//      - Click "Register App"
//      - You'll see a code block with firebaseConfig — copy the VALUES
//        (the stuff inside the quotes) and paste them below
//      - Click "Continue to console"
//
//   5. Paste your values in the firebaseConfig object below this comment
//      Then push to GitHub — Vercel auto-deploys!
//
//   6. IMPORTANT — Make the database rules permanent:
//      - Go to "Firestore Database" in the left sidebar
//      - Click the "Rules" tab at the top
//      - Replace everything with this:
//
//        rules_version = '2';
//        service cloud.firestore {
//          match /databases/{database}/documents {
//            match /posts/{postId} {
//              allow read, write: if true;
//            }
//          }
//        }
//
//      - Click "Publish"
//
// ═══════════════════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// ═══════════════════════════════════════════════════════════════════════════
// 🛑 DON'T EDIT BELOW THIS LINE
// ═══════════════════════════════════════════════════════════════════════════

const configured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let dbInstance: Firestore | null = null;

if (configured) {
  const app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

export function isFirebaseConfigured(): boolean {
  return configured;
}
