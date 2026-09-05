# Showcase Ready Web App

Showcase Ready is the static mobile web application bundled in the Showcase Ready Codex plugin. See [the complete web workflow](../docs/web-workflow.md), [text/CLI workflow](../docs/text-workflow.md), and [coverage review](../docs/review.md).

## Run

Open `index.html` directly, or serve from the repository root:

```bash
python3 -m http.server 8000 --directory showcase-ready/webapp
```

For LAN/mobile testing:

```bash
python3 -m http.server 8000 --bind 0.0.0.0 --directory showcase-ready/webapp
```

Then open:

```text
http://<host-lan-ip>:8000/
```

## Validation

From the repository root:

```bash
scripts/validate.sh
```

The web app has no build step. The validation script checks that `app.js` parses and that local image assets referenced by the app exist.

## Rights Notes

Local images under `assets/anchors/` are generated practice-category illustrations. Official TPIR game visuals are linked remotely from public official pages and are not copied into this repository.
