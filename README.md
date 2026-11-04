# Banana's Garage

DIY site for **Banana**, a 1979 GMC Sierra Grande in two-tone pale yellow and cream. The truck belongs to a squarebody enthusiast, electrical engineer, and family man. Day-to-day photos live on Instagram at [@79_sierragrande](https://www.instagram.com/79_sierragrande/).

The site is plain static HTML, CSS, and a little vanilla JavaScript. There is no build step. Vercel can serve the repository root as-is.

- **Domain:** https://bananasgarage.com
- **Email:** [bananasgarage79@gmail.com](mailto:bananasgarage79@gmail.com)
- **Instagram:** https://www.instagram.com/79_sierragrande/

## Pages

| URL | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | Hero, short intro, featured jobs, a few Instagram embeds |
| `/builds` | `builds.html` | One card per DIY job, plus the Instagram gallery |
| `/about` | `about.html` | Banana, and the owner |
| `/parts` | `parts.html` | Parts and tools, coming soon, with an affiliate disclosure |
| `/contact` | `contact.html` | Email and Instagram |

`vercel.json` sets `cleanUrls: true`, so `/builds` serves `builds.html`.

Instagram posts use the official embed (`blockquote.instagram-media` with `data-instgrm-permalink`, plus `https://www.instagram.com/embed.js`). That script is loaded only on the home page and the builds page. The gallery is one group of posts, not one clip assigned to each job. Project cards link to the Instagram profile.

The hero illustration is an original SVG. It is not a photo, and it does not use GMC or Chevy logos.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/ and use the `.html` filenames (`builds.html`, `about.html`, `parts.html`, `contact.html`). On Vercel those same links resolve to extensionless URLs.

## Deploy on Vercel (Hobby)

1. Push `main` to GitHub.
2. In Vercel, import this repository as a new project. The Hobby plan is enough.
3. Framework preset: **Other**.
4. Leave the build command empty. There is nothing to compile.
5. Output directory: the repository root.
6. Deploy. Production should track `main`.
7. In the project, open **Settings → Domains** and add `bananasgarage.com`. Point DNS at Vercel the way the dashboard describes.

After the domain is attached, `sitemap.xml` and `robots.txt` already advertise `https://bananasgarage.com`.
