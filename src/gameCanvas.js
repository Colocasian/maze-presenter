const gameCanvas = document.getElementById("gameCanvas");

export function resizeCanvas(w, h) {
  gameCanvas.style.width = `${w}px`;
  gameCanvas.style.height = `${h}px`;
  gameCanvas.width = w;
  gameCanvas.height = h;
}

export default gameCanvas;
