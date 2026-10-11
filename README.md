# STRIDE — shoes website

Cinematic footwear concept built with React, Vite, Framer Motion, and Lenis.
Scroll-linked perspective transforms animate original SVG shoe artwork; this is a 3D-style presentation, not a WebGL shoe model.

## Development

Use Node.js 22.12+ (Node 24 was validated).

```sh
npm ci --cache /tmp/stride-npm-cache
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview -- --port 4173
```

Fonts and artwork are bundled locally. No API keys or backend services are required.
Lenis smoothing and scroll rotation are disabled when reduced motion is requested.
Colorway cards update the selected shoe and announce the selection to assistive technology.

The collection is a concept preview: prices, weight, and product claims are illustrative; checkout is not implemented.

UI direction used guidance from the public `nextlevelbuilder/ui-ux-pro-max-skill` repository, adapted for a dark cinematic footwear showcase. Direct 21st.dev access was blocked in the setup environment, so components are custom.

Validated: production build, browser startup, scroll transforms, color selection, layouts at 375/768/1024/1440px, reduced motion, and absence of browser runtime errors.

## GitHub Pages

The Vite build uses relative asset URLs so it also works at `/shoes-website/`.
Serve the compiled `dist` directory; serving the source `index.html` directly cannot run JSX.

In GitHub repository Settings → Pages, choose **GitHub Actions** as the source.
Merge the website branch into `main`. The included Pages workflow builds and deploys on pushes to `main`, or can be launched manually from Actions after the workflow is present on the default branch.
A successful deployment publishes to `https://godzisop.github.io/shoes-website/`.

Production output was also verified with a browser under the `/shoes-website/` subpath, including asset loading and color selection.
