var canvas = document.getElementById("canvas");
var counter = 0; // use to animate things, increments every time frame is drawn

// run this first to (1) make our canvas resize with window (2) start animation loop for canvas
if (canvas.getContext) {
  // canvas auto resizes with window
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

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
    ctx.lineWidth = 8; // makes the border of the circle thicker, otherwise it's too thin to see
    ctx.fillStyle = "white"; // the inner part can have a different color

    //made these into variables so it's clearer
    var x = 300;
    var y = 300;
    var radius = 100;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    var counterClockwise = false;
    // make an arc
    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);

    // Ready to draw! (hey Javascript, now make the stroke and fill for whatever path I told you up until now)
    ctx.stroke();
    ctx.fill();
  }
  counter++; // add 1 to counter every time frame is refreshed
  console.log("counter: " + counter); // logs to the console what counter is, so we can actually see the value

  // don't worry about this... but if you want to animate something, this has to be called at the end of your draw function. It's what's called a "recurive call"
  window.requestAnimationFrame(draw);
}
