#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
cd "$repo_root"

echo "Validating Codex skill package..."
if [[ -f "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" ]]; then
  python3 "$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py" tpir-prep-assistant
else
  test -f tpir-prep-assistant/SKILL.md
  test -f tpir-prep-assistant/agents/openai.yaml
  find tpir-prep-assistant/references -type f -name '*.md' -print >/dev/null
  echo "Skill validator not found; basic skill file checks passed."
fi

echo "Validating web app..."
test -f webapp/index.html
test -f webapp/styles.css
test -f webapp/app.js
node --check webapp/app.js

node - <<'NODE'
const fs = require("fs");
const js = fs.readFileSync("webapp/app.js", "utf8");
const paths = [...js.matchAll(/image: "([^"]+)"/g)]
  .map((match) => match[1])
  .filter((path) => path.startsWith("assets/"));
const missing = paths.filter((path) => !fs.existsSync(`webapp/${path}`));
if (missing.length) {
  console.error("Missing web app assets:");
  console.log(missing.join("\n"));
  process.exitCode = 1;
}
NODE

echo "All validations passed."
