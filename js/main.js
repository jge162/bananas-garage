(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var scrim = document.querySelector(".nav-scrim");
  if (!header || !toggle || !nav) return;

  var desktop = window.matchMedia("(min-width: 880px)");

  function setOpen(open) {
    if (desktop.matches) open = false;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (scrim) {
      if (open) scrim.removeAttribute("hidden");
      else scrim.setAttribute("hidden", "");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  if (scrim) {
    scrim.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!header.classList.contains("is-open")) return;
    if (header.contains(event.target) || (scrim && scrim.contains(event.target))) return;
    setOpen(false);
  });

  function onDesktopChange() {
    if (desktop.matches) setOpen(false);
  }
  if (desktop.addEventListener) desktop.addEventListener("change", onDesktopChange);
  else if (desktop.addListener) desktop.addListener(onDesktopChange);
})();

(function () {
  var root = document.querySelector(".photo-carousel");
  if (!root) return;
  var strip = root.querySelector(".photo-strip");
  var prev = root.querySelector(".carousel-prev");
  var next = root.querySelector(".carousel-next");
  if (!strip || !prev || !next) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function stepSize() {
    var fig = strip.querySelector("figure");
    if (!fig) return strip.clientWidth;
    var styles = window.getComputedStyle(strip);
    var gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return fig.getBoundingClientRect().width + gap;
  }

  function update() {
    var max = strip.scrollWidth - strip.clientWidth;
    prev.disabled = strip.scrollLeft <= 1;
    next.disabled = strip.scrollLeft >= max - 1;
  }

  function go(direction) {
    strip.scrollBy({
      left: direction * stepSize(),
      behavior: reduce ? "auto" : "smooth"
    });
  }

  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });
  strip.addEventListener("scroll", update, { passive: true });
  strip.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  });
  window.addEventListener("resize", update);
  update();
})();
