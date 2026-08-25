"""Build apply_patch text for route-scoped EN copy maps from the approved DOCX.

The script is intentionally a generator: it prints a patch instead of writing files.
"""

from __future__ import annotations

import json
import math
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "site-visible-copy.json"
FORBIDDEN = re.compile(
    r"patent|kosgeb|tübitak|tubitak|teşvik|tesvik|hibe|marka tescil|"
    r"faydalı model|fikri mülkiyet|destek program",
    re.IGNORECASE,
)
REMOVED_ROUTES = {
    "/hizmetler/tubitak-kosgeb",
    "/rehber/tubitak-kosgeb-rehberi",
}


def paragraphs(docx_path: Path) -> list[tuple[str, str]]:
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    with zipfile.ZipFile(docx_path) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))

    result: list[tuple[str, str]] = []
    body = root.find("w:body", ns)
    if body is None:
        return result

    for element in body:
        if not element.tag.endswith("}p"):
            continue
        text = "".join(node.text or "" for node in element.findall(".//w:t", ns)).strip()
        if not text:
            continue
        style_node = element.find("./w:pPr/w:pStyle", ns)
        style = (
            style_node.get(f"{{{ns['w']}}}val")
            if style_node is not None
            else "Normal"
        )
        result.append((style or "Normal", text))
    return result


def features(value: str) -> dict[str, object]:
    return {
        "arrow": "→" in value or "←" in value,
        "upper": value.upper() == value and any(char.isalpha() for char in value),
        "digits": re.findall(r"\d+", value),
        "one_word": len(value.split()) == 1,
        "sentence": any(char in value for char in ".?!;"),
        "email": "@" in value,
        "slash": value == "/",
    }


def substitution_cost(left: str, right: str) -> float:
    if left.casefold() == right.casefold():
        return 0
    a, b = features(left), features(right)
    cost = 0.8 + abs(math.log((len(left) + 4) / (len(right) + 4))) * 0.35
    cost += 2.2 * (a["arrow"] != b["arrow"])
    cost += 1.2 * (a["upper"] != b["upper"])
    cost += 1.5 * (a["email"] != b["email"])
    cost += 1.5 * (a["slash"] != b["slash"])
    cost += 0.8 * (a["one_word"] != b["one_word"])
    cost += 0.6 * (a["sentence"] != b["sentence"])
    if a["digits"] and b["digits"]:
        cost += 0 if a["digits"] == b["digits"] else 1.5
    return cost


def align(left: list[str], right: list[str]) -> list[tuple[str, str]]:
    gap = 1.45
    rows, columns = len(left), len(right)
    scores = [[0.0] * (columns + 1) for _ in range(rows + 1)]
    backtrack: list[list[str | None]] = [[None] * (columns + 1) for _ in range(rows + 1)]

    for row in range(1, rows + 1):
        scores[row][0] = row * gap
        backtrack[row][0] = "up"
    for column in range(1, columns + 1):
        scores[0][column] = column * gap
        backtrack[0][column] = "left"

    for row in range(1, rows + 1):
        for column in range(1, columns + 1):
            options = [
                (
                    scores[row - 1][column - 1]
                    + substitution_cost(left[row - 1], right[column - 1]),
                    "diagonal",
                ),
                (scores[row - 1][column] + gap, "up"),
                (scores[row][column - 1] + gap, "left"),
            ]
            scores[row][column], backtrack[row][column] = min(options)

    pairs: list[tuple[str, str]] = []
    row, column = rows, columns
    while row or column:
        direction = backtrack[row][column]
        if direction == "diagonal":
            pairs.append((left[row - 1], right[column - 1]))
            row -= 1
            column -= 1
        elif direction == "up":
            pairs.append((left[row - 1], ""))
            row -= 1
        else:
            pairs.append(("", right[column - 1]))
            column -= 1
    pairs.reverse()
    return pairs


def page_filename(route: str) -> str:
    if route == "/":
        return "home.json"
    return route.strip("/").replace("/", "--") + ".json"


def clean_mapping(pairs: list[tuple[str, str]]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for source, target in pairs:
        if not source or not target or source == target:
            continue
        if FORBIDDEN.search(source) or FORBIDDEN.search(target):
            continue
        mapping[source] = target
    return mapping


def make_patch(docx_path: Path) -> str:
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
    items = paragraphs(docx_path)
    sections: dict[str, dict[str, object]] = {}

    for index, (style, text) in enumerate(items):
        if not text.startswith("URL: "):
            continue
        route = text[5:]
        title = next(
            (
                items[cursor][1]
                for cursor in range(index - 1, -1, -1)
                if items[cursor][0] in {"Balk1", "KonuBal"}
            ),
            "",
        )
        end = next(
            (
                cursor
                for cursor in range(index + 1, len(items))
                if items[cursor][0] == "Balk1"
            ),
            len(items),
        )
        sections[route] = {
            "title": title,
            "lines": [entry[1] for entry in items[index + 1 : end]],
        }

    common_header_en = [entry[1] for entry in items[5:13]]
    common_footer_en = [entry[1] for entry in items[14:43]]
    first_page = inventory[0]
    common = clean_mapping(
        list(zip(first_page["common"]["header"], common_header_en))
        + list(zip(first_page["common"]["footer"], common_footer_en))
    )

    files: dict[str, dict[str, object]] = {
        "public/locales/en/common.json": {"copy": common}
    }
    manifest: dict[str, str] = {}

    for page in inventory:
        route = page["path"]
        if route in REMOVED_ROUTES or route.startswith("/blog"):
            continue
        section = sections.get(route)
        if not section:
            continue

        tr_lines = page["lines"]
        en_lines = section["lines"]
        tr_footer = next((i for i, line in enumerate(tr_lines) if line == "takt"), len(tr_lines))
        en_footer = next((i for i, line in enumerate(en_lines) if line == "takt"), len(en_lines))
        pairs = align(tr_lines[:tr_footer], en_lines[:en_footer])
        if page.get("h1") and section["title"]:
            pairs.append((page["h1"], str(section["title"])))

        filename = page_filename(route)
        public_path = f"/locales/en/pages/{filename}"
        manifest[route] = public_path
        files[f"public/locales/en/pages/{filename}"] = {
            "route": route,
            "title": section["title"],
            "copy": clean_mapping(pairs),
        }

    files["public/locales/en/manifest.json"] = {"routes": manifest}

    patch = ["*** Begin Patch"]
    for relative_path, payload in files.items():
        content = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
        patch.append(f"*** Add File: {ROOT / relative_path}")
        patch.extend("+" + line for line in content.splitlines())
    patch.append("*** End Patch")
    return "\n".join(patch)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: build-en-copy-map.py <approved-copy.docx>")
    print(make_patch(Path(sys.argv[1]).resolve()))
