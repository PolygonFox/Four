var Four = Four || {};

Four.InputManager = function() {

	this.keys = [];
	this.mouseButtons = [];


	for(var i = 0; i <= 222; i++)
	{
		this.keys[i] = false;
	}

	window.addEventListener('keyup', Four.InputManager.prototype.handleKeyUp.bind(this));
	window.addEventListener('keydown', Four.InputManager.prototype.handleKeyDown.bind(this));
}


Four.InputManager.prototype = {

	handleMouseUp: function(event) {

	},

	handleMouseDown: function(event) {

	},

	handleMouseMove: function(event) {

	},

	handleKeyDown: function(event) {

		this.keys[event.keyCode] = true;
	},

	handleKeyUp: function(event) {

		this.keys[event.keyCode] = false;
	},

	isKeyDown: function(keyCode) {

		return this.keys[keyCode];
	}
}
