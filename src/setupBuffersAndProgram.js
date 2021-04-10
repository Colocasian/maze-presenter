export default function setupBuffersAndProgram(
  gl,
  mzVertices,
  mzIndices,
  prog
) {
  const { program, vShader, fShader } = prog;
  const mzVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mzVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, mzVertices, gl.STREAM_DRAW);

  const mzIndexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mzIndexBufferObject);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mzIndices, gl.STREAM_DRAW);

  const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");

  gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  gl.useProgram(program);
  gl.detachShader(program, vShader);
  gl.detachShader(program, fShader);
  gl.deleteShader(vShader);
  gl.deleteShader(fShader);
}
