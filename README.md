# WoodPro — Amar Furniture

Costing and quotation for custom woodwork. Single-file PWA, Firebase backed.

- **Live:** https://woodpro.amarfurniture.in
- **Firebase project:** `amar-furniture-e4782` (shared with QuotePro, LathePro, Umbra)
- **Collections:** `wood_costings`, `wood_quotes`, `wood_settings`
- **Version:** 1.0.0

## Files

```
index.html    entire app — styles, logic, Firebase, both tools
manifest.json install metadata
sw.js         service worker (cache name tracks the app version)
offline.html  fallback when cache misses and there's no network
favicon.ico
CNAME         woodpro.amarfurniture.in
icons/        app icons + logo assets for the PDF letterhead
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

Change `APP_VERSION` in `index.html` **and** `CACHE_NAME` in `sw.js` to match, and add a
`CHANGELOG` entry. The What's New modal, the Settings footer and the cache bust all follow
from those two constants.
