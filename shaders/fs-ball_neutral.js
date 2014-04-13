uniform sampler2D t_audio;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNorm;

void main(){

  vec4 c = texture2D( t_audio , vec2( abs(vPos.x) , 0.0 ) );

  gl_FragColor = vec4( vNorm * c.xyz / 2.,.4);

}

