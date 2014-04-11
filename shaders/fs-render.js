uniform sampler2D sprite;
uniform vec3 color;

uniform float positionPower;
uniform float spritePower;
//uniform float audioPower;
uniform float colorPower;
uniform float weirdPower;
uniform float finalDivision;

uniform vec3 audioPower;

varying vec4 vPosition;
varying vec4 vAudio;
varying vec2 vUv;
varying float opacity;

const float pi = 3.14159;
void main() {

  //vec3 c = normalize( vPosition ).xyz;
  vec4 a = vAudio * vAudio ;
  vec4 s = texture2D( sprite , vec2( gl_PointCoord.x , 1.0 - gl_PointCoord.y) );
  vec3 w = vec3( abs(cos( vUv.x* pi*2.)) , vUv.x , abs(sin(vUv.x * pi*2. )) );
  

  vec3 fAudio = a.xyz * audioPower;
  vec3 fColor = color.xyz * colorPower;
  vec3 fSprite = s.xyz * spritePower;
  vec3 fWeird = w * weirdPower;

  vec3 fin = normalize( fAudio + fColor + fSprite + fWeird ); 
  
  gl_FragColor = vec4( fin / finalDivision , s.w  );

}


