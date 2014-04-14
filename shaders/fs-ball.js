uniform sampler2D t_audio;
uniform float power;
uniform vec3 color;
uniform float displacementPower;

varying float vDisplacement;
varying vec2 vUv;
varying vec3 vPos;

void main(){

  vec4 c = texture2D( t_audio , vec2( abs(vDisplacement) , 0.0 ) );

  vec3 cFinal = normalize(color + 10.*c.xyx ) + vec3( power / 3. );


  float fDis = ( vDisplacement ) / displacementPower;
  gl_FragColor = vec4( cFinal + fDis , ((power / 3.) * .5 ) +.5 );

}

