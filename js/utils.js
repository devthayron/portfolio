const $ = (id) => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
$("y").textContent = new Date().getFullYear();

document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const troca = () => {
    img.src = img.dataset.fallback;
    img.removeAttribute("data-fallback");
  };
  if (img.complete && !img.naturalWidth) troca();
  else img.addEventListener("error", troca, { once: true });
});
