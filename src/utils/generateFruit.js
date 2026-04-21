const cellSize = 30;
const width = window.innerWidth;
const height = window.innerHeight;

export default function generateFruit(
  snake,
  fruits = [],
) {
  let newFruit;
  const fruitType = ["apple", "banana", "litchi", "mango", "pineapple"];
  const maxX = Math.floor(width / cellSize);
  const maxY = Math.floor(height / cellSize);
  const randomType = Math.floor(Math.random() * 5);
  // console.log(fruits)
  // console.log(snake)
  console.trace("called generate fruits")
  while (true) {
    newFruit = {
      x: Math.floor(Math.random() * maxX) * cellSize,
      y: Math.floor(Math.random() * maxY) * cellSize,
      type: fruitType[randomType],
    };
    // console.log(newFruit)
    // avoid spawning on snake
    const onSnake = snake.some(
      (seg) => seg.x === newFruit.x && seg.y === newFruit.y,
    );
    const onFruit = fruits.some(
      (seg) => seg.x === newFruit.x && seg.y === newFruit.y,
    );

    if (!onSnake || !onFruit) break;

  }
  return newFruit;
}
