uniform sampler2D t_audio;
uniform float power;
uniform vec3 color;
uniform float displacementPower;

varying float vDisplacement;
varying vec2 vUv;
varying vec3 vPos;

void main(){

  vec4 c = texture2D( t_audio , vec2( abs(vDisplacement) , 0.0 ) );

  vec4 cInverse = vec4( 1.0 ) - c;
  vec3 cFinal = normalize(color + c.xyx ) + cInverse.xyz * vec3( power / 3. );


  float fDis = ( vDisplacement ) / displacementPower;
  float aP = power / 4.;
  gl_FragColor = vec4( (cFinal + fDis) * aP , (aP*aP * .8 ) +.2 );

}

