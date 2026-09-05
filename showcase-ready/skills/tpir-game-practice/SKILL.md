---
name: tpir-game-practice
description: Run conversational The Price Is Right pricing drills, named games, Contestants Row, Big Wheel, Showcase bidding, or a full episode-style practice pipeline in Codex chat or CLI.
---

# Conversational Game Practice

Load the preparation skill's [operating rules](../tpir-prep-assistant/SKILL.md) and only the relevant reference from its `references/` directory. For a full game, use [the pipeline](../tpir-prep-assistant/references/full-episode-activity-pipeline.md). Read [coverage notes](../../docs/review.md) before claiming simulation completeness or a current-season lineup.

1. Honor the requested game and skip the introduction when asked. Standalone practice does not contribute to full-game score or winnings.
2. Generate a fresh, concrete product or bundle and fix its answer privately before taking bids. Give size, quantity, features, and relevant model or travel details. Use whole dollars for Contestants Row and Showcase; grocery prices may need cents.
3. Present only information visible at that decision: product, current board, legal price options, previous bids, and the player's position. Do not expose answer keys in tool output or visible files.
4. Ask for one incremental decision at a time. Never replace a sequence of bids or digit selections with a preselected answer bundle. Verify unfamiliar rules from official sources before running them; a scenario template is not a complete rules engine.
5. Resolve forced actions automatically. Do not request reasoning or confirmation when there is no choice. Show the outcome and arithmetic before the next decision. Honor explicit result-review pauses.
6. Follow [wheel rules](../tpir-prep-assistant/references/big-wheel-simulator.md) for forced second spins, dollar awards, bonus spins, and repeat ties. Show each spin and distinguish busts from waiting contestants.
7. For the Showcase, show both bundles and the known opponent bid. Reveal bids, actual retail prices, differences, and the winner after the user's bid. Apply the documented double-showcase threshold.
8. Summarize the attempt and one useful adjustment. Keep conversational state in the thread; do not claim it is synchronized with browser history.

For browser controls, use [showcase-ready-web](../showcase-ready-web/SKILL.md).
