// Runs before the page paints so a saved dark theme never flashes white.
(function () {
  var saved = localStorage.getItem("vueuse-color-scheme") || "auto";
  var dark = saved === "auto" ? matchMedia("(prefers-color-scheme: dark)").matches : saved === "dark";
  document.documentElement.classList.add(dark ? "dark" : "light");
})();
