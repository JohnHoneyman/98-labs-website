export default `
uniform float uProgress;

varying vec2 vUv;

void main()
{
    float strength = floor(1. + uProgress -vUv.y);

    gl_FragColor = vec4(strength,strength,strength,1.0);
}
`;
