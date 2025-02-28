(function () {
  let theme = localStorage.getItem("vueuse-color-scheme") || "auto";
  if (theme === "auto") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.classList.add(theme);

  let styles = getComputedStyle(document.documentElement);
  let bgColor = styles.getPropertyValue("--background").trim();
  let textColor = styles.getPropertyValue("--foreground").trim();

  document.documentElement.style.backgroundColor = `hsl(${bgColor})`;
  document.documentElement.style.color = `hsl(${textColor})`;
})();
