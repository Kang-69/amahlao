import { useState } from "react";
import { isFirebaseConfigured } from "../lib/firebase";
import { ChevronDown, ChevronUp, X, Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg bg-surface-300/60 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-surface-300 transition-colors"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function SetupBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);

  if (dismissed || isFirebaseConfigured()) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-4">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
              <span className="text-lg">⚠️</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-300">
                Posts only save on your device — set up Firebase to sync everywhere
              </h3>
              <p className="text-xs text-amber-400/60">
                It&apos;s free and takes 5 minutes. Follow the guide below.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-amber-500/60 hover:text-amber-400 transition-colors p-1"
            >
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-amber-500/40 hover:text-amber-400 transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expandable Guide */}
        {expanded && (
          <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-amber-500/10 pt-5">
            {/* Step 1 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400 shrink-0">
                  1
                </span>
                <h4 className="text-sm font-bold text-amber-200">Create a Firebase Project (free)</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1.5">
                <p>
                  Open a new tab → go to{" "}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-amber-300 hover:text-amber-200 font-semibold"
                  >
                    console.firebase.google.com
                  </a>{" "}
                  → sign in with Google
                </p>
                <p>Click <strong className="text-amber-300">&quot;Add Project&quot;</strong> → type <strong className="text-amber-300">&quot;Amahlao-Hub&quot;</strong> → <strong className="text-amber-300">&quot;Continue&quot;</strong></p>
                <p>Turn <strong className="text-amber-300">OFF</strong> &quot;Enable Google Analytics&quot; → click <strong className="text-amber-300">&quot;Create Project&quot;</strong> → wait 30 sec → <strong className="text-amber-300">&quot;Continue&quot;</strong></p>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400 shrink-0">
                  2
                </span>
                <h4 className="text-sm font-bold text-amber-200">Enable the Database</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1.5">
                <p>On the left sidebar → click <strong className="text-amber-300">&quot;Build&quot;</strong> → <strong className="text-amber-300">&quot;Firestore Database&quot;</strong></p>
                <p>Click <strong className="text-amber-300">&quot;Create Database&quot;</strong> → select <strong className="text-amber-300">&quot;Start in Test Mode&quot;</strong> → <strong className="text-amber-300">&quot;Next&quot;</strong></p>
                <p>Pick any location → <strong className="text-amber-300">&quot;Done&quot;</strong> → wait for it to load (you&apos;ll see an empty database)</p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400 shrink-0">
                  3
                </span>
                <h4 className="text-sm font-bold text-amber-200">Get Your Config Values</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1.5">
                <p>Click the <strong className="text-amber-300">⚙️ gear icon</strong> (top left) → <strong className="text-amber-300">&quot;Project Settings&quot;</strong></p>
                <p>Scroll down to <strong className="text-amber-300">&quot;Your apps&quot;</strong> → click the <strong className="text-amber-300">&lt;/&gt;</strong> icon (the web one)</p>
                <p>Type <strong className="text-amber-300">&quot;web&quot;</strong> as nickname → <strong className="text-amber-300">uncheck</strong> Firebase Hosting → <strong className="text-amber-300">&quot;Register App&quot;</strong></p>
                <p>You&apos;ll see a code block like this — keep it open, you&apos;ll need it next:</p>
              </div>
              <div className="mt-2 ml-8 rounded-xl bg-black/30 border border-amber-500/15 p-3 font-mono text-[11px] text-amber-300 overflow-x-auto">
                <pre>{`const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "amahlao-hub.firebaseapp.com",
  projectId: "amahlao-hub",
  storageBucket: "amahlao-hub.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};`}</pre>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400 shrink-0">
                  4
                </span>
                <h4 className="text-sm font-bold text-amber-200">Paste Values Into Your Code</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1.5">
                <p>Go to your GitHub repo <strong className="text-amber-300">Kang-69/Amahlao-Hub</strong></p>
                <p>Navigate to <strong className="text-amber-300">src/lib/firebase.ts</strong> → click the <strong className="text-amber-300">✏️ pencil icon</strong> to edit</p>
                <p>Find the <code className="bg-amber-500/10 px-1 rounded text-amber-300">firebaseConfig</code> object and paste your values between the quotes:</p>
              </div>
              <div className="mt-2 ml-8 relative">
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton
                    text={`const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};`}
                  />
                </div>
                <pre className="rounded-xl bg-black/30 border border-amber-500/15 p-3 pr-24 text-[11px] text-amber-300 overflow-x-auto">
{`const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};`}
                </pre>
              </div>
              <div className="ml-8 mt-2 text-xs text-amber-400/70 space-y-1.5">
                <p>Click <strong className="text-amber-300">&quot;Commit changes&quot;</strong> → <strong className="text-amber-300">&quot;Commit changes&quot;</strong> again</p>
                <p>Vercel will auto-deploy in ~1 minute! 🎉</p>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400 shrink-0">
                  5
                </span>
                <h4 className="text-sm font-bold text-emerald-200">Make Database Rules Permanent</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1.5">
                <p>Back in Firebase → <strong className="text-amber-300">&quot;Firestore Database&quot;</strong> → <strong className="text-amber-300">&quot;Rules&quot;</strong> tab</p>
                <p>Replace everything with this, then click <strong className="text-amber-300">&quot;Publish&quot;</strong>:</p>
              </div>
              <div className="mt-2 ml-8 relative">
                <div className="absolute top-2 right-2 z-10">
                  <CopyButton
                    text={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read, write: if true;
    }
  }
}`}
                  />
                </div>
                <pre className="rounded-xl bg-black/30 border border-amber-500/15 p-3 pr-24 text-[11px] text-emerald-300 overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read, write: if true;
    }
  }
}`}
                </pre>
              </div>
            </div>

            {/* Summary */}
            <div className="ml-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
              <p className="text-xs text-emerald-300 font-semibold mb-1">✅ That&apos;s it! Here&apos;s what you just did:</p>
              <ul className="text-[11px] text-emerald-400/70 space-y-1">
                <li>• Created a free Google cloud database for your posts</li>
                <li>• Connected it to your website by pasting the config</li>
                <li>• Now posts will appear on ALL devices in real-time!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
