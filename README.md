# Instadraw

Share your drawings with the world with this [Nuxt application](https://nuxt.com) using [NuxtHub Blob storage](https://hub.nuxt.com/docs/storage/blob) and deployed on the Edge.

- [Documentation](https://hub.nuxt.com)
- [Demo](https://draw.nuxt.dev)

## Features

- Image upload with [`useUpload()`](http://hub.nuxt.com/docs/storage/blob)
- Auth with Google & GitHub based on [`nuxt-auth-utils`](https://github.com/Atinux/nuxt-auth-utils)
- Draw with [`signature_pad`](github.com/szimek/signature_pad)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy on the Edge

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com):

```bash
npx nuxthub deploy
```

Then manage the drawings of your users in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).
