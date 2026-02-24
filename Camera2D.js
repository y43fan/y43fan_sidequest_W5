class Camera2D {
  constructor(viewW, viewH) {
    this.viewW = viewW;
    this.viewH = viewH;
    this.x = 0;
    this.y = 0;

    // Dream camera state
    this.time = 0;
    this.baseSpeed = 0.35; // slow drifting speed
  }

  followSideScrollerX(targetX, lerpAmt) {
    const desired = targetX - this.viewW / 2;
    this.x = lerp(this.x, desired, lerpAmt);
  }

  clampToWorld(worldW, worldH) {
    const maxX = max(0, worldW - this.viewW);
    const maxY = max(0, worldH - this.viewH);
    this.x = constrain(this.x, 0, maxX);
    this.y = constrain(this.y, 0, maxY);
  }

  begin() {
    push();
    translate(-this.x, -this.y);
  }
  end() {
    pop();
  }
  updateDream(dt = 1) {
    this.time += dt * 0.01;

    // Horizontal drift (layered waves + noise)
    const wave1 = sin(this.time * 0.4) * 0.6;
    const wave2 = sin(this.time * 1.3) * 0.2;
    const wander = noise(this.time * 0.25) * 0.5;

    this.x += this.baseSpeed + wave1 + wave2 + wander;

    // Vertical float (dreamlike buoyancy)
    const float1 = sin(this.time * 0.7) * 25;
    const float2 = noise(this.time * 0.5) * 15;

    this.y = float1 + float2;

    // Occasional dream “push”
    if (noise(this.time * 0.1) > 0.75) {
      this.x += 1.2;
    }
  }
}
