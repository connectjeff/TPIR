# Big Wheel Simulator

Use this simulator for Big Wheel spin-or-stay practice. On *The Price Is Right*, this segment is also called the Showcase Showdown. Keep it separate from final Showcase bidding.

## Core Rules

- A contestant may spin once or twice.
- The goal is to have the highest total without going over $1.00.
- A contestant who goes over $1.00 is out.
- A contestant who reaches exactly $1.00 in one or two normal spins wins $1,000 and receives a bonus spin.
- Reaching $1.00 ends the contestant's normal turn. Do not offer a stay-or-spin choice and do not take another normal spin.
- On the bonus spin, 5 cents and 15 cents are the green sections adjacent to $1.00. Either green section awards an additional $10,000; landing on $1.00 again awards an additional $25,000.
- A contestant takes the bonus spin even when nobody else reaches $1.00; in that case it is for bonus cash and does not affect advancement.
- If another contestant also reaches $1.00, each matched contestant's bonus spin also serves as the spin-off. The highest bonus-spin value advances, while each contestant keeps any cash won.
- If matched bonus spins tie, run another one-spin spin-off. The later tie-break spin does not award another bonus.

## Non-Negotiable Decision Invariant

If any earlier spinner who is still alive has a score higher than your current first-spin score, you must spin again. Staying cannot win because you are already behind.

This is not a user-choice state. In active practice, do not ask the user whether to stay or spin, do not ask them to explain the move, and do not ask whether they are ready to continue. State that the forced move is to spin again, briefly name the reason, then immediately resolve the second spin.

Examples:
- Earlier high score is 65 cents. Your first spin is 60 cents. Spin again.
- Earlier high score is 85 cents. Your first spin is 80 cents. Spin again.
- Earlier high score is 95 cents. Your first spin is 90 cents. Spin again.

Only consider staying when your current score is tied for the lead or ahead of all earlier live scores.

## Practical Stay / Spin Heuristics

Use these as training heuristics, not formal expected-value tables:

- If you are behind the current leader: spin again.
- If you are tied with the current leader and no later contestant remains: staying can force a spin-off; spinning risks busting.
- If you are tied with the current leader and a later contestant remains: staying is often reasonable at strong totals, but context matters.
- If you are ahead with 80 cents or more: usually stay.
- If you are ahead with 70-75 cents: usually stay, especially late, but discuss risk if a later spinner remains.
- If you are ahead with 65 cents or less and later contestants remain: decision is context-dependent; practice expected risk.
- If you are first spinner: 65 cents is a common borderline. Stronger totals usually stay; weak totals usually spin.

## Simulator Prompt Template

Prompt the user only when the user's contestant has a real stay-or-spin choice. Auto-resolve all non-choice events, including forced second spins, later contestants' spins, bust outcomes, advancement or elimination, and spin-off setup/results unless the user's contestant again has a stay-or-spin choice.

Reaching $1.00, taking a bonus spin, and taking a spin-off spin are not choices. Resolve them automatically and show the complete sequence. Clearly distinguish the $1,000 award for reaching $1.00 from the additional $10,000 green-section and $25,000 dollar-section bonus-spin prizes.

Use a forced-action prompt when the contestant is behind an earlier live score:

```text
Big Wheel practice. You are [first/second/third] spinner.

Earlier live scores: [scores].
Later contestants remaining: [count].
Your first spin: [score].

You are behind [leader score], so staying cannot win. Forced move: spin again.
Second spin: [score]. [Resolve total, bust, advancement, later contestants, or spin-off result.]
```

Only use an open decision prompt when the contestant is tied for the lead or ahead of all earlier live scores:

```text
Big Wheel practice. You are [first/second/third] spinner.

Earlier live scores: [scores].
Later contestants remaining: [count].
Your first spin: [score].

Do you stay or spin again? Explain in one sentence.
```

Score open-decision answers:

- 4 points: recognizes whether the current score is tied, ahead, weak, or strong.
- 2 points: recognizes bust risk.
- 2 points: accounts for spin order and later contestants.
- 2 points: explains the decision simply enough for game-speed play.

Do not score forced-spin states as strategy choices. They are rule-recognition moments: award full credit if the user says spin again, and immediately correct any stay answer because staying cannot win.

## Practice Scenarios

### Scenario A: Behind Current Leader

Earlier live scores: 65 cents.
You are second spinner.
Your first spin: 60 cents.

Correct move: spin again.
Reason: staying loses to 65 cents.

### Scenario B: Behind Strong Leader

Earlier live scores: 70 cents and 85 cents.
You are third spinner.
Your first spin: 80 cents.

Correct move: spin again.
Reason: staying loses to 85 cents.

### Scenario C: Ahead With Strong Total

Earlier live scores: 70 cents.
You are second spinner.
Your first spin: 90 cents.
One later contestant remains.

Correct move: stay.
Reason: 90 cents is a strong lead; a second spin creates unnecessary bust risk.

### Scenario D: First Spinner Borderline

Earlier live scores: none.
You are first spinner.
Your first spin: 65 cents.
Two later contestants remain.

Good answer: context-dependent, but spin again is defensible if training for aggression; staying is defensible if avoiding bust risk. Coach the user to know this is not a forced decision.

### Scenario E: Tie

Earlier live scores: 80 cents.
You are second spinner.
Your first spin: 80 cents.
One later contestant remains.

Good answer: stay is usually reasonable. You are not behind, and spinning risks going over. A later contestant can still beat both of you, but busting now gives them an easier path.

## Common Mistakes

- Saying "spin again to win" when the contestant is already ahead with a strong score.
- Staying when an earlier live score is higher.
- Ignoring whether later contestants remain.
- Treating tie situations as automatic spin-again decisions.
- Offering a normal second spin after the contestant has already reached $1.00.
- Skipping the $1,000 award or mandatory bonus spin after a one-spin or two-spin total of $1.00.
- Treating a solo contestant's bonus spin as a spin-off, or forgetting that matched $1.00 bonus spins also decide who advances.
- Confusing the green 5-cent and 15-cent bonus sections with ordinary-spin targets.
- Confusing the Big Wheel / Showcase Showdown with final Showcase bidding.
