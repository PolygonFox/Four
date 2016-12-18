var GTA = GTA || {};

GTA.Car = function(scene, inputController, position) {
	
	this.initializeVehicle(scene);
	this.velocity = new THREE.Vector3(0, 0, 0);

	this.controller = inputController;

	this.steering = 0;

	this.gear = 0; 
}

GTA.Car.prototype = {

	getPosition: function() {
		return this.vehicle.mesh.position;
	},

	addWheel: function(wheelIndex) {



		var wheelGeometry = new THREE.BoxGeometry(0.5, 1, 1);
		var wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x5555FF });
		this.vehicle.addWheel(
			wheelGeometry, // wheel_geometry
			wheelMaterial, //wheel_material
			new THREE.Vector3( // connection_point
				wheelIndex % 2 === 0 ? -1.5 : 1.5,
				1,
				wheelIndex < 2 ? 3 : -3
			),
			new THREE.Vector3(0, -1, 0), // wheel_direction
			new THREE.Vector3(-1, 0, 0), // wheel_axle
			0.5, // suspension_rest_length
			0.7, // wheel_radius
			wheelIndex < 2 ? false : true, // is_front_wheel
			undefined // tuning
		);
	},

	initializeVehicle: function(scene) {

		var geometry = Four.AssetManager.getGeometry(0x000000);

		var material = Physijs.createMaterial(
		    Four.AssetManager.getMaterial(0x000000),
		    0.8, // Friction
		    0.3  // Restitution
		);


		var mesh = new Physijs.BoxMesh(
			geometry,
			material
		);


		geometry = new THREE.Geometry().fromBufferGeometry( geometry )

		// BEGIN
			var i,
			width, height, depth,
			points = [];


		if ( !geometry.boundingBox ) {
			geometry.computeBoundingBox();
		}

		for ( i = 0; i < geometry.vertices.length; i++ ) {
			points.push({
				x: geometry.vertices[i].x,
				y: geometry.vertices[i].y,
				z: geometry.vertices[i].z
			});
		}


		width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
		height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
		depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

		mesh._physijs.type = 'convex';
		mesh._physijs.points = points;
		mesh._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;

		// End

		this.vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
			10.88, // suspension_stiffness
			1.83, // suspension_compression
			0.28, // suspension_damping
			500, // max_suspension_travel
			10.5, // friction_slip
			6000 // max_suspension_force
		));

		scene.add(this.vehicle);

		for(var i = 0; i < 4; i++)
			this.addWheel(i);
	},

	setBrakes: function(value) {
		this.vehicle.setBrake( value, 0 );
		this.vehicle.setBrake( value, 1 );
		this.vehicle.setBrake( value, 2 );
		this.vehicle.setBrake( value, 3 );
	},

	update: function(deltaTime) {

		if(this.controller.isKeyDown(Four.Keys.FORWARD)) {
				
			if(this.vehicle.mesh.getLinearVelocity().length() > 0.5 && this.gear == -1)
			{
				this.setBrakes(5);
			} else {
				this.gear = 1;
				this.setBrakes(0);
				this.vehicle.applyEngineForce( 300 );
			}

		}
		else 
			this.vehicle.applyEngineForce( 0 );


		if(this.controller.isKeyDown(Four.Keys.BACKWARD)) {
			
			if(this.vehicle.mesh.getLinearVelocity().length() > 0.5 && this.gear == 1)
			{
				this.setBrakes(5);
			} else {
				this.gear = -1;
				this.setBrakes(0);
				this.vehicle.applyEngineForce( -300 );
			}
		
		}
			
		if(this.controller.isKeyDown(Four.Keys.LEFT)) {
			this.vehicle.setSteering( 0.6, 0 );
			this.vehicle.setSteering( 0.6, 1 );
		}
	
		
		if(this.controller.isKeyDown(Four.Keys.RIGHT)) {
			this.vehicle.setSteering( -0.6, 0 );
			this.vehicle.setSteering( -0.6, 1 );
		}
	}
}