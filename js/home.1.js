function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  });
}



ready(function(){
  function Constellation(canvas, options) {
    var $canvas = $(canvas),
      context = canvas.getContext('2d'),
      defaults = {
        star: {
          color: 'rgba(255, 255, 255, .5)',
          width: 1,
          randomWidth: true
        },
        line: {
          color: 'rgba(255, 255, 255, .5)',
          width: 0.2
        },
        position: {
          x: 0, // This value will be overwritten at startup
          y: 0 // This value will be overwritten at startup
        },
        velocity: 0.1,
        length: 100,
        distance: 120,
        radius: 150,
        stars: []
      },
      config = $.extend(true, {}, defaults, options);

    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.vx = (config.velocity - (Math.random() * 0.5));
      this.vy = (config.velocity - (Math.random() * 0.5));

      this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
    }

    Star.prototype = {
      create: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      },

      animate: function () {
        for (var i = 0; i < config.length; i++) {
          var star = config.stars[i];

          if (star.y < 0 || star.y > canvas.height) {
            star.vx = star.vx;
            star.vy = - star.vy;
          } else if (star.x < 0 || star.x > canvas.width) {
            star.vx = - star.vx;
            star.vy = star.vy;
          }

          star.x += star.vx;
          star.y += star.vy;
        }
      },

      line: function () {
        var length = config.length, iStar, jStar, i, j;

        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i];
            jStar = config.stars[j];
            if (Math.abs(iStar.x - jStar.x) < config.distance &&
              Math.abs(iStar.y - jStar.y) < config.distance ) {
              if (Math.abs(iStar.x - config.position.x) < config.radius &&
                Math.abs(iStar.y - config.position.y) < config.radius ) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      }
    };

    this.createStars = function () {
      var length = config.length, star, i;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (i = 0; i < length; i++) {
        config.stars.push(new Star());
        star = config.stars[i];

        star.create();
      }

      star.line();
      star.animate();
    };

    this.setContext = function () {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty('position')) {
        config.position = {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        };
      }
    };

    this.loop = function (callback) {
      callback();

      window.requestAnimationFrame(function () {
        this.loop(callback);
      }.bind(this));
    };

    this.bind = function () {
      $canvas.on('mousemove', function (e) {
        config.position.x = e.pageX - $canvas.offset().left;
        config.position.y = e.pageY - $canvas.offset().top;
      });
    };

    this.init = function () {
      this.setContext();
      this.setInitialPosition();
      this.loop(this.createStars);
      this.bind();
    };
  }

  $.fn.constellation = function (options) {
    return this.each(function () {
      var c = new Constellation(this, options);
      c.init();
    });
  };
  var contNode = $('#J_cont');
  var canvasWidth = contNode.width();
  var canvasHeight = Math.floor(canvasWidth * 0.3333);
  var canvas = $('<canvas width="' + canvasWidth + '" height="'+ canvasHeight +'"></canvas>');
  contNode.append(canvas);
  var starNum = 100, radius = 250;
  if(canvasWidth < 600) {
    starNum = 30;
    radius = 100;
  }
  // Init plugin
  canvas.constellation({
    star: {
      width: 3
    },
    line: {
      color: 'rgba(255, 0, 0, .5)'
    },
    width: canvasWidth,
    height: canvasHeight,
    radius: radius,
    length: starNum
  });

});
