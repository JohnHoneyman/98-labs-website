export default `
varying vec2 vUv;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;


void main()
{
    gl_FragColor = vec4(uColor3,1.0);
}
`;
