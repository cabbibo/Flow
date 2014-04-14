uniform sampler2D t_audio;
uniform float power;
uniform vec3 color;

varying vec2 vUv;
varying vec3 vPos;

void main(){

  vec4 c = texture2D( t_audio , vec2( abs(vPos.x) , 0.0 ) );

  vec3 cFinal = (c.xyz * color) + vec3( power / 3. );
  gl_FragColor = vec4( cFinal ,1.);

}

