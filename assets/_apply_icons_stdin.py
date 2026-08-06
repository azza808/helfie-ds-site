#!/usr/bin/env python3
"""Read {"icons":[{"name","svg"}]} from stdin or file; write SVGs + refresh manifest/icon-files.js."""
import json, re, sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ROOT = SITE / "assets" / "icons"
ROOT.mkdir(exist_ok=True)
PROGRESS = ROOT / "_export_progress.json"

def slug(name):
    s = name.strip().replace("'", "").replace("&", "and").replace("/", "-")
    s = re.sub(r"[^A-Za-z0-9._()-]+", "-", s)
    s = re.sub(r"[()]", "", s)
    return re.sub(r"-+", "-", s).strip("-") or "icon"

raw = Path(sys.argv[1]).read_text() if len(sys.argv) > 1 else sys.stdin.read()
data = json.loads(raw)
m_path = ROOT / "manifest.json"
m = json.loads(m_path.read_text()) if m_path.exists() else {"icons": {}, "total": 0}
prog = json.loads(PROGRESS.read_text()) if PROGRESS.exists() else {"done": []}
done = set(prog.get("done", []))
n = 0
for item in data.get("icons", []):
    name, svg = item.get("name"), item.get("svg", "")
    if not name or "<svg" not in svg:
        print("skip", name)
        continue
    fn = slug(name) + ".svg"
    prefix = slug(name).replace("-", "_")
    svg2 = re.sub(r'id="(clip[^"]*)"', lambda mm: f'id="{prefix}_{mm.group(1)}"', svg)
    svg2 = re.sub(r"url\(#(clip[^)]*)\)", lambda mm: f"url(#{prefix}_{mm.group(1)})", svg2)
    (ROOT / fn).write_text(svg2)
    m["icons"][name] = fn
    if name == "Ccmpleted-Fill":
        (ROOT / "Check-Fill.svg").write_text(svg2)
        m["icons"]["Check-Fill"] = "Check-Fill.svg"
        done.add("Check-Fill")
    done.add(name)
    n += 1
m["total"] = len(m["icons"])
m_path.write_text(json.dumps(m, indent=2, sort_keys=True))
prog["done"] = sorted(done)
PROGRESS.write_text(json.dumps(prog, indent=2))
js_path = SITE / "js" / "icon-files.js"
lines = ["window.HDS_ICON_FILES = {"]
for k in sorted(m["icons"]):
    lines.append(f"  {json.dumps(k)}: {json.dumps(m['icons'][k])},")
lines.append("};")
js_path.write_text("\n".join(lines) + "\n")
# census
from collections import Counter
c = Counter()
for p in ROOT.glob("*.svg"):
    t = p.read_text()[:300]
    mm = re.search(r'viewBox="0 0 (\d+) (\d+)"', t)
    if mm:
        c[f"{mm.group(1)}x{mm.group(2)}"] += 1
print(f"saved {n}; done {len(done)}; census {dict(c)}")
