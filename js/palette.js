const pal = $("pal"),
  pi = $("pi"),
  pl = $("pl");
const cmds = [
  ...Object.keys(E).map((ep) => ["Console " + ep, "ep:" + ep, "endpoint"]),
  ["Trajetória", "#trajetoria", "seção"],
  ["Projetos", "#projetos", "seção"],
  ["Contato", "#contato", "seção"],
  ["GitHub", "https://github.com/devthayron", "link"],
  ["LinkedIn", "https://www.linkedin.com/in/thayron-higlander", "link"],
  ["WhatsApp", "https://wa.me/5599988040698", "link"],
  ["Baixar currículo (PDF)", "assets/curriculo-thayron.pdf", "link"],
  ["Alternar tema", "theme", "ação"],
];
let sel = 0,
  list = cmds;
function draw() {
  pl.innerHTML = "";
  list.forEach((c, i) => {
    const li = document.createElement("li");
    li.role = "option";
    li.setAttribute("aria-selected", i === sel);
    li.innerHTML = c[0] + "<span>" + c[2] + "</span>";
    li.onclick = () => run(c);
    pl.appendChild(li);
  });
}
function run(c) {
  pal.close();
  const v = c[1];
  if (v === "theme") $("th").click();
  else if (v.startsWith("ep:")) {
    show(v.slice(3));
    location.hash = "#top";
  } else if (v[0] === "#") location.hash = v;
  else window.open(v, "_blank", "noopener");
}
function openPal() {
  pi.value = "";
  list = cmds;
  sel = 0;
  draw();
  pal.showModal();
  pi.focus();
}
const pk = $("pk");
if (pk) pk.onclick = openPal;
addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    pal.open ? pal.close() : openPal();
  }
});
pi.addEventListener("input", () => {
  list = cmds.filter((c) =>
    c[0].toLowerCase().includes(pi.value.toLowerCase()),
  );
  sel = 0;
  draw();
});
pi.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    sel = Math.min(sel + 1, list.length - 1);
    draw();
    e.preventDefault();
  }
  if (e.key === "ArrowUp") {
    sel = Math.max(sel - 1, 0);
    draw();
    e.preventDefault();
  }
  if (e.key === "Enter" && list[sel]) run(list[sel]);
});
pal.addEventListener("click", (e) => {
  if (e.target === pal) pal.close();
});
