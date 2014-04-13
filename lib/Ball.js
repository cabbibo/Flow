var ball_active = new THREE.MeshBasicMaterial({color:0xff0000});
var ball_neutral = new THREE.MeshBasicMaterial({color:0x0000ff});
var ball_hover = new THREE.MeshBasicMaterial({color:0x00ff00});


var ball_geo = new THREE.SphereGeometry( 190 , 30 , 30 );

var BALLS = [];
function Ball( position ){

  var u = {
    t_audio:{ type:"t" , value:audioController.texture},
  }

  this.neutralMaterial = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball_neutral,
    fragmentShader:fs.ball_neutral,
  transparent: true,
    opacity: .9,
    blending: THREE.AdditiveBlending,
    depthWrite: false


  });

  var u = {
    t_audio:{ type:"t" , value:audioController.texture},
  }
  this.hoverMaterial = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball_hover,
    fragmentShader:fs.ball_hover,
    transparent: true,
    opacity: .9,
    blending: THREE.AdditiveBlending,
    depthWrite: false


  });


  var u = {
    t_audio:{ type:"t" , value:audioController.texture},
  }
  this.activeMaterial = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball_active,
    fragmentShader:fs.ball_active,
    transparent: true,
    opacity: .9,
    blending: THREE.AdditiveBlending,
    depthWrite: false

  });




  this.geo = ball_geo;
  this.mat = this.neutralMaterial;
  this.mesh = new THREE.Mesh( this.geo , this.mat ); 
  this.mesh.position = position;

  scene.add( this.mesh );
  this.active = false;

  BALLS.push( this );

}

Ball.prototype.onHoverOver = function(){

  this.hovered = true;
  
  if( !this.active ){
    this.mesh.material = this.hoverMaterial;
  }


}

Ball.prototype.onHoverOut = function(){

  this.hovered = false;
  
  if( !this.active ){
    this.mesh.material = this.neutralMaterial;
  }



}

Ball.prototype.activate = function(){

  this.active = true;
  this.mesh.material = this.activeMaterial;

}

Ball.prototype.deactivate = function(){

  this.active = false;
  this.mesh.material = this.neutralMaterial;

}


