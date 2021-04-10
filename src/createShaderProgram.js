function createShader(gl, src, type) {
  const shader = gl.createShader(type);
  if (shader === null) return null;

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      `Error compiling shader: ${src}`,
      gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vShader, fShader, doValidate) {
  const program = gl.createProgram();
  if (program === null) return null;

  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking program", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  if (doValidate) {
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error("Error validating program", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
  }

  return program;
}

export default function createShaderProgram(gl, doValidate) {
  const vShaderSrc = `
precision mediump float;

attribute vec2 vertPosition;

void main() {
  gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

  const vShader = createShader(gl, vShaderSrc, gl.VERTEX_SHADER);
  if (vShader === null) throw new Error("Could not compile vertex shader");

  const fShaderSrc = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

  const fShader = createShader(gl, fShaderSrc, gl.FRAGMENT_SHADER);
  if (fShader === null) {
    gl.deleteShader(vShader);
    throw new Error("Could not compile fragment shader");
  }

  const program = createProgram(gl, vShader, fShader, doValidate);
  if (program === null) {
    gl.deleteShader(fShader);
    gl.deleteShader(vShader);
    throw new Error("Could not link shader program");
  }

  return {
    program: program,
    vShader: vShader,
    fShader: fShader,
  };
}
