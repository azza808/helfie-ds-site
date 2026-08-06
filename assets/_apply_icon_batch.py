import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "icons"
ROOT.mkdir(exist_ok=True)


def slug(name):
    s = name.strip().replace("'", "").replace("&", "and").replace("/", "-")
    s = re.sub(r"[^A-Za-z0-9._()-]+", "-", s)
    s = re.sub(r"[()]", "", s)
    return re.sub(r"-+", "-", s).strip("-") or "icon"


def main(path):
    data = json.loads(Path(path).read_text())
    m_path = ROOT / "manifest.json"
    m = json.loads(m_path.read_text()) if m_path.exists() else {"icons": {}, "total": 0}
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
        # Library typo: Ccmpleted-Fill is the success check fill used by Toast
        if name == "Ccmpleted-Fill":
            (ROOT / "Check-Fill.svg").write_text(svg2)
            m["icons"]["Check-Fill"] = "Check-Fill.svg"
        n += 1
    m["total"] = len(m["icons"])
    m_path.write_text(json.dumps(m, indent=2, sort_keys=True))
    js_path = ROOT.parent.parent / "js" / "icon-files.js"
    lines = ["window.HDS_ICON_FILES = {"]
    for k in sorted(m["icons"]):
        lines.append(f"  {json.dumps(k)}: {json.dumps(m['icons'][k])},")
    lines.append("};")
    js_path.write_text("\n".join(lines) + "\n")
    print(f"saved {n}; total {m['total']}")


if __name__ == "__main__":
    main(sys.argv[1])
