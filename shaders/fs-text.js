uniform sampler2D t_text;
uniform sampler2D t_audio;
uniform vec3 color; 
uniform float power;

varying vec4 vAudio;
varying vec3 vColor;
varying vec2 vUv;

const float pi = 3.14159;
void main() {


  vec4 c = texture2D( t_text , vUv );
  vec4 tc = texture2D( t_audio , vec2( vUv.x , 0.0 ));
  vec3 aC = (c.xyz * color) * .5;
  vec3 totalColor =tc.xyz*c.xyz;
  gl_FragColor = normalize(vec4( totalColor + aC , c.w )) * power ;

  gl_FragColor  = vec4( color*.1 , .5 )*c + tc *c * (power/3.) + vec4( color*c.xyz* .1 , c.w);

}


