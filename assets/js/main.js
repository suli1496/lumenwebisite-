/* ============================================================
   main.js — kleine interacties
   1) mobiel menu openen/sluiten
   2) de grote hero-lichtbundel volgt de muis (vloeiend, variant B).
      Alleen de bundel (.lumen-beam) draait; de lensring
      (.lumen-lens-point) blijft altijd op zijn plaats. De kleine
      logo's in nav en footer bewegen NIET mee.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  initHeroBeam();
});

function initHeroBeam() {
  var beam = document.querySelector(".hero .lumen-beam");
  if (!beam) return;

  var svg = beam.closest("svg");
  var pivot = svg ? svg.querySelector(".lumen-lens-point") : null;
  if (!pivot) return;

  // Respecteer de systeeminstelling "verminderde beweging"
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var lens = (beam.getAttribute("data-lens") || "0,0").split(",").map(Number);
  var lensX = lens[0], lensY = lens[1];
  var current = 0, target = 0;

  window.addEventListener("mousemove", function (e) {
    var r = pivot.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    target = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI - 90;
  });

  var EASE = 0.09; // vloeiende vertraging — de bundel "zweeft" achter de muis aan
  (function tick() {
    current += (target - current) * EASE;
    beam.setAttribute("transform", "rotate(" + current.toFixed(2) + " " + lensX + " " + lensY + ")");
    requestAnimationFrame(tick);
  })();
}
