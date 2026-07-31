# Arabian Nights ARM

Premium Arabic perfume e-commerce site for the Armenian market, rebuilt on
Next.js 15 (App Router), React 19, and TypeScript.

## Commands

npm install
npm run dev
npm run build
npm run start
npm run lint
npm run format

## Architecture

- app/ — routes only (Server Components by default; metadata, generateStaticParams, JSON-LD live here)
- components/ — one component per file, grouped by domain (home, shop, product, about, contact, layout, shared, ui)
- lib/ — pure functions: product data, validation, canvas drawing routines, cn() helper
- hooks/ — Zustand stores for wishlist / recently-viewed / order modal, plus useHasMounted
- types/ — shared TypeScript interfaces

Client Components ("use client") are used only where interactivity truly
requires them: forms, filters, canvas animation, wishlist buttons, modals.
Product pages, layout, and static content stay Server Components for
performance and SEO.
