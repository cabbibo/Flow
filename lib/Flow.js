function Flow( size ){

  this.size = size;
  this.s2   = size * size;

  this.ps_geo = this.createParticleGeometry();
  this.ps_mat = this.createParticleMaterial();
  this.ps = new THREE.ParticleSystem( this.ps_geo , this.ps_mat );

  this.rt_1 = new THREE.WebGLRenderTarget( size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type:THREE.FloatType,
    stencilBuffer: false
  });

}

Flow.prototype.createParticleMaterial = function(){

    var uniforms = {

      map:{ type:"t" , value:fromTexture },
      size:{ type:"f" , value:size},
      sprite:{type:"t" , value:texture },

    }


}

Flow.prototype.createParticleGeometry = function(){

  var geo = new THREE.BufferGeometry();

  geo.addAttribute( 'position', Float32Array , this.s2 , 3 );
 
  var positions = geo.attributes.position.array;

  for ( var i = 0, j = 0, l = positions.length / 3; i < l; i ++, j += 3 ) {

    positions[ j     ] = ( i % size ) / size;
    positions[ j + 1 ] = Math.floor( i / size ) / size;

  }

  return geo;


}

Flow.prototype.createPositionsTexture = function( geo , position , rotation ){

  var geometry = new THREE.Geometry();

  var mat = new THREE.MeshBasicMaterial();
  var tempMesh  = new THREE.Mesh( geo , mat );

  console.log( geometry );
  tempMesh.position = position;
  tempMesh.rotation = rotation;

  THREE.GeometryUtils.merge( geometry , tempMesh );

  
 // var geometry = geo;
  var point = new THREE.Vector3();
  var facesLength = geometry.faces.length;

  var data = new Float32Array( this.s2 * 4 );

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


