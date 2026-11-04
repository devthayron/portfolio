import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

raiz = Path(__file__).parent
saida = raiz / "assets" / "curriculo-thayron.pdf"
saida.parent.mkdir(exist_ok=True)

with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page()
    pg.goto((raiz / "curriculo.html").resolve().as_uri())
    pg.pdf(
        path=str(saida), format="A4", print_background=True, prefer_css_page_size=True
    )
    nav.close()

paginas = len(re.findall(rb"/Type\s*/Page[^s]", saida.read_bytes()))
print(
    f"PDF gerado em {saida.relative_to(raiz)} ({paginas} página{'s' if paginas != 1 else ''})"
)
if paginas > 1:
    sys.exit(
        "ERRO: o currículo passou de 1 página. Reduza o conteúdo ou o espaçamento em css/curriculo.css."
    )
