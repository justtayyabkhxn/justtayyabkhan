"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { KeyboardControls, useKeyboardControls } from "@react-three/drei";
import Link from "next/link";

// ─── Utility Functions ────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const hashString = (str: string): number => {
  let h = 0;
  for (let i = 0; i < str.length; i++)
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// ─── Constants ────────────────────────────────────────────────────────────────
const CHUNK_SIZE = 110;
const RENDER_DISTANCE = 2;
const CHUNK_FADE_MARGIN = 1;
const MAX_VELOCITY = 3.2;
const DEPTH_FADE_START = 140;
const DEPTH_FADE_END = 260;
const INVIS_THRESHOLD = 0.01;
const KEYBOARD_SPEED = 0.18;
const VELOCITY_LERP = 0.16;
const VELOCITY_DECAY = 0.9;
const INITIAL_CAMERA_Z = 50;
const MAX_PLANE_CACHE = 256;

type ChunkOffset = { dx: number; dy: number; dz: number; dist: number };

const CHUNK_OFFSETS: ChunkOffset[] = (() => {
  const maxDist = RENDER_DISTANCE + CHUNK_FADE_MARGIN;
  const offsets: ChunkOffset[] = [];
  for (let dx = -maxDist; dx <= maxDist; dx++) {
    for (let dy = -maxDist; dy <= maxDist; dy++) {
      for (let dz = -maxDist; dz <= maxDist; dz++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
        if (dist > maxDist) continue;
        offsets.push({ dx, dy, dz, dist });
      }
    }
  }
  return offsets;
})();

// ─── Types ────────────────────────────────────────────────────────────────────
type MediaItem = { url: string; width: number; height: number };
type PlaneData = {
  id: string;
  position: THREE.Vector3;
  scale: THREE.Vector3;
  mediaIndex: number;
};
type ChunkData = { key: string; cx: number; cy: number; cz: number };
type CameraGridState = { cx: number; cy: number; cz: number; camZ: number };

// ─── Texture Manager ──────────────────────────────────────────────────────────
const MAX_TEXTURE_CACHE = 40;
const textureCache = new Map<string, THREE.Texture>();
const loadCallbacks = new Map<string, Set<(tex: THREE.Texture) => void>>();
const loader = new THREE.TextureLoader();
const globalTextureLoadListeners = new Set<() => void>();

const touchTextureCache = (key: string) => {
  const v = textureCache.get(key);
  if (!v) return;
  textureCache.delete(key);
  textureCache.set(key, v);
};

const evictTextureCache = () => {
  while (textureCache.size > MAX_TEXTURE_CACHE) {
    const firstKey = textureCache.keys().next().value as string | undefined;
    if (!firstKey) break;
    textureCache.delete(firstKey);
  }
};

const isTextureLoaded = (tex: THREE.Texture): boolean => {
  const img = tex.image as HTMLImageElement | undefined;
  return (
    img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0
  );
};

const getTexture = (
  item: MediaItem,
  onLoad?: (texture: THREE.Texture) => void,
): THREE.Texture => {
  const key = item.url;
  const existing = textureCache.get(key);
  if (existing) {
    touchTextureCache(key);
    if (onLoad) {
      if (isTextureLoaded(existing)) onLoad(existing);
      else loadCallbacks.get(key)?.add(onLoad);
    }
    return existing;
  }
  const callbacks = new Set<(tex: THREE.Texture) => void>();
  if (onLoad) callbacks.add(onLoad);
  loadCallbacks.set(key, callbacks);
  const texture = loader.load(
    key,
    (tex) => {
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = 4;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      loadCallbacks.get(key)?.forEach((cb) => {
        try {
          cb(tex);
        } catch {}
      });
      loadCallbacks.delete(key);
      globalTextureLoadListeners.forEach((fn) => fn());
    },
    undefined,
    (err) => console.error("Texture load failed:", key, err),
  );
  textureCache.set(key, texture);
  evictTextureCache();
  return texture;
};

// ─── Plane Cache ──────────────────────────────────────────────────────────────
const planeCache = new Map<string, PlaneData[]>();

const touchPlaneCache = (key: string) => {
  const v = planeCache.get(key);
  if (!v) return;
  planeCache.delete(key);
  planeCache.set(key, v);
};

const evictPlaneCache = () => {
  while (planeCache.size > MAX_PLANE_CACHE) {
    const firstKey = planeCache.keys().next().value as string | undefined;
    if (!firstKey) break;
    planeCache.delete(firstKey);
  }
};

const generateChunkPlanes = (
  cx: number,
  cy: number,
  cz: number,
): PlaneData[] => {
  const planes: PlaneData[] = [];
  const seed = hashString(`${cx},${cy},${cz}`);
  for (let i = 0; i < 7; i++) {
    const s = seed + i * 1000;
    const r = (n: number) => seededRandom(s + n);
    const size = 12 + r(4) * 8;
    planes.push({
      id: `${cx}-${cy}-${cz}-${i}`,
      position: new THREE.Vector3(
        cx * CHUNK_SIZE + r(0) * CHUNK_SIZE,
        cy * CHUNK_SIZE + r(1) * CHUNK_SIZE,
        cz * CHUNK_SIZE + r(2) * CHUNK_SIZE,
      ),
      scale: new THREE.Vector3(size, size, 1),
      mediaIndex: Math.floor(r(5) * 1_000_000),
    });
  }
  return planes;
};

const generateChunkPlanesCached = (
  cx: number,
  cy: number,
  cz: number,
): PlaneData[] => {
  const key = `${cx},${cy},${cz}`;
  const cached = planeCache.get(key);
  if (cached) {
    touchPlaneCache(key);
    return cached;
  }
  const planes = generateChunkPlanes(cx, cy, cz);
  planeCache.set(key, planes);
  evictPlaneCache();
  return planes;
};

const getChunkUpdateThrottleMs = (
  isZooming: boolean,
  zoomSpeed: number,
): number => {
  if (zoomSpeed > 1.0) return 500;
  if (isZooming) return 400;
  return 100;
};

const shouldThrottleUpdate = (
  lastUpdateTime: number,
  throttleMs: number,
  currentTime: number,
): boolean => currentTime - lastUpdateTime >= throttleMs;

// ─── MediaPlane ───────────────────────────────────────────────────────────────
const PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1);

function MediaPlane({
  position,
  scale,
  media,
  chunkCx,
  chunkCy,
  chunkCz,
  cameraGridRef,
}: {
  position: THREE.Vector3;
  scale: THREE.Vector3;
  media: MediaItem;
  chunkCx: number;
  chunkCy: number;
  chunkCz: number;
  cameraGridRef: React.MutableRefObject<CameraGridState>;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const localState = React.useRef({ opacity: 0, frame: 0, ready: false });
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [textureAspect, setTextureAspect] = React.useState<number | null>(null);

  useFrame(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    const state = localState.current;
    if (!material || !mesh) return;
    state.frame = (state.frame + 1) & 1;
    if (state.opacity < INVIS_THRESHOLD && !mesh.visible && state.frame === 0)
      return;

    const cam = cameraGridRef.current;
    const dist = Math.max(
      Math.abs(chunkCx - cam.cx),
      Math.abs(chunkCy - cam.cy),
      Math.abs(chunkCz - cam.cz),
    );
    const absDepth = Math.abs(position.z - cam.camZ);

    if (absDepth > DEPTH_FADE_END + 50) {
      state.opacity = 0;
      material.opacity = 0;
      material.depthWrite = false;
      mesh.visible = false;
      return;
    }

    const gridFade =
      dist <= RENDER_DISTANCE
        ? 1
        : Math.max(
            0,
            1 - (dist - RENDER_DISTANCE) / Math.max(CHUNK_FADE_MARGIN, 0.0001),
          );
    const depthFade =
      absDepth <= DEPTH_FADE_START
        ? 1
        : Math.max(
            0,
            1 -
              (absDepth - DEPTH_FADE_START) /
                Math.max(DEPTH_FADE_END - DEPTH_FADE_START, 0.0001),
          );
    const target = Math.min(gridFade, depthFade * depthFade);
    state.opacity =
      target < INVIS_THRESHOLD && state.opacity < INVIS_THRESHOLD
        ? 0
        : lerp(state.opacity, target, 0.18);

    const isFullyOpaque = state.opacity > 0.99;
    material.opacity = isFullyOpaque ? 1 : state.opacity;
    material.depthWrite = isFullyOpaque;
    mesh.visible = state.opacity > INVIS_THRESHOLD;
  });

  const displayScale = React.useMemo(() => {
    const aspect =
      textureAspect ??
      (media.width && media.height ? media.width / media.height : null);
    if (aspect) return new THREE.Vector3(scale.y * aspect, scale.y, 1);
    return scale;
  }, [textureAspect, media.width, media.height, scale]);

  React.useEffect(() => {
    const state = localState.current;
    state.ready = false;
    state.opacity = 0;
    setIsReady(false);
    const material = materialRef.current;
    if (material) {
      material.opacity = 0;
      material.depthWrite = false;
      material.map = null;
    }
    const tex = getTexture(media, (loadedTex) => {
      state.ready = true;
      const img = loadedTex.image as HTMLImageElement | undefined;
      if (img?.naturalWidth && img?.naturalHeight) {
        setTextureAspect(img.naturalWidth / img.naturalHeight);
      }
      setIsReady(true);
    });
    // texture already cached and loaded
    const img = tex.image as HTMLImageElement | undefined;
    if (img?.naturalWidth && img?.naturalHeight) {
      setTextureAspect(img.naturalWidth / img.naturalHeight);
    }
    setTexture(tex);
  }, [media]);

  React.useEffect(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    const state = localState.current;
    if (!material || !mesh || !texture || !isReady || !state.ready) return;
    material.map = texture;
    material.opacity = state.opacity;
    material.depthWrite = state.opacity >= 1;
    mesh.scale.copy(displayScale);
  }, [displayScale, texture, isReady]);

  if (!texture || !isReady) return null;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={displayScale}
      visible={false}
      geometry={PLANE_GEOMETRY}
    >
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Chunk ────────────────────────────────────────────────────────────────────
function Chunk({
  cx,
  cy,
  cz,
  media,
  cameraGridRef,
}: {
  cx: number;
  cy: number;
  cz: number;
  media: MediaItem[];
  cameraGridRef: React.MutableRefObject<CameraGridState>;
}) {
  const [planes, setPlanes] = React.useState<PlaneData[] | null>(null);

  React.useEffect(() => {
    let canceled = false;
    const run = () =>
      !canceled && setPlanes(generateChunkPlanesCached(cx, cy, cz));
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(run, { timeout: 100 });
      return () => {
        canceled = true;
        cancelIdleCallback(id);
      };
    }
    const id = setTimeout(run, 0);
    return () => {
      canceled = true;
      clearTimeout(id);
    };
  }, [cx, cy, cz]);

  if (!planes) return null;

  return (
    <group>
      {planes.map((plane) => {
        const mediaItem = media[plane.mediaIndex % media.length];
        if (!mediaItem) return null;
        return (
          <MediaPlane
            key={plane.id}
            position={plane.position}
            scale={plane.scale}
            media={mediaItem}
            chunkCx={cx}
            chunkCy={cy}
            chunkCz={cz}
            cameraGridRef={cameraGridRef}
          />
        );
      })}
    </group>
  );
}

// ─── Touch Helper ─────────────────────────────────────────────────────────────
const getTouchDistance = (touches: Touch[]) => {
  if (touches.length < 2) return 0;
  const [t1, t2] = touches;
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

// ─── Keyboard Map ─────────────────────────────────────────────────────────────
const KEYBOARD_MAP = [
  { name: "forward", keys: ["w", "W", "ArrowUp"] },
  { name: "backward", keys: ["s", "S", "ArrowDown"] },
  { name: "left", keys: ["a", "A", "ArrowLeft"] },
  { name: "right", keys: ["d", "D", "ArrowRight"] },
  { name: "up", keys: ["e", "E"] },
  { name: "down", keys: ["q", "Q"] },
];

type KeyboardKeys = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
};

// ─── Scene Controller ─────────────────────────────────────────────────────────
type ControllerState = {
  velocity: { x: number; y: number; z: number };
  targetVel: { x: number; y: number; z: number };
  basePos: { x: number; y: number; z: number };
  drift: { x: number; y: number };
  mouse: { x: number; y: number };
  lastMouse: { x: number; y: number };
  scrollAccum: number;
  isDragging: boolean;
  lastTouches: Touch[];
  lastTouchDist: number;
  lastChunkKey: string;
  lastChunkUpdate: number;
  pendingChunk: { cx: number; cy: number; cz: number } | null;
};

const createInitialState = (camZ: number): ControllerState => ({
  velocity: { x: 0, y: 0, z: 0 },
  targetVel: { x: 0, y: 0, z: 0 },
  basePos: { x: 0, y: 0, z: camZ },
  drift: { x: 0, y: 0 },
  mouse: { x: 0, y: 0 },
  lastMouse: { x: 0, y: 0 },
  scrollAccum: 0,
  isDragging: false,
  lastTouches: [],
  lastTouchDist: 0,
  lastChunkKey: "",
  lastChunkUpdate: 0,
  pendingChunk: null,
});

function SceneController({ media }: { media: MediaItem[] }) {
  const { camera, gl } = useThree();
  const [, getKeys] = useKeyboardControls<keyof KeyboardKeys>();

  const isTouchDevice = React.useMemo(
    () =>
      typeof navigator !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    [],
  );

  const state = React.useRef<ControllerState>(
    createInitialState(INITIAL_CAMERA_Z),
  );
  const cameraGridRef = React.useRef<CameraGridState>({
    cx: 0,
    cy: 0,
    cz: 0,
    camZ: camera.position.z,
  });
  const [chunks, setChunks] = React.useState<ChunkData[]>([]);

  React.useEffect(() => {
    const canvas = gl.domElement;
    const s = state.current;
    canvas.style.cursor = "grab";

    const onMouseDown = (e: MouseEvent) => {
      s.isDragging = true;
      s.lastMouse = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
    };
    const onMouseUp = () => {
      s.isDragging = false;
      canvas.style.cursor = "grab";
    };
    const onMouseLeave = () => {
      s.mouse = { x: 0, y: 0 };
      s.isDragging = false;
      canvas.style.cursor = "grab";
    };
    const onMouseMove = (e: MouseEvent) => {
      s.mouse = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      if (s.isDragging) {
        s.targetVel.x -= (e.clientX - s.lastMouse.x) * 0.025;
        s.targetVel.y += (e.clientY - s.lastMouse.y) * 0.025;
        s.lastMouse = { x: e.clientX, y: e.clientY };
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      s.scrollAccum += e.deltaY * 0.006;
    };
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      s.lastTouches = Array.from(e.touches) as Touch[];
      s.lastTouchDist = getTouchDistance(s.lastTouches);
      canvas.style.cursor = "grabbing";
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches) as Touch[];
      if (touches.length === 1 && s.lastTouches.length >= 1) {
        const [touch] = touches;
        const [last] = s.lastTouches;
        if (touch && last) {
          s.targetVel.x -= (touch.clientX - last.clientX) * 0.02;
          s.targetVel.y += (touch.clientY - last.clientY) * 0.02;
        }
      } else if (touches.length === 2 && s.lastTouchDist > 0) {
        const dist = getTouchDistance(touches);
        s.scrollAccum += (s.lastTouchDist - dist) * 0.006;
        s.lastTouchDist = dist;
      }
      s.lastTouches = touches;
    };
    const onTouchEnd = (e: TouchEvent) => {
      s.lastTouches = Array.from(e.touches) as Touch[];
      s.lastTouchDist = getTouchDistance(s.lastTouches);
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl]);

  useFrame(() => {
    const s = state.current;
    const now = performance.now();
    const { forward, backward, left, right, up, down } = getKeys();
    if (forward) s.targetVel.z -= KEYBOARD_SPEED;
    if (backward) s.targetVel.z += KEYBOARD_SPEED;
    if (left) s.targetVel.x -= KEYBOARD_SPEED;
    if (right) s.targetVel.x += KEYBOARD_SPEED;
    if (down) s.targetVel.y -= KEYBOARD_SPEED;
    if (up) s.targetVel.y += KEYBOARD_SPEED;

    const isZooming = Math.abs(s.velocity.z) > 0.05;
    const zoomFactor = clamp(s.basePos.z / 50, 0.3, 2.0);
    const driftAmount = 8.0 * zoomFactor;
    const driftLerp = isZooming ? 0.2 : 0.12;

    if (!s.isDragging) {
      if (isTouchDevice) {
        s.drift.x = lerp(s.drift.x, 0, driftLerp);
        s.drift.y = lerp(s.drift.y, 0, driftLerp);
      } else {
        s.drift.x = lerp(s.drift.x, s.mouse.x * driftAmount, driftLerp);
        s.drift.y = lerp(s.drift.y, s.mouse.y * driftAmount, driftLerp);
      }
    }

    s.targetVel.z += s.scrollAccum;
    s.scrollAccum *= 0.8;

    s.targetVel.x = clamp(s.targetVel.x, -MAX_VELOCITY, MAX_VELOCITY);
    s.targetVel.y = clamp(s.targetVel.y, -MAX_VELOCITY, MAX_VELOCITY);
    s.targetVel.z = clamp(s.targetVel.z, -MAX_VELOCITY, MAX_VELOCITY);

    s.velocity.x = lerp(s.velocity.x, s.targetVel.x, VELOCITY_LERP);
    s.velocity.y = lerp(s.velocity.y, s.targetVel.y, VELOCITY_LERP);
    s.velocity.z = lerp(s.velocity.z, s.targetVel.z, VELOCITY_LERP);

    s.basePos.x += s.velocity.x;
    s.basePos.y += s.velocity.y;
    s.basePos.z += s.velocity.z;

    camera.position.set(
      s.basePos.x + s.drift.x,
      s.basePos.y + s.drift.y,
      s.basePos.z,
    );

    s.targetVel.x *= VELOCITY_DECAY;
    s.targetVel.y *= VELOCITY_DECAY;
    s.targetVel.z *= VELOCITY_DECAY;

    const cx = Math.floor(s.basePos.x / CHUNK_SIZE);
    const cy = Math.floor(s.basePos.y / CHUNK_SIZE);
    const cz = Math.floor(s.basePos.z / CHUNK_SIZE);

    cameraGridRef.current = { cx, cy, cz, camZ: s.basePos.z };

    const key = `${cx},${cy},${cz}`;
    if (key !== s.lastChunkKey) {
      s.pendingChunk = { cx, cy, cz };
      s.lastChunkKey = key;
    }

    const throttleMs = getChunkUpdateThrottleMs(
      isZooming,
      Math.abs(s.velocity.z),
    );
    if (
      s.pendingChunk &&
      shouldThrottleUpdate(s.lastChunkUpdate, throttleMs, now)
    ) {
      const { cx: ucx, cy: ucy, cz: ucz } = s.pendingChunk;
      s.pendingChunk = null;
      s.lastChunkUpdate = now;
      setChunks(
        CHUNK_OFFSETS.map((o) => ({
          key: `${ucx + o.dx},${ucy + o.dy},${ucz + o.dz}`,
          cx: ucx + o.dx,
          cy: ucy + o.dy,
          cz: ucz + o.dz,
        })),
      );
    }
  });

  React.useEffect(() => {
    const s = state.current;
    s.basePos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    setChunks(
      CHUNK_OFFSETS.map((o) => ({
        key: `${o.dx},${o.dy},${o.dz}`,
        cx: o.dx,
        cy: o.dy,
        cz: o.dz,
      })),
    );
  }, [camera]);

  return (
    <>
      {chunks.map((chunk) => (
        <Chunk
          key={chunk.key}
          cx={chunk.cx}
          cy={chunk.cy}
          cz={chunk.cz}
          media={media}
          cameraGridRef={cameraGridRef}
        />
      ))}
    </>
  );
}

// ─── Gallery Canvas (Main Export) ─────────────────────────────────────────────
export default function GalleryCanvas({ images }: { images: string[] }) {
  const media: MediaItem[] = images.map((url) => ({
    url,
    width: 0,
    height: 0,
  }));

  const [overlayLoaded, setOverlayLoaded] = React.useState(false);

  React.useEffect(() => {
    const needed = Math.min(3, images.length);

    // If enough textures are already in cache (e.g. hot reload / revisit), dismiss immediately
    let alreadyCached = 0;
    for (const tex of Array.from(textureCache.values())) {
      if (isTextureLoaded(tex)) alreadyCached++;
      if (alreadyCached >= needed) break;
    }
    if (alreadyCached >= needed || needed === 0) {
      setOverlayLoaded(true);
      return;
    }

    let count = 0;
    const listener = () => {
      count++;
      if (count >= needed) {
        globalTextureLoadListeners.delete(listener);
        setOverlayLoaded(true);
      }
    };
    globalTextureLoadListeners.add(listener);
    return () => { globalTextureLoadListeners.delete(listener); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dpr = Math.min(
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    1.5,
  );

  if (!images.length) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "24px",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            letterSpacing: "0.5em",
            fontSize: "5rem",
            fontWeight: 300,
            color: "#000",
          }}
        >
          L I F E
        </div>
        <Link
          href="/"
          style={{
            fontSize: "0.875rem",
            color: "#000",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      {/* Loading overlay */}
      <style>{`
        @keyframes letItCookPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes loadingLine {
          0% { width: 0%; }
          60% { width: 75%; }
          85% { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes loadingLineDone {
          0% { width: 90%; }
          100% { width: 100%; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          transition: "opacity 0.6s ease",
          opacity: overlayLoaded ? 0 : 1,
          pointerEvents: overlayLoaded ? "none" : "auto",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            letterSpacing: "0.25em",
            color: "#000",
            fontFamily: "inherit",
            animation: "letItCookPulse 1.4s ease-in-out infinite",
            userSelect: "none",
          }}
        >
          let it cook
        </div>
        <div
          style={{
            width: "160px",
            height: "1px",
            background: "#e5e5e5",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#000",
              animation: overlayLoaded
                ? "loadingLineDone 0.3s ease-out forwards"
                : "loadingLine 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
            }}
          />
        </div>
      </div>
      <KeyboardControls map={KEYBOARD_MAP}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            touchAction: "none",
          }}
        >
          <Canvas
            camera={{
              position: [0, 0, INITIAL_CAMERA_Z],
              fov: 60,
              near: 1,
              far: 500,
            }}
            dpr={dpr}
            flat
            gl={{ antialias: false, powerPreference: "high-performance" }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              touchAction: "none",
              background: "#ffffff",
            }}
          >
            <color attach="background" args={["#ffffff"]} />
            <fog attach="fog" args={["#ffffff", 120, 320]} />
            <SceneController media={media} />
          </Canvas>
        </div>
      </KeyboardControls>

      {/* Overlay */}
      <style>{`
        @media (max-width: 639px) {
          .gallery-handle { left: 50% !important; transform: translateX(-50%); }
          .gallery-life { left: 50% !important; right: auto !important; transform: translateX(-50%); bottom: 60px !important; }
          .gallery-hints { left: 50% !important; transform: translateX(-50%); text-align: center; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            fontSize: "0.8125rem",
            fontFamily: "inherit",
            color: "#000",
            textDecoration: "none",
            letterSpacing: "0.05em",
            padding: "6px 14px",
            whiteSpace: "nowrap",
          }}
          className="gallery-handle text-[#000] hover:text-orange-400 transition-all"
        >
          (@justtayyabkhan)
        </Link>

        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "28px",
            letterSpacing: "0.45em",
            fontSize: "1.25rem",
            fontFamily: "inherit",
            color: "#000",
            userSelect: "none",
            textShadow: "0 0 6px #fff, 0 0 10px #fff, 0 0 14px #fff",
            whiteSpace: "nowrap",
          }}
          className="gallery-life"
        >
          L I F E
        </div>

        <div
          className="gallery-hints"
          style={{
            position: "absolute",
            bottom: "24px",
            left: "28px",
            fontFamily: "inherit",
            color: "#000",
            userSelect: "none",
            textShadow: "0 0 6px #fff, 0 0 10px #fff, 0 0 14px #fff",
            fontSize: "0.65rem",
            letterSpacing: "0.04em",
            lineHeight: "1.8",
            opacity: 0.75,
            whiteSpace: "nowrap",
          }}
        >
          <div>
            drag &nbsp;or&nbsp; ↑ ↓ ← → &nbsp;or&nbsp; WASD &nbsp;to&nbsp;
            <strong>navigate</strong>
          </div>
          <div>
            scroll to &nbsp;
            <strong>zoom</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
