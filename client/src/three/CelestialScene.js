/**
 * CelestialScene.js — Randomised circumpolar star field
 * Stars at fully random radii and angles, grouped into speed tiers
 * (inner faster, outer slower). Overlapping radius ranges between tiers
 * mean no obvious bands — organic, natural-looking sky.
 * Each star: large glowing head + curved arc tail of varying length.
 * 7% accent-coloured, 93% blue-white.
 */
import * as THREE from 'three';

export default class CelestialScene {
  constructor(container) {
    this.container = container;
    this.width  = container.clientWidth;
    this.height = container.clientHeight;
    this.mouse  = { x: 0, y: 0 };
    this.scrollY = 0;
    this.frameId = null;

    this.init();
    this.createRevolvingStars();
    this.animate();

    window.addEventListener('resize',    this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll',    this.onScroll.bind(this));
  }

  /* ─────────────────────── renderer / scene ─────────────────────── */
  init() {
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
  }

  /* ─────────────────────── glow sprite texture ───────────────────── */
  _makeGlowTexture(size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx  = canvas.getContext('2d');
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0.00, 'rgba(255,255,255,1.0)');
    grad.addColorStop(0.08, 'rgba(255,255,255,0.97)');
    grad.addColorStop(0.22, 'rgba(190,220,255,0.65)');
    grad.addColorStop(0.50, 'rgba(120,170,255,0.18)');
    grad.addColorStop(1.00, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }

  /* ─────────────────────── main build ───────────────────────────── */
  createRevolvingStars() {
    this.starGroups = [];

    const accentColors = [
      // new THREE.Color(0xFFE033), // vivid yellow
      // new THREE.Color(0x33CCFF), // cyan-blue
      // new THREE.Color(0x55FF88), // mint green
      // new THREE.Color(0xFF5544), // warm red
      // new THREE.Color(0xCC77FF), // violet
      new THREE.Color(0xEFBF04)//gold
    ];

    const glowTex = this._makeGlowTexture(128);

    /*
     * Speed tiers with intentionally OVERLAPPING radius ranges.
     * Stars from adjacent tiers share the same radial region but spin
     * at different speeds → complex, non-ringy, organic motion.
     */
    const TIERS = [
      { rMin: 0.12, rMax: 0.75,  speed: 0.0095, count: 24  },  // very sparse core
      { rMin: 0.40, rMax: 1.60,  speed: 0.0072, count: 44  },
      { rMin: 0.90, rMax: 2.90,  speed: 0.0055, count: 90  },
      { rMin: 1.80, rMax: 4.30,  speed: 0.0042, count: 160 },
      { rMin: 3.00, rMax: 6.00,  speed: 0.0032, count: 240 },
      { rMin: 4.50, rMax: 8.00,  speed: 0.0025, count: 310 },
      { rMin: 6.50, rMax: 10.50, speed: 0.0018, count: 350 },
      { rMin: 9.00, rMax: 14.00, speed: 0.0013, count: 380 },
    ];
    // ≈ 1600 stars — sparse centre, dense outer ring → visually uniform

    const TRAIL_PTS = 12;

    TIERS.forEach(({ rMin, rMax, speed, count }) => {
      const group = new THREE.Group();

      for (let i = 0; i < count; i++) {
        /* Fully random position — no fixed ring spacing */
        const angle  = Math.random() * Math.PI * 2;
        // sqrt(random) biases placement toward the OUTER edge of each tier
        // so stars accumulate at larger radii, compensating for the larger
        // circumference and producing visually uniform density overall
        const radius = rMin + Math.sqrt(Math.random()) * (rMax - rMin);
        const z      = (Math.random() - 0.5) * 1.0;

        /* Variable tail length per star — shorter near centre, longer outside,
           plus individual randomness so nearby stars look different */
        const arcSpan = 0.16 + Math.random() * 0.32   // 0.16–0.48 rad base
                      + radius * 0.018;                // subtle radius bonus

        /* Colour */
        const isColored = Math.random() < 0.04;
        let color;
        if (isColored) {
          color = accentColors[Math.floor(Math.random() * accentColors.length)].clone();
        } else {
          const b = 0.72 + Math.random() * 0.28;
          color = new THREE.Color(b * 0.83, b * 0.91, 1.0);
        }

        /* Per-star brightness variation */
        const opacity = isColored
          ? 0.60 + Math.random() * 0.40
          : 0.28 + Math.random() * 0.58;

        /* ── Curved arc trail ──
           Head at `angle`, tail at `angle + arcSpan`.
           Pre-baked into the group geometry; stays correct as the group
           rotates because it is a rigid body. */
        const positions = new Float32Array(TRAIL_PTS * 3);
        const vColors   = new Float32Array(TRAIL_PTS * 3);

        for (let s = 0; s < TRAIL_PTS; s++) {
          const t = s / (TRAIL_PTS - 1);           // 0 = tail, 1 = head
          const a = angle + arcSpan * (1 - t);

          positions[s * 3]     = Math.cos(a) * radius;
          positions[s * 3 + 1] = Math.sin(a) * radius;
          positions[s * 3 + 2] = z;

          const fade = t * t;   // quadratic: near-black tail → bright head
          vColors[s * 3]     = color.r * fade;
          vColors[s * 3 + 1] = color.g * fade;
          vColors[s * 3 + 2] = color.b * fade;
        }

        const lineGeom = new THREE.BufferGeometry();
        lineGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        lineGeom.setAttribute('color',    new THREE.BufferAttribute(vColors,   3));

        group.add(new THREE.Line(lineGeom, new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent:  true,
          opacity,
          blending:     THREE.AdditiveBlending,
          depthWrite:   false,
        })));

        /* ── Glowing head dot ── */
        const hx = Math.cos(angle) * radius;
        const hy = Math.sin(angle) * radius;

        const dotGeom = new THREE.BufferGeometry();
        dotGeom.setAttribute('position', new THREE.BufferAttribute(
          new Float32Array([hx, hy, z + 0.01]), 3
        ));

        /* Size scales with radius so far-out stars aren't tiny;
           colored stars are notably larger and brighter */
        const dotSize = isColored
          ? 0.44 + radius * 0.024
          : 0.28 + radius * 0.016;

        group.add(new THREE.Points(dotGeom, new THREE.PointsMaterial({
          map:             glowTex,
          color,
          size:            dotSize,
          transparent:     true,
          opacity:         Math.min(1.0, opacity * 1.55),
          sizeAttenuation: true,
          blending:        THREE.AdditiveBlending,
          depthWrite:      false,
          alphaTest:       0.003,
        })));
      }

      group.userData.speed = speed;
      this.starGroups.push(group);
      this.scene.add(group);
    });

    /* ── Pole-star glow (focal anchor at centre) ── */
    this._addPoleGlow(glowTex);
  }

  _addPoleGlow(glowTex) {
    const pt = (x, y, z) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));
      return g;
    };

    // Wide soft halo
    this.scene.add(new THREE.Points(pt(0, 0, 0.2), new THREE.PointsMaterial({
      map: glowTex, color: new THREE.Color(0x6699FF),
      size: 2.8, transparent: true, opacity: 0.28,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // Mid glow
    this.scene.add(new THREE.Points(pt(0, 0, 0.3), new THREE.PointsMaterial({
      map: glowTex, color: new THREE.Color(0xAADDFF),
      size: 0.90, transparent: true, opacity: 0.75,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // Bright core
    this.scene.add(new THREE.Points(pt(0, 0, 0.4), new THREE.PointsMaterial({
      map: glowTex, color: new THREE.Color(0xEEF5FF),
      size: 0.32, transparent: true, opacity: 1.0,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })));
  }

  /* ─────────────────────── event handlers ───────────────────────── */
  onResize() {
    this.width  = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  onMouseMove(e) {
    this.mouse.x =  (e.clientX  / window.innerWidth)  * 2 - 1;
    this.mouse.y = -(e.clientY  / window.innerHeight)  * 2 + 1;
  }

  onScroll() { this.scrollY = window.scrollY; }

  /* ─────────────────────── animation loop ───────────────────────── */
  animate() {
    this.frameId = requestAnimationFrame(this.animate.bind(this));

    this.starGroups.forEach((group) => {
      group.rotation.z -= group.userData.speed;
      group.rotation.x  = this.mouse.y * 0.025;
      group.rotation.y  = this.mouse.x * 0.025;
    });

    this.renderer.render(this.scene, this.camera);
  }

  /* ─────────────────────── cleanup ──────────────────────────────── */
  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize',    this.onResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('scroll',    this.onScroll.bind(this));

    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    });
    this.renderer.dispose();
    if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
