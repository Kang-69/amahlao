import { useState } from "react";
import { X, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

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

  if (dismissed) return null;

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
                Firebase Not Configured — Posts are local only
              </h3>
              <p className="text-xs text-amber-400/60">
                Follow the setup guide below to enable cross-device sync
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
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  1
                </span>
                <h4 className="text-sm font-bold text-amber-200">Create a Firebase Project</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>
                  Go to{" "}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-amber-300 hover:text-amber-200"
                  >
                    console.firebase.google.com
                  </a>{" "}
                  and sign in with your Google account.
                </p>
                <p>Click <strong className="text-amber-300">"Add Project"</strong> → Name it <strong className="text-amber-300">"Amahlao-Hub"</strong> → Click <strong className="text-amber-300">"Continue"</strong> → Disable Google Analytics (not needed) → Click <strong className="text-amber-300">"Create Project"</strong></p>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  2
                </span>
                <h4 className="text-sm font-bold text-amber-200">Enable Firestore Database</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>In your Firebase project, click <strong className="text-amber-300">"Build"</strong> → <strong className="text-amber-300">"Firestore Database"</strong> in the left sidebar.</p>
                <p>Click <strong className="text-amber-300">"Create Database"</strong> → Choose <strong className="text-amber-300">"Start in Test Mode"</strong> → Pick any location → Click <strong className="text-amber-300">"Done"</strong></p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  3
                </span>
                <h4 className="text-sm font-bold text-amber-200">Add a Web App & Copy Config</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>Click the <strong className="text-amber-300">gear icon ⚙️</strong> → <strong className="text-amber-300">"Project Settings"</strong></p>
                <p>Scroll down to <strong className="text-amber-300">"Your apps"</strong> → Click the <strong className="text-amber-300">&lt;/&gt;</strong> (Web) icon</p>
                <p>Give it a nickname like <strong className="text-amber-300">"Amahlao-Hub Web"</strong> → Click <strong className="text-amber-300">"Register App"</strong></p>
                <p>You&apos;ll see a <code className="bg-amber-500/10 px-1 rounded text-amber-300">firebaseConfig</code> object. Copy each value!</p>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  4
                </span>
                <h4 className="text-sm font-bold text-amber-200">Add Environment Variables in Vercel</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>Go to your Vercel project → <strong className="text-amber-300">Settings</strong> → <strong className="text-amber-300">Environment Variables</strong></p>
                <p>Add each of these 6 variables with the values from your Firebase config:</p>
              </div>
              <div className="mt-3 ml-8 rounded-xl bg-amber-500/5 border border-amber-500/15 p-3 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_API_KEY</code>
                  <CopyButton text="VITE_FIREBASE_API_KEY" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_AUTH_DOMAIN</code>
                  <CopyButton text="VITE_FIREBASE_AUTH_DOMAIN" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_PROJECT_ID</code>
                  <CopyButton text="VITE_FIREBASE_PROJECT_ID" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_STORAGE_BUCKET</code>
                  <CopyButton text="VITE_FIREBASE_STORAGE_BUCKET" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_MESSAGING_SENDER_ID</code>
                  <CopyButton text="VITE_FIREBASE_MESSAGING_SENDER_ID" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-amber-300">VITE_FIREBASE_APP_ID</code>
                  <CopyButton text="VITE_FIREBASE_APP_ID" />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  5
                </span>
                <h4 className="text-sm font-bold text-amber-200">Redeploy on Vercel</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>Push a commit to your GitHub repo, or go to Vercel → <strong className="text-amber-300">Deployments</strong> → click <strong className="text-amber-300">"..."</strong> on the latest → <strong className="text-amber-300">"Redeploy"</strong></p>
                <p>After redeploying, this warning banner will disappear and posts will sync across all devices! 🎉</p>
              </div>
            </div>

            {/* Step 6 (Optional but important) */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  6
                </span>
                <h4 className="text-sm font-bold text-emerald-200">Update Firestore Rules (Important!)</h4>
              </div>
              <div className="ml-8 text-xs text-amber-400/70 space-y-1">
                <p>Test mode rules expire after 30 days. In Firebase Console → <strong className="text-amber-300">Firestore Database</strong> → <strong className="text-amber-300">Rules</strong>, replace with:</p>
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
              <p className="ml-8 mt-2 text-[11px] text-amber-400/50">Click <strong>Publish</strong> to save the rules.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
