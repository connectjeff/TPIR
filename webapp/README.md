# TPIR Practice Pipeline Web App

This is a static mobile-friendly browser version of the TPIR practice simulator. It is separate from the Codex skill in `tpir-prep-assistant/`, but both use the same repository-level preparation goals: educational practice, hidden prices until answers resolve, and clear rights boundaries.

## Run

Open `index.html` directly, or serve from the repository root:

```bash
python3 -m http.server 8000
```

For LAN/mobile testing:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Then open:

```text
http://<host-lan-ip>:8000/webapp/
```

## Validation

From the repository root:

```bash
scripts/validate.sh
```

The web app has no build step. The validation script checks that `app.js` parses and that local image assets referenced by the app exist.

## Rights Notes

Local images under `assets/anchors/` are generated practice-category illustrations. Official TPIR game visuals are linked remotely from public official pages and are not copied into this repository.
