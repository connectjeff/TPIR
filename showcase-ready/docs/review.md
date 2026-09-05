# Project Review And Coverage

Reviewed 2026-09-05 for the plugin conversion. This is an implementation/documentation review, not a fresh audit of every show rule or retailer price. Source research dates remain August 2026 unless actually rechecked.

## Package

Three entrypoints cover preparation/interviews, conversational play, and the browser workflow. The existing ten reference guides and full static app are bundled. No MCP server, hook, connector, or credential is required. The previous skill-only repository instructions are updated. Compatibility symlinks retain the old paths, and the web implementation is preserved.

## Actual Coverage

| Implementation | Code evidence in `webapp/app.js` | Scope |
| --- | --- | --- |
| Any Number, Cliff Hangers, Five Price Tags, Plinko | Dedicated builders and submit/continue functions | Incremental stateful mechanics; not all edge cases are certified |
| Vend-O-Price | Dedicated shelf/reveal functions | Item/quantity choice followed by reveal |
| One Away | First-try feedback/retry state | Separate feedback flow |
| Flip Flop, Most Expensive | Direct game handlers | Game-specific choices from fixed data |
| `richPricingGameKeys` | Board renderer plus `correctIndex` grading | Concrete boards, often one grouped choice |
| Other catalog entries | `buildDocumentedPrizeRound`, `documentedGameSample` | Simplified strategy scenarios and fallback choices |
| Big Wheel | `wheel-rules.js` and deterministic tests | Dollar awards, matched bonuses, and repeated spin-offs tested |
| Row / Showcase | Bid handlers, result views, history | Full-pipeline integration with local practice values |

The game matrix is a reference catalog, not a certified current-season roster or proof of complete simulation. The historical aspiration of a faithful simulator for every game is not yet fulfilled.

## Known Gaps

- Some samples still bundle decisions, such as Bonus Game higher/lower choices. Bullseye's sample includes unit prices. Existing leak tests catch selected strings only. Remaining games need individual state machines and wider answer-concealment tests.
- Some scenarios and Showcase bundles are fixed. Row prices sample bands and retail endings without live provenance. Category illustrations can mismatch specific descriptions.
- PNG images and canvas fallback drawings coexist; no AI service runs at playtime.
- History is per origin, limited to 40 games, and separate from chat. Starting standalone practice replaces active state. No export or account sync exists.
- Skills and JavaScript are separate implementations, not a shared engine. Tests cover wheel rules, syntax, assets, and packaging, not every game or mobile browser.
- Six Row chances assume the initial four contestants; this is a practice convention rather than a complete episode with nine human contestants.

Next fidelity work should focus on individual decisions in the remaining multi-step games, deterministic outcome tests, and verified current price inputs. This plugin conversion does not claim those improvements were implemented.

## Conversion Verification

The plugin validator and all three skill validators passed. Package checks verify version agreement, local documentation links, compatibility links, and bundled rights files. The existing JavaScript/asset checks and deterministic wheel tests passed. Every web runtime file and PNG was compared byte-for-byte with the pre-conversion commit. A relocated copy served its HTML, JavaScript, CSS, and a product image successfully over HTTP. Legacy link, copy, and force installs passed in a temporary directory.

Local Codex registration and actual `skills/list` discovery were checked separately: all three enabled skills resolve to repository paths. Repeating the installer preserves the working component links. The installed manifest is copied because this Codex build does not discover skills with a symlinked manifest directory; rerun the installer after manifest changes. These checks do not substitute for a new full game-fidelity audit.
