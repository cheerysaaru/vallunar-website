# Vallunar Groups website

A single-page Next.js 14+ App Router website for Vallunar Groups, built with TypeScript, Tailwind CSS, Framer Motion, lucide-react, and react-hook-form.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Add a Web3Forms access key to `.env.local`:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

The contact form posts to Web3Forms, displays loading/success/error states, validates name/email/message, and includes a hidden honeypot field for spam protection.

## Edit company content

All editable company details, links, contact details, products, services, stats, and navigation live in [`lib/data.ts`](./lib/data.ts). Replace the placeholder phone number, email, WhatsApp number, LinkedIn URL, and domain before launch.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a Git provider, or import the project folder into Vercel.
2. In Vercel, create a new project from the repository.
3. Add `NEXT_PUBLIC_WEB3FORMS_KEY` under **Project Settings → Environment Variables** for Production, Preview, and Development as needed.
4. Deploy. Vercel automatically detects the Next.js framework and runs the build command.
5. Add `vallunar.com` and `www.vallunar.com` under **Project Settings → Domains**.
6. At your domain registrar, add the DNS records Vercel displays (usually an A record for the apex domain and a CNAME for `www`).
7. Set the preferred domain redirect in Vercel, then update `site.domain` in `lib/data.ts` if your canonical choice changes.

## Structure

- `app/page.tsx` — single page composition
- `components/` — Navbar, Hero, About, Products, Services anchor, WhyUs, Stats, Contact, Footer, WhatsAppButton
- `lib/data.ts` — single source of truth for site content
- `public/` — favicon, brand mark, OG placeholder, route manifest
