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

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".photo-strip .photo-zoom"));
  if (!buttons.length) return;

  function largest(srcset) {
    if (!srcset) return "";
    var bestUrl = "";
    var bestW = -1;
    srcset.split(",").forEach(function (part) {
      var bits = part.trim().split(/\s+/);
      if (!bits[0]) return;
      var w = bits[1] && /w$/.test(bits[1]) ? parseInt(bits[1], 10) || 0 : 0;
      if (w >= bestW) {
        bestW = w;
        bestUrl = bits[0];
      }
    });
    return bestUrl;
  }

  var photos = buttons.map(function (button) {
    var img = button.querySelector("img");
    var source = button.querySelector("source[type='image/webp']");
    var src = largest(source && source.getAttribute("srcset")) || largest(img.getAttribute("srcset")) || img.getAttribute("src");
    var alt = img.getAttribute("alt") || "";
    button.setAttribute("aria-label", alt ? "Enlarge photo: " + alt : "Enlarge photo");
    return { src: src, alt: alt };
  });

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Enlarged truck photo");
  dialog.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close photo">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    '</button>' +
    '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous photo">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>' +
    '<div class="lightbox-stage"><img class="lightbox-photo" alt=""></div>' +
    '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next photo">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>';
  document.body.appendChild(dialog);

  var photo = dialog.querySelector(".lightbox-photo");
  var index = 0;
  var trigger = null;
  var touchStart = null;

  function fit() {
    var nw = photo.naturalWidth;
    var nh = photo.naturalHeight;
    if (!nw || !nh) return;
    var maxW = window.innerWidth;
    var maxH = window.innerHeight * 0.88;
    var scale = Math.min(maxW / nw, maxH / nh);
    photo.style.width = Math.max(1, Math.round(nw * scale)) + "px";
    photo.style.height = Math.max(1, Math.round(nh * scale)) + "px";
  }

  function show(next) {
    var count = photos.length;
    index = (next + count) % count;
    var item = photos[index];
    photo.alt = item.alt;
    if (photo.getAttribute("src") !== item.src) photo.removeAttribute("src");
    photo.src = item.src;
    if (photo.complete) fit();
  }

  function open(i, opener) {
    trigger = opener || null;
    show(i);
    if (!dialog.open) {
      document.documentElement.classList.add("lightbox-open");
      dialog.showModal();
    }
  }

  buttons.forEach(function (button, i) {
    button.addEventListener("click", function () {
      open(i, button);
    });
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.querySelector(".lightbox-prev").addEventListener("click", function () {
    step(-1);
  });
  dialog.querySelector(".lightbox-next").addEventListener("click", function () {
    step(1);
  });

  function step(delta) {
    show(index + delta);
  }

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("cancel", function () {
    document.documentElement.classList.remove("lightbox-open");
  });

  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("lightbox-open");
    photo.removeAttribute("src");
    if (trigger) trigger.focus();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  });

  photo.addEventListener("load", fit);
  window.addEventListener("resize", function () {
    if (dialog.open) fit();
  });

  dialog.addEventListener("touchstart", function (event) {
    if (event.touches.length !== 1) {
      touchStart = null;
      return;
    }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });

  dialog.addEventListener("touchend", function (event) {
    if (!touchStart || !event.changedTouches.length) return;
    var end = event.changedTouches[0];
    var dx = end.clientX - touchStart.x;
    var dy = end.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  }, { passive: true });
})();
