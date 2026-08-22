# Showcase Showdown Simulator

Use this simulator when the user asks for "Showcase Showdown." In official TPIR usage, Showcase Showdown is the Big Wheel segment. It is not the final Showcase bidding round.

If the user clearly means the wheel, run [big-wheel-simulator.md](big-wheel-simulator.md).

If the user asks for final Showcase bidding, Showcase bids, showcase estimating, or showcase winner strategy, run [showcase-bidding-simulator.md](showcase-bidding-simulator.md) instead.

## Quick Disambiguation

If the user's wording is ambiguous, say:

```text
On TPIR, Showcase Showdown is the Big Wheel. Final Showcase bidding is a separate round. I can practice either one.
```

Then proceed with the most likely meaning if context is clear.

## Default Showcase Showdown Prompt

```text
Showcase Showdown means Big Wheel here.

You are [first/second/third] spinner.
Earlier live scores: [scores].
Later contestants remaining: [count].
Your first spin: [score].

Do you stay or spin again? Explain in one sentence.
```

Apply the scoring and decision rules from [big-wheel-simulator.md](big-wheel-simulator.md), especially the invariant that a contestant already behind an earlier live score must spin again.
