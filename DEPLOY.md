# Deploying to Vercel

## 1. Push to GitHub

Create an empty repo on github.com, then:

    git init
    git add .
    git commit -m "Arabian Nights ARM"
    git branch -M main
    git remote add origin YOUR_REPO_URL
    git push -u origin main

## 2. Deploy

1. Go to vercel.com and sign in with GitHub
2. Add New -> Project -> import the repo
3. Press Deploy (Next.js is auto-detected, no config needed)

You get a live URL like `arabian-nights-arm.vercel.app`.
Every future `git push` redeploys automatically.

## Note on search engines

This build is set to **noindex** (see `app/robots.ts` and `app/layout.tsx`)
because it is a concept/portfolio site. The URL works for anyone you send
it to, but it will not appear in Google.

When it becomes a real storefront, update both files as noted in their
comments.

---

# Wiring the order form to n8n

The order and contact forms currently validate input and show a success
message, but do not send anywhere. To make them real:

## 1. Build the n8n workflow

- **Webhook** node (POST) -> copy the Production URL
- **Telegram** node -> send yourself the order
- **Google Sheets** node -> append a row (order log)
- Add an error branch so a failed send still notifies you

## 2. Add the URL to the site

Create `.env.local`:

    NEXT_PUBLIC_ORDER_WEBHOOK_URL=https://your-n8n/webhook/orders

In Vercel: Project Settings -> Environment Variables -> add the same key.

## 3. Send the order

In `components/shared/OrderModal.tsx`, inside `handleSubmit` after
validation passes:

    await fetch(process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, product: productName, quantity }),
    });

Wrap it in try/catch and show a failure toast if it throws, so a customer
never thinks an order went through when it did not.

---

# Adding real product photos

See `public/products/README.md`. Short version: drop a photo in that
folder, add `image: "/products/name.jpg"` to that product in
`lib/products-data.ts`. It replaces the drawn illustration automatically.
