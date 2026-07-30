# IG Unfollow Checker

Privacy-first Chrome/Edge extension that shows who doesn’t follow you back on Instagram. It uses your existing Instagram web session and runs entirely in your browser — no passwords, no backend, no data leaving your machine.

## How it works

Instagram’s official API does not expose follower/following lists. This extension calls the same authenticated web endpoints Instagram’s site uses while you are logged in, then compares the two lists locally.

## Install (developer / unpacked)

1. Clone this repo and build:

```bash
cd extension
npm install
npm run build
```

2. Open Chrome or Edge → `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `extension/dist` folder
5. Open [instagram.com](https://www.instagram.com) and sign in
6. Click the extension icon to open the side panel
7. Press **Scan**

## Features

- Scan followers and following with paced requests
- Lists: **Not following back**, **You don’t follow**, **Mutual**
- Search, profile links, stoppable scan
- Export JSON / CSV
- Last scan cached in `chrome.storage.local`

## Risks & limits

- Relies on unofficial Instagram web endpoints that can change or rate-limit you
- Using automation-like access can risk temporary Instagram restrictions — use sparingly
- Analysis only (no bulk unfollow)
- You must stay logged into Instagram in the same browser

## Development

```bash
cd extension
npm install
npm run dev      # Vite + CRX HMR
npm run build
npm run typecheck
```

## Privacy

All processing happens on-device. The extension only talks to `instagram.com` with your existing cookies and stores the latest scan result locally.
