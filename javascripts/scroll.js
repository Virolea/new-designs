$(function() {

  // Main variables
  var w = $('.pano-photo').width();
  var h = $('.pano-photo').height();
  var ar = w / h;
  var zPhotoWidth = ar * 400; // 400 A METTRE A JOUR AVEC LA VALEUR INTRINSEQUE DE L'ELEMENT!!!!
  var xLimit = (w - zPhotoWidth);
  var el = $('.pano-zoom');
  var bPos = el.css('background-position-x');
  var pano = {
      goingLeft: false,
      goingRight: false,
      lspeed: 0,
      rspeed: 0,
      maxSpeed: 10
  };

  // Panorama speed management
 (function panoLoop() {
      var bPos = parseInt(el.css('background-position-x'));
      if (pano.goingLeft) {
        pano.lspeed = Math.min(pano.lspeed *1.1 || 1, pano.maxSpeed);
      } else {
        pano.lspeed = Math.max(pano.lspeed - 0.5, 0);
      }
      if (pano.goingRight) {
        pano.rspeed = Math.min(pano.rspeed *1.1 || 1, pano.maxSpeed);
      } else {
        pano.rspeed = Math.max(pano.rspeed - 0.5, 0);
      }
      pano.speed = (pano.rspeed - pano.lspeed);
      post = parseInt(bPos)
      if (bPos > 0) {
        el.css({'background-position': '0px'});
      } else if (bPos < xLimit) {
        el.css({'background-position': xLimit + 'px'});
      } else {
        el.css({'background-position': '+=' + pano.speed});
      }
      requestAnimationFrame(panoLoop);
  }());

//Move pano
  $(document).keydown(function(e){
      switch(e.which){
          case 39://left
            pano.goingLeft= true;
            break;
          case 37://right
            pano.goingRight = true;
          default: return;

      e.preventDefault();//not sure if needed
      }
  }).keyup(function(e){
      switch(e.which){
        case 39://left
          pano.goingLeft= false;
          break;
        case 37://right
          pano.goingRight= false;
        default: return;
      //e.preventDefault();//not sure if needed
      }
  });
 });

