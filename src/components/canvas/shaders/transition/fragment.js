export default `
uniform float uProgress;

varying vec2 vUv;

void main()
{
    // float strength = floor(1. + uProgress -vUv.y);
    float strength = step(vUv.y, uProgress);

    gl_FragColor = vec4(vec3(strength),1.0);
}
`;
