<p align="center">
<img src="https://user-images.githubusercontent.com/11247099/140462375-7b7ac4db-35b7-453c-8a05-13d8d20282c4.png" width="600"/>
</p>

<h2 align="center">
<a href="https://github.com/antfu/vitesse">Vitesse</a> for Nuxt 3
</h2><br>

References:
- https://github.com/antfu/vitesse-nuxt3
- https://github.com/element-plus/element-plus-nuxt-starter
- https://github.com/bicouy0/nuxt3-urql
- https://github.com/newbeea/nuxt3-apollo-starter

<pre align="center">
🧪 Working in Progress
</pre>

<p align="center">
<br>
<a href="https://vitesse-nuxt3.netlify.app/">🖥 Online Preview</a>
<br><br>
<a href="https://stackblitz.com/github/antfu/vitesse-nuxt3"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## Features

- [💚 Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- 🌏 [i18n](https://github.com/intlify/nuxt3) customized intlify i18n - set preferred language according to browser, and save user's preferred language to cookie.

- ⚡️ Vite - Instant HMR

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

- 📦 [Element Plus](https://element-plus.org/) - Vue 3 UI component library.

- 😃 Use icons from any icon sets in Pure CSS, powered by [UnoCSS](https://github.com/antfu/unocss)

- 🔥 The `<script setup>` syntax.

- 🍍 [State Management via Pinia](https://pinia.esm.dev), see [./composables/user.ts](./composables/user.ts).

- 📑 [Layout system](./layouts).

- 🛠 [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs

- 🐉 [RxJS](https://rxjs.dev/)

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

- 🏎 Zero-config cloud functions and deploy.

- 🦾 TypeScript, of course.

- 📲 [PWA](https://github.com/vite-pwa/nuxt) with offline support and auto update behavior.


## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [ColorMode](https://github.com/nuxt-community/color-mode-module) - dark and Light mode with auto detection made easy with Nuxt.
- [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.
- [VitePWA](https://github.com/vite-pwa/nuxt) - zero-config PWA Plugin for Nuxt 3.

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable Vetur if you have it).

## Variations

- [vitesse](https://github.com/antfu/vitesse) - Opinionated Vite Starter Template
- [vitesse-lite](https://github.com/antfu/vitesse-lite) - Lightweight version of Vitesse
- [vitesse-nuxt-bridge](https://github.com/antfu/vitesse-nuxt-bridge) - Vitesse for Nuxt 2 with Bridge
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - WebExtension Vite starter template

## Try it now!

### Online

<a href="https://stackblitz.com/github/antfu/vitesse-nuxt3"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/antfu/vitesse-nuxt3/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit antfu/vitesse-nuxt3 my-nuxt3-app
cd my-nuxt3-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Dev

```
npm run dev
```
Website: http://127.0.0.1:3000

### Deploy

#### Normal server

build
```
npm run build
```

start
```
npm run start
```

#### Serverless(aws lambda) mode

##### Setup CDN

set cdnURL in nuxt.config.ts

##### build with lambda preset

```
npm run build:lambda
```

##### upload static files

upload .output/server/public/* to cdn (cdnURL)

##### custom domain (optional)

config customDomain in serverless.yml
```
custom:
  customDomain:
    http:
      domainName: xxx.yourdomain.com
      endpointType: regional
      certificateName: yourdomain.com
      createRoute53Record: true
plugins:
  - serverless-domain-manager
```

then
```
npm run serverless:domain
```

#### deploy

```
npm run serverless:deploy
```
then visit xxx.yourdomain.com
