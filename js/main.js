(function () {
  var header = document.querySelector(".site-header");
  var button = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!header || !button || !nav) return;

  var label = button.querySelector(".nav-toggle-label");

  function setHeaderHeight() {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    if (label) label.textContent = open ? "Close" : "Menu";
  }

  setHeaderHeight();
  window.addEventListener("resize", function () {
    setHeaderHeight();
    if (window.matchMedia("(min-width: 840px)").matches) setOpen(false);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderHeight);
  }

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });
})();
