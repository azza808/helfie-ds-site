#!/usr/bin/env python3
"""stdin: lines of name|url — curl each and apply via _apply_icons_stdin.py"""
import json, subprocess, sys
from pathlib import Path
SITE = Path(__file__).resolve().parent.parent
APPLY = SITE / "assets" / "_apply_icons_stdin.py"
icons = []
for line in sys.stdin:
    line = line.strip()
    if not line or "|" not in line:
        continue
    name, url = line.split("|", 1)
    p = Path(f"/tmp/hds-icon-{abs(hash(name))}.svg")
    subprocess.run(["curl", "-sL", "-o", str(p), url], check=False)
    svg = p.read_text(errors="replace") if p.exists() else ""
    if "<svg" in svg:
        icons.append({"name": name, "svg": svg})
        print("OK", name)
    else:
        print("FAIL", name, svg[:60].replace("\n", " "))
out = SITE / "assets" / "_batches" / "_last_wave.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps({"icons": icons}))
print("icons", len(icons))
subprocess.run([sys.executable, str(APPLY), str(out)], check=False)
