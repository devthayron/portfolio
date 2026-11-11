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
  "/contact": [
    "{",
    '  "email": "[thayronsantos8@gmail.com](mailto:thayronsantos8@gmail.com)",',
    '  "linkedin": "[linkedin.com/in/thayron-higlander](https://www.linkedin.com/in/thayron-higlander)",',
    '  "github": "[github.com/devthayron](https://github.com/devthayron)"',
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

const row = (l) => {
  const n = l.match(/^ */)[0].length + 2;
  return `<div style="padding-left:${n}ch;text-indent:-${n}ch">${color(l)}</div>`;
};

const phone = matchMedia("(max-width: 640px)");
const tabs = document.querySelector(".tabs"),
  out = $("out");
let timer;
function show(ep) {
  clearTimeout(timer);
  tabs
    .querySelectorAll("button")
    .forEach((b) => b.setAttribute("aria-selected", b.dataset.ep === ep));
  const rows = E[ep].map(row);
  out.innerHTML = "";
  out.scrollTop = 0;

  if (reduce || phone.matches) {
    out.innerHTML = rows.join("");
    return;
  }
  let i = 0;
  (function next() {
    if (i < rows.length) {
      out.innerHTML += rows[i++];
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
