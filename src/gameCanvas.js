export const canvasWidth = 502;
export const canvasHeight = 502;

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.padding = "100px";
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  document.body.appendChild(canvas);
  return canvas;
}

const gameCanvas = createCanvas();

export function resizeCanvas(w, h) {
  gameCanvas.style.width = `${w}px`;
  gameCanvas.style.height = `${h}px`;
  gameCanvas.width = w;
  gameCanvas.height = h;
}

export default gameCanvas;
