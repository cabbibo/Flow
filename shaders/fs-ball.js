uniform sampler2D t_audio;

varying vec2 vUv;

void main(){

  vec4 c = texture2D( t_audio , vec2( vUv.x , 0.0 ) );

  gl_FragColor = c;

}

