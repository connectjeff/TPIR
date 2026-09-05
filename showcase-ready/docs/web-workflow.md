# Web Application Workflow

The app is static HTML, CSS, JavaScript, and generated images. No build, account, API key, backend, or live AI service is required. Official visuals are remote and need internet access.

## Start And Connect

From the repository root:

```sh
python3 -m http.server 8000 --bind 0.0.0.0 --directory showcase-ready/webapp
```

For an installed plugin, substitute its absolute `webapp` directory. Visit `http://localhost:8000/`. On macOS, inspect `ifconfig` for the active LAN IPv4 address; a phone on the same network opens `http://HOST_IP:8000/`. The bind address `0.0.0.0` is not a destination URL. DHCP changes can change the mobile URL.

Use an unused port if binding fails. Check the firewall and guest-Wi-Fi isolation if the host works but the phone does not. Direct HTML opening works for basic play, but HTTP is preferred for predictable persistence. Stop the foreground server with Ctrl-C.

## Header

| Control | Action |
| --- | --- |
| Plus | Start full game |
| CR / W / Dollar | Standalone Row / Big Wheel / Showcase |
| Practice Game | Choose a pricing-game entry |
| History | Completed games and event reviews |
| Clear | Confirm and erase history and active state |

Starting a new game or standalone mode replaces active state; finish and save a result first if it matters. Standalone practice is excluded from completed history and aggregate reports and does not resume after reload. Pull down from the page top on iPhone to reload.

## Full Game

1. Contestants Row shows the item, bid order, and your slot. Enter whole dollars. Review four bids and the actual retail price afterward. Continue to another chance on a loss or join Drew on stage on a win. The initial-four model allows six chances.
2. Play the pricing game and review its result before the wheel. Dedicated incremental flows reveal individual decisions; other entries remain simplified drills, as recorded in [coverage](review.md).
3. Big Wheel asks spin/stay only when there is a choice. A second spin is forced when behind an earlier live score. Busts are labeled. Exactly $1.00 awards $1,000 and triggers a bonus spin. Green 5/15 awards $10,000 extra; red $1.00 awards $25,000 extra. Matched-dollar bonuses also break ties, with further ties resolved automatically. Review advancement or elimination.
4. Showcase shows both bundles and the opponent bid before yours. Results show bids, actual retail prices, differences, and winner. The app applies its $250 double-showcase threshold without going over. A single win highlights one package; a double encloses both. Finish via the result screen to save a full game.

## Data And Reporting

`localStorage` key `tpirPracticeSession.v1` holds active full-game state and the newest 40 completed games. History Review lists events and gate outcomes. Min/max/average use simulated accumulated winnings across retained completed games, including $0 losses. Score is a separate coaching metric.

Storage is per browser profile and origin (scheme, host, port). Phone and laptop histories differ; changing host or port can look like missing history. Private browsing, Clear, or deleting site data can remove it. There is no export, login, cross-device sync, or shared CLI history. Standalone practice may display as an active game but never adds to report totals.

Answer concealment is in the player UI. Source code and browser state contain practice answers; this is not an anti-cheating boundary. Some simplified drills still expose price clues; see the review.
