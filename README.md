# Project Structure

This is a monorepo architecture using [pnpm workspaces](https://pnpm.io/fr/workspaces), [Turborepo](https://turborepo.com/), containing:

- Web components library built with StencilJS
- Shared styles package
- Front-end application using Vite

```
nngroup/
├── apps/
│   └── front-end/        # Vite application
├── packages/
    ├── components/       # Web components library (StencilJS)
    └── styles/          # Shared styles
```

## Web Components

Components are built with [StencilJS](https://stenciljs.com/):

- `nng-course-enroll`
- `nng-course-card`

## Styles

Style is built with [SCSS](https://sass-lang.com/).

Use of custom properties to propagate styles inside components.

Used across components and front-end app.

## Front-end App

Built with [Vite](https://vite.dev/).

API calls are mocked using [MSW](https://mswjs.io/).

## Improvements

- [ ] linting
- [ ] tests
