/* Tema com transição circular */
$("th").addEventListener("click", (e) => {
  const r = document.documentElement,
    n = r.dataset.theme === "dark" ? "light" : "dark";
  const set = () => {
    r.dataset.theme = n;
    try {
      localStorage.setItem("theme", n);
    } catch (x) {}
  };
  if (!document.startViewTransition || reduce) return set();
  r.style.setProperty("--x", e.clientX + "px");
  r.style.setProperty("--y", e.clientY + "px");
  document.startViewTransition(set);
});
