# Ana Rita Diogo's personal website

A personal website and postcard collection built with Next.js 16, React, TypeScript, and Tailwind CSS.

## Current content

- **Home**: Introduction, social links, and section buttons.
- **Postcards**: An interactive archive of postcards with catalogue details.
- **About, Photography, and Projects**: Not published yet. Their home-page buttons show a brief “coming soon” message.

## Requirements

- Node.js 20.9 or newer
- npm

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and production

```bash
npm run lint
npm run build
npm run start
```

The production build runs the app as a Next.js server. Vercel is the recommended first deployment target; configure the deployed Node.js runtime to use Node 20.9 or newer.

## Project structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── postcards/page.tsx
│   └── globals.css
├── components/
│   ├── ClickRipple.tsx
│   └── PostcardWall.tsx
├── data/
│   └── postcards.json
└── lib/
    └── postcard-layout.ts
assets/
└── postcards-originals/
public/
└── postcards/
```

Postcard descriptions and optimized image paths live in `src/data/postcards.json`; generated WebP assets live in `public/postcards/`. Original PNG scans are archived in `assets/postcards-originals/` and are not served to visitors.

## Image assets

To regenerate the optimized images after adding or updating scans, keep the PNG masters in `assets/postcards-originals/` and run:

```bash
npm run images:optimize
```

The 109 optimized WebP images total about 21.7 MiB, down from about 191.9 MiB of PNGs. The script trims transparent or uniform scanner margins, preserves the full postcard artwork and aspect ratio, caps the longest side at 1600 pixels, and exports WebP at quality 86. The gallery uses `object-fit: contain`, so the complete optimized image stays visible without cropping or stretching. Review the generated cards at full size after changing export settings. The original archive remains about 192 MiB in the repository; moving those masters to external storage or Git LFS would also reduce repository clone size.
