const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
$("y").textContent = new Date().getFullYear();

/* Foto: se assets/foto.jpg não existir, usa a imagem reserva */
document.querySelectorAll("img[data-fallback]").forEach(img => {
  const troca = () => { img.addEventListener("error", () => {}, { once: true }); img.src = img.dataset.fallback; img.removeAttribute("data-fallback"); };
  if (img.complete && !img.naturalWidth) troca(); else img.addEventListener("error", troca, { once: true });
});
