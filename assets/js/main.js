/* ============================================================
   main.js — interacties voor de homepage
   1) mobiel menu openen/sluiten
   2) dag/nacht-schakelaar (onthoudt de keuze)
   3a) DAG: de lichtbundel van de SVG-vuurtoren volgt de muis
   3b) NACHT: cinematische canvas-vuurtoren (volgt de muis, lichtdeeltjes)
   4) meetellende cijfers zodra ze in beeld komen
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* ---- 1. mobiel menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
  }

  /* ---- 2. dag/nacht-schakelaar ---- */
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme");
      if (!current) { // nog geen keuze: bepaal wat nu zichtbaar is
        current = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("lumen-theme", next); } catch (e) {}
      window.dispatchEvent(new CustomEvent("themechange"));
    });
  }

  /* ---- 3a. DAG: bundel van de SVG-vuurtoren volgt de muis ---- */
  initHeroBeam();
  /* ---- 3b. NACHT: cinematische canvas-scène ---- */
  initHeroScene();
  /* ---- 4. meetellende cijfers ---- */
  initCountUp();
});

/* ============================================================
   DAG-vuurtoren: de SVG-bundel draait mee met de muis.
   De lensring (.lumen-lens-point) blijft altijd op zijn plaats.
   ============================================================ */
function initHeroBeam() {
  var beam = document.querySelector(".hero-visual .lumen-beam");
  if (!beam) return;
  var svg = beam.closest("svg");
  var pivot = svg ? svg.querySelector(".lumen-lens-point") : null;
  if (!pivot) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var lens = (beam.getAttribute("data-lens") || "0,0").split(",").map(Number);
  var lensX = lens[0], lensY = lens[1], current = 0, target = 0;

  window.addEventListener("mousemove", function (e) {
    var r = pivot.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    target = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI - 90;
  });
  (function tick() {
    current += (target - current) * 0.09;
    beam.setAttribute("transform", "rotate(" + current.toFixed(2) + " " + lensX + " " + lensY + ")");
    requestAnimationFrame(tick);
  })();
}

/* ============================================================
   Cinematische vuurtoren op canvas (nachtmodus): toren rechts,
   bundel volgt de muis, lichtdeeltjes, pulserende beacon.
   Tekent in de kleuren van het actieve thema (--scene-*).
   ============================================================ */
function initHeroScene() {
  var c = document.getElementById("heroScene");
  if (!c) return;
  var x = c.getContext("2d");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W, H, DPR, particles = [], mouse = null, t = 0, col;

  function theme() {
    var s = getComputedStyle(document.documentElement);
    col = {
      top:    s.getPropertyValue("--scene-top").trim()    || "#eef0ef",
      bottom: s.getPropertyValue("--scene-bottom").trim() || "#F7F6F3",
      tower:  s.getPropertyValue("--scene-tower").trim()  || "#0e2a47",
      part:   s.getPropertyValue("--scene-particle").trim() || "14,42,71",
      beam:   parseFloat(s.getPropertyValue("--scene-beam-strong")) || 0.3
    };
  }
  window.addEventListener("themechange", theme);
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", theme);

  function size() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = c.clientWidth; H = c.clientHeight;
    c.width = W * DPR; c.height = H * DPR; x.setTransform(DPR, 0, 0, DPR, 0, 0);
    particles = [];
    var n = Math.min(70, Math.floor(W / 22));
    for (var i = 0; i < n; i++) particles.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + .4, s: Math.random() * .35 + .08, o: Math.random() * .5 + .2
    });
  }
  window.addEventListener("resize", size);

  // bron van het licht (de lantaarn) — rechts in beeld
  function src() { return { x: W * 0.72, y: H * 0.60 }; }

  c.closest(".hero").addEventListener("mousemove", function (e) {
    var r = c.getBoundingClientRect();
    mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  c.closest(".hero").addEventListener("mouseleave", function () { mouse = null; });

  function draw() {
    t += .016;
    var sky = x.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, col.top); sky.addColorStop(1, col.bottom);
    x.fillStyle = sky; x.fillRect(0, 0, W, H);

    var s = src();
    var ang;
    if (mouse) ang = Math.atan2(mouse.y - s.y, mouse.x - s.x);
    else ang = -Math.PI / 2 + Math.sin(t * .35) * .5;

    // lichtbundel (kegel rood -> zilver)
    var spread = 0.24, len = Math.hypot(W, H) * 1.1;
    var g = x.createLinearGradient(s.x, s.y, s.x + Math.cos(ang) * len, s.y + Math.sin(ang) * len);
    g.addColorStop(0, "rgba(192,57,43," + col.beam + ")");
    g.addColorStop(0.4, "rgba(155,80,70," + (col.beam * 0.4) + ")");
    g.addColorStop(0.75, "rgba(185,188,190," + (col.beam * 0.25) + ")");
    g.addColorStop(1, "rgba(199,202,204,0)");
    x.beginPath(); x.moveTo(s.x, s.y);
    x.lineTo(s.x + Math.cos(ang - spread) * len, s.y + Math.sin(ang - spread) * len);
    x.lineTo(s.x + Math.cos(ang + spread) * len, s.y + Math.sin(ang + spread) * len);
    x.closePath(); x.fillStyle = g; x.fill();

    // lichtdeeltjes
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]; p.y -= p.s; if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      var pa = Math.atan2(p.y - s.y, p.x - s.x);
      var d = Math.abs(((pa - ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      var lit = Math.max(0, 1 - d / spread);
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7);
      x.fillStyle = "rgba(" + col.part + "," + (p.o * .18 + lit * .5) + ")"; x.fill();
    }

    // vuurtoren-silhouet
    x.save(); x.translate(s.x, s.y); var k = Math.max(1, H / 560);
    x.scale(k, k);
    x.fillStyle = col.tower;
    x.fillRect(-40, 92, 80, 4);
    x.fillRect(-15, 62, 30, 32);
    x.fillRect(-11, 34, 22, 28);
    x.fillRect(-13, 24, 26, 10);
    var lg = x.createRadialGradient(0, 8, 0, 0, 8, 22);
    lg.addColorStop(0, "rgba(232,180,160,.9)"); lg.addColorStop(1, "rgba(232,180,160,0)");
    x.fillStyle = lg; x.beginPath(); x.arc(0, 8, 22, 0, 7); x.fill();
    x.fillStyle = col.tower; x.beginPath(); x.arc(0, 8, 6.5, 0, 7); x.fill();
    x.strokeStyle = "#b9bcbe"; x.lineWidth = 2; x.beginPath(); x.arc(0, 8, 6.5, 0, 7); x.stroke();
    x.fillStyle = col.tower; x.beginPath();
    x.moveTo(-17, 0); x.quadraticCurveTo(0, -18, 17, 0); x.closePath(); x.fill();
    var pulse = .6 + Math.sin(t * 3) * .4;
    x.beginPath(); x.arc(0, -8, 3.4 + pulse * 5, 0, 7);
    x.fillStyle = "rgba(192,57,43," + (0.22 * pulse) + ")"; x.fill();
    x.beginPath(); x.arc(0, -8, 3.2, 0, 7); x.fillStyle = "#ff5540"; x.fill();
    x.restore();

    if (!reduce) requestAnimationFrame(draw);
  }

  theme(); size();
  if (reduce) { draw(); } else { requestAnimationFrame(draw); }
}

/* ============================================================
   Meetellende cijfers (tellen op zodra ze in beeld komen)
   ============================================================ */
function initCountUp() {
  var nums = document.querySelectorAll(".why-stat .num");
  if (!nums.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nums.forEach(function (el) { el.querySelector(".n").textContent = el.dataset.count; });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.count, span = el.querySelector(".n"), s = 0;
      var step = Math.max(1, Math.round(to / 40));
      var iv = setInterval(function () {
        s += step; if (s >= to) { s = to; clearInterval(iv); }
        span.textContent = s;
      }, 26);
      io.unobserve(el);
    });
  }, { threshold: .5 });
  nums.forEach(function (n) { io.observe(n); });
}
