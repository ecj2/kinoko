var Kinoko = new class {

  constructor() {

    // Everything will be drawn on this canvas.
    this.canvas = undefined;

    // Resources will be queued here.
    this.resources = [];

    // This dictates how often the canvas will be updated.
    this.frame_rate = 0;
  }

  initialize() {

    var canvas = document.createElement("canvas");

    if (!!!(canvas && canvas.getContext("2d"))) {

      // The browser does not support the canvas element.
      return false;
    }

    return true;
  }

  setCanvas(canvas_id, canvas_width, canvas_height) {

    // Get the specified canvas element.
    var canvas = document.getElementById(canvas_id);

    if (!!!canvas) {

      // The specified canvas element does not exist.
      return false;
    }

    // Set the dimensions of the canvas.
    canvas.width = canvas_width;
    canvas.height = canvas_height;

    // Set the dimensions, elements, and contexts of the member canvas.
    this.canvas = {

      width: canvas_width,

      height: canvas_height,

      canvas: canvas,

      context: canvas.getContext("2d"),

      ready: true
    };

    return true;
  }

  clearCanvas(color) {

    this.setStrokeFillStyle(color);

    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvasWidth() {

    return this.canvas.width;
  }

  getCanvasHeight() {

    return this.canvas.height;
  }

  setFrameRate(frame_rate) {

    this.frame_rate = frame_rate;
  }

  getFrameRate() {

    return this.frame_rate;
  }

  resourcesLoaded(procedure) {

    var number_of_resources = 0;
    var number_of_resources_loaded = 0;

    for (var i = 0; i < this.resources.length; ++i) {

      ++number_of_resources;

      if (this.resources[i].ready) {

        ++number_of_resources_loaded;
      }
    }

    if (number_of_resources_loaded < number_of_resources) {

      // Some resources have not completed downloading yet.
      window.setTimeout(resourcesLoaded, 100, procedure);
    }
    else {

      // All of the resources have completed downloading.
      procedure();
    }
  }

  createLoop(procedure) {

    window.setInterval(

      function() {

        procedure();
      },

      1000 / this.frame_rate
    );
  }

  makeColor(r, g, b, a = 255) {

    return {r: r, g: g, b: b, a: a};
  }

  setStrokeFillStyle(color, line_width = 0) {

    var r = color.r;
    var g = color.g;
    var b = color.b;
    var a = color.a / 255.0;

    this.canvas.context.lineWidth = line_width;
    this.canvas.context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    this.canvas.context.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  loadFunction(function_name) {

    // Call the specified function when the window loads.
    window.addEventListener("load", function_name);
  }

  drawArc(center_x, center_y, radius, start_angle, end_angle, color, line_width) {

    this.setStrokeFillStyle(color, line_width);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, start_angle, end_angle);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawLine(begin_x, begin_y, end_x, end_y, color, line_width) {

    this.setStrokeFillStyle(color, line_width);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(begin_x, begin_y);
    this.canvas.context.lineTo(end_x, end_y);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawCircle(center_x, center_y, radius, color, line_width) {

    this.setStrokeFillStyle(color, line_width);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledCircle(center_x, center_y, radius, color) {

    this.setStrokeFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }

  drawRectangle(begin_x, begin_y, end_x, end_y, color, line_width) {

    this.setStrokeFillStyle(color, line_width);

    this.canvas.context.beginPath();
    this.canvas.context.strokeRect(begin_x, begin_y, end_x - begin_x, end_y - begin_y);
    this.canvas.context.closePath();
  }

  drawFilledArc(center_x, center_y, radius, start_angle, end_angle, color) {

    this.setStrokeFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, start_angle, end_angle);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }

  drawFilledRectangle(begin_x, begin_y, end_x, end_y, color) {

    this.setStrokeFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.fillRect(begin_x, begin_y, end_x - begin_x, end_y - begin_y);
    this.canvas.context.closePath();
  }

  drawTriangle(x1, y1, x2, y2, x3, y3, color, line_width) {

    this.setStrokeFillStyle(color, line_width);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(x1, y1);
    this.canvas.context.lineTo(x2, y2);
    this.canvas.context.lineTo(x3, y3);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color) {

    this.setStrokeFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(x1, y1);
    this.canvas.context.lineTo(x2, y2);
    this.canvas.context.lineTo(x3, y3);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }
}
