import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "IG Unfollow Checker",
  description:
    "See who doesn't follow you back on Instagram. Runs locally with your logged-in session — no passwords, no servers.",
  version: "1.0.0",
  action: {
    default_title: "IG Unfollow Checker",
    default_icon: {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png",
    },
  },
  icons: {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png",
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  permissions: ["storage"],
  host_permissions: ["https://www.instagram.com/*"],
  content_scripts: [
    {
      matches: ["https://www.instagram.com/*"],
      js: ["src/content/panel.ts"],
      run_at: "document_idle",
    },
  ],
});
