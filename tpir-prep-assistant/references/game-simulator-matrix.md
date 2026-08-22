# Pricing Game Simulator Matrix

Use this file to run simulator activities for any current official-listed TPIR pricing game. It is intentionally compact: each row gives a prompt pattern, scoring focus, and coachable mistake. Expand the prompt with current-ish prices and brands when running a session.

Before simulating a named game, consult [game-visual-links.md](game-visual-links.md). Include either the official visual page link or the direct official image link in the prompt so the user can see the board being discussed. Prefer links over copying or storing show images in generated files.

Last researched: 2026-08-22.

Coverage basis:
- Official TPIR games page checked 2026-08-22.
- CBS Season 54 episode guide checked 2026-08-22 for current-season appearances and aliases.
- Include current-season aliases: Back to 76 for Back to 75, Flip or Flop for Flip Flop, 1 Right Price for One Right Price, Lucky $even for Lucky Seven, 1/2 Off for Half Off, and The Lion's Share for Lion's Share.
- The official games list's `to3ialhijts` slug resolves to Take Two. Keep Take Two separate from Two For One; they are different games.

When the user asks for a named game, run one simulator prompt, wait for the answer, then score it. When uncertain about exact current rules, direct the agent to verify the official game page before giving rule-specific advice.

In every simulator, keep actual retail prices hidden until the user has answered. Set actual retail prices, prize values, car prices, cash locations, correct choices, and Showcase totals privately for scoring, but do not disclose them in the prompt. The prompt should show only the visible board information, prize descriptions, displayed prices, prior bids, and choices that a contestant would see. When scoring or revealing any price, use the phrase "actual retail price."

## Universal Scoring

- 2 points: understands the rule and win condition.
- 2 points: makes a price estimate before choosing.
- 2 points: explains the decision using category, brand, package size, model, or bid position.
- 2 points: manages risk under the game constraints.
- 2 points: avoids the common mistake listed in the matrix.

## Matrix

| Game | Simulator activity | Score/coach for | Common mistake |
| --- | --- | --- | --- |
| Any Number | Show a car, mid-prize, and piggy bank. Ask the user to choose digits one at a time after seeing a first car digit. | Uses car-price conventions and avoids wasting likely car digits on the piggy bank. | Picking favorite numbers randomly. |
| Back to 75 / Back to 76 | Give a retro-styled board with numbered choices and ask the user to choose a path/option set under the current displayed rules. | Verifies current rules first; reasons from revealed feedback. | Assuming anniversary rules without checking the current page. |
| Balance Game | Give three money bags plus a base amount and a prize. Ask which bags make the actual retail price. | Estimates the prize first, then adds bags. | Treating bags as abstract math without pricing the prize. |
| Bargain Game | Show two prizes with sale prices. Ask which has the larger markdown from actual retail price. | Estimates both actual retail prices and compares differences, not final prices. | Choosing the cheaper sale price. |
| Bonkers | Give a four-digit displayed price and a prize. User marks each digit higher/lower under time pressure. | Fast initial estimate and willingness to change all wrong positions. | Moving one marker at a time without a price opinion. |
| Bonus Game | Give four small prizes with displayed prices. User calls higher/lower to reveal windows. | Wins as many windows as possible using small-prize knowledge. | Thinking the bonus location is controllable. |
| Bullseye | Give five grocery products. User chooses quantity of one item to hit target range. | Starts with unit-price arithmetic; pivots if outside range. | Picking favorite product rather than a controllable unit price. |
| Card Game | Give a car type and draw range. User stops after drawing cards toward a car bid. | Balances close bid with overbid risk. | Ignoring the allowed range or overbidding late. |
| Check Game | Give a prize and ask user to write a check so check plus prize falls in the target range. | Estimates prize, subtracts from target midpoint. | Writing a check before estimating the prize. |
| Check-Out | Give five grocery items. User estimates each and total must fall within tolerance. | Uses realistic grocery prices and package sizes. | Overfocusing on one item and missing total error. |
| Cliff Hangers | Give three small prizes. User estimates each to keep total miss under the climber limit. | Uses category anchors and avoids extreme guesses. | Throwing out rounded guesses with no package/model context. |
| Clock Game | Give two prizes. User uses higher/lower feedback to converge in seconds. | Binary-search style hundreds/tens/ones strategy. | Counting slowly or guessing random numbers. |
| Coming or Going | Show a reversible price for a trip/prize. User chooses forward or backward. | Estimates whether the price scale fits the prize. | Choosing the prettier number. |
| Cover Up | Give columns of digits for a car. User builds a car price and updates after feedback. | Keeps confirmed digits and changes only unconfirmed positions. | Changing known-correct digits. |
| Danger Price | Show a danger price and four prizes. User picks the three prizes not matching it. | Estimates all four prizes before selecting. | Picking the item they most want. |
| Dice Game | User rolls digits for a car and calls exact/higher/lower for each. | Knows 1 must be higher and 6 must be lower if not exact. | Calling lower on 1 or higher on 6. |
| Do the Math | Give two prizes and a dollar difference. User chooses add or subtract. | Estimates both prizes and compares difference. | Treating the cash amount as a bonus only. |
| Double Cross | Give two crossing price paths. User slides to form two prize prices. | Checks both prices simultaneously. | Making one plausible price while the other is impossible. |
| Double Prices | Give two possible prices for one prize. User chooses the actual retail price. | Anchors by category and feature level. | Guessing solely by price ending. |
| Easy as 1-2-3 | Show three prizes. User ranks low, middle, high. | Uses relative retail value. | Assuming size equals price. |
| Five Price Tags | Give a car and four small-prize true/false decisions to earn picks. User chooses the car price tag. | Maximizes picks, then uses car trim anchors. | Treating small prizes as unimportant. |
| Flip Flop / Flip or Flop | Give four digits split into two pairs. User chooses flip, flop, both, or neither. | Estimates the prize and chooses plausible pair order. | Automatically flipping both. |
| Freeze Frame | Present rotating price pairs. User stops at the likely price. | Estimates before stopping. | Waiting for a familiar-looking number. |
| Gas Money | Show five car prices. User identifies the actual car price while collecting cash from wrong prices. | Eliminates implausible prices by model/trim. | Picking the car price too early without elimination. |
| Golden Road | Start with a grocery item and missing digits for escalating prizes. User chooses digits. | Uses digit carry-forward and prize scale. | Forgetting only displayed digits are available. |
| Grand Game | Give target price and six groceries. User picks items below target. | Identifies package sizes and premium exceptions. | Assuming all groceries are under target. |
| Gridlock | Give first car digit and pairs of next digits. User chooses each pair. | Uses car price plausibility. | Treating two-digit chunks independently of car class. |
| Grocery Game | Give five grocery items and a target total range. User buys quantities. | Uses multiplication and leaves room for error. | Buying too many units of a high-price item. |
| Half Off / 1/2 Off | Give small-prize pairs for box eliminations, then choose a cash box. | Earns eliminations through small-prize pricing. | Treating the final box as fully strategic. |
| Hi-Lo | Give six grocery items. User selects the three highest. | Identifies premium items and package sizes. | Picking based on personal preference. |
| Hole in One | Give six grocery items. User ranks low to high for putting advantage. | Relative grocery ordering. | Ignoring package size. |
| Hot Seat | Give five small prizes with displayed prices. User calls higher/lower quickly and decides when to stop. | Uses fast small-prize instincts and risk thresholds. | Risking accumulated money on a pure guess. |
| It's in the Bag | Match grocery items to bag prices, then decide when to stop. | Price matching and cash-out discipline. | Chasing top money after uncertain matches. |
| Let 'em Roll | Price three grocery items higher/lower to earn rolls, then decide rerolls. | Earns rolls; keeps car symbols. | Rerolling car symbols or missing obvious grocery order. |
| Line 'em Up | Use three prize prices to choose middle digits of a car. | Tests car-price plausibility and uses feedback. | Changing all digits after partial feedback. |
| Lion's Share / The Lion's Share | Give product/prize clues and staged choices. User chooses under the current rules after verification. | Verifies current official rules and reasons from revealed values. | Applying rules from a different new game or special. |
| Lucky Seven / Lucky $even | Guess car digits while losing dollars equal to misses. | Uses midrange guesses and car-price conventions. | Extreme digit guesses without evidence. |
| Magic # | Give two prizes. User sets a number between their actual retail prices. | Estimates both and places a safe middle number. | Setting too close to one estimate. |
| Make Your Move | Arrange digit blocks into prices for three prizes. | Uses digit length and prize category. | Creating one good price and two impossible ones. |
| Master Key | Price small prizes to earn keys, then assign keys to locks. | Earns keys; understands final key choice is uncertain. | Treating key selection as predictable. |
| Money Game | Pick two-digit cards for front/back of car while avoiding cash decoys. | Uses current car price anchors and common endings. | Picking all low cards because they look like cash. |
| More or Less | Decide if each revealed price is more or less than actual, escalating to car. | Anchors each prize before answering. | Rushing small prizes and losing before the car. |
| Most Expensive | Show three prizes. User identifies the highest actual retail price. | Compares category and quality, not size. | Assuming largest item is most expensive. |
| Now or Then | Give groceries and an old date. User calls current price or historical price. | Uses product inflation and shelf-stable category knowledge. | Treating every low price as "then." |
| One Away | Adjust each wrong car digit up/down by one, then revise after honks. | Uses car-price plausibility and feedback count. | Changing digits randomly after partial feedback. |
| One Right Price / 1 Right Price | Show one price and two prizes. User assigns price to correct prize. | Estimates both prizes. | Matching by superficial similarity. |
| One Wrong Price | Show three prizes with prices. User identifies the wrong one. | Finds the price farthest from plausible retail. | Choosing the least liked prize. |
| Pass the Buck | Price grocery pairs to earn board picks, then choose spaces. | Wins picks with grocery pricing; manages stop/continue if applicable. | Assuming board placement is skill-based. |
| Pathfinder | Walk through a car price grid using small-prize chances after mistakes. | Uses car digit conventions and small-prize recovery. | Stepping without considering adjacent plausibility. |
| Pay the Rent | Arrange six grocery items into increasing floor totals. | Tests sums, not simple low-to-high order. | Sorting items by individual price. |
| Pick-a-Number | Fill one missing digit in a prize price from three choices. | Estimates full price and eliminates impossible digits. | Picking favorite digit. |
| Pick-a-Pair | Pick two grocery items with the same price. | Recognizes common same-price package tiers. | Pairing similar products instead of similar prices. |
| Plinko | Price small items to earn chips; then drop chips. | Earns chips with small-prize knowledge. | Overstating control of chip drops. |
| Pocket Change | Build car price from digits, then draw envelopes to afford rising price. | Uses car-price conventions and avoids wrong digit cost. | Ignoring the cost of wrong guesses. |
| Punch a Bunch | Higher/lower small prizes earn punches; user decides keep or continue. | Maximizes punches and uses expected-value thinking. | Continuing after a high slip without considering odds. |
| Push Over | Choose where to stop a block of digits to form prize price. | Estimates prize range before moving blocks. | Stopping at the first familiar pattern. |
| Race Game | Match four prices to four prizes under time pressure. | Starts with strongest matches, uses feedback efficiently. | Rebuilding the whole board without learning from feedback. |
| Range Game | Stop a moving range over the actual retail price. | Estimates early and stops when centered. | Waiting too long because the range feels narrow. |
| Rat Race | Price small items within tolerances to earn rat picks. | Earns more picks through small-prize accuracy. | Treating rat selection as the main skill. |
| Safe Crackers | Use three digits to set a prize safe combination. | Prices the prize and permutes digits logically. | Ignoring whether the price should be high or low. |
| Secret X | Earn Xs through small prizes and place them to complete a line. | Earns extra Xs and uses board geometry. | Placing without planning possible lines. |
| Shell Game | Higher/lower small prizes earn chips, then user marks shells. | Earns as many chips as possible. | Believing shell location can be inferred. |
| Shopping Spree | Select prizes to reach a spending target. | Picks high-value prizes first. | Choosing low-value favorites and missing target. |
| Side by Side | Choose the order of two two-digit blocks for a prize. | Estimates the prize scale. | Picking the smoother-sounding number. |
| Spelling Bee | Price small prizes to earn cards; decide whether to take cash or continue. | Earns cards and weighs cash-out decision. | Chasing C-A-R with too few cards and no risk plan. |
| Squeeze Play | Remove one middle digit from a displayed price. | Estimates actual retail price and removes the implausible extra digit. | Removing an endpoint digit, which is not the usual action. |
| Stack the Deck | Price grocery pairs to reveal car digits, then fill remaining digits. | Wins reveals and uses car conventions for blanks. | Guessing car digits before earning help. |
| Swap Meet | Choose which prize has same price as a target prize. | Finds equivalent retail tier. | Matching by product category only. |
| Switch | Decide whether two displayed prices should be switched between two prizes. | Estimates both prizes. | Always switching because the game name suggests it. |
| Switcheroo | Place five digits into car and small-prize prices under time. | Prioritizes car digit, then small-prize plausibility. | Changing correct guesses after first feedback. |
| Take Two | Show four prizes and a target total. User picks the two prizes whose prices add to the target. | Estimates all four prizes and tests likely sums. | Confusing this with Two For One. |
| Temptation | Use prize-price digits to build car price, then choose prizes or risk for car. | Builds plausible car price and makes a risk decision. | Risking valuable prizes on a low-confidence car price. |
| Ten Chances | Use digit sets to write prices for two prizes and a car within ten tries. | Applies price endings and avoids impossible combinations. | Burning chances on permutations with bad endings. |
| That's Too Much | Stop when displayed car price first exceeds the actual retail price. | Knows to stop just after the actual retail price is passed. | Stopping at a price that merely seems affordable. |
| Three Strikes | Draw digits/strikes from bag to place car price digits. | Uses known digits and positions carefully. | Placing a digit in a position made impossible by car class. |
| Time Is Money | Arrange five grocery items into low/mid/high price shelves under time. | Fast category sorting and correction under feedback. | Freezing after the first wrong arrangement. |
| To the Penny | Price groceries by choosing correct prices and managing pennies. | Uses grocery knowledge and saves pennies for uncertainty. | Spending pennies early on confident items. |
| Triple Play | Choose correct car prices for three cars in increasing difficulty. | Estimates each car class and trim. | Treating all cars as one price tier. |
| Two For One / 2 for the Price of 1 | Show two prizes and a three-digit price with two choices for each digit. User chooses the free reveal position, then selects the other digits. | Chooses the most informative free digit and prices the three-digit prize. | Confusing this with Take Two. |
| Vend-O-Price | Choose which vending shelf total is highest based on unit price times quantity. | Multiplies price by visible quantity. | Choosing the single most expensive item. |

## Agent Prompt Template

```text
Let's simulate [game]. Visual reference: [official visual page or image link]. I will give you the visible board and constraints, then you answer with your move and reasoning. I will score you out of 10, reveal the practice actual retail price, and give one concrete adjustment.
```

## Building Current Price Inputs

When creating item prices, use realistic current retail bands and say they are practice values. For high-stakes or date-specific preparation, browse current retailer prices for the user's region before generating a final study list.
