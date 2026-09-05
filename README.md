# Showcase Ready: Codex Plugin

Showcase Ready is a **Codex plugin** for preparing for *The Price Is Right*: rehearse a contestant interview, practice pricing decisions in a conversation, or play the bundled mobile web application.

Version: `0.2.0`. See [release notes](CHANGELOG.md), [project review](showcase-ready/docs/review.md), and [rights notice](NOTICE.md).

## Three Skills

| Skill | Workflow |
| --- | --- |
| `tpir-prep-assistant` | Preparation plans, interview coaching, themed tapings, and source-checked logistics |
| `tpir-game-practice` | Conversational pricing drills, named games, and the Contestants Row to Showcase pipeline |
| `showcase-ready-web` | Launch and explain the mobile web app, including LAN access, history, and reporting |

The skills work in Codex desktop and an interactive Codex CLI session. CLI preparation is agent-led conversation, not a separate terminal game executable. The web catalog includes incremental simulators and simplified scenario drills; see the review before assuming every game has complete rules.

## Install

```sh
git clone https://github.com/connectjeff/TPIR.git
cd TPIR
python3 scripts/install-plugin.py
```

The installer requires Python 3, a Codex CLI with plugin support, and the plugin-creator helpers. It registers the personal marketplace entry, installs through Codex, and links the installed package to this checkout. See [installation and updates](showcase-ready/docs/install.md) for paths, prerequisites, overrides, and troubleshooting.

Start a **new Codex task** after installation. Try:

```text
Use $tpir-prep-assistant to rehearse my 20-second contestant interview. Ask one question at a time.
Use $tpir-game-practice to run a full game, skipping the introduction.
Use $showcase-ready-web to launch the web app for my phone on the LAN.
```

In a terminal, launch interactive `codex` and enter a prompt. A one-shot `codex exec` session is not suitable for rehearsal requiring multiple replies.

## Text Workflow

Provide your timeline and personal context; rehearse one interview answer at a time; practice price categories or a named game; run a full pipeline or standalone drill; review outcomes and coaching. Real game choices arrive individually, while forced actions resolve automatically. See [the complete text/CLI guide](showcase-ready/docs/text-workflow.md).

## Web Workflow

Open [the app](showcase-ready/webapp/index.html) directly, or serve only its directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0 --directory showcase-ready/webapp
```

Open `http://localhost:8000/` locally. On a phone on the same LAN, replace `localhost` with the host's actual LAN address. Stop with Ctrl-C; use another port if occupied.

The header launches full games or untracked practice. Full games progress through Contestants Row, a pricing game, Big Wheel, and Showcase with result review screens. History retains 40 completed full games; reports show min/max/average winnings, including zero-value outcomes. Storage belongs to the browser origin and does not sync with Codex or other devices. See [the complete web guide](showcase-ready/docs/web-workflow.md).

## Development

`showcase-ready/` is the self-contained plugin root: manifest, skills, docs, and web app. The old `tpir-prep-assistant/` and `webapp/` paths are compatibility symlinks. `scripts/install.sh` retains legacy single-skill installation with `--copy`, `--force`, and `--dest`.

```sh
scripts/validate.sh
```

Validation checks the plugin, all skills, package links/version consistency, web JavaScript, assets, and deterministic Big Wheel paths. It is not exhaustive game-fidelity certification. See [AGENTS.md](AGENTS.md).

## Sources And Rights

Independent educational aid; not affiliated with or endorsed by TPIR, CBS, Fremantle, Paramount, or On Camera Audiences. MIT covers original content only. Official visuals remain remote links; generated category images are local. See [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

[Source notes](showcase-ready/skills/tpir-prep-assistant/references/source-notes.md) retain actual research dates. Verify current tickets, locations, eligibility, themes, and game rules from official sources when used. The plugin does not guarantee selection, prizes, or a season's lineup.
