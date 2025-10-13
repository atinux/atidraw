# Draw and share your Art with Atidraw 🎨✨

Atidraw is a web application that lets you to create, enhance with AI, and share your drawings with the world.

The application is running with server-side rendering using Vercel and the AI is powered by Vercel AI Gateway.

### 🚀 Key Features

- **Intuitive Drawing**: User-friendly interface powered by [`signature_pad`](https://github.com/szimek/signature_pad)
- **AI-Powered Enhancements**: 
  - Automatic alt text generation for accessibility & SEO
  - Generate an image of your drawing with Google Nanobanana
- **Global Storage**: Your creations are stored on the filesystem locally or on Vercel Blob / Cloudflare R2 storage
- **Flexible Authentication**: Sign in with Google, GitHub, or stay anonymous (local)

### 🎥 See It in Action

https://github.com/Atinux/atidraw/assets/904724/85f79def-f633-40b7-97c2-3a8579e65af1

Ready to create? Visit [draw.nuxt.dev](https://draw.nuxt.dev) and share your best drawing!

## 🛠 Tech Stack

- [Nuxt](https://nuxt.com) - The Intuitive Vue Framework
- [Nuxt UI](https://github.com/nuxt/ui) - Beautiful UI library with TailwindCSS
- [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils) - Simplified Authentication
- [NuxtHub](https://hub.nuxt.com) - Build full-stack Nuxt apps with zero configuration
  - [`hubAI()`](https://hub.nuxt.com/docs/features/ai) to run AI models on user's drawing
  - [`hubBlob()`](https://hub.nuxt.com/docs/features/blob) to store drawing on Vercel Blob or Cloudflare R2

## 🚀 Quick Start

1. Install dependencies with [pnpm](https://pnpm.io)
    ```bash
    pnpm install
    ```
2. Set up your environment and fill the env variables
    ```bash
    cp .env.example .env
    ```
    If you don't set the Google and GitHub credentials, anonymous sign-in will be enabled.
3. Create a [Vercel AI Gateway API Key](https://vercel.com/d?to=/[team]/~/ai/api-keys&title=Go+to+AI+Gateway)
4. Launch the dev server
    ```bash
    pnpm dev
    ```

Visit `http://localhost:3000` and start drawing!

## 📁 Manage Drawings

You can manage the drawings (local or remote) within the Nuxt DevTools in the Hub Blob tab:

![nuxt-devtools-blob](https://github.com/user-attachments/assets/152b0283-637b-41b3-990e-f25a73183c93)

## 🤖 Experiment with AI

Unlock the full potential of Atidraw by enabling the AI image generation feature:

1. Open `./app/pages/draw.vue`
2. Uncomment the `<AIDraw>` component:
   ```diff
   - <!-- <AIDraw :drawing="drawing" class="mt-4" /> -->
   + <AIDraw :drawing="drawing" class="mt-4" />
   ```
3. Open http://localhost:3000/draw to draw something and click on "Draw with AI"

https://github.com/user-attachments/assets/1ff6b3fd-3dbb-45de-8c3a-648aee8b28b0

## 🌐 Deploy to the World for Free

Host your Atidraw instance on a **free Cloudflare account** and **free NuxtHub account**.

Deploy it online in the NuxtHub UI:

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?repo=atinux/atidraw)

Or locally with the [NuxtHub CLI](https://github.com/nuxt-hub/cli):

```bash
npx nuxthub deploy
```

This command will deploy your Atidraw instance to your Cloudflare account and provision a Cloudflare R2 bucket. You will also get a free `<you-app>.nuxt.dev` domain.

Once deployed, you can manage your users' masterpieces in the [NuxtHub Admin](https://admin.hub.nuxt.com).

```bash
npx nuxthub manage
```

What's included in Cloudflare free plan:
- 100,000 requests/day
- 10 GB storage on Cloudflare R2

Read more about the pricing on our [detailed pricing page](https://hub.nuxt.com/pricing).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci) or [GitHub actions](https://hub.nuxt.com/docs/getting-started/deploy#github-action).

### Remote Storage

Once your project is deployed, you can use [NuxtHub Remote Storage](https://hub.nuxt.com/docs/getting-started/remote-storage) to connect to your preview or production Cloudflare R2 bucket in development using the `--remote` flag:

```bash
pnpm dev --remote
```

## 🔗 Useful Links

- [Live Demo](https://draw.nuxt.dev)
- [NuxtHub Documentation](https://hub.nuxt.com)
- [Nuxt UI](https://ui.nuxt.com)
- [Nuxt Auth Utils](https://github.com/atinux/nuxt-auth-utils)
- [Nuxt](https://nuxt.com)

## 📝 License

Published under the [MIT license](./LICENSE).
