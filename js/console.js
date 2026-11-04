/* Conteúdo do console. Links: "[texto](url)" */
const E = {
  "/about": [
    "{",
    '  "name": "Thayron Higlander",',
    '  "role": "Desenvolvedor Backend Python",',
    '  "company": "Grupo Claudino · atual"',
    "}",
  ],
  "/education": [
    "{",
    '  "degree": "Análise e Desenvolvimento de Sistemas",',
    '  "institution": "Estácio",',
    '  "status": "em andamento",',
    '  "expected_completion": "out. 2027"',
    "}",
  ],
  "/certificates": [
    "{",
    '  "ia": [',
    '    "[Agentes de IA com Python](https://portal.hashtagtreinamentos.com/certificate/verify/agenthay178574850601394ca15ca)",',
    '    "[APIs de IA](https://portal.hashtagtreinamentos.com/certificate/verify/apisthay1782388566204775d3069)"',
    "  ],",
    '  "python": [',
    '    "[Python Impressionador](https://portal.hashtagtreinamentos.com/certificate/verify/pyththay1780659101146a9fc074f)",',
    '    "[Algoritmos e Lógica](https://portal.hashtagtreinamentos.com/certificate/verify/algothay17806594255131f1275e8)",',
    '    "[Desenvolvimento Web com Python e Django](https://ude.my/UC-e52f5c29-19e3-428c-ba71-a276bd456185)"',
    "  ],",
    '  "ferramentas": [',
    '    "[Git e GitHub](https://portal.hashtagtreinamentos.com/certificate/verify/git-thay17806594116764883e177)"',
    "  ]",
    "}",
  ],
  "/contact": [
    "{",
    '  "email": "[devthayronhiglander@gmail.com](mailto:devthayronhiglander@gmail.com)",',
    '  "linkedin": "[linkedin.com/in/thayron-higlander](https://www.linkedin.com/in/thayron-higlander)",',
    '  "github": "[github.com/devthayron](https://github.com/devthayron)"',
    "}",
  ],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const color = (l) =>
  esc(l)
    .replace(
      /"\[([^\]]+)\]\(([^)]+)\)"/g,
      '"<a href="$2" rel="noopener">$1</a>"',
    )
    .replace(/^(\s*)"([a-z]+)":/, '$1<span class="k">"$2"</span>:')
    .replace(/: "([^"<]*)"/, ': <span class="s">"$1"</span>')
    .replace(/^(\s+)"([^"<][^"]*)"(,?)$/, '$1<span class="s">"$2"</span>$3');
const tabs = document.querySelector(".tabs"),
  out = $("out");
let timer;
function show(ep) {
  clearTimeout(timer);
  tabs
    .querySelectorAll("button")
    .forEach((b) => b.setAttribute("aria-selected", b.dataset.ep === ep));
  const lines = E[ep].map(color);
  out.innerHTML = "";
  out.scrollTop = 0;
  if (reduce) {
    out.innerHTML = lines.join("\n");
    return;
  }
  let i = 0;
  (function next() {
    if (i < lines.length) {
      out.innerHTML += (i ? "\n" : "") + lines[i++];
      timer = setTimeout(next, 45);
    }
  })();
}
Object.keys(E).forEach((ep) => {
  const b = document.createElement("button");
  b.type = "button";
  b.role = "tab";
  b.textContent = ep;
  b.dataset.ep = ep;
  b.onclick = () => show(ep);
  tabs.appendChild(b);
});
show("/about");
