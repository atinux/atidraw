# Draw and share your Art with Atidraw 🎨✨

Atidraw is a web application that lets you draw something, and see what AI draws from it.

The application is running with server-side, authentication and AI is powered by Vercel AI Gateway.

### 🚀 Key Features

- **Intuitive Drawing**: User-friendly interface powered by [`signature_pad`](https://github.com/szimek/signature_pad)
- **AI-Powered Enhancements**: 
  - Automatic alt text generation for accessibility & SEO
  - Generate an image of your drawing with Google Nanobanana
- **Global Storage**: Your creations are stored on the filesystem locally and on many [Blob providers](https://v1.hub.nuxt.com/docs/features/blob)
- **Flexible Authentication**: Sign in with Google, GitHub, or stay anonymous (local)

### 🎥 See It in Action

https://github.com/Atinux/atidraw/assets/904724/85f79def-f633-40b7-97c2-3a8579e65af1

Ready to draw? Visit [draw.nuxt.dev](https://draw.nuxt.dev) and share your best drawing!

## 🛠 Tech Stack

- [Nuxt](https://nuxt.com) - The Intuitive Vue Framework
- [Nuxt UI](https://ui.nuxt.com) - Beautiful UI library with TailwindCSS
- [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils) - Simplified Authentication
- [NuxtHub Blob](https://hub.nuxt.com/docs/features/blob) - To store drawing on Vercel Blob or Cloudflare R2 (fs locally for development)
- [AI SDK](https://ai-sdk.dev) - To run AI models on user's drawing

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

## 📝 License

Published under the [MIT license](./LICENSE).
