
var song_active   = new THREE.MeshBasicMaterial({color:0x000000});
var song_neutral  = new THREE.MeshBasicMaterial({ color:0x222222 , wireframe:true });
var song_hover    = new THREE.MeshBasicMaterial({ color:0xc222222 });

var textCreator   = new TextCreator( 100 );

var ACTIVE_SONG;
var SONGS = [];
var SONG_MESHES = [];


/*var SONG_PARAMS = [

  [ new THREE

]*/

function Song( flow , title , track ,fromMesh , toMesh , color ,  flowParams , particleParams , ballParams , modelParams){

  this.color = color;

  this.modelUniforms = {

    t_audio:{ type:"t" , value:audioController.texture },
    color:{ type:"v3" , value:this.color},
    power:{ type:"f" , value:1},
    timer:flow.timer
    

  }

  this.modelMaterial = new THREE.ShaderMaterial({

    uniforms:this.modelUniforms,
    fragmentShader:fs.model,
    vertexShader:vs.model,
    //transparent:true,
    //wireframe:true


  });

  /*this.modelUniforms = {
    t_audio:{ type:"t" , value:audioController.texture},
    power:{ type:"f" , value:1},
    colorPower:{ type:"f" , value:50},
    noisePower:{ type:"f" , value:50},
    noiseSpeed:{ type:"f" , value:500},
    noiseSize:{ type:"f" , value:.005},
    color:{ type:"v3" , value: new THREE.Vector3( .3 , .3 , .3 ) },
    displacementPower:{ type:"f" , value: 10},
    randomizer:{ type:"f" , value: Math.random() },
    timer: flow.timer
      
  }

  this.modelMaterial = new THREE.ShaderMaterial({

    uniforms:this.modelUniforms,
    vertexShader:vs.ball,
    fragmentShader:fs.ball,
 // transparent: true,

   // opacity: .9,
    //blending: THREE.AdditiveBlending,
    //depthWrite: false


  });*/


  this.textUniforms = {

    t_audio:{ type:"t" , value:audioController.texture },
    color:{ type:"v3" , value:this.color},
    t_text:{ type:"t" , value:null},
    power:{ type:"f" , value:1}

  }


  this.textMaterial = new THREE.ShaderMaterial({

    uniforms:this.textUniforms,
    fragmentShader:fs.text,
    vertexShader:vs.text,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 1,
    side:THREE.DoubleSide,
    depthWrite:false

  });





  this.flow = flow;
  this.title = title;
  this.track = track;
  this.flowParams = flowParams;
  this.particleParams = particleParams;
  this.ballParams = ballParams;

  this.hovered  = false;
  this.active   = false;

  this.fromMesh = fromMesh;
  this.fromMesh.material = this.modelMaterial;

  this.toMesh = toMesh;
  //this.toMesh.material = this.neutralMaterial;

  this.stream = new Stream( this.track , audioController , false );

  this.titleMesh = textCreator.createMesh( title );

  this.textMaterial.uniforms.t_text.value = this.titleMesh.material.map;
  this.titleMesh.material = this.textMaterial;
  //this.titleMesh.position.y = 500;
  this.titleMesh.position.z = -500;
  this.titleMesh.rotation.y = Math.PI;
  this.titleMesh.scale.multiplyScalar( 3 );

  this.titleMandala = new THREE.Object3D();

  this.titleMandala.position.z = -500;
  this.titleMandala.position.y = 150;
  this.titleMandalaMeshes = [];
  

  /*for( var i = 0; i < 100; i ++ ){

    var mesh = textCreator.createMesh( title );
    this.textMaterial.uniforms.t_text.value = mesh.material.map;
    mesh.material = this.textMaterial;
    mesh.scale.multiplyScalar( 6 / this.titleMesh.scaledWidth );

    mesh.position = M.toCart( 100 , Math.PI * 2  * (i + 1.25) / 10 , 0 );

    mesh.position.set( mesh.position.x , mesh.position.z , 0 );
    mesh.rotation.z = Math.PI * 2  * i / 100;
    
    this.titleMandala.add( mesh );
    this.titleMandalaMeshes.push( mesh );




  }*/

  this.fromMesh.add( this.titleMandala);
  this.fromMesh.add( this.titleMesh );

 // var t = 100 + (this.titleMesh.scale.x *  this.titleMesh.scaledWidth/4);
 // var p =  new THREE.Vector3( t , 0 , 0 );

  //var p = new THREE.Vector3( t, 0 ,  0 );
  //this.titleMesh.position = fromMesh.position.clone().add( p );
  //this.titleMesh.position



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
  //scene.add( this.titleMesh );

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
  
  //if( !this.active ){

    this.modelMaterial.uniforms.power.value = 4;
    this.textMaterial.uniforms.power.value = 4;
    //this.toMesh.material = this.hoverMaterial;
    //this.toMesh.material.needsUpdate = true;
  //}


}

Song.prototype.onHoverOut = function(){

  this.hovered = false;
  
  if( !this.active ){
 
    
    this.modelMaterial.uniforms.power.value = 1;
    this.textMaterial.uniforms.power.value = 1;


   // this.toMesh.material = this.neutralMaterial;
   // this.toMesh.material.needsUpdate = true;
  }else{

    this.modelMaterial.uniforms.power.value = 3;
    this.textMaterial.uniforms.power.value = 3;



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
    
      //self.begin();
      setTimeout( self.begin.bind( this ) , 100 ); // one second to play

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
  this.setBallUniforms();
 
//  this.flow.reset( this.fromTexture );

  //this.toMesh.material = this.activeMaterial;
  //this.toMesh.material.needsUpdate = true;

  this.modelMaterial.uniforms.power.value = 3;
  this.textMaterial.uniforms.power.value = 3;

  for( var i = 0; i < BALLS.length; i++ ){

    BALLS[i].material.uniforms.color.value = this.color;

  }


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

  this.modelMaterial.uniforms.power.value = 1;
  this.textMaterial.uniforms.power.value = 1;

  for( var i = 0; i < BALLS.length; i++ ){

    BALLS[i].material.uniforms.color.value = new THREE.Vector3( .3 , .3 , .3 );

  }
 // this.toMesh.material =    this.neutralMaterial;


}

Song.prototype.setParticleUniforms = function(){

  for( propt  in this.particleParams ){
   
    var u = this.flow.particles.material.uniforms;
    u[propt].value = this.particleParams[propt].value;
    
  }

}

Song.prototype.setFlowUniforms = function(){

  for( propt  in this.flowParams ){
   
    var u = this.flow.flowShader.uniforms;
    u[propt].value = this.flowParams[propt].value;
    
  }

}

Song.prototype.setBallUniforms = function(){

  for( propt  in this.ballParams ){
 
    for( var i = 0; i < BALLS.length; i++ ){
      var u = BALLS[i].material.uniforms;
      u[propt].value = this.ballParams[propt].value;
    }
    
  }

}

Song.prototype.setModelUniforms = function(){

  for( propt in this.modelParms ){

    var u = this.modelMaterial.uniforms;
    u[propt].value = this.flowParams[propt].value;
    
  }


}


