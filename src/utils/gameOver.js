function gameOver(snake){
  const seen = new Set();

  for (let item of snake) {
    const key = `${item.x},${item.y}`;

    if (seen.has(key)) return true;

    seen.add(key);
  }

  return false;
}

export default gameOver