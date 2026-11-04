# Banana's Garage

DIY site for **Banana**, a 1979 GMC Sierra Grande in two-tone pale yellow and cream. The truck belongs to a squarebody enthusiast, electrical engineer, and family man. Day-to-day photos live on Instagram at [@79_sierragrande](https://www.instagram.com/79_sierragrande/).

The site is plain static HTML, CSS, and a little vanilla JavaScript. There is no build step. Vercel can serve the repository root as-is. The layout follows the same clean system as [Gadget Drop Picks](https://gadget-drop-picks.vercel.app): Outfit and Fraunces, a light background, simple cards, and a dark header. Photos of the truck carry the pages.

- **Domain:** https://bananasgarage.com
- **Email:** [info@bananasgarage.com](mailto:info@bananasgarage.com)
- **Instagram:** https://www.instagram.com/79_sierragrande/

## Pages

| URL | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | Full-bleed front photo, Meet Banana, photo strip, latest Instagram links |
| `/builds` | `builds.html` | The six jobs, plus a link card for every Instagram post |
| `/about` | `about.html` | Banana and the owner, with the side photo |
| `/parts` | `parts.html` | Parts and tools, coming soon, with an affiliate disclosure |
| `/contact` | `contact.html` | Email and Instagram, with the sunset badge photo |

`vercel.json` sets `cleanUrls: true`, so `/builds` serves `builds.html`.

Instagram is linked, not embedded. Each card has a Reel or Post tag and a "View on Instagram" link that opens the permalink in a new tab.

## Photos

Optimized files live in `img/` as JPG and WebP at about 900px wide, plus a larger width when the original is bigger:

- `truck-front-900` and `truck-front-1223` (head-on; the camera original is 1223px wide). This stays the home hero.
- `truck-side-900` and `truck-side-1800` (daylight side profile)
- `truck-side-longbed-900` and `truck-side-longbed-1800` (longbed side by the wood gate)
- `truck-side-dusk-900` and `truck-side-dusk-1800` (side profile at dusk)
- `truck-street-three-quarter-900` and `truck-street-three-quarter-1800` (three-quarter view on the street)
- `truck-garage-front-900` and `truck-garage-front-1800` (head-on from inside the garage)
- `truck-hood-open-900` and `truck-hood-open-1800` (hood up)
- `truck-badge-900` and `truck-badge-1206` (sunset on the Sierra Grande badge)

Use `<picture>` with a WebP `source` and a JPG `img`, plus `srcset` and `sizes`. The home hero is preloaded. Other photos use `loading="lazy"`.

To add a photo later, export `img/<name>-900.jpg` and `img/<name>-900.webp` (and a larger pair if you have the pixels), then copy a `<figure>` in the home photo strip. Do not add an `<img>` until those files exist, so the page never shows a broken image.

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
