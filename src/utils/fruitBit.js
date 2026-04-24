function fruitBit(fruits, headX, headY) {
  const hitIndex = fruits.findIndex((f) => f.x === headX && f.y === headY);
  return hitIndex;
}

export default fruitBit