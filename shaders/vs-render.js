uniform sampler2D map;
uniform float size;

varying vec2 vUv;
varying vec4 vAudio;
varying vec4 vPosition;
uniform sampler2D audio;

void main() {

    vec2 uv = position.xy + vec2( 0.5 / size, 0.5 / size );

    vUv = uv;
    vec4 data = texture2D( map, uv );

    vAudio = texture2D( audio , vec2( uv.x , 0.0 )); 

    vPosition = data;

    vec4 mvPos = modelViewMatrix * vec4( vPosition.xyz , 1.0 );

   // gl_PointSize = 10.;
   // gl_PointSize = 10.; // data.w * 10.0 + 1.0;
    gl_PointSize = 30000.0 *  vAudio.x*  vAudio.x *  vAudio.x *  vAudio.x  / length(mvPos.xyz); // data.w * 10.0 + 1.0;

    gl_Position = projectionMatrix * mvPos;
}


