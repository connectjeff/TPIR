#!/usr/bin/env python3
"""Install the personal Codex plugin and link its installed cache to this checkout."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time


def run(args):
    return subprocess.run([str(arg) for arg in args], check=True, text=True,
                          stdout=subprocess.PIPE).stdout


def linked_files_match(cache, plugin):
    if not cache.is_dir() or cache.is_symlink():
        return False
    sources = {p.name for p in plugin.iterdir()}
    installed = {p.name for p in cache.iterdir()}
    return sources == installed and all(
        ((cache / p / 'plugin.json').is_file() and not (cache / p).is_symlink() and
         (cache / p / 'plugin.json').read_bytes() == (plugin / p / 'plugin.json').read_bytes())
        if p == '.codex-plugin' else
        ((cache / p).is_symlink() and (cache / p).resolve() == plugin / p)
        for p in sources)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--codex', help='Codex CLI executable')
    parser.add_argument('--marketplace-name', help='Name for a new personal catalog when personal is already taken')
    parser.add_argument('--helpers', type=Path, default=Path.home() / '.codex/skills/.system/plugin-creator/scripts')
    args = parser.parse_args()
    repo = Path(__file__).resolve().parent.parent
    plugin = repo / 'showcase-ready'
    manifest = json.loads((plugin / '.codex-plugin/plugin.json').read_text())
    codex = args.codex or shutil.which('codex')
    if not codex:
        for candidate in ['/Applications/Codex.app/Contents/Resources/codex',
                          '/Applications/ChatGPT.app/Contents/Resources/codex']:
            if Path(candidate).is_file():
                codex = candidate
                break
    if not codex:
        parser.error('Codex CLI not found; use --codex /absolute/path/to/codex')
    helpers = args.helpers.expanduser()
    scaffold = helpers / 'create_basic_plugin.py'
    if not scaffold.is_file():
        parser.error('plugin-creator helpers missing; supply --helpers /path/to/scripts')
    marketplace = Path.home() / '.agents/plugins/marketplace.json'
    source = Path.home() / 'plugins/showcase-ready'
    if source.exists() or source.is_symlink():
        if not source.is_symlink() or source.resolve() != plugin:
            parser.error(f'{source} is not linked to this checkout; move it explicitly before installing')
    entries = []
    if marketplace.exists():
        market_name = run(['python3', helpers / 'read_marketplace_name.py']).strip()
        if args.marketplace_name and args.marketplace_name != market_name:
            parser.error('Cannot rename an existing marketplace; omit --marketplace-name')
        entries = json.loads(marketplace.read_text()).get('plugins', [])
    else:
        market_name = 'personal'
    existing = next((p for p in entries if p.get('name') == 'showcase-ready'), None)
    if existing and existing.get('source') != {'source': 'local', 'path': './plugins/showcase-ready'}:
        parser.error('Existing marketplace entry points elsewhere; refusing to redirect it')
    if not existing:
        # The official scaffold creates the marketplace entry; its temporary stub is discarded.
        with tempfile.TemporaryDirectory(prefix='showcase-ready-registration-') as staging:
            command = ['python3', scaffold, 'showcase-ready', '--path', staging, '--with-marketplace']
            if args.marketplace_name:
                command.extend(['--marketplace-name', args.marketplace_name])
            run(command)
        market_name = run(['python3', helpers / 'read_marketplace_name.py']).strip()
    source.parent.mkdir(parents=True, exist_ok=True)
    if not source.is_symlink():
        source.symlink_to(plugin, target_is_directory=True)
    codex_dir = Path(os.environ.get('CODEX_HOME', str(Path.home() / '.codex'))).expanduser()
    cache = codex_dir / 'plugins/cache' / market_name / 'showcase-ready' / manifest['version']
    selector = f'showcase-ready@{market_name}'
    installed = json.loads(run([codex, 'plugin', 'list', '--json'])).get('installed', [])
    active = next((p for p in installed if p.get('pluginId') == selector and
                   p.get('version') == manifest['version'] and p.get('enabled')), None)
    if not (active and linked_files_match(cache, plugin)):
        result = json.loads(run([codex, 'plugin', 'add', selector, '--json']))
        cache = Path(result['installedPath'])
        expected_parent = codex_dir / 'plugins/cache' / market_name / 'showcase-ready'
        if cache.parent.resolve() != expected_parent.resolve() or cache.name != manifest['version']:
            raise RuntimeError(f'Unexpected Codex cache path: {cache}; no cache changes made')
        backup = codex_dir / 'plugin-development-backups' / f'showcase-ready-{time.time_ns()}'
        backup.parent.mkdir(parents=True, exist_ok=True)
        cache.rename(backup)
        cache.mkdir()
        # Keep the version directory real. Codex follows the skills root symlink,
        # but skips symlinked SKILL.md files during recursive discovery.
        for path in sorted(plugin.iterdir()):
            if path.name == '.codex-plugin':
                shutil.copytree(path, cache / path.name)
            else:
                (cache / path.name).symlink_to(path, target_is_directory=path.is_dir())
        print(f'Cached copy preserved at {backup}')
    # Avoid duplicate discovery of the legacy installation, only if it is our exact symlink.
    legacy = codex_dir / 'skills/tpir-prep-assistant'
    if legacy.is_symlink() and legacy.resolve() == (plugin / 'skills/tpir-prep-assistant').resolve():
        backup = codex_dir / 'plugin-development-backups' / f'legacy-tpir-skill-{time.time_ns()}'
        backup.parent.mkdir(parents=True, exist_ok=True)
        legacy.rename(backup)
        print(f'Legacy skill symlink preserved at {backup}')
    for skill in ['tpir-prep-assistant', 'tpir-game-practice', 'showcase-ready-web']:
        if not (cache / 'skills' / skill / 'SKILL.md').is_file():
            raise RuntimeError(f'Installed skill missing: {skill}')
    print(f'Installed {selector} {manifest["version"]}')
    print(f'Source: {source} -> {source.resolve()}')
    if not linked_files_match(cache, plugin):
        raise RuntimeError('Installed files are not fully linked to the source')
    visible = json.loads(run([codex, 'plugin', 'list', '--json'])).get('installed', [])
    if not any(p.get('pluginId') == selector and p.get('enabled') for p in visible):
        raise RuntimeError('Codex does not list the plugin as enabled')
    print(f'Installed components linked to source under: {cache}')
    print('Start a new Codex task to load the plugin skills. Rerun after version changes or reinstalling.')


if __name__ == '__main__':
    main()
