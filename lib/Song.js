function Song( flow , track , mesh , params ){

  this.flow = flow;

  this.texture = flow.createPositionTexture( mesh.geo , mesh.position , mesh.rotation );
  this.mesh = mesh;


}

Song.prototype.onClick = function(){

}

Song.prototype.onHoverOver = function(){

}

Song.prototype.onHoverOut = function(){


}

