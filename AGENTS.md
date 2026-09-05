# Codex Instructions

This repository contains the Showcase Ready Codex plugin and its static web application. Keep preparation coaching, conversational practice, and web-launch instructions consistent with their actual implementations. Preserve the full simulator pipeline when changing packaging.

## Repository Layout

- `showcase-ready/.codex-plugin/plugin.json`: plugin manifest.
- `showcase-ready/skills/`: preparation, game practice, and web-launch skills.
- `showcase-ready/skills/tpir-prep-assistant/references/`: detailed guidance loaded only when relevant.
- `showcase-ready/webapp/`: static app and original generated product assets.
- `showcase-ready/docs/`: complete workflows, installation, and review notes.
- `tpir-prep-assistant` and `webapp`: compatibility symlinks; edit their canonical targets.
- `scripts/install-plugin.py`: personal marketplace and linked plugin installer.
- `scripts/install.sh`: legacy single-skill installer.
- `README.md`: user-facing overview and install instructions.

## Editing Rules

- Keep `SKILL.md` concise. Put long strategy notes, source details, and scenario banks in `references/`.
- Treat official TPIR, CBS, On Camera Audiences, and Paramount sources as stronger than contestant anecdotes or fan-maintained pages.
- Add last-checked dates and source reliability labels when adding research sources.
- Prefer linking to official game pages or official image URLs for visuals. Do not commit copied TPIR screenshots or downloaded show images.
- Preserve [NOTICE.md](NOTICE.md) and keep third-party rights language clear: MIT applies only to original repo content, not TPIR/CBS/Fremantle/Paramount media, marks, game boards, show text, or linked images.
- Use TPIR names and game names only for nominative, descriptive, educational reference. Do not imply affiliation, endorsement, sponsorship, or permission from rights holders.
- Do not promise contestant selection, prizes, taping admission, or game lineups.
- Verify current ticketing, location, eligibility, and taping rules from official sources before giving concrete logistics advice.
- Use ASCII unless editing quoted titles or source names that already require non-ASCII.

## Validation

After changes, run:

```bash
scripts/validate.sh
```

If the system validator is not available, at minimum check:

```bash
test -f tpir-prep-assistant/SKILL.md
test -f tpir-prep-assistant/agents/openai.yaml
find tpir-prep-assistant/references -type f -name '*.md'
```

## Install Testing

Validate the entire self-contained plugin, all skills, local links, and version agreement. Test the linked installer twice for idempotency and confirm the source and installed component links resolve to the checkout. Keep the installed manifest as a normal copied file so Codex discovers skills. Never overwrite unrelated plugin sources or hand-edit Codex config to register a plugin. Keep the plugin and root LICENSE/NOTICE copies identical.

Keep GitHub current when completing requested changes. Update the changelog for user-visible changes and keep VERSION and plugin manifest versions aligned. Do not claim every catalog game is a full simulator; update the review notes when coverage improves.

The installer should support:

- Default symlink install into `${CODEX_HOME:-$HOME/.codex}/skills/tpir-prep-assistant`.
- `--copy` for environments where symlinks are not wanted.
- `--force` to replace an existing file, directory, or symlink at the destination.
- `--dest` to install into an explicit skills directory.

Prefer testing with a temporary destination:

```bash
tmpdir="$(mktemp -d)"
scripts/install.sh --dest "$tmpdir"
test -L "$tmpdir/tpir-prep-assistant"
rm -rf "$tmpdir"
```

Do not commit generated local install directories or temporary test output.
