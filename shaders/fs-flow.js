uniform sampler2D t_oPos;
uniform sampler2D t_pos;
uniform sampler2D t_from;
uniform sampler2D t_to;

uniform vec3 circles[100];

varying vec2 vUv;

vec3 c( sampler2D t ){
  return texture2D( t , vUv ).xyz;
}

vec4 sphereDisrupt( vec3 center , float r , vec3 p , vec3 v ){

  vec3 d = p - center;
  float l = length( d );

  vec3 refl = reflect( normalize( v ) , normalize( d ) );

  float add = 0.0;
  float dDif = r-l;
  if( l < r ){
    add = r-l;
  }

  p -= add * normalize( p );
  return vec4( refl * add * add , add ) ;

}

void main(){

  vec3 oPos   = c( t_oPos ); 
  vec3 pos    = c( t_pos  ); 
  vec3 from   = c( t_from ); 
  vec3 to     = c( t_to   );

  vec3 v      = pos - oPos;
  vec3 dif    = to - pos;
  vec3 fDif   = pos - from;

  float l_d = length( dif );
  float l_v = length( v );

  if( l_v > 10.0 ){
    v = vec3( 0.0 , 0.0 , 0.0 );
  }
  //vec4 a = normalize( dif );



  vec3 a =  normalize( dif );
  vec3 vel = (v + a ) * .8;

  //vec3 vel = (v + dif / 1000.0 + a/2.0) * .8;
  //vec4 p = 2.0 * pos - oPos + a;

  for( int i=0; i<50; i++ ){

    vec4 sAdd = sphereDisrupt( circles[i] , 200.0 , pos , vel );
    vel += sAdd.xyz;

  }

  //pos -= normalize( pos ) * sAdd.w;

  vel.y +=.1 * sin( pos.z / 100.0);
  vel.z +=.1 * sin( pos.y / 50.0);
  vel.x +=.1 * sin( pos.x / 80.0);
  
  vec3 p = pos + vel;


  // When the particles get very close 
  // to their endpoint, return them to the beginning

  if( l_d < 10.0 ){
    p = from;
  }
  
  //vec4 p = pos + vec4( -1.0 , 0.0 , 0.0 , 0.0 );// ( 2.0 * pos ) - oPos;
  //vec4 p = pos  + dif / 10.0;

  //p = to.xyz;
  gl_FragColor = vec4( p , 1.0 ) ; 

}



