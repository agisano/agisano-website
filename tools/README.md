# tools

## The social preview image

`public/og.png` is the card that WhatsApp, LinkedIn and Slack render for every
link to agisano.com. The site is a static export, so it is a real committed
file rather than something generated per request.

A principal forwarding the site to their SGB chair does it on WhatsApp. That
share is the first impression, so this image is load-bearing.

### Regenerating it

```bash
npm run build
cp tools/og-card.html out/og-card.html
(cd out && python3 -m http.server 4321 &)
node tools/render-og.mjs          # writes public/og.png at exactly 1200x630
rm out/og-card.html
```

Fonts resolve from `/fonts/`, so the card must be served — opening it over
`file://` renders the fallback faces and the type will be wrong.

### Keeping it right

The card is built from the site's own tokens: Fraunces for the statement,
Poppins for the wordmark, the ink gradient from `.ink-graded`, and the
converging line resolved into the mark. It should look like the site it links
to. If the homepage statement or the brand colours change, change this too —
nothing enforces that automatically.
