// Shim layer
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


// Four
var Four = Four || {};

Four.Keys = {
	FORWARD: 1,
	BACKWARD: 2,
	LEFT: 3,
	RIGHT: 4
}

Four.createEngine = function () {
	return new Four.Engine();
}