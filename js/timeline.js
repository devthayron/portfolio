/* Trajetória: linha e etapas acompanham a rolagem */
(function () {
  const w = document.querySelector(".tlw");
  if (!w || reduce) return;
  const items = [...w.querySelectorAll(".st")];
  let raf;
  document.documentElement.classList.add("js");
  const upd = () => {
    raf = 0;
    const r = w.getBoundingClientRect(),
      y = innerHeight * 0.6;
    w.style.setProperty(
      "--p",
      Math.min(1, Math.max(0, (y - r.top) / r.height)),
    );
    items.forEach((it) =>
      it.classList.toggle("on", it.getBoundingClientRect().top < y),
    );
  };
  const tick = () => {
    if (!raf) raf = requestAnimationFrame(upd);
  };
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  upd();
})();
