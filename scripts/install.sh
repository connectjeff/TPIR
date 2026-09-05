#!/usr/bin/env sh
set -eu

usage() {
  cat <<'USAGE'
Install the TPIR Prep Assistant Codex skill.

Usage:
  scripts/install.sh [--copy] [--force] [--dest SKILLS_DIR]

Options:
  --copy           Copy the skill directory instead of symlinking it.
  --force          Replace an existing destination path.
  --dest DIR       Install into DIR instead of ${CODEX_HOME:-$HOME/.codex}/skills.
  -h, --help       Show this help.

Examples:
  scripts/install.sh
  scripts/install.sh --copy
  CODEX_HOME="$HOME/.codex" scripts/install.sh --force
USAGE
}

mode="symlink"
force="false"
dest_dir="${CODEX_HOME:-$HOME/.codex}/skills"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --copy)
      mode="copy"
      ;;
    --force)
      force="true"
      ;;
    --dest)
      if [ "$#" -lt 2 ]; then
        echo "error: --dest requires a directory" >&2
        exit 2
      fi
      dest_dir="$2"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_root=$(CDPATH= cd -- "$script_dir/.." && pwd)
skill_name="tpir-prep-assistant"
source_dir="$repo_root/showcase-ready/skills/$skill_name"
dest_path="$dest_dir/$skill_name"

if [ ! -f "$source_dir/SKILL.md" ]; then
  echo "error: skill source not found at $source_dir" >&2
  exit 1
fi

mkdir -p "$dest_dir"

if [ -e "$dest_path" ] || [ -L "$dest_path" ]; then
  if [ "$force" != "true" ]; then
    echo "error: destination already exists: $dest_path" >&2
    echo "Use --force to replace it." >&2
    exit 1
  fi
  rm -rf "$dest_path"
fi

if [ "$mode" = "copy" ]; then
  cp -R "$source_dir" "$dest_path"
  echo "Installed $skill_name by copy:"
else
  ln -s "$source_dir" "$dest_path"
  echo "Installed $skill_name by symlink:"
fi

echo "  $dest_path"
