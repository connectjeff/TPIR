#!/usr/bin/env python3
"""Check package integrity and portability without requiring installed Codex helpers."""
import json
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
plugin = root / 'showcase-ready'
manifest = json.loads((plugin / '.codex-plugin/plugin.json').read_text())
assert manifest['name'] == plugin.name
assert manifest['version'].split('+')[0] == (root / 'VERSION').read_text().strip()
assert manifest['skills'] == './skills/'
expected = {'tpir-prep-assistant', 'tpir-game-practice', 'showcase-ready-web'}
assert {p.name for p in (plugin / 'skills').iterdir() if p.is_dir()} == expected
for name in expected:
    skill = plugin / 'skills' / name
    assert (skill / 'SKILL.md').is_file()
    assert (skill / 'agents/openai.yaml').is_file()
for name, target in [('webapp', plugin / 'webapp'),
                     ('tpir-prep-assistant', plugin / 'skills/tpir-prep-assistant')]:
    assert (root / name).is_symlink() and (root / name).resolve() == target
for name in ['LICENSE', 'NOTICE.md']:
    assert (root / name).read_bytes() == (plugin / name).read_bytes()
for path in plugin.rglob('*'):
    assert not path.is_symlink(), f'Plugin archive must be self-contained: {path}'
for path in plugin.rglob('*.md'):
    for link in re.findall(r'\]\(([^\s)]+)\)', path.read_text()):
        if '://' in link or link.startswith('#'):
            continue
        target = (path.parent / link.split('#')[0]).resolve()
        assert target.is_relative_to(plugin), f'External package link: {path}: {link}'
        assert target.exists(), f'Broken link: {path}: {link}'
print('Plugin package, skills, versions, rights copies, and local links passed.')
