
var song_active   = new THREE.MeshBasicMaterial({color:0x000000});
var song_neutral  = new THREE.MeshBasicMaterial({ color:0x222222 , wireframe:true });
var song_hover    = new THREE.MeshBasicMaterial({ color:0xc222222 });

var textCreator   = new TextCreator( 500 );

var ACTIVE_SONG;
var SONGS = [];
var SONG_MESHES = [];


/*var SONG_PARAMS = [

  [ new THREE

]*/

function Song( flow , title , track ,fromMesh , toMesh , flowParams , particleParams ){

  this.uniforms = {

    t_audio:{ type:"t" , value:audioController.texture },
    color:{ type:"v3" , value:new THREE.Vector3( 1 , .5 , .5 )},

  }

  this.activeMaterial = new THREE.ShaderMaterial({

    uniforms:this.uniforms,
    fragmentShader:fs.active,
    vertexShader:vs.active

  });



  this.flow = flow;
  this.title = title;
  this.track = track;
  this.flowParams = flowParams;
  this.particleParams = particleParams;

  this.hovered  = false;
  this.active   = false;

  this.fromMesh = fromMesh;
  this.fromMesh.material = song_neutral;

  this.toMesh = toMesh;
  this.toMesh.material = song_neutral;

  this.stream = new Stream( this.track , audioController , false );

  this.titleMesh = textCreator.createMesh( title );
  var t = 100 + (this.titleMesh.scale.x *  this.titleMesh.scaledWidth/4);
  var p =  new THREE.Vector3( t , 0 , 0 );

  //var p = new THREE.Vector3( t, 0 ,  0 );
  this.titleMesh.position = fromMesh.position.clone().add( p );
  this.titleMesh.position



  var to = this.toMesh;
  var from = this.fromMesh;
  var f = flow.createPositionsTexture;
  this.fromTexture = flow.createPositionsTexture( from.geometry , from.position , from.rotation );
  this.toTexture = flow.createPositionsTexture( to.geometry , to.position , to.rotation );

  var geo = new THREE.PlaneGeometry( 100 , 100 );
  
  var debugMesh = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({
    map: this.fromTexture
  }));

  /*debugMesh.position.set( Math.random()*500, 200 , 0 );
  scene.add( debugMesh );*/



  SONGS.push( this );

  this.addToScene();

}


Song.prototype.addToScene = function(){

  scene.add( this.toMesh );
  scene.add( this.fromMesh );
  scene.add( this.titleMesh );

}
/*Song.prototype.onClick = function(){

  if( this.hovered == true ){
    if( !this.active )
      this.activate();
    else
      this.deactivate();
  }


}*/

Song.prototype.onHoverOver = function(){

  this.hovered = true;
  
  if( !this.active ){
    this.fromMesh.material = song_hover;
   // this.fromMesh.material.needsUpdate = true;

    this.toMesh.material = song_hover;
    //this.toMesh.material.needsUpdate = true;
  }


}

Song.prototype.onHoverOut = function(){

  this.hovered = false;
  
  if( !this.active ){
    this.fromMesh.material = song_neutral;
   // this.fromMesh.material.needsUpdate = true;

    this.toMesh.material = song_neutral;
   // this.toMesh.material.needsUpdate = true;
  }



}

Song.prototype.activate = function(){

  //this.mesh.material = song_active;
  //this.mesh.material.needsUpdate = true; // TODO: is this right?

  var self = this;
  var noneOtherPlaying = true;
  for( var i = 0; i < SONGS.length; i++ ){

    if( SONGS[i].active == true ){
      noneOtherPlaying = false;
      SONGS[i].deactivate();
     
      setTimeout( self.begin.bind( this ) , 1000 ); // one second to play

    }

  }


  // Only start this stream if none others are playing,
  // otherwise, wait until it allows us to to start playing
  if( noneOtherPlaying == true ){
    this.begin();
  }

}

// to be called at the proper moment in activate
Song.prototype.begin = function(){

  this.active = true;

  this.setFlowUniforms();
  this.setParticleUniforms();
 
 // this.flow.reset( this.fromTexture );
  this.fromMesh.material = this.activeMaterial;
  this.fromMesh.material.needsUpdate = true;

  this.toMesh.material = this.activeMaterial;
  this.toMesh.material.needsUpdate = true;


  this.stream.play();
  this.flow.flowShader.uniforms.t_from.value = this.fromTexture;
  this.flow.flowShader.uniforms.t_to.value = this.toTexture;

  //TODO: Update parameters for the flow shader

}

Song.prototype.update = function(){


}

Song.prototype.deactivate = function(){

  this.active = false;
  this.stream.stop();

  this.fromMesh.material = song_neutral;
  this.toMesh.material = song_neutral;



}

Song.prototype.setParticleUniforms = function(){

  for( propt  in this.particleParams ){
   
    console.log( this.particleParams[propt] );
    var u = this.flow.particles.material.uniforms;
    u[propt].value = this.particleParams[propt].value;
    
  }

}

Song.prototype.setFlowUniforms = function(){

  for( propt  in this.flowParams ){
   
    console.log( this.flowParams[propt] );
    var u = this.flow.flowShader.uniforms;
    u[propt].value = this.flowParams[propt].value;
    
  }

}


