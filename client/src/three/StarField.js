/**
 * StarField.js — Lightweight circular starfield
 * Uses shader rendering for perfectly round stars
 */

import * as THREE from 'three';

export default class StarField {
    constructor(container, options = {}) {
        this.container = container;
        this.count = options.count || 300;
        this.depth = options.depth || 10;
        this.speed = options.speed || 0.05;
        this.frameId = null;

        this.init();
        this.animate();

        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    init() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // allow pointer events to pass through
        this.renderer.domElement.style.pointerEvents = 'none';

        this.container.appendChild(this.renderer.domElement);

        // ⭐ star positions
        const positions = new Float32Array(this.count * 3);

        for (let i = 0; i < this.count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * this.depth;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        // ⭐ Shader for perfectly round stars
        const material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                color: { value: new THREE.Color(0xE7E2DE) },
                opacity: { value: 0.9 }
            },
            vertexShader: `
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = 4.5 * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float opacity;
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    
                    // discard square corners
                    if (dist > 0.5) discard;

                    // soft glow falloff
                    float glow = 1.0 - smoothstep(0.0, 0.5, dist);

                    gl_FragColor = vec4(color, glow * opacity);
                }
            `
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.frameId = requestAnimationFrame(this.animate.bind(this));

        if (this.points) {
            this.points.rotation.y += this.speed * 0.01;
            this.points.rotation.x += this.speed * 0.003;
        }

        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        if (this.frameId) cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);

        this.scene.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
        });

        this.renderer.dispose();

        if (
            this.renderer.domElement &&
            this.container.contains(this.renderer.domElement)
        ) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}