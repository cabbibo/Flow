
uniform sampler2D t_audio;
uniform float power;
uniform vec3 color;

varying vec4 vAudio;
varying vec3 vColor;

const float pi = 3.14159;
void main() {

  vec4 c = texture2D( t_audio , vec2( abs(vColor.z) , 0.0 ) ); 

  float p = (power -1. )*(power-1.) / 4.;
  gl_FragColor = vec4( p * ((c.xyz* .2)+color.xyz*.05), vAudio.w );

}


