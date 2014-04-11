uniform sampler2D t_audio;
uniform vec3 color;

varying vec4 vAudio;
varying vec3 vColor;
void main() {

  vec3 nPos = abs(normalize( position ));
  vColor = nPos;

  vec4 x = texture2D( t_audio , vec2( vColor.x , 0.0) );
  vec4 y = texture2D( t_audio , vec2( vColor.y , 0.0) );
  vec4 z = texture2D( t_audio , vec2( vColor.z , 0.0) );

  vAudio = x;

  vec3 pos = position * ( .9 + .2 * vAudio.xyz);
  //vAudio = normalize( x + y + z );


  vec4 mvPos = modelViewMatrix * vec4( pos , 1.0 );

  gl_Position = projectionMatrix * mvPos;
}

