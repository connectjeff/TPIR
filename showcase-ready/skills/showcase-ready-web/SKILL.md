---
name: showcase-ready-web
description: Launch, explain, or troubleshoot the bundled Showcase Ready static web application, including mobile LAN access, full-game history, reports, and untracked standalone pricing practice.
---

# Showcase Ready Web

Read [the web workflow](../../docs/web-workflow.md). Resolve the plugin root from this skill's location, two directories up, including symlinks. The app is at `webapp/index.html` under that root; do not assume the working directory is the repository.

For local use, open the HTML file or serve only `webapp/` with Python's standard HTTP server. For mobile LAN use, bind to `0.0.0.0`, inspect actual host interface addresses, and return a concrete LAN URL. Use an available port; do not terminate unrelated servers. Use the host's persistent server mechanism when available and record how to stop it.

Substitute the resolved absolute directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0 --directory /absolute/plugin/path/webapp
```

Verify the page, JavaScript, and an anchor image over HTTP before handing back the URL. Confirm the bind address for LAN requests. Claim mobile connectivity was verified only if tested from that device.

Explain full-game, Contestants Row, wheel, Showcase, pricing-game picklist, history, and clear controls when asked. Completed full games are stored locally, up to 40. Standalone practice is excluded from reports. Origins and devices do not share history; starting standalone practice replaces active full-game state. Clear requires the app's confirmation.

Read [review notes](../../docs/review.md) before describing fidelity. The app includes incremental games and simplified scenario drills. Prices are practice data; answer concealment is visual, not a server security boundary. No live AI image service, account backend, or dedicated text game executable is included.

For interview rehearsal or conversational play, route to the other skills. Do not change application code when the user only asks to play.
