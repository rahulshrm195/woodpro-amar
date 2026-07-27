# WoodPro — backlog

Captured 26 Jul 2026 after v1.0.0 went live. Updated 27 Jul 2026.

---

## ✅ v1.1.0 — shipped 27 Jul 2026

Items 1, 2 and 3 below are done. Item 4 is still waiting on detail from Rahul.

---

## v1.1 — agreed

### ✅ 1. Dark mode  *(done in v1.1.0)*
Full dark theme. Follows the system setting by default, with a manual override in
Settings. Brand orange stays the accent; the cream background inverts to a warm
near-black rather than pure black.

### ✅ 2. Desktop-first layout  *(done in v1.1.0)*
v1.0.0 was built mobile-first and it shows on a laptop — content sits in a narrow
720px column with a bottom nav meant for thumbs.

Rebuild the shell so the desktop layout is the primary one and mobile is the
adaptation, not the other way round:

- Sidebar navigation on desktop, bottom nav only below the tablet breakpoint
- Wider content area, multi-column forms where the space exists
- Costing heads and quote items laid out as proper tables on a large screen
- Keyboard flow that works — tab order, Enter to add the next row

**This applies to every future app too, not just WoodPro.**

### ✅ 3. Quote-first, not costing-first  *(done in v1.1.0)*
WoodPro is really a quotation app that happens to have a costing tool attached.
The home screen should say so.

- **Remove the Costing card from the home screen.** Costing lives in its own tab only.
- Home becomes the quotation list — all quotes as cards, in the QuotePro style.
- Rahul to confirm exactly what the QuotePro cards show, so the two apps match.

### ⏳ 4. Port the good parts of QuotePro's quote builder
QuotePro got several things right during quote building that WoodPro doesn't have
yet — particularly around **size entry and the other input fields**. Rahul will walk
through these in detail.

Known so far: size input handling. Rest to be specified.

---

## Phase 2 — to be specified

Detailed changes to the quote creation stage: size inputs, other input fields,
and further QuotePro behaviours Rahul will describe in full.

---

## Carried over from the v1.0.0 build

- **True PDF file for WhatsApp.** Currently "Save as PDF" opens the print dialogue and
  WhatsApp share sends formatted text. A generated PDF file that attaches in one tap
  would remove a step. Deliberately deferred — print gives better typography and avoids
  the Safari trouble hit on the salary slips.
- **Rate library** for the costing tool — saved default rates per cost head (Settings, Phase 2).
- **Material list → purchase order system.** The costing sheet already holds timber and
  hardware quantities. When the PO system is ready, costing can feed it directly —
  never through the quotation side, per the separation agreed at the start.

---

## Not in WoodPro — belongs to the wider ERP work

- **Convert quote → order.** Waits for the shared quote/order schema so QuotePro,
  LathePro and WoodPro all emit the same item shape.
- **Billing app.** One continuous invoice series across all three quotation apps.
  Advance/balance tracking seen in the handwritten quotes belongs here.
- **Merging the three quotation tools** behind one domain and launcher.
