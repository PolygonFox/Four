var Four = Four || {};

Four.Engine = function(updateFn) {
	var _this = this;

	Physijs.scripts.worker = 'dependencies/physijs/physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';

	this.input = new Four.InputManager();

	this.clock = new THREE.Clock();

	this.renderers = [];


	this.update = function() {
		// Replace with the update function of the game.
	};

}


Four.Engine.prototype = {

	createRenderer: function(width, height, activeCamera, activeScene) {

		var renderer = new Four.Renderer(width, height, activeCamera, activeScene);

		this.renderers.push(renderer);

		return renderer;
	},

	createController: function(mapping) {
		return new Four.InputController(this.input, mapping);
	},

	run: function() {
		this.tick();
	},

	tick: function() {

		// 60 frames per second
		requestAnimFrame(Four.Engine.prototype.tick.bind(this));
		
		var deltaTime = this.clock.getDelta();

		if(this.input.isKeyDown(Four.Keys.FORWARD))
			console.log("true");

		this.update(deltaTime);

		for(var i = 0; i < this.renderers.length; i++)
		{
			this.renderers[i].update();
		}

	}
}