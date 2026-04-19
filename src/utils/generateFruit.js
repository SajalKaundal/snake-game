const cellSize = 30;
const width = window.innerWidth;
const height = window.innerHeight;

export default function generateFruit(snake) {
  let newFruit;
  const maxX = Math.floor(width / cellSize)
  const maxY = Math.floor(height / cellSize)

  while (true) {
    newFruit = {
      x: Math.floor(Math.random() * maxX) * cellSize,
      y: Math.floor(Math.random() * maxY) * cellSize,
    };

    // avoid spawning on snake
    const onSnake = snake.some(
      (seg) => seg.x === newFruit.x && seg.y === newFruit.y,
    );

    if (!onSnake) break;
  }

  return newFruit;
}
