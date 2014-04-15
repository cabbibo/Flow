var ball_active = new THREE.MeshBasicMaterial({color:0xff0000});
var ball_neutral = new THREE.MeshBasicMaterial({color:0x0000ff});
var ball_hover = new THREE.MeshBasicMaterial({color:0x00ff00});


var ball_geo = new THREE.IcosahedronGeometry( 590 , 6 );
//var ball_geo = new THREE.CubeGeometry( 390 , 390 , 390 );

var BALLS = [];
function Ball( position , flow ){


  var u = {
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

  this.material = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball,
    fragmentShader:fs.ball,
  //transparent: true,
    opacity: .9,
   // blending: THREE.AdditiveBlending,
   // depthWrite: false


  });

 
  this.geo = ball_geo;
  this.mat = this.material;
  this.mesh = new THREE.Mesh( this.geo , this.mat ); 
  this.mesh.position = position;

  this.position = position;
  this.velocity = new THREE.Vector3();
  this.acceleration = new THREE.Vector3();

  scene.add( this.mesh );
  this.active = false;

  BALLS.push( this );

}

Ball.prototype.onHoverOver = function(){

  this.hovered = true;
  
  if( !this.active ){
    //this.mesh.material = this.hoverMaterial;
    this.material.uniforms.power.value = 2;
  }


}

Ball.prototype.onHoverOut = function(){

  this.hovered = false;
  
  if( !this.active ){
    this.material.uniforms.power.value = 1;
  }



}

Ball.prototype.activate = function(){

  SELECTED_BALL = this;

  this.active = true;
  this.material.uniforms.power.value = 3;

}

Ball.prototype.deactivate = function(){

   SELECTED_BALL = null;

  this.active = false;
  this.material.uniforms.power.value = 1;

}


