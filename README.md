
# Rajasthan — Hidden Prints (local artefact)

This repository contains a small interactive website called "Hidden Prints" that explores the under-represented craft of block printing from Sanganer and Bagru (Rajasthan).

What you get:
- A short explainer about origins, tools, and dyes.
- A tiny gamified experience (match the block) and collectible badges.
- Local progress persistence (stored in browser localStorage).

Quick start
1. Open `index.html` in a modern browser (double-click or use a static server).

Optional (recommended for development):
- Use VS Code Live Server extension or run a simple file server. Example (PowerShell):

```powershell
# from repository root
python -m http.server 8000; Start-Process "http://localhost:8000/index.html"
```

Notes
- This is a small educational artefact; content is brief and designed to encourage further research and support for local artisans.

Deployment (GitHub Pages)

 - This repository includes a GitHub Actions workflow that will publish the repository contents to the `gh-pages` branch whenever you push to `main`.
 - After pushing these files to GitHub, go to the repository settings → Pages, and set the source to the `gh-pages` branch (the workflow will create/update it automatically).
 - The action uses the built-in `GITHUB_TOKEN`, so no additional secrets are required.

Images

- I added three placeholder SVG images in the `images/` folder and a simple gallery UI in the site. Replace them with your photographs (keep filenames or update the `index.html` image `src` accordingly).

If you'd like, I can instead configure the site to publish from the `docs/` folder or add a custom domain (`CNAME`).

