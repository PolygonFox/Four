var Four = Four || {};

Four.AssetManager = {

	initialize: function(onComplete, onProgress) {
		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

		Four.AssetManager.load(0x000000, 'old_timer', 'Old_timer');

		Four.AssetManager.onComplete = onComplete;
		Four.AssetManager.onProgress = onProgress;

	},

	onComplete: undefined,
	onProgress: undefined,

	geometries: [],
	materials: [],

	assetsToLoad: 0,

	totalAssets: 0,

	load: function(hex, path, fileName) {

		Four.AssetManager.assetsToLoad++;

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath( 'assets/' + path + '/' );
		mtlLoader.load( fileName + '.mtl', function( materials ) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/' + path + '/'  );
			objLoader.load( fileName + '.obj', function ( object ) {
				Four.AssetManager.geometries[hex] = object.children[0].geometry;
				Four.AssetManager.materials[hex] = object.children[0].material;

				Four.AssetManager.assetsToLoad--;

				Four.AssetManager.onProgress(Four.AssetManager.assetsToLoad);

				if(Four.AssetManager.assetsToLoad === 0)
					Four.AssetManager.onComplete();

			});

		});


	},

	getGeometry(hex) {

		return Four.AssetManager.geometries[hex];
	},

	getMaterial(hex) {

		return Four.AssetManager.materials[hex];
	}
	
}