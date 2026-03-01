# 🌿 My Skin Ritual — PWA Setup Guide

## What You Have
A complete Progressive Web App (PWA) that works offline, sends daily notifications, and tracks your skincare routine.

---

## 🚀 Deploy to Vercel (Recommended — Free, 2 minutes)

### Step 1: Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2: Create a New Repository
1. Click the **+** button → **New repository**
2. Name it: `my-skin-ritual`
3. Set to **Public**
4. Click **Create repository**

### Step 3: Upload Your Files
On your new repo page, click **uploading an existing file**
Upload all 6 files:
- `index.html`
- `manifest.json`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

Click **Commit changes**.

### Step 4: Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **Add New → Project**
3. Select your `my-skin-ritual` repository
4. Click **Deploy** (no configuration needed)
5. ✅ Your app is live at: `https://my-skin-ritual.vercel.app`

---

## 📱 Install as App on Your Phone

### iPhone (Safari):
1. Open your Vercel URL in **Safari**
2. Tap the **Share** button (square with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add** → App icon appears on your home screen!

### Android (Chrome):
1. Open your Vercel URL in **Chrome**
2. Tap the **three dots** menu
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **Install** → Done!

---

## 🔔 Enable Notifications
1. Open the installed app
2. A popup will appear asking for notification permission
3. Tap **"Enable Reminders"** → Allow
4. You'll now get reminders at **9:00 AM** and **10:00 PM** daily

**Note:** For most reliable notifications, install as an app (above) and keep the app installed. Browser notifications work best when the browser is running in the background.

---

## 🎵 Music Playlists
The app uses Spotify embeds:
- **Morning:** Morning Acoustic (calm + uplifting)
- **Evening:** Peaceful Guitar (wind-down)

You'll need Spotify (free works) to listen. Tap the music bar at the top of AM/PM screens to expand.

To change the playlist, open `index.html` and find the two `<iframe>` tags with `open.spotify.com` URLs. Replace the playlist ID with any Spotify playlist ID of your choice.

---

## 📊 Features
- ✅ Step-by-step routine with countdown timers
- ✅ Auto-detects Salicylic Acid vs Niacinamide night
- ✅ Daily check-in with progress tracking
- ✅ 30-day calendar view
- ✅ Streak counter
- ✅ 9am + 10pm notifications
- ✅ Works offline after first visit
- ✅ Installable as phone app

---

## 🔄 Updating Your Routine
To update product names or steps, open `index.html` and find the `AM_STEPS` array and `getPMSteps()` function (around line 200). Each step has: name, product, brand, amount, technique, area, wait (seconds), and tip.

---

## Other Free Hosting Options
- **Netlify:** https://netlify.com → Drag & drop folder
- **GitHub Pages:** Enable in repo Settings → Pages → Deploy from main branch
