const mazeGeneratorTwoPromise = import("maze-generator-two");
const mazeGeneratorTwoBgPromise = import(
  "maze-generator-two/maze_generator_two_bg.wasm"
);

import { dataForm, dataFormData } from "./dataForm";
import canvas, { resizeCanvas } from "./gameCanvas";
import createShaderProgram from "./createShaderProgram";
import setupBuffersAndProgram from "./setupBuffersAndProgram";
import "./style.css";

console.log(dataForm);
console.log(dataFormData.get("mazeAlgoChoice"));

const canvasWidth = 502;
const canvasHeight = 502;

const gl = canvas.getContext("webgl", {
  alpha: false,
  desynchronised: true,
  antialias: false,
  depth: false,
  powerPreference: "low-power",
});

function resizeGLCanvas(w, h) {
  resizeCanvas(w, h);
  gl.viewport(0, 0, w, h);
}

gl.clearColor(33 / 255, 37 / 255, 41 / 255, 1.0);
resizeGLCanvas(canvasWidth, canvasHeight);

if (gl === null || gl.getExtension("OES_element_index_uint") === null) {
  console.error("WebGL context with required features not found");
} else {
  mazeGeneratorTwoPromise
    .then(({ SquareMaze, MazeAlgo, SqMzBuffer }) => {
      mazeGeneratorTwoBgPromise
        .then(({ memory }) => {
          const prog = createShaderProgram(gl, true);
          if (prog === null) {
            console.error("Could not compile/link shaders");
          } else {
            const mz = SquareMaze.from_seed(
              50,
              50,
              MazeAlgo.Dfs,
              Math.floor(Math.random() * 2147483647),
              Math.floor(Math.random() * 2147483647)
            );

            const mzBuf = SqMzBuffer.new(0.25, mz);
            mz.free();

            const mzVertices = new Float32Array(
              memory.buffer,
              mzBuf.get_vertices(),
              mzBuf.get_vertices_count()
            );

            const mzIndices = new Uint32Array(
              memory.buffer,
              mzBuf.get_indices(),
              mzBuf.get_indices_count()
            );

            setupBuffersAndProgram(gl, mzVertices, mzIndices, prog);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(gl.TRIANGLES, mzIndices.length, gl.UNSIGNED_INT, 0);
          }
        })
        .catch((err) => {
          console.error(
            "Error while importing `maze-generator-two/maze_generator_two_bg`"
          );
          console.error(err);
        });
    })
    .catch((err) => {
      console.error("Error while importing `maze-generator-two`");
      console.error(err);
    });
}
