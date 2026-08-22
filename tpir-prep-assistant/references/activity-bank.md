# Activity Bank

Use these activities interactively. Present one prompt, wait for the user's answer, then score and explain. Adjust difficulty based on the user's performance.

For named pricing-game simulation, prefer [game-simulator-matrix.md](game-simulator-matrix.md). This file contains general drills, reusable scoring patterns, and example answers.

For Big Wheel spin-or-stay practice, use [big-wheel-simulator.md](big-wheel-simulator.md). For Showcase Showdown wording, use [showcase-showdown-simulator.md](showcase-showdown-simulator.md). For final Showcase bids, use [showcase-bidding-simulator.md](showcase-bidding-simulator.md).

For an ordered full-episode-style practice session, use [full-episode-activity-pipeline.md](full-episode-activity-pipeline.md). If the user is one of the first four contestants called down, the pipeline gives up to six Contestants Row attempts. It stops only after six failed Contestants Row attempts or a Big Wheel loss.

## Selection Interview Drills

### 20-Second Hook

Prompt:
"You have about 20 seconds. Answer: name, where you are from, what you do, favorite TPIR game, and why you would be fun on the show."

Score on:
- Clear identity and hometown.
- One memorable personal detail.
- Specific favorite game, correctly named.
- Energy that sounds natural rather than forced.
- Ends cleanly instead of rambling.

Coaching:
Help the user replace generic lines like "I love the show" with specific, fast details: a family tradition, unusual job, group theme, favorite pricing game, or dream prize.

### Favorite Game Lightning Round

Ask:
1. "Favorite game?"
2. "Why?"
3. "What would you do first if you got called?"

Good answers name a real game and show familiarity. If the user says "tic-tac-toe" for Secret X or gives a vague answer, teach the correct game name and a one-sentence reason.

### Theme Fit Drill

For Christmas or holiday tapings, ask the user for:
- Shirt or outfit concept.
- Favorite holiday prize category.
- One holiday memory tied to watching TPIR.
- A short line they could say in the interview.

Keep the result festive but authentic. Avoid anything that blocks faces, interferes with seating, violates likely studio rules, or makes the user hard to identify.

## Pricing Knowledge Drills

### Grocery Shelf Drill

Give 5 common grocery items and ask the user to rank them low to high or estimate each price. Use plausible, current-ish retail ranges but tell the user to study local/current prices before attending.

Example set:
- Toothpaste, 4 oz.
- Premium ice cream pint.
- Brand-name cereal, family size.
- Liquid laundry detergent, medium bottle.
- Coffee pods, 32 count.

Scoring:
- 2 points for correct relative order.
- 1 point for being within 20% of a reasonable current price.
- Discuss why package size and brand tier matter.

Example answer pattern:
- Strong: "Toothpaste, ice cream, cereal, detergent, coffee pods, but detergent and coffee pods could swap depending on size and brand."
- Coach: reward relative reasoning; ask what brand tier or package size would change the order.

### Small Prize Higher/Lower

Show a target price and ask if the actual retail price is higher or lower.

Example:
- Digital meat thermometer: shown $22. Is actual higher or lower?
- Garment steamer: shown $49. Is actual higher or lower?
- Electric toothbrush: shown $89. Is actual higher or lower?

Teach the user to identify brand tier, material quality, power, capacity, and bundled accessories.

Example answer pattern:
- Meat thermometer at $22: likely higher for a premium instant-read model, lower for basic digital.
- Garment steamer at $49: likely higher for a full-size steamer, near target for compact.
- Electric toothbrush at $89: likely higher for premium rechargeable, lower for entry-level battery.

### Contestants Row Simulator

Generate fresh items during practice. Do not reuse the example below or a recent prompt unless the user asks to replay it. Rotate item categories, bid positions, and opponent-bid patterns so the user has to reason from the item, visible bids, and turn order, not memory.

Prompt:
"Prize: 65-inch midrange 4K TV. Bids before you: $900, $1,100, $1,250. You bid last. What do you bid and why?"

Evaluate:
- Does the user estimate the prize first?
- Do they understand closest without going over?
- Do they adapt to bidding first, second, third, or fourth rather than assuming the final bid position?
- Do they consider $1,251 only if they believe the item is above $1,250?
- Do they avoid reflexively bidding $1 or $1 over without a price opinion?
- If the user bids $1, assume they are saying all prior bids are too high unless they state a different reason.

Example answer pattern:
- Strong: "I think the TV is about $1,300, so $1,251 is worth it because it covers everything above the current high bid without overbidding if my estimate is right."
- Strong: "$1, because I think the actual price is below every prior bid."
- Weak: "Always bid $1 more." Coach that bid tactics depend on expected price and bid position.

Variants:
- User bids first with uncertain item.
- User bids second or third with only partial information.
- User bids last with all other bids visible.
- All prior bids look too high.
- One bid is clearly low and one is close to expected retail.
- Holiday bundle with decor, cookware, and gift cards.

Scenario-generation categories:
- Electronics and smart home.
- Kitchen appliances and espresso/coffee gear.
- Fitness, patio, outdoor, and hobby equipment.
- Furniture, bedding, and decor.
- Travel accessories and designer goods.
- Music, photo, gaming, and creator gear.

### Showcase Bundle Builder

For full final Showcase bidding practice, use [showcase-bidding-simulator.md](showcase-bidding-simulator.md).

Give a bundle and ask for a 30-second total:
- Trip for two to New York, 5 nights.
- Living room furniture set.
- 2026 compact SUV.
- Holiday decorations and smart lights.

Coaching:
Have the user write rough category anchors before summing: trip, room, vehicle, extras. Penalize forgotten taxes/fees only if the game source uses them; generally train actual retail prize values, not personal purchase cost.

Example answer pattern:
- Trip: estimate a round-trip airfare plus hotel package, not just personal airfare.
- Furniture: estimate retail set pricing, not clearance pricing.
- Vehicle: anchor by class and model year.
- Extras: include small decor and smart-light bundles but do not let them dominate the total.

## Pricing Game Scenario Drills

### Cliff Hangers

Prompt:
"Three small prizes: hand mixer, humidifier, wireless headphones. You need estimates that keep the climber under the limit. What prices do you call out?"

Teach:
Avoid wild guesses; use category anchors and common retail endings. Accuracy across all three matters more than one perfect guess.

### Dice Game

Prompt:
"Car price digits are hidden. You roll 2, 6, 1, and 5 for the four unknown digits. Which digits are exact, and for the non-exact rolls do you say higher or lower?"

Teach:
Digits in car prices are 1-6 in the classic game setup. A roll of 1 that is not exact must be higher; a roll of 6 that is not exact must be lower. Middle digits require judgment.

Example answer pattern:
- If 1 is not exact, call higher.
- If 6 is not exact, call lower.
- For 2, 3, 4, 5, use car pricing context rather than a fixed rule.

### Lucky Seven

Prompt:
"You start with $7. First car digit is given. Guess the next four digits. How do you manage risk?"

Teach:
Avoid extreme guesses unless you have information. Midrange guesses reduce expected loss, but car pricing conventions and trim level matter.

### Money Game

Prompt:
"You see two-digit cards: 19, 22, 24, 31, 45, 58, 73, 86, 97. The first two digits of the car price are likely 24. What do you pick first and why?"

Teach:
Use current car price anchors, model class, and common endings. Avoid treating every board as random.

### Range Game

Prompt:
"A trip prize range is moving from $8,200 to $9,000. Where do you stop it?"

Teach:
Estimate before the range starts. Stop when the true price is likely centered in the red range, not after panic-reacting to the display.

### Cover Up

Prompt:
"A car price has five digits. You choose a full price and learn only two digits are right. What do you do next?"

Teach:
Keep confirmed correct digits, update guesses based on car-price plausibility, and do not change correct positions.

### Pay The Rent

Prompt:
"Six grocery items: $1.29 seasoning packet, $2.49 candy, $3.99 pasta sauce, $5.49 cereal, $7.99 detergent, $12.99 coffee. Arrange them for Pay The Rent."

Teach:
The highest item usually does not simply go in the attic by itself in naive order. Look for sums that increase floor by floor.

Example answer pattern:
- Test combinations so each higher level is more expensive than the level below. A good simulator should ask the user to show the arithmetic, not just name an order.

### Switcheroo

Prompt:
"You have five missing digits and 30 seconds. What is your plan before the clock starts?"

Teach:
Identify the car's plausible missing digit first, then place small-prize digits by category. On the second chance, change only uncertain placements.

## Study Plan Templates

### One-Week Plan

Day 1: Watch two recent episodes and list games played, prizes, and contestant interview impressions.
Day 2: Grocery store or online cart study: 50 small items with prices.
Day 3: Contestants Row and Showcase bundle drills.
Day 4: Learn rules for 10 common pricing games from official game pages.
Day 5: Mock interview and favorite-game lightning round.
Day 6: Theme-specific prep: shirt, group line, dream prize, travel logistics.
Day 7: Light review and rest; verify ticket, ID, arrival instructions, and studio rules.

### Month-Long Plan

Weeks 1-2: Build a price notebook by category.
Week 3: Play 3-5 game scenarios per day and review official game rules.
Week 4: Rehearse selection interview, group energy, taping-day logistics, and themed episode adjustments.
