import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { CursorMode } from './CustomCursor';
import { RotateCw, Check, Layers } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface InteractiveProductViewerProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

type MaterialFinish = 'obsidian' | 'chrome' | 'titanium' | 'chalk';

export const InteractiveProductViewer: React.FC<InteractiveProductViewerProps> = ({
  product,
  onAddToCart,
  onSetCursorMode,
  lang,
  t,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [finish, setFinish] = useState<MaterialFinish>('obsidian');
  const [isExploded, setIsExploded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const jacketMeshRef = useRef<THREE.Mesh | null>(null);
  const liningMeshRef = useRef<THREE.Mesh | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  const productName = lang === 'fa' && product.nameFa ? product.nameFa : product.name;
  const productDesc = lang === 'fa' && product.descriptionFa ? product.descriptionFa : product.description;
  const productMat = lang === 'fa' && product.materialFa ? product.materialFa : product.material;
  const productEdition = lang === 'fa' && product.editionFa ? product.editionFa : product.edition;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Architectural Jacket 3D Form Construction
    const shellGeo = new THREE.CylinderGeometry(1.2, 1.45, 2.6, 32, 16, true);
    const pos = shellGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      let x = pos.getX(i);
      let z = pos.getZ(i);

      if (y > 0.6) {
        x *= 1.35;
        z *= 0.65;
      } else {
        x *= 0.95;
        z *= 0.85;
      }
      pos.setXYZ(i, x, y, z);
    }
    shellGeo.computeVertexNormals();

    const getMaterialForFinish = (f: MaterialFinish) => {
      switch (f) {
        case 'obsidian':
          return new THREE.MeshPhysicalMaterial({
            color: 0x121214,
            roughness: 0.65,
            metalness: 0.2,
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
            side: THREE.DoubleSide,
          });
        case 'chrome':
          return new THREE.MeshStandardMaterial({
            color: 0xe5e7eb,
            roughness: 0.1,
            metalness: 0.98,
            side: THREE.DoubleSide,
          });
        case 'titanium':
          return new THREE.MeshStandardMaterial({
            color: 0x4b5563,
            roughness: 0.35,
            metalness: 0.85,
            side: THREE.DoubleSide,
          });
        case 'chalk':
          return new THREE.MeshPhysicalMaterial({
            color: 0xebe8df,
            roughness: 0.75,
            metalness: 0.05,
            side: THREE.DoubleSide,
          });
      }
    };

    const shellMat = getMaterialForFinish(finish);
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    jacketMeshRef.current = shellMesh;
    group.add(shellMesh);

    const liningGeo = new THREE.CylinderGeometry(1.05, 1.3, 2.3, 24, 8, true);
    const liningMat = new THREE.MeshStandardMaterial({
      color: 0x222225,
      roughness: 0.2,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });
    const liningMesh = new THREE.Mesh(liningGeo, liningMat);
    liningMeshRef.current = liningMesh;
    group.add(liningMesh);

    const coreGeo = new THREE.TorusGeometry(1.1, 0.03, 16, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.rotation.x = Math.PI * 0.5;
    coreMesh.position.y = 0.6;
    coreMeshRef.current = coreMesh;
    group.add(coreMesh);

    const claspGeo = new THREE.BoxGeometry(0.12, 0.32, 0.06);
    const claspMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      metalness: 0.95,
      roughness: 0.1,
    });
    const claspMesh = new THREE.Mesh(claspGeo, claspMat);
    claspMesh.position.set(0, 0.25, 0.88);
    group.add(claspMesh);

    const key = new THREE.DirectionalLight(0xfff8f0, 2.5);
    key.position.set(3, 4, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xdbeafe, 3.2);
    rim.position.set(-3, -2, -3);
    scene.add(rim);

    const ambient = new THREE.AmbientLight(0x2a2a2e, 1.2);
    scene.add(ambient);

    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let rotX = 0;
    let rotY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevPointer.x;
        const dy = e.clientY - prevPointer.y;
        rotY += dx * 0.008;
        rotX += dy * 0.008;
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    currentMount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        group.rotation.y += 0.004;
      } else {
        group.rotation.y = rotY;
        group.rotation.x = rotX;
      }

      if (isExploded) {
        liningMesh.position.z = THREE.MathUtils.lerp(liningMesh.position.z, 0.45, 0.08);
        coreMesh.position.y = THREE.MathUtils.lerp(coreMesh.position.y, 1.1, 0.08);
      } else {
        liningMesh.position.z = THREE.MathUtils.lerp(liningMesh.position.z, 0, 0.08);
        coreMesh.position.y = THREE.MathUtils.lerp(coreMesh.position.y, 0.6, 0.08);
      }

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
      shellGeo.dispose();
      shellMat.dispose();
      liningGeo.dispose();
      liningMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      claspGeo.dispose();
      claspMat.dispose();
    };
  }, []);

  useEffect(() => {
    if (!jacketMeshRef.current) return;
    switch (finish) {
      case 'obsidian':
        jacketMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x121214,
          roughness: 0.65,
          metalness: 0.2,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
          side: THREE.DoubleSide,
        });
        break;
      case 'chrome':
        jacketMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0xe5e7eb,
          roughness: 0.1,
          metalness: 0.98,
          side: THREE.DoubleSide,
        });
        break;
      case 'titanium':
        jacketMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0x4b5563,
          roughness: 0.35,
          metalness: 0.85,
          side: THREE.DoubleSide,
        });
        break;
      case 'chalk':
        jacketMeshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0xebe8df,
          roughness: 0.75,
          metalness: 0.05,
          side: THREE.DoubleSide,
        });
        break;
    }
  }, [finish]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleResetOrientation = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
  };

  const finishList = [
    { id: 'obsidian' as const, label: t.interactive.finishes.obsidian },
    { id: 'chrome' as const, label: t.interactive.finishes.chrome },
    { id: 'titanium' as const, label: t.interactive.finishes.titanium },
    { id: 'chalk' as const, label: t.interactive.finishes.chalk },
  ];

  return (
    <section
      id="interactive-view"
      className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-2">
              {t.interactive.tag}
            </div>
            <h2 className="font-editorial-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F1EFE9]">
              {t.interactive.title}
            </h2>
          </div>
          <span className="text-xs font-mono tracking-widest text-[#737373] mt-2 sm:mt-0 uppercase">
            {t.interactive.badge}
          </span>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 3D Real-time Visualizer */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[600px] border border-white/10 bg-[#121214] overflow-hidden">
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onMouseEnter={() => onSetCursorMode('drag')}
              onMouseLeave={() => onSetCursorMode('default')}
            />

            {/* Top HUD Controls Overlay */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono tracking-widest pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[#F1EFE9]">
                {t.interactive.dragCue}
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all ${
                    isExploded
                      ? 'bg-[#F1EFE9] text-[#0A0A0A] border-white'
                      : 'bg-black/60 text-[#A3A3A3] border-white/10 hover:text-white'
                  }`}
                  title="Toggle Layer Separation"
                >
                  <Layers size={12} />
                  <span>{isExploded ? t.interactive.collapseLayers : t.interactive.explodeLayers}</span>
                </button>

                <button
                  onClick={handleResetOrientation}
                  className="p-1.5 bg-black/60 border border-white/10 text-[#A3A3A3] hover:text-white"
                  title="Reset Orientation"
                  aria-label="Reset 3D camera orientation"
                >
                  <RotateCw size={13} />
                </button>
              </div>
            </div>

            {/* Bottom Finish Switcher HUD */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap justify-between items-center bg-black/75 backdrop-blur-md border border-white/10 p-3 pointer-events-auto">
              <span className="text-[10px] font-mono tracking-widest text-[#A3A3A3] uppercase">
                {t.interactive.finishLabel}
              </span>
              <div className="flex items-center gap-2">
                {finishList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFinish(item.id)}
                    className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase transition-colors ${
                      finish === item.id
                        ? 'bg-[#F1EFE9] text-[#0A0A0A] font-semibold'
                        : 'text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#A3A3A3] uppercase mb-2">
                <span>{product.collection}</span>
                <span>·</span>
                <span>{productEdition}</span>
              </div>

              <h3 className="font-editorial-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F1EFE9] mb-3">
                {productName}
              </h3>

              <div className="text-2xl font-mono text-[#F1EFE9] tabular-nums font-light mb-6">
                {product.currency}{product.price}
              </div>

              <p className="font-sans text-sm text-[#A3A3A3] leading-relaxed mb-6">
                {productDesc}
              </p>

              <div className="border-t border-b border-white/10 py-4 mb-6">
                <div className="text-[11px] font-mono tracking-widest text-[#737373] uppercase mb-1">
                  {lang === 'fa' ? 'متریال و پارچه' : 'MATERIAL FABRICATION'}
                </div>
                <div className="text-xs font-mono tracking-wider text-[#F1EFE9]">
                  {productMat}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#A3A3A3] mb-3 uppercase">
                  <span>{t.interactive.selectSize}</span>
                  <span className="text-[10px] text-[#737373]">{t.interactive.sizeHint}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      onMouseEnter={() => onSetCursorMode('hover')}
                      onMouseLeave={() => onSetCursorMode('default')}
                      className={`h-11 min-w-[48px] px-3 border text-xs font-mono tracking-widest transition-all ${
                        selectedSize === size
                          ? 'border-[#F1EFE9] bg-[#F1EFE9] text-[#0A0A0A] font-bold'
                          : 'border-white/15 bg-transparent text-[#F1EFE9] hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working ADD TO BAG */}
              <button
                onClick={handleAdd}
                onMouseEnter={() => onSetCursorMode('hover')}
                onMouseLeave={() => onSetCursorMode('default')}
                className={`w-full py-4 px-6 text-xs font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F1EFE9] text-[#0A0A0A] hover:bg-white font-medium'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} />
                    <span>{t.interactive.addedToBag}</span>
                  </>
                ) : (
                  <>
                    <span>{t.interactive.addToBag}</span>
                    <span>—</span>
                    <span className="tabular-nums font-semibold">
                      {product.currency}{product.price}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Atelier Craftsmanship Highlights */}
            <div className="space-y-3 pt-6 border-t border-white/10 text-xs font-mono text-[#A3A3A3]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#F1EFE9]" />
                <span>{t.interactive.deliveryPerk1}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#F1EFE9]" />
                <span>{t.interactive.deliveryPerk2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
