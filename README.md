# Survey App

This template should help you get started developing a survey application with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
bun test:unit:dev # or `bun test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
bun test:e2e:dev
```

This runs the end-to-end tests against the Vite development server. It is much faster than the production build.

However, it is still recommended to test the production build with `test:e2e` before deploying (e.g., in CI environments):

```sh
bun build
bun test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```