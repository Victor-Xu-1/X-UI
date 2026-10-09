// X-Science studio shader fork, derived from 3Dmol.js 2.5.5.
uniform mat4 viewMatrix;
uniform float opacity;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
#ifdef SHADED
uniform highp sampler2D shading;
#endif
varying vec3 vColor;
varying vec4 mvPosition;
varying vec3 vStudioNormal;
varying vec3 vStudioKey;


//DEFINEFRAGCOLOR

// Orthographic studio lighting: broad softbox, narrow highlight and a soft rim.
// Preserve the upstream alpha, fog, AO and wireframe contracts.
vec3 studioColor(vec3 baseColor) {
    vec3 n = normalize(vStudioNormal);
    if (!gl_FrontFacing) n = -n;
    vec3 view = vec3(0.0, 0.0, 1.0);
    vec3 key = normalize(vStudioKey + vec3(-0.35, 0.4, 0.0));
    vec3 halfKey = normalize(key + view);
    float diffuse = max(dot(n, key), 0.0);
    float broad = pow(max(dot(n, halfKey), 0.0), 24.0);
    float fine = pow(max(dot(n, halfKey), 0.0), 90.0);
    float rim = pow(1.0 - clamp(abs(dot(n, view)), 0.0, 1.0), 3.0);
    return baseColor * (0.38 + 0.62 * diffuse)
        + vec3(0.32 * broad + 0.28 * fine)
        + mix(baseColor, vec3(1.0), 0.55) * (0.12 * rim);
}

void main() {
    vec3 color = vColor;
    #ifndef WIREFRAME
    color = studioColor(color);
    #endif
    #ifdef SHADED
    ivec2 dim = textureSize(shading, 0);
    float shadowFactor = texture2D(shading, vec2(gl_FragCoord.x / float(dim.x), gl_FragCoord.y / float(dim.y))).r;
    color *= shadowFactor;
    #endif
    gl_FragColor = vec4(color, opacity * opacity);

    if(fogNear != fogFar) {
        float depth = -mvPosition.z;
        float fogFactor = smoothstep( fogNear, fogFar, depth );
        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
    }

}
