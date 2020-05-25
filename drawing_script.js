var canvas = document.getElementById("canvas");
var position_x = window.innerWidth / 2; // set staring position halfway across screen
var position_y = window.innerHeight / 2; // set staring position halfway across screen
var angle = 0; // start pointing right
var move_x = 2; // how much it moves per frame in the x direction (while holding down 'W')
var move_y = 2; // how much it moves per frame in the y direction (while holding down 'W')

var turnRight = false; // should we be turning right now?
var turnLeft = false; // are we turning eft right now?
var movingForward = false; // are we moving forward right now? (this changes when you hit W)

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
  window.requestAnimationFrame(draw);
}

// runs ~30-60 times per second? Tells the computer what to draw to the canvas
function draw() {
  var ctx = canvas.getContext("2d");
  if (canvas.getContext) {
    // every frame, this erases the canvas for the whole window (every frame we redraw the shapes).
    ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

    // BELOW IS CODE FOR DRAWING TANK AT THE PROPER LOCATION / ANGLE
    ctx.beginPath();
    // just sets colors
    ctx.strokeStyle = "darkblue"; // the border should have a color
    ctx.lineWidth = 1; // makes the border of the circle thicker, otherwise it's too thin to see
    ctx.fillStyle = "darkblue"; // the inner part can have a different color
    // Rotates rectangle before we draw it
    ctx.translate(position_x, position_y);
    ctx.rotate(angle - Math.PI / 2);
    ctx.translate(-position_x, -position_y);

    // actually draw the tank at the correct position with the correct widegh
    ctx.fillStyle = "red";
    ctx.fillRect(
      position_x - tankWidth / 2,
      position_y - tankHeight / 2,
      tankWidth,
      tankHeight
    );
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Ready to draw! (hey Javascript, now make the stroke and fill for whatever path I told you up until now)
    ctx.stroke();
    ctx.fill();
  }

  if (turnLeft) {
    angle -= 0.1;
  }
  if (turnRight) {
    angle += 0.1;
  }

  if (movingForward) {
    position_x += Math.cos(angle) * speed;
    position_y += Math.sin(angle) * speed;
  }

  // don't worry about this... but if you want to animate something, this has to be called at the end of your draw function. It's what's called a "recurive call"
  window.requestAnimationFrame(draw);
}

function handleKeyDown(e) {
  var code = e.code;
  console.log(code);
  switch (code) {
    case "KeyA":
      turnLeft = true;
      turnRight = false;
      console.log("Left");
      break; //Left key
    case "KeyD":
      turnLeft = false;
      turnRight = true;
      console.log("Right");
      break; //Up key
    case "KeyW":
      movingForward = true;
      console.log("Forward");
      break; //Right key
    case "KeyS":
      console.log("Backward");
      break; //Down key
  }
}

function handleKeyUp(e) {
  turnLeft = false;
  turnRight = false;
  movingForward = false;
}

function handleMouseMove(e) {
  console.log("mouse x position? " + e.offsetX);
  console.log("mouse y position? " + e.offsetY);

  // HERE we will change the angle so the tank is always pointing to our mouse...
}
