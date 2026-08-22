# Showcase Bidding Simulator

Use this simulator for the final Showcase round, where two contestants bid on prize showcases. Keep this separate from Showcase Showdown / Big Wheel practice.

Set the actual showcase value privately before prompting, but do not reveal it until after the user bids. The user is practicing estimation, so the prompt should list only the showcase prizes and any visible opponent context.

## Core Rules

- Each showcase contains a bundle of prizes.
- Contestants bid on the total actual retail price of their assigned showcase.
- The contestant closer to the actual retail price without going over wins.
- A contestant who overbids cannot win unless both contestants overbid under the rules currently in effect; verify current rules before making edge-case claims.
- A very close bid can trigger special bonuses under current show rules, but verify current thresholds and prizes before making specific claims.

## Simulator Prompt Template

```text
Showcase bidding practice.

Your showcase:
- [Prize 1]
- [Prize 2]
- [Prize 3]
- [Prize 4]

Opponent bid/context: [optional]

Give your bid and a quick category-by-category estimate.
```

Score the answer:

- 2 points: separates the showcase into category anchors.
- 2 points: estimates travel, vehicles, furniture, electronics, and appliances at retail-showcase scale rather than personal sale prices.
- 2 points: sums the bundle coherently.
- 2 points: leaves a rational safety margin to avoid going over.
- 2 points: explains assumptions clearly.

## Estimation Anchors

Use current-ish retail bands and tell the user these are practice values unless live retailer research has been done.

- Compact car or compact SUV: anchor by current model year, trim, and fees included in show copy.
- Luxury vehicle: use a much higher anchor; do not treat it like a basic sedan.
- Domestic trip for two: airfare, hotel, package inclusions, and length matter.
- International trip for two: destination, hotel tier, length, airfare, excursions, and seasonality matter.
- Furniture room: estimate retail set pricing, not clearance pricing.
- Kitchen package: appliance brand tier and number of pieces dominate.
- Electronics package: TV size, audio, laptop/tablet tier, and gaming bundles matter.
- Holiday showcase: account for premium travel, vehicles, decor, hosting items, and gift-bundle framing.

## Practice Scenarios

### Scenario A: Vehicle Plus Travel

Your showcase:
- Trip for two to New York City, 5 nights.
- Home theater package with 75-inch TV and sound system.
- 2026 compact SUV.

Good answer pattern:
- Estimate the SUV first as the dominant line item.
- Add travel and electronics separately.
- Avoid bidding right at the sum if uncertain.

### Scenario B: Holiday Showcase

Your showcase:
- German Christmas-market trip for two.
- Living room furniture and holiday decor.
- Premium espresso setup.
- Luxury crossover SUV.

Good answer pattern:
- Treat international holiday travel and luxury vehicle as high-value anchors.
- Add furniture and espresso bundle after the main anchors.
- Explain whether the bid is conservative or aggressive.

### Scenario C: No Vehicle Showcase

Your showcase:
- Kitchen appliance suite.
- Dining room set.
- Trip to Hawaii for two, 6 nights.
- Designer luggage.

Good answer pattern:
- Do not force a vehicle-sized estimate.
- Price the trip and appliance suite as the largest components.
- Use a lower total range than a car showcase.

## Common Mistakes

- Forgetting one prize in the bundle.
- Treating a trip like personal airfare only.
- Pricing vehicles from used-car or discounted assumptions.
- Ignoring the "closest without going over" risk.
- Confusing final Showcase bidding with Showcase Showdown / Big Wheel spin decisions.
