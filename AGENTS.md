# Codex Instructions

This repository contains a Codex-compatible skill, not an application. Keep changes focused on the skill package in `tpir-prep-assistant/` and the small amount of repository documentation needed to install or validate it.

## Repository Layout

- `tpir-prep-assistant/SKILL.md`: skill entrypoint and routing.
- `tpir-prep-assistant/references/`: detailed guidance loaded only when relevant.
- `tpir-prep-assistant/agents/openai.yaml`: UI metadata.
- `scripts/install.sh`: local installer for Codex skill directories.
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

After modifying the skill, run:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py tpir-prep-assistant
```

If the system validator is not available, at minimum check:

```bash
test -f tpir-prep-assistant/SKILL.md
test -f tpir-prep-assistant/agents/openai.yaml
find tpir-prep-assistant/references -type f -name '*.md'
```

## Install Testing

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
