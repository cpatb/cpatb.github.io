/* Suspension — a quiet 2-D dense-suspension sketch behind the home hero.
 *
 * Polydisperse particles drift Brownian-slow through a weak background
 * flow. Move the cursor gently and the suspension yields around it; move
 * it fast and nearby particles briefly jam — a nod to shear thickening.
 * Decorative only: pointer-events are off, and with prefers-reduced-motion
 * a single static frame is drawn instead.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('suspension');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DPR_CAP = 2;
  var N_DESKTOP = 110;
  var N_MOBILE = 55;
  var DRIFT = 0.06;         // background flow, px/frame at 60fps
  var JITTER = 0.05;        // Brownian kick
  var CURSOR_R = 130;       // interaction radius, px
  var JAM_SPEED = 18;       // cursor px/frame above which the region jams
  var JAM_FRAMES = 34;      // how long a jammed particle holds

  var dpr, W, H, particles, mouse, raf;

  // Deterministic LCG so the static reduced-motion frame is stable.
  var seed = 92821;
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  function makeParticles() {
    var n = W < 700 ? N_MOBILE : N_DESKTOP;
    particles = [];
    for (var i = 0; i < n; i++) {
      var r = 1.4 + rand() * rand() * 4.2;         // polydisperse, small-biased
      var tracer = rand() < 0.07;                  // a few copper tracers
      particles.push({
        x: rand() * W,
        y: rand() * H,
        vx: 0,
        vy: 0,
        r: r,
        jam: 0,
        tracer: tracer,
        alpha: tracer ? 0.34 : 0.05 + rand() * 0.13
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeParticles();
    if (reduceMotion) draw();
  }

  var fade = 0; // JS-side entrance: ramps 0 -> 1 over ~80 frames

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (fade < 1) fade = Math.min(1, fade + 1 / 80);
    ctx.globalAlpha = reduceMotion ? 1 : fade;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var jammed = p.jam > 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      if (p.tracer) {
        ctx.fillStyle = 'rgba(217, 154, 91, ' + (jammed ? 0.55 : p.alpha) + ')';
      } else {
        ctx.fillStyle = 'rgba(236, 231, 223, ' + (jammed ? Math.min(p.alpha * 2.4, 0.4) : p.alpha) + ')';
      }
      ctx.fill();
    }
  }

  function step() {
    var mvx = 0, mvy = 0, mspeed = 0;
    if (mouse.active) {
      mvx = mouse.x - mouse.px;
      mvy = mouse.y - mouse.py;
      mspeed = Math.sqrt(mvx * mvx + mvy * mvy);
      mouse.px = mouse.x;
      mouse.py = mouse.y;
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      if (p.jam > 0) {
        p.jam--;
        continue; // jammed: hold position
      }

      if (mouse.active) {
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < CURSOR_R * CURSOR_R && d2 > 1) {
          if (mspeed > JAM_SPEED) {
            p.jam = JAM_FRAMES + ((i * 7) % 12); // stagger release
            continue;
          }
          var d = Math.sqrt(d2);
          var f = (1 - d / CURSOR_R) * 0.45;    // gentle yield
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }

      p.vx += (rand() - 0.5) * JITTER;
      p.vy += (rand() - 0.5) * JITTER;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx + DRIFT;
      p.y += p.vy + DRIFT * 0.25;

      if (p.x > W + 8) p.x = -8;
      if (p.x < -8) p.x = W + 8;
      if (p.y > H + 8) p.y = -8;
      if (p.y < -8) p.y = H + 8;
    }

    draw();
    raf = window.requestAnimationFrame(step);
  }

  mouse = { x: 0, y: 0, px: 0, py: 0, active: false };

  window.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var inside = x > -40 && x < W + 40 && y > -40 && y < H + 40;
    if (inside && !mouse.active) {
      mouse.px = x;
      mouse.py = y;
    }
    mouse.active = inside;
    mouse.x = x;
    mouse.y = y;
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (reduceMotion) return;
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
    } else {
      raf = window.requestAnimationFrame(step);
    }
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  resize();
  if (!reduceMotion) {
    raf = window.requestAnimationFrame(step);
  }
})();
