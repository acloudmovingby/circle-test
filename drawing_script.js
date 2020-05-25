var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// TANK POSITION ANGLE AND MOVEMENT SPEEDS (IN X AND WHY)
var tank_x = window.innerWidth / 2; // set staring position halfway across screen
var tank_y = window.innerHeight / 2; // set staring position halfway across screen
var angle = 0; // start pointing to angle 0 (i.e. to the right)
var speed_x = 0; // how much it moves per frame in the x direction (while holding down 'W')
var speed_y = 0; // how much it moves per frame in the y direction (while holding down 'W')

// booleans for movement. If true, then we change the position of the tank every loop. If false, the position won't change.
var movingForward = false; // are we moving forward right now? (this changes to true while holding "W")

// Default parameters for size / speed of tank
var speed = 10;
var tankWidth = 40;
var tankHeight = 80;

// run this first to (1) make our canvas resize with window (2) set event listeners (3) start animation loop for canvas
if (canvas.getContext) {
  // canvas auto resizes with window
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);
  window.addEventListener("mousemove", handleMouseMove, false);

  // begin animation loop (loop of drawing frames)
  window.requestAnimationFrame(animation_loop);
}

function handleKeyDown(e) {
  var code = e.code;
  console.log(code);
  switch (code) {
    case "KeyW":
      movingForward = true;
      console.log("Forward");
      break;
    case "KeyS":
      console.log("Backward");
      break;
  }
}

function handleKeyUp(e) {
  movingForward = false;
}

function handleMouseMove(e) {
  console.log("mouse x position? " + e.offsetX);
  console.log("mouse y position? " + e.offsetY);

  // HERE we will change the angle so the tank is always pointing to our mouse...
}

// runs ~30-60 times per second? Tells the computer what to draw to the canvas
function animation_loop() {
  if (canvas.getContext) {
    // every frame, this erases the canvas for the whole window (every frame we redraw the shapes).
    ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    drawTank(tank_x, tank_y, angle);
  }

  if (movingForward) {
    tank_x += Math.cos(angle) * speed;
    tank_y += Math.sin(angle) * speed;
  }
  /*
// code for if you want to turn using keys
  if (turnLeft) {
    angle -= 0.1;
  }
  if (turnRight) {
    angle += 0.1;
  }
  */

  // don't worry about this... but if you want to animate something, this has to be called at the end of your draw function. It's what's called a "recurive call"
  window.requestAnimationFrame(animation_loop);
}

// Don't worry about this too much. It just draws a red rectangle at the given x,y coordinates and at the given angle (called "ang")
function drawTank(x, y, ang) {
  // BELOW IS CODE FOR DRAWING TANK AT THE PROPER LOCATION / ANGLE
  ctx.beginPath();
  // just sets colors
  ctx.strokeStyle = "darkblue"; // the border should have a color
  ctx.lineWidth = 1; // makes the border of the circle thicker, otherwise it's too thin to see
  ctx.fillStyle = "darkblue"; // the inner part can have a different color
  // Rotates rectangle before we draw it
  ctx.translate(x, y);
  ctx.rotate(angle - Math.PI / 2);
  ctx.translate(-x, -y);

  // actually draw the tank at the correct position with the correct widegh
  ctx.fillStyle = "red";
  ctx.fillRect(x - tankWidth / 2, y - tankHeight / 2, tankWidth, tankHeight);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // Ready to draw! (hey Javascript, now make the stroke and fill for whatever path I told you up until now)
  ctx.stroke();
  ctx.fill();
}
