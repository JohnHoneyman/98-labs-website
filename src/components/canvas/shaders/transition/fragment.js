export default `
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform float uProgress;

varying vec2 vUv;

void main()
{
    vec4 t1 = texture2D(textureA, vUv);
    vec4 t2 = texture2D(textureB, vUv);
    float sweep = step(vUv.y, uProgress);
    vec4 finalTexture = mix(t1, t2, sweep);
    
    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    // float strength = step(vUv.y, uProgress);
    // gl_FragColor = vec4(vec3(strength),1.0);
}
`;
