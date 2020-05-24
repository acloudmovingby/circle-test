var canvas = document.getElementById("canvas");
var position_x = window.innerWidth / 2;
var position_y = window.innerHeight / 2;
var angle = 0;
var move_x = 2;
var move_y = 2;
var counter = 0; // use to animate things, increments every time frame is drawn
var turnRight = false;
var turnLeft = false;
var movingForward = false;
var speed = 10;
var tankWidth = 40;
var tankHeight = 80;

// run this first to (1) make our canvas resize with window (2) start animation loop for canvas
if (canvas.getContext) {
  // canvas auto resizes with window
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);

  // begin animation loop (loop of drawing frames)
  window.requestAnimationFrame(draw);
}

// runs ~30-60 times per second? Tells the computer what to draw to the canvas
function draw() {
  var ctx = canvas.getContext("2d");
  if (canvas.getContext) {
    // every frame, this erases the canvas for the whole window (every frame we redraw the shapes).
    ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

    // begin recording what we tell you to do!
    ctx.beginPath();

    // just sets colors
    ctx.strokeStyle = "darkblue"; // the border should have a color
    ctx.lineWidth = 1; // makes the border of the circle thicker, otherwise it's too thin to see
    ctx.fillStyle = "darkblue"; // the inner part can have a different color

    //made these into variables so it's clearer
    var x = position_x;
    var y = position_y;
    var radius = 10;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    var counterClockwise = false;
    // make an arc
    //ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);

    // draw rectangle

    // Matrix transformation
    ctx.translate(position_x, position_y);
    ctx.rotate(angle - Math.PI / 2);
    ctx.translate(-position_x, -position_y);

    // Rotated rectangle
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
  counter++; // add 1 to counter every time frame is refreshed
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

  //console.log("counter: " + counter); // logs to the console what counter is, so we can actually see the value

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
