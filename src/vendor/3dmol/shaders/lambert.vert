// X-Science studio shading; upstream geometry and transforms are unchanged.

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 directionalLightColor[ 1 ];
uniform vec3 directionalLightDirection[ 1 ];

attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;

varying vec3 vColor;
varying vec4 mvPosition;
varying vec3 vStudioNormal;
varying vec3 vStudioKey;

void main() {

    vColor = color;

    vec3 objectNormal = normal;
    vec3 transformedNormal = normalMatrix * objectNormal;
    mvPosition = modelViewMatrix * vec4( position, 1.0 );


    transformedNormal = normalize( transformedNormal );

    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );
    vec3 dirVector = normalize( lDirection.xyz );
    vStudioNormal = transformedNormal;
    vStudioKey = dirVector;


    gl_Position = projectionMatrix * mvPosition;
}
