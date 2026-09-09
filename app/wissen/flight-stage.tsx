'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { FlightMode } from './knowledge-data';

// The existing transparent species artwork supplies the silhouette. A subdivided
// plane folds only the outer wings around the body's diagonal axis. This is an
// intentionally schematic movement study, not a biomechanical 3D reconstruction.
export default function FlightStage({
  mode,
  image,
  paused,
  name,
}: {
  mode: FlightMode;
  image: string;
  paused: boolean;
  name: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let dispose = () => {};
    async function init() {
      const THREE = await import('three');
      if (cancelled) return;
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      element!.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-5, 5, 3, -3, 0.1, 30);
      camera.position.z = 12;
      const geometry = new THREE.PlaneGeometry(3.7, 3.7, 60, 60);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          artwork: { value: null },
          flap: { value: 0 },
          ink: { value: new THREE.Color('#203e41') },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float flap;
          void main() {
            vUv = uv;
            vec3 p = position;
            vec2 axis = normalize(vec2(0.60, 0.80));
            float across = dot(p.xy - vec2(-0.10, -0.10), axis);
            float outer = sign(across) * max(abs(across) - 0.40, 0.0);
            float angle = flap * smoothstep(0.0, 0.32, abs(outer));
            p.xy += axis * outer * (cos(angle) - 1.0);
            p.z += abs(outer) * sin(angle);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }`,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D artwork;
          uniform vec3 ink;
          void main() {
            float a = texture2D(artwork, vUv).a;
            if (a < 0.08) discard;
            gl_FragColor = vec4(ink, a);
          }`,
      });
      const bird = new THREE.Mesh(geometry, material);
      scene.add(bird);
      const guideMaterial = new THREE.LineDashedMaterial({
        color: '#487878',
        transparent: true,
        opacity: 0.35,
        dashSize: 0.07,
        gapSize: 0.1,
      });
      const guide = new THREE.Line(new THREE.BufferGeometry(), guideMaterial);
      guide.position.z = -2;
      scene.add(guide);
      let halfWidth = 5;
      const resize = () => {
        const width = element!.clientWidth;
        const height = element!.clientHeight;
        if (!width || !height) return;
        halfWidth = (3 * width) / height;
        camera.left = -halfWidth;
        camera.right = halfWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        const points = [];
        for (let i = 0; i <= 160; i++) {
          const f = i / 160;
          if (mode === 'kreisen')
            points.push(
              new THREE.Vector3(
                Math.cos(f * Math.PI * 2) * Math.min(halfWidth - 1.2, 2.5),
                Math.sin(f * Math.PI * 2) * 1.3,
                0,
              ),
            );
          else if (mode === 'ruetteln')
            points.push(new THREE.Vector3(0, -0.9 - f * 1.2, 0));
          else
            points.push(
              new THREE.Vector3(
                (0.5 - f) * halfWidth * 2,
                mode === 'gleiten' ? 0.8 - f * 1.6 : 0,
                0,
              ),
            );
        }
        guide.geometry.dispose();
        guide.geometry = new THREE.BufferGeometry().setFromPoints(points);
        guide.computeLineDistances();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element!);
      resize();
      const theme = () => {
        material.uniforms.ink.value.set(
          getComputedStyle(element!).getPropertyValue('--foreground').trim() ||
            '#203e41',
        );
      };
      const mutation = new MutationObserver(theme);
      mutation.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      });
      theme();
      let visible = true;
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      intersection.observe(element!);
      let texture: InstanceType<typeof THREE.Texture> | undefined;
      let frame = 0;
      let time = mode === 'gleiten' || mode === 'schlagflug' ? 5.5 : 0;
      let last = performance.now();
      const contextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        setStatus('error');
      };
      renderer.domElement.addEventListener('webglcontextlost', contextLost);
      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        mutation.disconnect();
        intersection.disconnect();
        renderer.domElement.removeEventListener(
          'webglcontextlost',
          contextLost,
        );
        geometry.dispose();
        material.dispose();
        guide.geometry.dispose();
        guideMaterial.dispose();
        texture?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      try {
        texture = await new THREE.TextureLoader().loadAsync(image);
        if (cancelled) {
          texture.dispose();
          return;
        }
        material.uniforms.artwork.value = texture;
        setStatus('ready');
      } catch {
        if (!cancelled) {
          setStatus('error');
          dispose();
        }
        return;
      }
      function draw(now: number) {
        if (cancelled) return;
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!pausedRef.current && visible && !document.hidden) time += delta;
        if (visible && !document.hidden) {
          const cycle = (time / 11) % 1;
          if (mode === 'kreisen') {
            const angle = time * 0.48 + 0.4;
            const rx = Math.min(halfWidth - 1.2, 2.5);
            bird.position.set(Math.cos(angle) * rx, Math.sin(angle) * 1.3, 0);
            bird.rotation.set(
              0.18,
              Math.sin(angle) * 0.14,
              Math.atan2(Math.cos(angle) * 1.3, -Math.sin(angle) * rx) - 2.65,
            );
            bird.scale.setScalar(0.63);
            material.uniforms.flap.value = 0.12;
          } else if (mode === 'ruetteln') {
            bird.position.set(0, Math.sin(time * 3.2) * 0.025, 0);
            bird.rotation.set(-0.12, 0, -0.18);
            material.uniforms.flap.value = Math.sin(time * 9) * 1.12;
          } else {
            bird.position.set(
              (0.5 - cycle) * (halfWidth * 2 + 4),
              mode === 'gleiten' ? 0.8 - cycle * 1.6 : 0,
              0,
            );
            bird.rotation.z = mode === 'gleiten' ? 0.43 : 0.34;
            material.uniforms.flap.value =
              mode === 'schlagflug' ? Math.sin(time * 5) * 1.0 : 0.06;
          }
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(draw);
      }
      frame = requestAnimationFrame(draw);
    }
    init().catch(() => {
      if (!cancelled) {
        setStatus('error');
        dispose();
      }
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [image, mode]);

  return (
    // A canvas-backed illustration needs an explicit accessible image role.
    <div
      className="flight-stage"
      ref={host}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="img"
      aria-label={`${name}: ${mode === 'kreisen' ? 'kreisender Flug auf einer ovalen Bahn' : mode === 'gleiten' ? 'Gleitflug mit ruhigen Flügeln auf abwärts gerichteter Bahn' : mode === 'ruetteln' ? 'Rüttelflug mit bewegten Flügeln an derselben Stelle' : 'Vorwärtsflug mit wiederholten Flügelschlägen'}`}
    >
      {status !== 'ready' && (
        <div className="flight-fallback">
          <Image src={image} alt="" width={600} height={600} unoptimized />
          <output>
            {status === 'error'
              ? 'Animation hier nicht verfügbar. Die Flugweise ist rechts beschrieben.'
              : 'Flugstudie wird geladen …'}
          </output>
        </div>
      )}
    </div>
  );
}
