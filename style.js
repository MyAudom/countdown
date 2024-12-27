// "use strict";

// let canvas, width, height, ctx;
// let fireworks = [];
// let particales = [];

// // function setup
// function setup() {
//   canvas = document.getElementById("canvas");
//   setSize(canvas);
//   ctx = canvas.getContext("2d");
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, width, height);
//   fireworks.push(new Firework(Math.random() * (width - 200) + 100));
//   window.addEventListener("resize", windowResized);
//   document.addEventListener("click", "onClick");
// }

// setTimeout(setup, 1);

// function loop() {
//   ctx.globalAlpha = 0.1;
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, width, height);
//   ctx.globalAlpha = 1;

//   for (let i = 0; i < fireworks.length; i++) {
//     let done = fireworks[i].update();
//     fireworks[i].draw();
//     if (done) fireworks.splice(i, 1);
//   }

//   for (let i = 0; i < particales.length; i++) {
//     particales[i].update();
//     particales[i].draw();
//     if (particales[i].lifeTime > 80) particales.splice(i, 1);
//   }

// //Create alot of firework
//   if (Math.random() < 5 / 60)
//     fireworks.push(new Firework(Math.random() * (width - 60) + 100));
// }

// //Time for animation
// setInterval(loop, 1000 / 900);
// class Particale {
//   constructor(x, y, col) {
//     this.x = x;
//     this.y = y;
//     this.col = col;
//     this.vel = randomVec(2);
//     this.lifeTime = 0;
//   }

//   update() {
//     this.x += this.vel.x;
//     this.y += this.vel.y;
//     this.vel.y += 0.02;
//     this.vel.x *= 0.99;
//     this.vel.y *= 0.99;
//     this.lifeTime++;
//   }

//   draw() {
//     ctx.fillStyle = this.col;
//     ctx.globalAlpha = Math.max(1 - this.lifeTime / 800, 1);
//     ctx.fillRect(this.x, this.y, 2, 2);
//   }
// }

// class Firework {
//   constructor(x) {
//     this.x = x;
//     this.y = height;
//     this.isBlown = false;
//     this.col = randomCol();
//   }

//   update() {
//     this.y -= 3;
//     if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
//       this.isBlown = true;
//       for (let i = 0; i < 60; i++) {
//         particales.push(new Particale(this.x, this.y, this.col));
//       }
//     }
//     return this.isBlown;
//   }

//   draw() {
//     ctx.globalAlpha = 1;
//     ctx.fillStyle = this.col;
//     ctx.fillRect(this.x, this.y, 2, 2);
//   }
// }

// function randomCol() {
//   var letter = "0123456789ABCDEF";
//   var nums = [];
//   for (var i = 0; i < 3; i++) {
//     nums[i] = Math.floor(Math.random() * 256);
//   }

//   let brightest = 0;
//   for (var i = 0; i < 3; i++) {
//     if (brightest < nums[i]) brightest = nums[i];
//   }

//   brightest /= 255;
//   for (var i = 0; i < 3; i++) {
//     nums[i] /= brightest;
//   }

//   let color = "#";
//   for (var i = 0; i < 3; i++) {
//     color += letter[Math.floor(nums[i] / 16)];
//     color += letter[Math.floor(nums[i] % 16)];
//   }
//   return color;
// }

// function randomVec(max) {
//   let dir = Math.random() * Math.PI * 2;
//   let spd = Math.random() * max;
//   return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
// }

// function setSize(canv) {
//   canv.style.width = innerWidth + "px";
//   canv.style.height = innerHeight + "px";
//   width = innerWidth;
//   height = innerHeight;

//   canv.width = innerWidth * window.devicePixelRatio;
//   canv.height = innerHeight * window.devicePixelRatio;
//   canvas
//     .getContext("2d")
//     .scale(window.devicePixelRatio, window.devicePixelRatio);
// }

// function onClick(e) {
//   fireworks.push(new Firework(e.clientX));
// }

// function windowResized() {
//   setSize(canvas);
//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, width, height);
// }

"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particales = [];

// function setup
function setup() {
  canvas = document.getElementById("canvas");
  setSize(canvas);
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", windowResized);
  document.addEventListener("click", onClick);
  fireworks.push(new Firework(Math.random() * (width - 200) + 100));
}

setTimeout(setup, 1);

function loop() {
  // Create a gradient background
  let gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#000428"); // Dark blue
  gradient.addColorStop(1, "#004e92"); // Lighter blue
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 1;

  for (let i = 0; i < fireworks.length; i++) {
    let done = fireworks[i].update();
    fireworks[i].draw();
    if (done) fireworks.splice(i, 1);
  }

  for (let i = 0; i < particales.length; i++) {
    particales[i].update();
    particales[i].draw();
    if (particales[i].lifeTime > 80) particales.splice(i, 1);
  }

  // Create a lot of fireworks
  if (Math.random() < 5 / 60)
    fireworks.push(new Firework(Math.random() * (width - 60) + 100));
}

// Time for animation
setInterval(loop, 1000 / 900);

class Particale {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.vel = randomVec(2);
    this.lifeTime = 0;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.y += 0.02;
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
    this.lifeTime++;
  }

  draw() {
    ctx.fillStyle = this.col;
    ctx.globalAlpha = Math.max(1 - this.lifeTime / 800, 1);
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

class Firework {
  constructor(x) {
    this.x = x;
    this.y = height;
    this.isBlown = false;
    this.col = randomCol();
  }

  update() {
    this.y -= 3;
    if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
      this.isBlown = true;
      for (let i = 0; i < 60; i++) {
        particales.push(new Particale(this.x, this.y, this.col));
      }
    }
    return this.isBlown;
  }

  draw() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.col;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

function randomCol() {
  var letter = "0123456789ABCDEF";
  var nums = [];
  for (var i = 0; i < 3; i++) {
    nums[i] = Math.floor(Math.random() * 256);
  }

  let brightest = 0;
  for (var i = 0; i < 3; i++) {
    if (brightest < nums[i]) brightest = nums[i];
  }

  brightest /= 255;
  for (var i = 0; i < 3; i++) {
    nums[i] /= brightest;
  }

  let color = "#";
  for (var i = 0; i < 3; i++) {
    color += letter[Math.floor(nums[i] / 16)];
    color += letter[Math.floor(nums[i] % 16)];
  }
  return color;
}

function randomVec(max) {
  let dir = Math.random() * Math.PI * 2;
  let spd = Math.random() * max;
  return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}

function setSize(canv) {
  canv.style.width = innerWidth + "px";
  canv.style.height = innerHeight + "px";
  width = innerWidth;
  height = innerHeight;

  canv.width = innerWidth * window.devicePixelRatio;
  canv.height = innerHeight * window.devicePixelRatio;
  canvas
    .getContext("2d")
    .scale(window.devicePixelRatio, window.devicePixelRatio);
}

function onClick(e) {
  fireworks.push(new Firework(e.clientX));
}

function windowResized() {
  setSize(canvas);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
}