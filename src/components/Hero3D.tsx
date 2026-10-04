import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CursorMode } from './CustomCursor';
import { Language, TranslationData } from '../data/translations';

interface Hero3DProps {
  onSetCursorMode: (mode: CursorMode) => void;
  onExploreClick: () => void;
  lang: Language;
  t: TranslationData;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  onSetCursorMode,
  onExploreClick,
  lang,
  t,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.04);

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Fashion Editorial Camera (55mm–80mm focal length equivalent, 32° FOV for low distortion)
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    // Low camera angle looking slightly upward at the tall runway model
    camera.position.set(0, 0.6, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Root Group for the Mannequin Runway Installation
    const runwayGroup = new THREE.Group();
    // Center slightly to right/balanced for editorial typography integration
    runwayGroup.position.set(lang === 'fa' ? -0.8 : 0.8, -1.9, 0);
    scene.add(runwayGroup);

    // ==========================================
    // 1. PBR MATERIALS
    // ==========================================
    // Mannequin Body: Velvety Matte Obsidian Runway Mannequin Finish
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x141416,
      roughness: 0.52,
      metalness: 0.18,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      reflectivity: 0.45,
    });

    // ALBERSA Coat: Heavy Textured Architectural Virgin Wool
    const woolCoatMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.84,
      metalness: 0.08,
      flatShading: false,
    });

    // ALBERSA Lapel & Facings: Obsidian Satin Silk Contrast Trim
    const satinTrimMat = new THREE.MeshPhysicalMaterial({
      color: 0x101012,
      roughness: 0.28,
      metalness: 0.35,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
    });

    // ALBERSA Trousers: High-Twist Gabardine Tailoring
    const trouserMat = new THREE.MeshStandardMaterial({
      color: 0x121214,
      roughness: 0.72,
      metalness: 0.05,
    });

    // Footwear: Polished Architectural Calfskin
    const bootMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.3,
      metalness: 0.25,
    });

    // Hardware: Cold-Forged Brushed Titanium / Gunmetal
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.18,
      metalness: 0.95,
    });

    // Pedestal: Dark Polished Stone Runway Disc
    const stonePedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f12,
      roughness: 0.38,
      metalness: 0.4,
    });

    // ==========================================
    // 2. PROCEDURAL HIGH-FASHION MANNEQUIN BODY
    // ==========================================
    const mannequinBodyGroup = new THREE.Group();

    // Head: Minimalist faceless couture egg silhouette
    const headGeo = new THREE.SphereGeometry(0.24, 32, 32);
    headGeo.scale(0.82, 1.28, 0.95);
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.position.set(0, 3.42, 0);
    // Slight runway haughty tilt
    headMesh.rotation.x = -0.06;
    headMesh.rotation.y = 0.08;
    mannequinBodyGroup.add(headMesh);

    // Neck: Slender elongated high-fashion neck
    const neckGeo = new THREE.CylinderGeometry(0.095, 0.12, 0.42, 24);
    const neckMesh = new THREE.Mesh(neckGeo, bodyMat);
    neckMesh.position.set(0, 3.08, 0);
    mannequinBodyGroup.add(neckMesh);

    // Arms: Slender couture arms in graceful architectural pose
    // Left Arm (Relaxed alongside coat pocket line)
    const leftArmGroup = new THREE.Group();
    const upperArmGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.85, 16);
    const leftUpperArm = new THREE.Mesh(upperArmGeo, bodyMat);
    leftUpperArm.position.set(0, -0.42, 0);
    leftArmGroup.add(leftUpperArm);

    const forearmGeo = new THREE.CylinderGeometry(0.052, 0.045, 0.8, 16);
    const leftForearm = new THREE.Mesh(forearmGeo, bodyMat);
    leftForearm.position.set(0, -1.18, 0.04);
    leftForearm.rotation.x = 0.08;
    leftArmGroup.add(leftForearm);

    // Stylized faceless hand
    const handGeo = new THREE.BoxGeometry(0.045, 0.18, 0.08);
    const leftHand = new THREE.Mesh(handGeo, bodyMat);
    leftHand.position.set(0, -1.62, 0.06);
    leftArmGroup.add(leftHand);

    leftArmGroup.position.set(0.68, 2.75, 0);
    leftArmGroup.rotation.z = -0.12;
    mannequinBodyGroup.add(leftArmGroup);

    // Right Arm (Angled slightly forward in confident runway contrapposto)
    const rightArmGroup = new THREE.Group();
    const rightUpperArm = new THREE.Mesh(upperArmGeo, bodyMat);
    rightUpperArm.position.set(0, -0.42, 0);
    rightArmGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(forearmGeo, bodyMat);
    rightForearm.position.set(0, -1.15, 0.12);
    rightForearm.rotation.x = -0.16;
    rightArmGroup.add(rightForearm);

    const rightHand = new THREE.Mesh(handGeo, bodyMat);
    rightHand.position.set(0, -1.58, 0.18);
    rightHand.rotation.x = -0.16;
    rightArmGroup.add(rightHand);

    rightArmGroup.position.set(-0.68, 2.75, 0);
    rightArmGroup.rotation.z = 0.14;
    mannequinBodyGroup.add(rightArmGroup);

    // Runway Boots (Square-toe architectural couture footwear)
    const bootGeo = new THREE.BoxGeometry(0.22, 0.28, 0.52);
    const leftBoot = new THREE.Mesh(bootGeo, bootMat);
    leftBoot.position.set(0.24, 0.14, 0.12);
    leftBoot.rotation.y = -0.12;
    mannequinBodyGroup.add(leftBoot);

    const rightBoot = new THREE.Mesh(bootGeo, bootMat);
    rightBoot.position.set(-0.24, 0.14, -0.05);
    rightBoot.rotation.y = 0.18;
    mannequinBodyGroup.add(rightBoot);

    runwayGroup.add(mannequinBodyGroup);

    // ==========================================
    // 3. ALBERSA AVANT-GARDE RUNWAY OUTFIT
    // ==========================================
    const outfitGroup = new THREE.Group();

    // A. EXAGGERATED BOX SHOULDERS (Brutalist Architectural Roping)
    const shoulderPadGeo = new THREE.BoxGeometry(1.68, 0.18, 0.62);
    const shoulderPads = new THREE.Mesh(shoulderPadGeo, woolCoatMat);
    shoulderPads.position.set(0, 2.82, 0);
    outfitGroup.add(shoulderPads);

    // B. STRUCTURED COAT TORSO & ASYMMETRIC DRAPE MANTLE
    // Custom parametric curved mantle representing heavy architectural wool folds
    const coatBodyGeo = new THREE.CylinderGeometry(0.68, 0.98, 2.1, 32, 16, true);
    const coatPos = coatBodyGeo.attributes.position;
    for (let i = 0; i < coatPos.count; i++) {
      const y = coatPos.getY(i);
      let x = coatPos.getX(i);
      let z = coatPos.getZ(i);

      // Asymmetric architectural flare lower on left side
      if (y < 0) {
        x *= 1.25 + (x > 0 ? 0.2 : -0.05);
        z *= 1.2;
      }
      // Fabric fold modulation
      const fold = Math.sin(x * 4.0 + y * 2.5) * 0.05;
      coatPos.setXYZ(i, x + fold, y, z + fold * 0.6);
    }
    coatBodyGeo.computeVertexNormals();
    const coatBodyMesh = new THREE.Mesh(coatBodyGeo, woolCoatMat);
    coatBodyMesh.position.set(0, 1.85, 0);
    outfitGroup.add(coatBodyMesh);

    // C. SCULPTED ASYMMETRIC ORIGAMI LAPEL (Satin Trimmed)
    const lapelGeo = new THREE.BufferGeometry();
    const lapelVertices = new Float32Array([
      // Front asymmetric diagonal lapel plane
      -0.08, 2.92, 0.38,
       0.45, 2.78, 0.42,
       0.05, 1.95, 0.48,

       0.05, 1.95, 0.48,
       0.45, 2.78, 0.42,
       0.38, 1.45, 0.54,
    ]);
    lapelGeo.setAttribute('position', new THREE.BufferAttribute(lapelVertices, 3));
    lapelGeo.computeVertexNormals();
    const lapelMesh = new THREE.Mesh(lapelGeo, satinTrimMat);
    outfitGroup.add(lapelMesh);

    // D. HIGH-FASHION SLEEVES (Wide architectural cut)
    const sleeveGeo = new THREE.CylinderGeometry(0.18, 0.24, 1.5, 24);
    const leftSleeve = new THREE.Mesh(sleeveGeo, woolCoatMat);
    leftSleeve.position.set(0.68, 2.1, 0);
    leftSleeve.rotation.z = -0.14;
    outfitGroup.add(leftSleeve);

    const rightSleeve = new THREE.Mesh(sleeveGeo, woolCoatMat);
    rightSleeve.position.set(-0.68, 2.1, 0.02);
    rightSleeve.rotation.z = 0.16;
    outfitGroup.add(rightSleeve);

    // E. TITANIUM HARDWARE CLASP (Sternum Monolith Fastener)
    const claspGeo = new THREE.BoxGeometry(0.08, 0.34, 0.05);
    const claspMesh = new THREE.Mesh(claspGeo, titaniumMat);
    claspMesh.position.set(0.04, 2.15, 0.46);
    outfitGroup.add(claspMesh);

    // F. CANTILEVERED WELT POCKET DETAILS
    const pocketGeo = new THREE.BoxGeometry(0.38, 0.04, 0.12);
    const pocketMesh = new THREE.Mesh(pocketGeo, satinTrimMat);
    pocketMesh.position.set(0.48, 1.42, 0.42);
    pocketMesh.rotation.z = -0.12;
    outfitGroup.add(pocketMesh);

    // G. WIDE-LEG VOID TROUSERS (Deep architectural columns)
    const trouserLeftGeo = new THREE.CylinderGeometry(0.28, 0.38, 1.6, 24);
    const trouserLeft = new THREE.Mesh(trouserLeftGeo, trouserMat);
    trouserLeft.position.set(0.26, 0.88, 0.05);
    outfitGroup.add(trouserLeft);

    const trouserRightGeo = new THREE.CylinderGeometry(0.28, 0.38, 1.6, 24);
    const trouserRight = new THREE.Mesh(trouserRightGeo, trouserMat);
    trouserRight.position.set(-0.26, 0.88, -0.04);
    trouserRight.rotation.z = 0.03;
    outfitGroup.add(trouserRight);

    // Front Inverted Pleat Ridges
    const pleatGeo = new THREE.BoxGeometry(0.02, 1.5, 0.04);
    const leftPleat = new THREE.Mesh(pleatGeo, satinTrimMat);
    leftPleat.position.set(0.26, 0.88, 0.35);
    outfitGroup.add(leftPleat);

    const rightPleat = new THREE.Mesh(pleatGeo, satinTrimMat);
    rightPleat.position.set(-0.26, 0.88, 0.28);
    outfitGroup.add(rightPleat);

    runwayGroup.add(outfitGroup);

    // ==========================================
    // 4. RUNWAY PEDESTAL
    // ==========================================
    const pedestalGroup = new THREE.Group();
    // Circular stone stage
    const discGeo = new THREE.CylinderGeometry(1.65, 1.7, 0.16, 48);
    const discMesh = new THREE.Mesh(discGeo, stonePedestalMat);
    discMesh.position.set(0, 0.08, 0);
    pedestalGroup.add(discMesh);

    // Brushed titanium perimeter bevel ring
    const ringGeo = new THREE.TorusGeometry(1.68, 0.018, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeo, titaniumMat);
    ringMesh.rotation.x = Math.PI * 0.5;
    ringMesh.position.set(0, 0.15, 0);
    pedestalGroup.add(ringMesh);

    runwayGroup.add(pedestalGroup);

    // ==========================================
    // 5. DRAMATIC LUXURY STUDIO LIGHTING
    // ==========================================
    // Soft Frontal Key Light (directional, warm-tinted)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.9);
    keyLight.position.set(3.5, 4.2, 5.5);
    scene.add(keyLight);

    // Powerful Crisp Rim Light 1 (Back Left — razor-sharp contour separation)
    const rimLightLeft = new THREE.DirectionalLight(0xdbeafe, 4.5);
    rimLightLeft.position.set(-4.5, 3.2, -3.8);
    scene.add(rimLightLeft);

    // Rim Light 2 (Back Right — highlights coat silhouette & shoulder roping)
    const rimLightRight = new THREE.DirectionalLight(0xe2e8f0, 3.2);
    rimLightRight.position.set(4.2, 2.5, -4.0);
    scene.add(rimLightRight);

    // Overhead Sculptural Downlight (defines faceless head & shoulder pads)
    const topLight = new THREE.SpotLight(0xffffff, 2.8, 12, Math.PI * 0.35, 0.4);
    topLight.position.set(0, 7.5, 0.5);
    scene.add(topLight);

    // Ambient Studio Fill Light (keeps deep shadows legible without washout)
    const ambientLight = new THREE.AmbientLight(0x18181c, 1.4);
    scene.add(ambientLight);

    // Atmospheric Floating Studio Filaments (very subtle, capturing rim highlights)
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 6;
      dustPos[i + 1] = Math.random() * 5 - 1;
      dustPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x9ca3af,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ==========================================
    // 6. INTERACTION & PHYSICS (Drag & Parallax)
    // ==========================================
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let dragVelocity = 0;
    let currentRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
      dragVelocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      // Parallax mouse position
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevPointer.x;
        dragVelocity = deltaX * 0.006;
        currentRotationY += dragVelocity;
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    currentMount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 7. RENDER & IDLE ANIMATION LOOP
    // ==========================================
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia after release
      if (!isDragging) {
        dragVelocity *= 0.94; // Smooth heavy friction
        currentRotationY += dragVelocity;

        // Subtle 3–5° idle breathing rotation when resting
        const idleSway = Math.sin(elapsed * 0.45) * 0.045;
        runwayGroup.rotation.y = currentRotationY + idleSway;
      } else {
        runwayGroup.rotation.y = currentRotationY;
      }

      // Subtle breathing movement on the architectural coat chest
      const breath = Math.sin(elapsed * 1.4) * 0.012;
      coatBodyMesh.scale.set(1 + breath, 1 + breath * 0.5, 1 + breath);

      // Gentle parallax camera response to cursor
      const targetCamX = mouseX * 0.35;
      const targetCamY = 0.6 + mouseY * 0.2;
      camera.position.x += (targetCamX - camera.position.x) * 0.035;
      camera.position.y += (targetCamY - camera.position.y) * 0.035;
      camera.lookAt(runwayGroup.position.x, 0.4, 0);

      // Scroll synchronization: Camera moves closer and mannequin shifts into editorial transition
      const currentScroll = window.scrollY;
      const scrollFactor = Math.min(currentScroll / 750, 1.4);

      camera.position.z = 9.2 - scrollFactor * 1.5;
      runwayGroup.position.y = -1.9 + scrollFactor * 0.4;
      runwayGroup.rotation.y += scrollFactor * 0.003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      currentMount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyMat.dispose();
      woolCoatMat.dispose();
      satinTrimMat.dispose();
      trouserMat.dispose();
      bootMat.dispose();
      titaniumMat.dispose();
      stonePedestalMat.dispose();
      headGeo.dispose();
      neckGeo.dispose();
      upperArmGeo.dispose();
      forearmGeo.dispose();
      handGeo.dispose();
      bootGeo.dispose();
      shoulderPadGeo.dispose();
      coatBodyGeo.dispose();
      lapelGeo.dispose();
      sleeveGeo.dispose();
      claspGeo.dispose();
      pocketGeo.dispose();
      trouserLeftGeo.dispose();
      trouserRightGeo.dispose();
      pleatGeo.dispose();
      discGeo.dispose();
      ringGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [lang]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-between"
    >
      {/* BACKGROUND TYPOGRAPHY LAYER (Positioned BEHIND the 3D mannequin for true magazine depth) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-editorial-display font-extrabold text-[18vw] leading-none text-[#ffffff06] tracking-tight uppercase whitespace-nowrap">
          {lang === 'fa' ? 'آلبرسا' : 'ALBERSA'}
        </span>
      </div>

      {/* THREE.JS FULL-BODY 3D MANNEQUIN CANVAS */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-1"
        onMouseEnter={() => onSetCursorMode('drag')}
        onMouseLeave={() => onSetCursorMode('default')}
        aria-label="3D Interactive Fashion Runway Mannequin wearing ALBERSA Collection 026"
      />

      {/* Atmospheric Vignette & Subtle Film Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,10,0.85)_100%)] z-2" />

      {/* Top Editorial Floating Runway Captions */}
      <div className="absolute top-24 left-8 md:left-14 right-8 md:right-14 z-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 text-[11px] font-mono tracking-[0.2em] text-[#A3A3A3] uppercase">
          <span className="text-[#F1EFE9]">{t.hero.season}</span>
          <span>{t.hero.pweek}</span>
        </div>
        <div className={`text-[11px] font-mono tracking-[0.2em] text-[#A3A3A3] uppercase hidden sm:block ${lang === 'fa' ? 'text-left' : 'text-right'}`}>
          <span>COORDINATES: 48.8566° N / 2.3522° E</span>
          <br />
          <span className="text-[#F1EFE9]">{t.hero.atelier}</span>
        </div>
      </div>

      {/* Main Hero Editorial Typography & Interactivity Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 flex flex-col justify-between h-[74vh] pointer-events-none">
        <div />

        {/* Typographic Monument Composed Around Mannequin */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#A3A3A3] mb-4">
            <span className="w-8 h-[1px] bg-[#A3A3A3]" />
            <span>{t.hero.collectionTag}</span>
          </div>

          <h1 className="font-editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.03em] leading-[0.9] text-[#F1EFE9] mb-6">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
            <br />
            <span className="font-editorial-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F1EFE9] via-[#E2DFD2] to-[#A3A3A3]">
              {t.hero.titleLine3}
            </span>
          </h1>

          <p className="font-sans text-sm md:text-base text-[#A3A3A3] max-w-md leading-relaxed tracking-wide mb-8">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center gap-6 pointer-events-auto">
            <button
              onClick={onExploreClick}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className="group relative inline-flex items-center gap-4 px-7 py-3.5 bg-[#F1EFE9] text-[#0A0A0A] text-xs font-mono tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-2xl"
            >
              <span>{t.hero.exploreBtn}</span>
              <span className={`transition-transform duration-300 font-sans ${lang === 'fa' ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'}`}>
                {lang === 'fa' ? '←' : '→'}
              </span>
            </button>

            <a
              href="#interactive-view"
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#A3A3A3] hover:text-[#F1EFE9] transition-colors py-2"
            >
              <span>{t.hero.inspectBtn}</span>
            </a>
          </div>
        </div>

        {/* Bottom Runway Status & 360° Drag Cue */}
        <div className="flex justify-between items-end text-[10px] font-mono uppercase tracking-[0.2em] text-[#A3A3A3] border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">
              {lang === 'fa' ? 'مانکن سه‌بعدی آتلیه آلبرسا' : 'ALBERSA RUNWAY MANNEQUIN'}
            </span>
            <span className="text-[#F1EFE9]">
              {lang === 'fa' ? '[ درگ برای چرخش ۳۶۰ درجه ]' : '[ DRAG TO ROTATE / 360° ]'}
            </span>
          </div>

          <div className="flex items-center gap-2 animate-bounce">
            <span>{t.hero.scrollCue}</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
