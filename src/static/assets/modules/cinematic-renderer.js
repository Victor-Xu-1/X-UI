import * as T from '../vendor/three-0.186.1/three.module.js';
import { createConcept } from './cinematic-geometry.js';
import { loadConceptLighting } from './cinematic-lighting.js';

export class CinematicRenderer {
  constructor(environmentMetadata, canvas, report) {
    this.report = report;
    this.renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.setClearColor(0x050e17, 0);
    this.canvas = this.renderer.domElement;
    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(34, 1, .1, 60); this.camera.position.set(0, 0, 10);
    this.scene.add(new T.HemisphereLight(0xcbe5ff, 0x18393c, 1.2));
    [[0x8eddff, 3, [3,4,5]], [0xffa460, 3, [-4,0,3]], [0x4f7dff, 4, [0,-3,-2]]].forEach(([color, intensity, position]) => {
      const light = new T.DirectionalLight(color, intensity); light.position.set(...position); this.scene.add(light);
    });
    this.environmentMetadata = environmentMetadata;
    this.pose = { x: .08, y: -.12 }; this.time = 0; this.last = 0; this.frames = 0;
    this.frame = this.frame.bind(this);
  }
  async attach(id, size) {
    this.stop();
    this.preparing = true;
    if (!this.environment) {
      const texture = await loadConceptLighting(this.environmentMetadata);
      if (this.lost || this.disposed) { texture.dispose(); texture.image.close(); throw new Error('Scene unavailable'); }
      this.environment = texture; this.scene.environment = texture;
    }
    if (id !== this.id) {
      if (this.concept) { this.scene.remove(this.concept.group); this.concept.dispose(); }
      this.concept = createConcept(id); this.scene.add(this.concept.group); this.id = id; this.time = 0;
    }
    this.pose = { x:.08, y:-.12 }; this.resize(size, false);
    await this.renderer.compileAsync(this.scene, this.camera);
    if (this.lost || this.disposed) throw new Error('Scene unavailable');
    this.preparing = false;
    this.render();
  }
  resize({ width, height, dpr, motionHz }, draw = true) {
    if (![width,height,dpr].every(Number.isFinite) || width <= 0 || height <= 0) throw new Error('Invalid scene dimensions');
    // Explicit physical allocation cap, independent of screen DPR.
    this.renderer.setDrawingBufferSize(width, height, Math.min(dpr || 1, 1.5, Math.sqrt(1600000 / (width * height))));
    this.period = 1000 / (motionHz === 60 ? 60 : 30);
    this.camera.aspect = width / height;
    this.camera.position.z = this.camera.aspect < 1 ? 11.8 / this.camera.aspect : 10;
    this.camera.updateProjectionMatrix(); if (draw && !this.preparing) this.render();
  }
  rotate(x, y) { this.pose.x = Math.max(-.85, Math.min(.85, this.pose.x + x)); this.pose.y += y; this.render(); }
  reset() { this.pose = { x: .08, y: -.12 }; this.render(); }
  frame(now) {
    if (!this.playing) return;
    // An accumulated deadline avoids refresh-rate quantization of 30/60 Hz.
    if (this.next && now + .5 < this.next) return;
    const delta = this.last ? Math.min((now - this.last) / 1000, .06) : 0;
    this.next = this.next ? this.next + this.period : now + this.period;
    if (this.next < now) this.next = now + this.period;
    this.last = now; this.time += delta; this.render();
  }
  render() {
    if (!this.concept || this.lost || this.preparing || this.disposed) return;
    this.concept.group.rotation.set(this.pose.x + Math.sin(this.time * .11) * .055, this.pose.y + this.time * .035, Math.sin(this.time * .08) * .035);
    this.concept.animate(this.time); this.renderer.render(this.scene, this.camera); this.frames++;
    this.report({ frames:this.frames, calls:this.renderer.info.render.calls, triangles:this.renderer.info.render.triangles, width:this.canvas.width, height:this.canvas.height });
  }
  play() { if (this.playing || this.lost) return; this.playing = true; this.last = 0; this.next = 0; this.renderer.setAnimationLoop(this.frame); }
  stop() { this.playing = false; this.last = 0; this.next = 0; this.renderer.setAnimationLoop(null); }
  dispose() { this.disposed = true; this.stop(); this.concept?.dispose(); this.environment?.dispose(); this.environment?.image.close(); this.renderer.dispose(); }
}
