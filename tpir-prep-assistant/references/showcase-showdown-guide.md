# Showcase Showdown Guide

Use this guide for Showcase Showdown / Big Wheel practice. This is the wheel segment, not final Showcase bidding.

## Core Rules

- A contestant may spin once or twice.
- The goal is to have the highest total without going over $1.00.
- A contestant who goes over $1.00 is out.
- A contestant who hits exactly $1.00 usually earns a bonus spin under current show rules, but live rules and bonus amounts should be verified from current official sources before giving prize-specific claims.

## Non-Negotiable Decision Invariant

If any earlier spinner who is still alive has a score higher than your current first-spin score, you must spin again. Staying cannot win because you are already behind.

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

```text
Showcase Showdown practice. You are [first/second/third] spinner.

Earlier live scores: [scores].
Later contestants remaining: [count].
Your first spin: [score].

Do you stay or spin again? Explain in one sentence.
```

Score the answer:

- 4 points: follows the behind-the-leader invariant.
- 2 points: recognizes bust risk.
- 2 points: accounts for spin order and later contestants.
- 2 points: explains the decision simply enough for game-speed play.

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
- Confusing Showcase Showdown with final Showcase bidding.
