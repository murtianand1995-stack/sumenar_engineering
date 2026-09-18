# Sumenar Engineering — Website

React + Vite + Tailwind CSS corporate website for **Sumenar Engineering** ("Magnetic Solutions").

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Pages

`Home` · `About Us` · `Services` · `Gallery` · `Contact Us` — routed with React Router.

## Gallery — admin vs visitor

- **Visitors** only ever see the photos — no add/edit/delete controls are shown to them.
- The gallery ships with **20 default photos** (placeholder industrial images) defined in
  `src/data/galleryImages.js`. Edit that file directly to change what visitors see by default —
  swap in your real photos there.
- **Admin controls** (Add Photo, Edit, Delete) only appear after unlocking admin mode from the
  small lock icon in the footer. Default passcode: `SUMENAR-ADMIN-2026` (change it in
  `src/context/AdminContext.jsx` before going live — this is a simple client-side gate, not real
  authentication, and should be replaced with real auth/a backend for production use).
- Admin-added photos and any edits/deletions are stored in the browser's `localStorage`, so they
  persist across refreshes on that browser. The storage layer (`src/pages/Gallery.jsx`) is kept
  small and swappable so it can be pointed at a real backend/cloud storage later.

## Editable placeholders

Company email, phone and address live in `src/data/siteData.js` — update them there. Social
links are in the same file.

## Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · lucide-react icons.
