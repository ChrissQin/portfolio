"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";

type HeroRippleProps = {
  /** Poster URL used as the WebGL texture. */
  imageSrc: string;
  className?: string;
};

type Ripple = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

const MAX_RIPPLES = 4;

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_image;
uniform vec2 u_pointer;
uniform float u_hover;
uniform float u_time;
uniform vec4 u_ripples[4];
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  vec2 fromPointer = uv - u_pointer;
  float dist = length(fromPointer);
  vec2 dir = dist > 0.0001 ? fromPointer / dist : vec2(0.0);

  /* Soft delayed light + micro displacement following the pointer */
  float hoverFalloff = exp(-dist * 7.5) * u_hover;
  uv -= dir * hoverFalloff * 0.018;

  for (int i = 0; i < 4; i++) {
    float strength = u_ripples[i].w;
    float born = u_ripples[i].z;
    if (strength > 0.001 && born > 0.0) {
      float age = u_time - born;
      if (age >= 0.0 && age < 1.35) {
        vec2 origin = u_ripples[i].xy;
        float waveDist = distance(uv, origin);
        float radius = age * 0.5;
        float ring = exp(-pow((waveDist - radius) * 36.0, 2.0));
        float decay = 1.0 - age / 1.35;
        vec2 waveDir = waveDist > 0.0001 ? normalize(uv - origin) : vec2(0.0);
        uv += waveDir * ring * strength * decay * 0.028;
      }
    }
  }

  uv = clamp(uv, 0.001, 0.999);
  vec4 color = texture2D(u_image, uv);
  float lift = exp(-dist * 5.5) * u_hover * 0.14;
  color.rgb += vec3(lift * 0.95, lift * 0.88, lift * 0.78);
  gl_FragColor = color;
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) {
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    return null;
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * Lightweight WebGL light-ripple over the hero poster.
 * Affects only the media texture — UI sits above with normal stacking.
 */
export function HeroRipple({ imageSrc, className = "" }: HeroRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // Placeholder pixel until image loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([11, 10, 9, 255]),
    );

    const image = new Image();
    image.decoding = "async";
    let textureReady = false;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      textureReady = true;
    };
    image.src = imageSrc;

    const uImage = gl.getUniformLocation(program, "u_image");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRipples = gl.getUniformLocation(program, "u_ripples");

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let hover = 0;
    let targetHover = 0;
    const ripples: Ripple[] = [];
    let raf = 0;
    let visible = true;
    let disposed = false;
    const start = performance.now();

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const toUv = (clientX: number, clientY: number) => {
      const rect = parent.getBoundingClientRect();
      return {
        x: (clientX - rect.left) / Math.max(rect.width, 1),
        y: 1 - (clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    const pushRipple = (x: number, y: number, strength: number) => {
      const born = (performance.now() - start) / 1000;
      if (ripples.length >= MAX_RIPPLES) {
        ripples.shift();
      }
      ripples.push({ x, y, born, strength });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) {
        return;
      }
      const uv = toUv(event.clientX, event.clientY);
      pointer.tx = uv.x;
      pointer.ty = uv.y;
      targetHover = 1;
    };

    const onPointerLeave = () => {
      targetHover = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      const uv = toUv(event.clientX, event.clientY);
      // Coarse/touch: tap ripple only; fine pointer: click wave
      if (finePointer.matches || event.pointerType === "touch") {
        pushRipple(uv.x, uv.y, finePointer.matches ? 1 : 0.55);
      }
      if (finePointer.matches) {
        pointer.tx = uv.x;
        pointer.ty = uv.y;
        targetHover = 1;
      }
    };

    const draw = (now: number) => {
      if (disposed) {
        return;
      }
      raf = window.requestAnimationFrame(draw);
      if (!visible) {
        return;
      }

      const t = (now - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      hover += (targetHover - hover) * 0.08;

      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uImage, 0);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uTime, t);

      const rippleData = new Float32Array(16);
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const ripple = ripples[i];
        const base = i * 4;
        if (ripple) {
          rippleData[base] = ripple.x;
          rippleData[base + 1] = ripple.y;
          rippleData[base + 2] = ripple.born;
          rippleData[base + 3] = ripple.strength;
        }
      }
      gl.uniform4fv(uRipples, rippleData);

      if (textureReady || true) {
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(parent);

    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);
    parent.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", resize);
    resize();
    raf = window.requestAnimationFrame(draw);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      parent.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", resize);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [imageSrc, reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`cinema-hero__ripple ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
