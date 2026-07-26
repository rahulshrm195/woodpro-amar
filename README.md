# WoodPro — Amar Furniture

Costing and quotation for custom woodwork. Single-file PWA, Firebase backed.

- **Live:** https://woodpro.amarfurniture.in
- **Firebase project:** `amar-furniture-e4782` (shared with QuotePro, LathePro, Umbra)
- **Collections:** `wood_costings`, `wood_quotes`, `wood_settings`
- **Version:** 1.0.0

## Files

Everything sits flat in the repo root — no subfolders.

```
index.html                    entire app — styles, logic, Firebase, both tools
manifest.json                 install metadata
sw.js                         service worker (cache name tracks the app version)
offline.html                  fallback when cache misses and there's no network
CNAME                         woodpro.amarfurniture.in

icon-192x192.png              home screen icon
icon-512x512.png              splash screen + store listing
icon-maskable-192x192.png     padded, for Android circle/squircle masks
icon-maskable-512x512.png     padded, large
apple-touch-icon.png          iOS, 180px, no transparency
favicon.ico                   browser tab
logo-white.png                full logo for the PDF letterhead band
```

## Deploy

1. Create repo `rahulshrm195/woodpro-amar`, push these files to the root of `main`.
2. Settings → Pages → deploy from `main` / root.
3. Cloudflare DNS: CNAME `woodpro` → `rahulshrm195.github.io`, proxied, SSL **Full**.

## Firebase setup (one time)

**Authentication** → Sign-in method → Email/Password → Enable.
Add the user `rahulshrm195@gmail.com` under Users.

**Firestore rules** — append these to the existing rules for the project.
Do not replace the file; QuotePro and the other apps have their own blocks.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── WoodPro ──
    match /wood_costings/{id} {
      allow read, write: if request.auth != null
                         && request.auth.token.email == 'rahulshrm195@gmail.com';
    }
    match /wood_quotes/{id} {
      allow read, write: if request.auth != null
                         && request.auth.token.email == 'rahulshrm195@gmail.com';
    }
    match /wood_settings/{id} {
      allow read, write: if request.auth != null
                         && request.auth.token.email == 'rahulshrm195@gmail.com';
    }

    // ── existing rules for QuotePro / LathePro / Umbra stay below ──
  }
}
```

## Releasing a new version

See [VERSIONING.md](VERSIONING.md). Short version: bump `APP_VERSION` in `index.html`,
add a `CHANGELOG` entry at the top of the array, and set `CACHE_NAME` in `sw.js` to the
same number. The app warns in the console if the version and the changelog drift apart.
