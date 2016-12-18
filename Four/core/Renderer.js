var Four = Four || {};


Four.Renderer = function(width, height) {

	var _this = this;

	this.width = width;
	this.height = height;

	this.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
	this.WebGLRenderer.setSize(window.innerWidth * this.width, window.innerHeight * this.height);

	this.scenes = [];

	window.addEventListener('resize', function(e) {
		_this.WebGLRenderer.setSize(window.innerWidth * _this.width, window.innerHeight * _this.height);

		if(_this.activeCamera)
		{
			_this.activeCamera.aspect = window.innerWidth * _this.width / (window.innerHeight * _this.height);
    		_this.activeCamera.updateProjectionMatrix();
		}
	
	});

	this.WebGLRenderer.setClearColor(0x222222, 1);

	// Add the renderer to the document.
	document.body.appendChild(this.WebGLRenderer.domElement);
}

Four.Renderer.prototype = {

	createScene: function(name, makeActive) {
		var scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });
		this.scenes[name] = scene;
		
		if(makeActive)
		{
			this.setActiveScene(scene);
		}

		return scene;
	},

	setActiveCamera: function(camera) {
		this.activeCamera = camera;
	},

	setActiveScene: function(scene) {
		this.activeScene = scene;
	},

	update: function() {
		this.activeScene.simulate();
		this.WebGLRenderer.render(this.activeScene, this.activeCamera);
	}
}