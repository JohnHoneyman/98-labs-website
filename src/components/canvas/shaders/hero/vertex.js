export default `
varying vec2 vUv;

attribute float randoms;
attribute float colorRandom;

void main()
{
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position,1.); 
    gl_PointSize = 20. * (1./-mvPosition.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

}

`;
