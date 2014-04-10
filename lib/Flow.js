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

  this.rt_2 = this.rt_1.clone();
  this.rt_3 = this.rt_1.clone();

  this.counter = 0;

  // gives us an array of balls, as well as ball positions
  this.createBalls( 9 );

  this.particles          = this.createParticles();
  this.texturePassShader  = this.createTexturePassShader();
  this.flowShader         = this.createFlowShader();

  this.debugMeshes        = this.createDebugMeshes();

  this.gpgpu = new GPGPU( renderer );

}

Flow.prototype.createDebugMeshes = function(){

  var meshes = [];

  var geo = new THREE.PlaneGeometry( 100 , 100 );
    
  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.rt_1
  }));
  debugMesh.position.set( -150 , 200 , 0 );
  meshes.push( debugMesh );
      
  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.rt_2
  }));
  debugMesh.position.set( 0 , 200 , 0 );
  meshes.push( debugMesh );

  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.rt_3
  }));
  debugMesh.position.set( 150 , 200 , 0 );
  meshes.push( debugMesh );

  return meshes;

}

Flow.prototype.removeDebugMeshes = function(){

  for( var i = 0; i < this.debugMeshes; i++ ){
    scene.remove( this.debugMeshes[i] );
  }

}

Flow.prototype.addDebugMeshes = function(){

  for( var i = 0; i < this.debugMeshes; i++ ){
    scene.add( this.debugMeshes[i] );
  }

}

Flow.prototype.createParticles = function(){

  var geo = this.createParticleGeometry();
  var mat = this.createParticleMaterial();
  var particles = new THREE.ParticleSystem( geo , mat );
  return particles;

}

Flow.prototype.createParticleMaterial = function(){

    var uniforms = {

      map:{ type:"t" , value:null},
      size:{ type:"f" , value:this.size},
      sprite:{type:"t" , value:null },
      audio:{type:"t" , value:audioController.texture }

    }

    var material = new THREE.ShaderMaterial({
      uniforms:uniforms,
      vertexShader: vs.render,
      fragmentShader: fs.render,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return material;

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

  var tempMesh  = new THREE.Mesh( geo , mainMaterial );

  tempMesh.position = position;
  tempMesh.rotation = rotation;

 // scene.add( tempMesh );

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

  positionsTexture.mesh = tempMesh;

  return positionsTexture;

}


Flow.prototype.createTexturePassShader = function(){

  var uniforms = {
    texture:{  type:"t"  , value:null     },
  }
  
  var texturePassShader = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:vs.pass,
    fragmentShader:fs.pass
  });

  return texturePassShader

}

Flow.prototype.createFlowShader = function(){

  var uniforms = {
    t_oPos:{  type:"t"  , value:null },
    t_pos:{   type:"t"  , value:null },
    t_from:{  type:"t"  , value:null },
    t_to:{    type:"t"  , value:null },
    t_audio:{ type:"t"  , value:audioController.texture   },
    curlSize:{type:"f"  , value:.001},
    dirPower:{type:"f"  , value:3.0},
    velPower:{type:"f"  , value:1.0},
    curlPower:{type:"f"  , value:2.2},
    audioPower:{type:"f"  , value:.5},
    resetRadius:{type:"f"  , value:10.0},

    balls:{ type:"v3v"  , value:this.ballPositions   }
  }


  var flowShader = new THREE.ShaderMaterial({

    uniforms:uniforms,
    vertexShader:vs.flow,
    fragmentShader:fs.flow

  });

  return flowShader;


}

Flow.prototype.createBallMaterial = function(){

  var u = {
    t_audio:{ type:"t" , value:audioController.texture},
  }

  var ballMaterial = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball,
    fragmentShader:fs.ball,
    transparent: true,
    opacity: .1,
    //blending: THREE.AdditiveBlending

  });

  return ballMaterial;


}
Flow.prototype.createBalls = function( numOf ){

  var geo = new THREE.IcosahedronGeometry( 190 , 4 );
 // var geo = new THREE.IcosahedronGeometry( 1 , 4 );

  this.ballMaterial = this.createBallMaterial();

  this.balls = [];
  this.ballPositions = [];
  for( var i = 0; i < numOf; i++ ){

    var w = (Math.floor(i / 3))-1;
    var h = (i % 3)-1;
    var x = w * 500;
    var y = h * 500;
    var z = -100;

    var ball = new THREE.Mesh( geo , this.ballMaterial );
    //ball.material.uniforms.t_audio.value = audioController.texture;
    ball.position = new THREE.Vector3( x , y , z );

    this.balls.push( ball );
    this.ballPositions.push( ball.position );

  }

}

Flow.prototype.addBalls = function(){

  for( var i = 0; i < this.balls.length; i++ ){
    scene.add( this.balls[i] );
  }

}

Flow.prototype.removeBalls = function(){

  for( var i = 0; i < this.balls.length; i++ ){
    scene.remove( this.balls[i] );
  }

}


Flow.prototype.update = function(){

  var flipFlop = this.counter % 3;
  
  if( flipFlop == 0 ){

    this.flowShader.uniforms.t_oPos.value = this.rt_1;
    this.flowShader.uniforms.t_pos.value = this.rt_2;
    this.gpgpu.pass( this.flowShader , this.rt_3 );

    this.particles.material.uniforms.map.value = this.rt_3;


  }else if( flipFlop == 1 ){
    
    this.flowShader.uniforms.t_oPos.value = this.rt_2;
    this.flowShader.uniforms.t_pos.value = this.rt_3;
    this.gpgpu.pass( this.flowShader , this.rt_1 );

    this.particles.material.uniforms.map.value = this.rt_1;


  }else if( flipFlop == 2 ){

    this.flowShader.uniforms.t_oPos.value = this.rt_3;
    this.flowShader.uniforms.t_pos.value = this.rt_1;
    this.gpgpu.pass( this.flowShader , this.rt_2 );

    this.particles.material.uniforms.map.value = this.rt_2;
      
  }


  this.counter ++;

}


// resets the render targets to the from position
Flow.prototype.reset = function( texture ){

  this.texturePassShader.uniforms.texture.value = texture;
  this.gpgpu.pass( this.texturePassShader , this.rt_1 );
  this.gpgpu.pass( this.texturePassShader , this.rt_2 );
  this.gpgpu.pass( this.texturePassShader , this.rt_3 );


}

