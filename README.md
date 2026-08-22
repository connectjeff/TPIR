# TPIR Prep Assistant

An agent skill for helping someone prepare to attend a taping of *The Price Is Right*, get ready for the contestant-selection process, study likely prize and grocery prices, and practice pricing-game scenarios.

This repository is not affiliated with CBS, Fremantle, The Price Is Right, or On Camera Audiences.

## What It Does

- Builds taping preparation plans.
- Coaches short contestant-selection interview answers.
- Creates pricing drills for groceries, household goods, trips, vehicles, and holiday prize bundles.
- Runs scenario practice for Contestants Row, the Showcase, and common pricing games.
- Adjusts preparation for themed tapings such as Christmas or holiday episodes.
- Cites official sources, producer comments, contestant reports, and research where appropriate.

## Install

Copy the `tpir-prep-assistant` folder into a coding agent's skills directory, or point the agent at this repository and ask it to use the skill.

For Codex-style skill loaders:

```bash
cp -R tpir-prep-assistant ~/.codex/skills/
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

The skill includes a source guide at `tpir-prep-assistant/references/source-notes.md`. It references official TPIR pages, On Camera Audiences ticket information, producer statements, former contestant reports, and academic bidding research.

Agents should verify current ticketing, location, taping themes, eligibility, studio rules, and dates from official sources before giving concrete logistics advice.

## License

MIT. See [LICENSE](LICENSE).
