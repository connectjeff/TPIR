# Installation And Linked Updates

## Development Installation

From a checkout, run `python3 scripts/install-plugin.py`. Requirements: Python 3, Codex CLI with `plugin add/list`, and the system plugin-creator scripts. The installer discovers `codex` on PATH or the bundled macOS executable in Codex.app or ChatGPT.app. Override with `--codex /path/to/codex`; use `--helpers /path/to/plugin-creator/scripts` for relocated helpers.

The installer uses the official scaffold to register a missing personal marketplace entry without overwriting unrelated entries, then uses `codex plugin add showcase-ready@personal --json`. If your personal marketplace has another valid name, it uses that name. It refuses to redirect an existing conflicting source or overwrite a regular source directory.

Paths for the default setup:

| Path | Role |
| --- | --- |
| `~/.agents/plugins/marketplace.json` | Personal plugin catalog |
| `~/plugins/showcase-ready` | Symlink to this checkout's `showcase-ready/` |
| `~/.codex/plugins/cache/personal/showcase-ready/0.2.0` | Real version directory with component symlinks to the source |
| `~/.codex/plugin-development-backups/` | Original cached copy and matching old standalone skill link |

`CODEX_HOME` relocates the Codex cache/legacy skill paths. The personal marketplace and source link remain under the user's home. The old standalone skill symlink is moved to backups only when it points at this exact package, avoiding duplicate skills. Unrelated or copied standalone installs are preserved.

The component links are a local development arrangement layered on the normal CLI install. This Codex build needs a real version directory and a copied `.codex-plugin` manifest for skill discovery. It follows a symlinked skills root containing real files, but skips individual SKILL.md symlinks. The installer links `skills`, `docs`, `webapp`, and rights files, preserving the copied cache first. Reinstalls can recreate copied components: rerun afterward. Repeat runs preserve correct links. New files inside linked directories and ordinary edits are reflected immediately; rerun after manifest/version changes or adding a top-level component. Start a new task to refresh discovered skills.

This host uses `showcase-ready-local` as the marketplace name because `personal` was already registered by another project. Its cache is `~/.codex/plugins/cache/showcase-ready-local/showcase-ready/0.2.0`. The personal catalog file remains at `~/.agents/plugins/marketplace.json`. A new marketplace name is only needed when the default name is already taken.

For a new catalog on a host with that collision, use `python3 scripts/install-plugin.py --marketplace-name showcase-ready-local`. This option creates a new catalog name; it does not rename an existing catalog. Validate any existing catalog and preserve its plugins before moving it.

## Updating

```sh
git pull --ff-only
scripts/validate.sh
python3 scripts/install-plugin.py
```

Links reflect local edits and pulled commits; they do not automatically fetch GitHub. If a marketplace release cache needs refreshing, the plugin-creator cachebuster helper can add a build suffix before reinstalling; rerun the linked installer afterward. Keep release versions and local development suffixes distinct.

To inspect registration, use `codex plugin list --json` and locate `showcase-ready@personal` (or the actual marketplace name). Inspect the source directory and installed `skills` directory links with `ls -l`. Use a new task to try all three skills.

## Distribution And Legacy Use

`showcase-ready/` is self-contained and can be copied into a local Codex marketplace as a plugin. Its manifest points to `./skills/`; docs, web files, images, LICENSE, and NOTICE travel with it. It needs no MCP or app configuration. Consumers should use a Codex version with plugin support.

The repository still supports `scripts/install.sh` for the original preparation skill only. Options are `--copy`, `--force`, and `--dest SKILLS_DIR`. That legacy install does not install the other two skills or register a plugin. Do not install it alongside the plugin unless duplicate discovery is intended.

Uninstall the plugin through Codex plugin management. A linked development checkout remains the source of truth; keep the repository and backup directory until you no longer need them. Do not delete the repository merely to remove the plugin.
