var Four = Four || {};

Four.InputController = function(inputManager, mapping) {
	this.map = mapping;
	this.manager = inputManager;

}

Four.InputController.prototype = {
	isKeyDown: function(key) {
		return this.manager.isKeyDown(this.map[key]);
	}
}