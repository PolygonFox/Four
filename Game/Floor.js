var GTA = GTA || {};

GTA.Floor = function(scene, inputController, position) {
	
	this.initializeModel(scene);

	this.model.__dirtyPosition = true;
 	this.model.position.set(position.x, position.y, position.z);
    this.model.__dirtyPosition = true;

    // Change the object's rotation
   // mesh.rotation.set(0, 90, 180);
   // mesh.__dirtyRotation = true;

	this.velocity = new THREE.Vector3(0, 0, 0);
	this.controller = inputController;
}

GTA.Floor.prototype = {

	initializeModel: function(scene) {

		var geometry = new THREE.BoxGeometry(50, 1, 50);

		var material = Physijs.createMaterial(
		    new THREE.MeshStandardMaterial({ color: 0xFFFFFF }),
		    0.8, // Friction
		    0.3  // Restitution
		);

		this.model = new Physijs.BoxMesh(geometry, material, 0);
		scene.add(this.model);
	}
	
}