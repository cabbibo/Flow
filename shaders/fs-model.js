
uniform sampler2D t_audio;
uniform float power;
uniform vec3 color;

varying vec4 vAudio;
varying vec3 vColor;
varying vec3 vNormal;

const float pi = 3.14159;
void main() {

  float cutoff = max( 0. ,  (vColor.y-.6) );
  float c;
  if( cutoff != 0. ){
    c = texture2D( t_audio , vec2( cutoff , 0.0 ) ).x; 

  }else{
    c = .6;
  }

  c = texture2D( t_audio , vec2( abs(vNormal.x) , 0.0 )).x;
  float p = (power -1.5 )*(power-1.5) / 4.;
  gl_FragColor = vec4(color*.1*p + (vec3(max(0.1 ,vNormal.x+.1))*p * c*c*c ), vAudio.w );

}


