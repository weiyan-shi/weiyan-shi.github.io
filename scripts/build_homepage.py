#!/usr/bin/env python3
"""Render the homepage before publishing so content does not require JavaScript."""
from datetime import date
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def build():
    template = (ROOT / "_templates/homepage.html").read_text()
    today = date.today()

    def component(match):
        return (ROOT / "components" / f"{match[1]}.html").read_text().strip()

    page = re.sub(r"<!-- component: ([a-z]+) -->", component, template)
    page = page.replace('<span id="last-updated"></span>',
                        f'<span id="last-updated">{today:%B %Y}.</span>')
    (ROOT / "index.html").write_text(page)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        '  <url><loc>https://weiyan-shi.github.io/</loc>'
        f'<lastmod>{today.isoformat()}</lastmod></url>\n'
        '</urlset>\n'
    )


if __name__ == "__main__":
    build()
