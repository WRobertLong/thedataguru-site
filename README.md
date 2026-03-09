# thedataguru-site

Static website for [thedataguru.net](https://thedataguru.net)

## Hosting

Served via **GitHub Pages** from the `/docs` folder on the `main` branch.
DNS managed via **Cloudflare** (pointing to GitHub Pages).

To deploy: commit and push to `main`. GitHub Pages serves automatically from `/docs`.

## Structure

```
docs/                        <- GitHub Pages serves from here
├── index.html               <- Home
├── about.html               <- About Robert Long
├── services.html            <- Services
├── blog.html                <- Blog index
├── contact.html             <- Contact
├── CNAME                    <- thedataguru.net
├── images/
├── scripts/
│   ├── particles.min.js
│   └── script.js
├── styles/
│   ├── style.css            <- Main site stylesheet
│   └── articles.css         <- Blog/article pages stylesheet
├── fonts/
└── blog/
    ├── posts/               <- Full blog articles
    │   ├── AI-LLM.html
    │   └── PQ-Blockchain.html
    └── stat-reviews/        <- Statistical reviews of cardiology trials
        ├── index.html
        ├── capricorn/
        │   └── index.html
        └── sprint/
            └── index.html
```

## Adding a new blog post

1. Create `docs/blog/posts/your-article.html` using `articles.css`
2. Add a card linking to it in `docs/blog.html`
3. Commit and push

## Adding a new stat review

1. Create `docs/blog/stat-reviews/trialname/index.html`
2. Add a row to `docs/blog/stat-reviews/index.html`
3. Commit and push

## GitHub Pages setup

In repo Settings -> Pages:
- Source: Deploy from a branch
- Branch: main
- Folder: /docs
