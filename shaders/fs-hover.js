
uniform sampler2D t_audio;

varying vec4 vAudio;
varying vec3 vColor;

const float pi = 3.14159;
void main() {


  gl_FragColor = vec4( vAudio );

}

