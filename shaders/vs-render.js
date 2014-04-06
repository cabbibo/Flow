uniform sampler2D map;
uniform float size;

varying vec4 vPosition;

void main() {

    vec2 uv = position.xy + vec2( 0.5 / size, 0.5 / size );

    vec4 data = texture2D( map, uv );

    vPosition = data;

    vec4 mvPos = modelViewMatrix * vec4( vPosition.xyz , 1.0 );

   // gl_PointSize = 10.;
   // gl_PointSize = 10.; // data.w * 10.0 + 1.0;
    gl_PointSize = 10000.0/ length(mvPos.xyz); // data.w * 10.0 + 1.0;
    gl_Position = projectionMatrix * mvPos;
}


