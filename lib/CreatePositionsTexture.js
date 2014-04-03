
function createPositionsTexture( geo , size , position ){

  var geometry = new THREE.Geometry();

  var mat = new THREE.MeshBasicMaterial();
  var tempMesh  = new THREE.Mesh( geo , mat );

  console.log( geometry );
  tempMesh.position = position;

  THREE.GeometryUtils.merge( geometry , tempMesh );

  
 // var geometry = geo;
  var point = new THREE.Vector3();
  var facesLength = geometry.faces.length;

  var data = new Float32Array( size * size * 4 );

  for ( var i = 0, l = data.length; i < l; i += 4 ) {

    var face = geometry.faces[ Math.floor( Math.random() * facesLength ) ];

    var vertex1 = geometry.vertices[ face.a ];
    var vertex2 = geometry.vertices[ Math.random() > 0.5 ? face.b : face.c ];

    point.subVectors( vertex2, vertex1 );
    point.multiplyScalar( Math.random() );
    point.add( vertex1 );

    data[ i ] = point.x;
    data[ i + 1 ] = point.y;
    data[ i + 2 ] = point.z;
    data[ i + 3 ] = i/4;

  }

  var positionsTexture = new THREE.DataTexture(
    data, 
    size, 
    size, 
    THREE.RGBAFormat, 
    THREE.FloatType 
  );


  positionsTexture.minFilter = THREE.NearestFilter;
  positionsTexture.magFilter = THREE.NearestFilter;
  positionsTexture.generateMipmaps = false;
  positionsTexture.needsUpdate = true;


  return positionsTexture;

}
