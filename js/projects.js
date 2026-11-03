/* Projetos: filtros por área e stack + busca + vitrine (1 projeto por vez) */
(function () {
  const list = $("plist"), cnt = $("cnt"), empty = $("empty"), q = $("q");
  const projs = [...document.querySelectorAll("#stage .proj")];
  const f = { area: "Todas", stack: "Todos", q: "" };
  let cur = 0;
  const tabs = projs.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.role = "tab"; b.id = "pt" + i; b.className = "pt" + (p.classList.contains("soon") ? " soon" : "");
    b.setAttribute("aria-controls", "pp" + i); p.id = "pp" + i; p.role = "tabpanel"; p.setAttribute("aria-labelledby", b.id);
    const n = document.createElement("span"); n.className = "n"; n.setAttribute("aria-hidden", "true");
    const t = document.createElement("b"); t.textContent = p.dataset.title;
    const c = document.createElement("small"); c.textContent = p.dataset.cat;
    b.append(n, t, c); b.onclick = () => pick(i); list.appendChild(b); return b;
  });
  const shown = () => tabs.filter(b => !b.hidden);
  function pick(i, focus) {
    cur = i; empty.hidden = true;
    tabs.forEach((b, k) => { const on = k === i; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; projs[k].hidden = !on; });
    if (focus) tabs[i].focus();
    const b = tabs[i];
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: b.offsetLeft - (list.clientWidth - b.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    else if (list.scrollHeight > list.clientHeight) b.scrollIntoView({ block: "nearest" });
  }
  function apply() {
    const term = f.q.trim().toLowerCase();
    tabs.forEach((b, k) => {
      const d = projs[k].dataset;
      b.hidden = !((f.area === "Todas" || d.area.split("|").includes(f.area)) && (f.stack === "Todos" || d.stack.split("|").includes(f.stack)) && (!term || (d.title + " " + d.cat).toLowerCase().includes(term)));
    });
    const v = shown(), real = v.filter(b => !b.classList.contains("soon")).length, soon = v.length - real;
    cnt.textContent = real + (real === 1 ? " projeto" : " projetos") + (soon ? " · " + soon + " em breve" : "");
    if (!v.length) { projs.forEach(p => p.hidden = true); tabs.forEach(b => b.setAttribute("aria-selected", "false")); empty.hidden = false; return; }
    pick(tabs[cur].hidden ? tabs.indexOf(v[0]) : cur);
  }
  function chips(id, labels, key) {
    const box = $(id);
    labels.forEach((t, i) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.setAttribute("aria-pressed", i === 0);
      b.onclick = () => { box.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); f[key] = t; apply(); };
      box.appendChild(b);
    });
  }
  chips("fa", ["Todas", "Web", "API", "Automação", "IA", "Dados"], "area");
  chips("fs", ["Todos", "Python", "FastAPI", "Django", "SQL", "Power BI"], "stack");
  q.addEventListener("input", () => { f.q = q.value; apply(); });
  list.addEventListener("keydown", e => {
    const v = shown(), k = v.indexOf(document.activeElement); if (k < 0) return;
    const to = { ArrowDown: k + 1, ArrowRight: k + 1, ArrowUp: k - 1, ArrowLeft: k - 1, Home: 0, End: v.length - 1 }[e.key];
    if (to === undefined) return; e.preventDefault();
    pick(tabs.indexOf(v[Math.max(0, Math.min(v.length - 1, to))]), true);
  });
  apply();
  /* links de demonstração ainda sem URL não pulam a página */
  document.addEventListener("click", e => { if (e.target.closest("a[data-todo]")) e.preventDefault(); });
})();
