// Runs before the page paints so the saved theme never flashes the wrong colours.
// Ink (dark) is the default, only a visitor who picks Paper gets the light theme.
(function () {
  var light = localStorage.getItem("vueuse-color-scheme") === "light";
  document.documentElement.classList.add(light ? "light" : "dark");
})();
