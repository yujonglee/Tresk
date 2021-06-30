import P5Wrapper from 'react-p5-wrapper';

export default function TreeCanvas() {
  const autoplay = false;
  const clearsBackground = true;
  const windEnabled = true;
  const levelMax = 8;

  let time = 0;
  let leafLevel = 3;
  let rotRange = 10;
  let lengthRand = 1.0;

  let startLength;
  let startSize;

  let rotDecay = 1.1;
  let sizeDecay = 0.7;
  let lengthDecay = 0.91;

  let leafChance = 0.5;

  let branchHue = 50;
  let leafHue = 150;
  let leafSat = 100;

  let mouseWind = 0;
  let mouseWindV = 0;
  let bgColor;

  let bloomWidthRatio = 0.6;
  let bloomSizeAverage = 15;

  let mDamp = 0.00002;
  let wDamp = 0.003;
  let mFriction = 0.98;

  let flowerChance = 0.15;
  let flowerColor;
  let flowerWidth = 10;
  let flowerHeight = 20;

  let node;

  const sketch = (p5) => {
    class Node {
      constructor(_len, _size, _rotRange, _level, _colorRangeModifier) {
        this.size = _size;
        this.level = _level;
        this.len = _len * (1 + p5.random(-lengthRand, lengthRand));
        this.rot = p5.radians(p5.random(-_rotRange, _rotRange));
        this.colorRangeModifier = _colorRangeModifier;

        this.leafScale = 0.0;
        this.flowerScale = 0.0;
        this.flowerScaleT = 1.0;
        this.flowerBright = 255;

        this.s = 0;
        this.windFactor = 1.0;

        if (this.level < leafLevel) {
          this.rot *= 0.3;
        }
        if (this.level === 0) {
          this.rot = 0;
        }

        this.windFactor = p5.random(0.2, 1);
        this.doesBloom = false;

        if ((this.level >= leafLevel) && (p5.random(1) < leafChance)) {
          this.doesBloom = true;
        }

        this.bloomSize = p5.random(bloomSizeAverage * 0.7, bloomSizeAverage * 1.3);
        this.leafRot = p5.radians(p5.random(-180, 180));
        this.flowerScaleT = p5.random(0.8, 1.2);
        this.flowerDelay = p5.round(p5.random(200, 250));
        this.leafDelay = p5.round(p5.random(50, 150));

        this.randomizeColor();

        if (p5.random(1) < flowerChance) {
          this.doesFlower = true;
        }

        const rr = _rotRange * rotDecay;

        if (this.level < levelMax) {
          this.n1 = new Node(this.len * lengthDecay, this.size * sizeDecay, rr, this.level + 1, this.colorRangeModifier - 30);
          this.n2 = new Node(this.len * lengthDecay, this.size * sizeDecay, rr, this.level + 1, this.colorRangeModifier + 30);
        }
      }

      draw() {
        p5.strokeWeight(this.size);
        this.s += (1.0 - this.s) / (15 + (this.level * 5));
        p5.scale(this.s);
        p5.push();

        if (this.level >= leafLevel) {
          p5.stroke(this.branchColor);
        } else {
          p5.stroke(0);
        }

        let rotOffset = p5.sin(p5.noise(p5.millis() * 0.000006 * (this.level * 1)) * 100);

        if (!windEnabled) {
          rotOffset = 0;
        }

        p5.rotate(this.rot + (rotOffset * 0.1 + mouseWind) * this.windFactor);
        p5.line(0, 0, 0, -this.len);
        p5.translate(0, -this.len);

        // draw leaves
        if (this.doesBloom) {
          if (this.leafDelay < 0) {
            this.leafScale += (1.0 - this.leafScale) * 0.05;
            p5.fill(this.leafColor);
            p5.noStroke();
            p5.push();
            p5.scale(this.leafScale);
            p5.rotate(this.leafRot);
            p5.translate(0, -this.bloomSize / 2);
            p5.ellipse(0, 0, this.bloomSize * bloomWidthRatio, this.bloomSize);
            p5.pop();
          } else {
            this.leafDelay -= 1;
          }
        }

        // draw flowers
        if (this.doesFlower && (this.level > levelMax - 3)) {
          if (this.flowerDelay < 0) {
            p5.push();
            this.flowerScale += (this.flowerScaleT - this.flowerScale) * 0.1;
            p5.scale(this.flowerScale);
            p5.rotate(this.flowerScale * 3);
            p5.noStroke();
            p5.fill(p5.hue(flowerColor), p5.saturation(flowerColor), this.flowerBright);
            p5.ellipse(0, 0, flowerWidth, flowerHeight);
            p5.rotate(p5.radians(360 / 3));
            p5.ellipse(0, 0, flowerWidth, flowerHeight);
            p5.rotate(p5.radians(360 / 3));
            p5.ellipse(0, 0, flowerWidth, flowerHeight);
            p5.fill(this.branchColor);
            p5.ellipse(0, 0, 5, 5);
            p5.pop();
          } else {
            this.flowerDelay -= 1;
          }
        }
        p5.push();

        if (this.n1) {
          this.n1.draw();
        }

        p5.pop();
        p5.push();

        if (this.n2) {
          this.n2.draw();
        }

        p5.pop();
        p5.pop();
      }

      randomizeColor() {
        this.branchColor = p5.color(branchHue, p5.random(170, 255), p5.random(100, 200));
        this.leafColor = p5.color(leafHue, leafSat, p5.random(100 - this.colorRangeModifier, 255));
        this.flowerBright = p5.random(200, 255);

        if (this.n1) {
          this.n1.randomizeColor();
        }
        if (this.n2) {
          this.n2.randomizeColor();
        }
      }
    }

    const randomizeBackground = () => {
      bgColor = p5.color(p5.random(255), p5.random(0, 100), 255);
    };

    const reset = () => {
      // p5.background(bgColor);
      p5.background(255);
      node = new Node(startLength, startSize, rotRange, 0, 0);
    };

    const randomize = () => {
      randomizeBackground();
      randomizeColor();

      rotRange = p5.random(20, 60);
      rotDecay = p5.random(0.9, 1.1);

      startLength = p5.random(20, 80);
      startSize = p5.random(3, 20);

      lengthRand = p5.random(0.0, 0.2);

      leafChance = p5.random(0.3, 0.9);
      leafLevel = p5.random(0, 4);

      sizeDecay = p5.random(0.6, 0.7);
      lengthDecay = p5.map(startLength, 20, 80, 1.1, 0.85);

      bloomWidthRatio = p5.random(0.01, 0.9);
      bloomSizeAverage = p5.random(10, 40);

      mDamp = 0.00002;
      wDamp = 0.005;

      mFriction = 0.96;

      flowerWidth = p5.random(5, 15);
      flowerHeight = p5.random(10, 30);
      flowerChance = 0.1;
    };

    const randomizeColor = () => {
      branchHue = p5.random(0, 255);
      leafHue = p5.random(0, 255);
      leafSat = p5.random(0, 255);
      flowerColor = p5.color(p5.random(255), p5.random(0, 255), 255);

      if (node) {
        node.randomizeColor();
      }
    };

    // p5.mousePressed = () => {
    //   time = 0;
    //   randomize();
    //   reset();
    // }

    p5.setup = () => {
      p5.createCanvas(940, 540, p5.P2D);
      p5.colorMode(p5.HSB);

      p5.ellipseMode(p5.CENTER);

      randomize();
      reset();
    };

    p5.draw = () => {
      if (autoplay) {
        time += 1;
        if (time > 600) {
          time = 0;
          randomize();
          reset();
        }
      }

      const dx = p5.mouseX - p5.pmouseX;

      mouseWindV += dx * mDamp;
      mouseWindV += (0 - mouseWind) * wDamp;
      mouseWindV *= mFriction;
      mouseWind += mouseWindV;

      if (clearsBackground) {
        // p5.background(bgColor);
        p5.background(255);
      }
      p5.translate(p5.width / 2, p5.height);
      node.draw();
    };
  };

  return <P5Wrapper sketch={sketch} />;
}
