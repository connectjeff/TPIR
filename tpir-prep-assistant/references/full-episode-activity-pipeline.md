# Full Episode Activity Pipeline

Use this pipeline when the user wants a complete, ordered TPIR-style practice session. The flow is:

1. Come on Down
2. Closest Price / Contestants Row
3. Random pricing game
4. Big Wheel
5. Final Showcase bidding

Stop the pipeline immediately if the user loses either:

- Closest Price / Contestants Row after all allowed attempts are exhausted.
- Big Wheel.

Default assumption: the user is one of the first four contestants called down, so they can receive up to six Contestants Row attempts. If the user is called down later, reduce the remaining attempts accordingly.

If the user loses the random pricing game, continue to the Big Wheel with no added prize value from that game, matching the broad show flow where a contestant can still advance to the wheel after losing their pricing game.

## State To Track

Maintain and show this state after every stage:

```text
Pipeline status: [active/eliminated/complete]
Stage: [stage name]
Contestants Row attempts: [wins or misses]/[max attempts]
Score: [points]
Accumulated value: $[dollar total]
Won prizes: [list]
Notes: [one short coaching note]
```

Recommended scoring:

- Come on Down: 5 points for a clear, energetic, authentic response.
- Closest Price / Contestants Row: 10 points for winning the bid; 0-2 coaching points may be noted for each failed attempt, but failed attempts do not add prize value or advance past Contestants Row.
- Random pricing game: 10 points for a win, 0 for a loss; add the prize value only on a win.
- Big Wheel: 10 points for advancing to the Showcase; stop if the user does not advance.
- Final Showcase: 15 points for winning, 5 points for a coherent bid that loses, 0 for an overbid or incoherent bid.

Accumulated value:

- Start at $0.
- Add Contestants Row prize value only if the user wins Closest Price.
- Add random pricing-game prize value only if the user wins the game.
- Add Showcase value only if the user wins the final Showcase.
- Do not add hypothetical values from lost stages.

## Stage 1: Come On Down

Purpose: warm up selection readiness and stage energy.

Prompt:

```text
Come on Down warmup. Give me your 15-20 second audience-to-stage introduction: name, hometown, one memorable hook, and your energy when your name is called.
```

Score:

- 2 points: clear name and hometown.
- 1 point: memorable hook.
- 1 point: authentic TPIR energy.
- 1 point: concise enough for a fast show moment.

Advance regardless of score. This is a warmup, not an elimination gate.

## Stage 2: Closest Price / Contestants Row

Purpose: closest-without-going-over bid practice.

Allowed attempts:

- If the user is assumed to be one of the first four contestants called down, allow up to six Contestants Row attempts.
- Track attempts as `attempt X of 6`.
- If the user wins any attempt, add that item value and advance immediately to the random pricing game.
- If the user loses an attempt before attempt 6, do not eliminate them; explain the result, update score/value, and run the next Contestants Row item.
- If the user loses attempt 6, mark the pipeline eliminated and stop.
- If the user is called down later than the first four, set maximum attempts to the number of remaining one-bid rounds.

Scenario generation:

- Generate Contestants Row items from rules instead of reusing documentation examples.
- Keep a `recent_items` list for the current session. Do not repeat an item, near-duplicate, or category if there are reasonable unused alternatives.
- Do not reuse examples from this file, [activity-bank.md](activity-bank.md), or earlier chat turns unless the user explicitly asks to replay an example.
- Rotate categories across attempts: electronics, kitchen appliances, fitness/outdoor, home furniture, travel accessories, music/photo gear, yard/patio, smart home, designer accessories, hobby equipment.
- Pick a hidden actual retail price before asking. Use realistic practice values, rounded to normal retail endings when helpful.
- Generate three opponent bids around the hidden price so the user has a meaningful strategic choice. Use one of the bid patterns below.
- Vary the user's bid position across attempts. Do not assume the user always bids last.
- Track `recent_bid_positions` and rotate among first, second, third, and fourth when practical.
- If the user is not bidding last, show only the bids already made before the user's turn. Generate later opponent bids secretly after the user answers so the result can be scored realistically.

Contestants Row bid patterns:

- `spread_low`: all opponent bids are below the actual price, with one close high bid. Tests `$1 over` tactics.
- `one_over`: one opponent bid is above actual price, two are below. Tests overbid recognition.
- `all_high`: all opponent bids are above actual price. Tests the `$1` low-price read.
- `clustered`: all bids are close together. Tests confidence and small increments.
- `wild_low`: one very low bid, two plausible bids. Tests whether the user anchors on the low outlier.

Example generation recipe:

```text
Category: fitness/outdoor
Item: pair of folding electric scooters with helmets
Hidden actual retail price: $1,738
Pattern: spread_low
User bid position: fourth
Known prior bids: $1,100, $1,450, $1,700
Good tactical bids: $1,701 if the user believes the prize is above $1,700; lower if they think $1,700 is too high.
```

Prompt pattern:

```text
Contestants Row. Item up for bids: [item].

You are bidding [first/second/third/fourth].

Known bids before you:
- [none, or contestant bid list]

Contestants still to bid after you: [count]

What is your bid and why?
```

Resolution:

- Set an actual retail price before asking the user, but do not reveal it.
- Set the user's bid position before asking. Reveal only prior bids, not future bids.
- If the user bids first, they have no prior bids; evaluate whether they make a plausible opening bid.
- If the user bids second or third, evaluate both price estimate and bid-position tactics with partial information.
- If the user bids fourth, evaluate full-information tactics such as `$1`, `$1 over`, or choosing a gap.
- User wins if their bid is closest without going over.
- Interpret a `$1` bid as the user's strategic belief that every prior bid is too high. Do not treat it as a joke, refusal, or unsupported answer unless the user says otherwise.
- Continue to the next Contestants Row item if the user loses before exhausting attempts.
- Stop the pipeline only if the user loses the final allowed Contestants Row attempt.
- If every contestant overbids, all bids are invalid in show practice; for the pipeline, rerun a fresh Contestants Row item rather than eliminating the user on a table-wide overbid.

Scoring:

- 10 points and add item value if the user wins.
- 0-2 coaching points for a lost attempt may be awarded for sound reasoning, including a `$1` bid that correctly follows from a low-price read, but do not add item value.
- If the user loses before the final attempt, keep the pipeline active and move to the next item.
- If the user loses the final attempt, mark pipeline eliminated and give the correct bid logic.

Example item:

```text
Item: 65-inch midrange 4K TV.
Actual retail price: $1,298.
Prior bids: $850, $1,050, $1,250.
Strong user bid: $1,251 if they believe the TV is above $1,250.
```

Use examples only for documentation or explanation. In an active pipeline, generate a new item instead.

Example `$1` interpretation:

```text
Prior bids: $850, $1,100, $1,350.
User bid: $1.
Interpretation: the user believes the actual retail price is below $850.
Coach the read based on the actual price; do not ask why they bid $1 unless the context is unclear.
```

Example first-bid prompt:

```text
Contestants Row. Item up for bids: designer luggage set with packing cubes.
You are bidding first.
Known bids before you: none.
Contestants still to bid after you: 3.
What is your bid and why?
```

Example loss state before final attempt:

```text
Pipeline status: active
Stage completed: Contestants Row attempt 1 of 6
Contestants Row attempts: 1 loss / 6 max
Score: 4
Accumulated value: $0
Won prizes: none
Notes: Lost the bid, but five Contestants Row attempts remain because you were one of the first four called down.
Next stage: Contestants Row attempt 2 of 6
```

## Stage 3: Random Pricing Game

Purpose: simulate one randomly selected pricing game.

Selection:

- Choose one game from [game-simulator-matrix.md](game-simulator-matrix.md).
- Prefer games the user has not practiced recently.
- Include a visual reference from [game-visual-links.md](game-visual-links.md) if available.
- Tell the user which game was selected and give only the game information needed for the prompt.

Resolution:

- Decide the hidden actual values before asking.
- Ask for one move or the minimum sequence needed to resolve the game.
- Award 10 points and add the prize value if the user wins.
- If the user loses, add 0 and continue to the Big Wheel.

Prize values:

- Small prize game: $1,000-$6,000.
- Trip/furniture/appliance game: $4,000-$15,000.
- Car game: use a realistic current car value.
- Cash game: add only the cash actually won under the scenario.

## Stage 4: Big Wheel

Purpose: spin-or-stay and advance-or-stop decision practice.

Use [big-wheel-simulator.md](big-wheel-simulator.md).

Pipeline rule:

- If the user does not advance to the final Showcase, stop immediately.
- If the user advances, award 10 points and continue.
- Do not add money for the Big Wheel unless modeling a specific verified bonus outcome. In ordinary pipeline practice, Big Wheel affects advancement, not accumulated value.

Prompt pattern:

```text
Big Wheel. You are [first/second/third] spinner.
Earlier live scores: [scores].
Later contestants remaining: [count].
Your first spin: [score].

Do you stay or spin again? Explain in one sentence.
```

Invariant:

If any earlier live spinner has a higher total than the user's first spin, the user must spin again. Staying cannot win.

## Stage 5: Final Showcase Bidding

Purpose: final Showcase bundle estimation and bid discipline.

Use [showcase-bidding-simulator.md](showcase-bidding-simulator.md).

Prompt pattern:

```text
Final Showcase. Your showcase:
- [Prize 1]
- [Prize 2]
- [Prize 3]
- [Prize 4]

Opponent bid/context: [optional]

Give your bid and a quick category-by-category estimate.
```

Resolution:

- Set actual showcase value before asking.
- The user wins if they are closest without going over under the scenario.
- Award 15 points and add showcase value if they win.
- Award 5 coaching points for a coherent losing bid that is not an overbid.
- Award 0 for an overbid or unsupported guess.

## Running The Pipeline

Start by saying:

```text
Full TPIR pipeline: Come on Down -> Contestants Row -> random pricing game -> Big Wheel -> Final Showcase. I will keep score and accumulated prize value. Assuming you are one of the first four contestants called down, you get up to six Contestants Row attempts. The session stops if you miss all six Contestants Row attempts or lose the Big Wheel.
```

Then run exactly one stage at a time and wait for the user's answer before resolving that stage.

After resolving each stage, show:

```text
Score: [points]
Accumulated value: $[value]
Won prizes: [list]
Contestants Row attempts: [state, when applicable]
Next stage: [stage or eliminated/complete]
```

## Example Pipeline State

```text
Pipeline status: active
Stage completed: Contestants Row
Score: 15
Accumulated value: $1,298
Won prizes: 65-inch 4K TV ($1,298)
Next stage: Random pricing game
```
