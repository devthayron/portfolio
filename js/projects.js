/* Projetos: filtros por área e stack (com contagem) + busca + vitrine (1 projeto por vez) */
(function () {
  const list = $("plist"),
    cnt = $("cnt"),
    empty = $("empty"),
    q = $("q"),
    clear = $("fc");
  const projs = [...document.querySelectorAll("#stage .proj")];
  const G = {
    area: {
      box: $("fa"),
      all: "Todas",
      labels: ["Todas", "Web", "API", "Automação", "IA", "Dados"],
      btns: [],
    },
    stack: {
      box: $("fs"),
      all: "Todos",
      labels: ["Todos", "Python", "FastAPI", "Django", "SQL", "Power BI"],
      btns: [],
    },
  };
  const f = { area: G.area.all, stack: G.stack.all, q: "" };
  let cur = 0;

  const tabs = projs.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.role = "tab";
    b.id = "pt" + i;
    b.className = "pt" + (p.classList.contains("soon") ? " soon" : "");
    b.setAttribute("aria-controls", "pp" + i);
    p.id = "pp" + i;
    p.role = "tabpanel";
    p.setAttribute("aria-labelledby", b.id);
    const n = document.createElement("span");
    n.className = "n";
    n.setAttribute("aria-hidden", "true");
    const t = document.createElement("b");
    t.textContent = p.dataset.title;
    const c = document.createElement("small");
    c.textContent = p.dataset.cat;
    b.append(n, t, c);
    b.onclick = () => pick(i);
    list.appendChild(b);
    return b;
  });
  const shown = () => tabs.filter((b) => !b.hidden);

  /* um projeto passa nos filtros? "o" troca um filtro só para simular a contagem dos chips */
  const ok = (d, o = {}) => {
    const s = { ...f, ...o },
      t = s.q.trim().toLowerCase();
    return (
      (s.area === G.area.all || d.area.split("|").includes(s.area)) &&
      (s.stack === G.stack.all || d.stack.split("|").includes(s.stack)) &&
      (!t || (d.title + " " + d.cat).toLowerCase().includes(t))
    );
  };

  function pick(i, focus) {
    cur = i;
    empty.hidden = true;
    tabs.forEach((b, k) => {
      const on = k === i;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      projs[k].hidden = !on;
    });
    if (focus) tabs[i].focus();
    const b = tabs[i];
    if (list.scrollWidth > list.clientWidth)
      list.scrollTo({
        left: b.offsetLeft - (list.clientWidth - b.offsetWidth) / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    else if (list.scrollHeight > list.clientHeight)
      b.scrollIntoView({ block: "nearest" });
  }

  /* chips: marca o ativo, mostra quantos projetos cada um traria e desabilita os que dariam zero */
  function paint() {
    Object.entries(G).forEach(([key, g]) =>
      g.btns.forEach((b) => {
        const label = b.dataset.l,
          n = projs.filter((p) => ok(p.dataset, { [key]: label })).length;
        b.querySelector("em").textContent = n;
        b.setAttribute("aria-pressed", label === f[key]);
        b.setAttribute(
          "aria-label",
          label + ", " + n + (n === 1 ? " projeto" : " projetos"),
        );
        b.disabled = n === 0 && label !== f[key];
      }),
    );
    clear.hidden = !(
      f.area !== G.area.all ||
      f.stack !== G.stack.all ||
      f.q.trim()
    );
  }

  function apply() {
    tabs.forEach((b, k) => {
      b.hidden = !ok(projs[k].dataset);
    });
    paint();
    const v = shown(),
      real = v.filter((b) => !b.classList.contains("soon")).length,
      soon = v.length - real;
    cnt.textContent =
      real +
      (real === 1 ? " projeto" : " projetos") +
      (soon ? " · " + soon + " em breve" : "");
    if (!v.length) {
      projs.forEach((p) => (p.hidden = true));
      tabs.forEach((b) => b.setAttribute("aria-selected", "false"));
      empty.hidden = false;
      return;
    }
    pick(tabs[cur].hidden ? tabs.indexOf(v[0]) : cur);
  }

  Object.entries(G).forEach(([key, g]) =>
    g.labels.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.l = t;
      const s = document.createElement("span");
      s.textContent = t;
      const em = document.createElement("em");
      em.setAttribute("aria-hidden", "true");
      b.append(s, em);
      b.onclick = () => {
        f[key] = t;
        apply();
      };
      g.box.appendChild(b);
      g.btns.push(b);
    }),
  );
  clear.onclick = () => {
    f.area = G.area.all;
    f.stack = G.stack.all;
    f.q = "";
    q.value = "";
    apply();
  };
  q.addEventListener("input", () => {
    f.q = q.value;
    apply();
  });
  list.addEventListener("keydown", (e) => {
    const v = shown(),
      k = v.indexOf(document.activeElement);
    if (k < 0) return;
    const to = {
      ArrowDown: k + 1,
      ArrowRight: k + 1,
      ArrowUp: k - 1,
      ArrowLeft: k - 1,
      Home: 0,
      End: v.length - 1,
    }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    pick(tabs.indexOf(v[Math.max(0, Math.min(v.length - 1, to))]), true);
  });
  apply();
  /* links de demonstração ainda sem URL não pulam a página */
  document.addEventListener("click", (e) => {
    if (e.target.closest("a[data-todo]")) e.preventDefault();
  });
})();
