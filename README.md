# TPIR Prep Assistant

An agent skill for helping someone prepare to attend a taping of *The Price Is Right*, get ready for the contestant-selection process, study likely prize and grocery prices, and practice pricing-game scenarios.

This repository is not affiliated with CBS, Fremantle, The Price Is Right, or On Camera Audiences. *The Price Is Right* and related names are trademarks of their respective owners. This is an independent preparation and study aid.

## What It Does

- Builds taping preparation plans.
- Coaches short contestant-selection interview answers.
- Creates pricing drills for groceries, household goods, trips, vehicles, and holiday prize bundles.
- Runs scenario practice for Contestants Row, the Showcase, and common pricing games.
- Includes simulator prompts for every game listed on the current official TPIR games page, plus current-season aliases found in the CBS Season 54 episode guide.
- Adjusts preparation for themed tapings such as Christmas or holiday episodes.
- Cites official sources, producer comments, contestant reports, and research where appropriate.

## Install

For a local checkout, symlink the skill folder so updates to the repo are immediately reflected in the agent's skills directory.

For Codex-style skill loaders:

```bash
scripts/install.sh
```

If symlinks are not supported in your environment, copy the skill folder instead:

```bash
scripts/install.sh --copy
```

To replace an existing local install:

```bash
scripts/install.sh --force
```

To install into a specific skills directory:

```bash
scripts/install.sh --dest /path/to/skills
```

## Use

Example prompts:

```text
Use the TPIR prep assistant skill to make me a two-week preparation plan for a Christmas week taping.
```

```text
Quiz me on Contestants Row and Showcase bidding. Give me one scenario at a time.
```

```text
Help me write a 20-second selection interview answer. I am going with four coworkers and my favorite game is Plinko.
```

## Sources

The skill includes a source guide at `tpir-prep-assistant/references/source-notes.md`. It references official TPIR pages, On Camera Audiences ticket information, CBS episode listings, producer statements, former contestant reports, holiday press materials, and academic bidding research.

Agents should verify current ticketing, location, taping themes, eligibility, studio rules, and dates from official sources before giving concrete logistics advice.

## Reference Guides

- `tpir-prep-assistant/references/contestant-selection-guide.md`: how audience selection works and how to prepare for the brief interview.
- `tpir-prep-assistant/references/game-simulator-matrix.md`: simulator coverage for official-listed games and current-season aliases.
- `tpir-prep-assistant/references/holiday-taping-guide.md`: Christmas and holiday taping preparation.
- `tpir-prep-assistant/references/activity-bank.md`: reusable drills and scoring patterns.

## Validate

If you have the Codex skill validator available:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py tpir-prep-assistant
```

The validator checks basic skill structure. It does not verify that every tactical recommendation is current, so live taping details still need source checks.

## Codex Contributors

See [AGENTS.md](AGENTS.md) for repository-specific Codex instructions, validation expectations, and installer test notes.

## License

MIT. See [LICENSE](LICENSE).
