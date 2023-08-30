export default `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

void main()
{
    vec4 t1 = texture2D(uTexture1, vUv);
    vec4 t2 = texture2D(uTexture2, vUv);
    float sweep = step(vUv.y, uProgress);
    vec4 finalTexture = mix(t1, t2, sweep);
    
    gl_FragColor = finalTexture;

    // float strength = step(vUv.y, uProgress);
    // gl_FragColor = vec4(vec3(strength),1.0);
}
`;
