export default `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

void main()
{
    // float strength = floor(1. + uProgress -vUv.y);
    vec4 t = texture2D(uTexture1, vUv);
    // float strength = step(vUv.y, uProgress);

    // gl_FragColor = vec4(vec3(strength),1.0);
    gl_FragColor = vec4(vec3(t),1.0);
}
`;
