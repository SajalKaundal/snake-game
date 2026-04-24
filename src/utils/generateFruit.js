

export default function generateFruit(
  snake,
  fruits = [],
  BOARD_WIDTH,
  BOARD_HEIGHT,
  CELL_SIZE
) {
  let newFruit;
  const fruitType = ["apple", "banana", "litchi", "mango", "pineapple"];
  const maxX = Math.floor(BOARD_WIDTH / CELL_SIZE);
  const maxY = Math.floor(BOARD_HEIGHT / CELL_SIZE);
  const randomType = Math.floor(Math.random() * 5);
  // console.log(snake)

  // console.trace("called generate fruits")
  // const stack = new Error().stack;

  // if (stack.includes("Snake.jsx")) {
  //   console.log("Called from Snake.jsx");
  //   console.log(snake)
  //   console.log(fruits)
  // }
  while (true) {
    newFruit = {
      x: Math.floor(Math.random() * maxX) * CELL_SIZE,
      y: Math.floor(Math.random() * maxY) * CELL_SIZE,
      type: fruitType[randomType],
    };
    // avoid spawning on snake
    const onSnake = snake.some(
      (seg) => seg.x === newFruit.x && seg.y === newFruit.y,
    );
    const onFruit = fruits.some(
      (seg) => seg.x === newFruit.x && seg.y === newFruit.y,
    );

    if (!onSnake && !onFruit) break;
  }
  console.log(newFruit)
  return newFruit;
}
