# Parvez Portfolio

React/Vite single-page portfolio deployed on Vercel. The contact form posts to the same-origin `/api/contact` serverless function, which sends messages through Resend.

## Run locally

Install dependencies and start the Vercel development server so both the SPA and `/api/contact` function are available:

```bash
npm install
npx vercel dev
```

Create an ignored `.env.local` file with the environment values below before testing contact delivery locally. Do not use `npm run dev` to test the serverless contact route; Vite alone does not run Vercel functions.

## Enable contact email delivery

Create a Resend API key and verify the sender domain in Resend. Add these environment variables in Vercel Project Settings → Environment Variables (and in `.env.local` for local testing):

```env
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
CONTACT_TO_EMAIL=parvezsiddiqui26@navgurukul.org
PORTFOLIO_ORIGIN=https://portfolio-ten-snowy-89.vercel.app
```

`CONTACT_TO_EMAIL` defaults to the portfolio owner's email shown above. Set `PORTFOLIO_ORIGIN` to the exact deployed website origin if you use a custom domain; Vercel's production project URL is used when this setting is omitted. Never add mail credentials to `VITE_*` variables or commit them. Redeploy after changing production environment variables.

The form submits JSON (`name`, `email`, optional `subject`, `message`) to `POST /api/contact`. The serverless handler validates the payload, applies an origin check, and relays the message to Resend without exposing the API key. If Resend or its environment variables are not configured, the API returns a visible service error instead of falsely reporting success.

## Troubleshooting

1. In Chrome DevTools → Network, submit once and confirm the request is to the site's own `/api/contact` URL and returns `202`. A `503` means Resend environment variables are missing; `502` means Resend rejected or could not deliver the email.
2. In DevTools → Console, inspect CORS or blocked-request errors. Confirm `PORTFOLIO_ORIGIN` exactly matches the site's scheme and hostname; try an incognito window to rule out extensions.
3. Check Vercel Function logs for `/api/contact` and Resend's sender-domain configuration. Verify the sender address belongs to a domain verified in Resend, then redeploy after changing environment variables.

## Validate

```bash
npm run build
```
