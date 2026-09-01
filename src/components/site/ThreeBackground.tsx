import { useEffect, useRef } from "react";
import * as THREE from "three";

function readColors() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    foreground: new THREE.Color(isDark ? "#e7e2da" : "#3f3a33"),
    muted: new THREE.Color(isDark ? "#6f6a62" : "#a39a8e"),
    accent: new THREE.Color(isDark ? "#fbbf24" : "#b45309"),
  };
}

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    let colors = readColors();

    // ---- Starfield (points) ----
    const pointCount = 520;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const r = 9 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const pointsMat = new THREE.PointsMaterial({
      color: colors.muted,
      size: 0.055,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // ---- Central wireframe icosahedron ----
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: colors.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 0, -1.5);
    scene.add(core);

    // ---- Outer thin wireframe dodecahedron ----
    const outerGeo = new THREE.DodecahedronGeometry(4.2, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: colors.foreground,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    outer.position.set(0, 0, -3);
    scene.add(outer);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onThemeChange = () => {
      colors = readColors();
      pointsMat.color.copy(colors.muted);
      coreMat.color.copy(colors.accent);
      outerMat.color.copy(colors.foreground);
    };
    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.02;
      points.rotation.x = Math.sin(t * 0.05) * 0.08;
      core.rotation.x = t * 0.12;
      core.rotation.y = t * 0.18;
      outer.rotation.y = -t * 0.05;
      outer.rotation.z = t * 0.03;
      if (!prefersReduced) {
        camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 0.7 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    if (prefersReduced) {
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      pointsGeo.dispose();
      pointsMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
