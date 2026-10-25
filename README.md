## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

Thanks!


# Acme Dashboard

A financial dashboard where you can manage invoices and customers, see a revenue summary, and sign in with an email and a password.

**Live:** https://olga-dashboard-app.vercel.app/

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, NextAuth, Zod,
postgres.js, Supabase (PostgreSQL), Vercel, pnpm.

## Run locally

1. Install Node.js, pnpm, Docker and the Supabase CLI.
2. Clone the repository and install the dependencies:

```bash
   git clone https://github.com/kiteekk2026/olga-dashboard-app
   cd https://github.com/kiteekk2026/olga-dashboard-app
   pnpm install
```

3. Start the local database:

```bash
   supabase start
```

4. Create a `.env.local` file in the project root:

```env
   POSTGRES_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
   AUTH_SECRET=<any random string>
```

5. Start the app:

```bash
   pnpm dev
```

   Then open http://localhost:3000/seed once to create the tables and fill them with sample data.

6. Sign in with the sample user created by the seed:
   `user@nextmail.com` / `123456`

## Team

- Olga Diunova ([@OlgaDiunova](https://github.com/OlgaDiunova)) — author
- Maria Fominova ([@murashka2010-sudo](https://github.com/murashka2010-sudo)) — review partner