var GTA = GTA || {};

GTA.Game = function () {



	Four.AssetManager.initialize(GTA.Game.prototype.initialize.bind(this), function(numAssetsToLoad) {

		console.log('ASSETS: ' + numAssetsToLoad);
	});


}

GTA.Game.prototype = {

	initialize: function() {

		var engine = Four.createEngine();

		var screenWidth = screenHeight = 1;

		this.renderer = engine.createRenderer(screenWidth, screenHeight);

		// Setup demo scene
		this.scene = this.renderer.createScene("demo", true);

		this.camera = new THREE.PerspectiveCamera(75, screenWidth * window.innerWidth / (screenHeight * window.innerHeight), 0.1, 1000);
		this.camera.position.z = this.camera.position.x = this.camera.position.z = 30;
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.renderer.setActiveCamera(this.camera);

		// Controller
		var controllerMap = {};
		controllerMap[Four.Keys.FORWARD] = 87;
		controllerMap[Four.Keys.RIGHT] = 68;
		controllerMap[Four.Keys.BACKWARD] = 83;
		controllerMap[Four.Keys.LEFT] = 65;

		this.controller = engine.createController(controllerMap);

		var sun = new THREE.DirectionalLight(0xFFFFFF, 1.0);
		sun.position.set(1, 1, 1);
		this.scene.add(sun);

		this.scene.add(new THREE.AmbientLight(0xCCCCCC));

		this.car = this.spawnCar(new THREE.Vector3(0, 0, 0));
		this.floor = this.spawnFloor(new THREE.Vector3(0, -3, 0));

		//THREE.SceneUtils.detach( this.camera, this.scene, this.scene);
		//THREE.SceneUtils.attach( this.camera, this.scene, this.car.vehicle.mesh);
		this.camera.position.set(10, 6, -10);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		engine.update = GTA.Game.prototype.update.bind(this);

		engine.run();

	},

	spawnCar: function(position) {
		return new GTA.Car(this.scene, this.controller, position);
	},

	spawnFloor: function(position) {
		return new GTA.Floor(this.scene, this.controller, position);
	},

	update: function(deltaTime) {

		this.car.update(deltaTime);
	}
}