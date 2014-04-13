var ball_active = new THREE.MeshBasicMaterial({color:0xff0000});
var ball_neutral = new THREE.MeshBasicMaterial({color:0x0000ff});
var ball_hover = new THREE.MeshBasicMaterial({color:0x00ff00});


var ball_geo = new THREE.SphereGeometry( 390 , 30 , 30 );

var BALLS = [];
function Ball( position ){

  var u = {
    t_audio:{ type:"t" , value:audioController.texture},
    power:{ type:"f" , value:1},
      }

  this.material = new THREE.ShaderMaterial({

    uniforms:u,
    vertexShader:vs.ball,
    fragmentShader:fs.ball,
  transparent: true,
    opacity: .9,
    blending: THREE.AdditiveBlending,
    depthWrite: false


  });

 
  this.geo = ball_geo;
  this.mat = this.material;
  this.mesh = new THREE.Mesh( this.geo , this.mat ); 
  this.mesh.position = position;

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

  this.active = true;
  this.material.uniforms.power.value = 3;

}

Ball.prototype.deactivate = function(){

  this.active = false;
  this.material.uniforms.power.value = 1;

}


