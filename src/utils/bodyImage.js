function bodyImage(direction, nextDirection) {
  // straight
  if (direction === nextDirection) {
    return `snake-body-${nextDirection}`;
  }

  // corners
  if (
    (nextDirection === "Up" && direction === "Right") ||
    (nextDirection === "Left" && direction === "Down")
  ) {
    return "snake-body-topleft";
  }

  if (
    (nextDirection === "Up" && direction === "Left") ||
    (nextDirection === "Right" && direction === "Down")
  ) {
    return "snake-body-topright";
  }

  if (
    (nextDirection === "Down" && direction === "Right") ||
    (nextDirection === "Left" && direction === "Up")
  ) {
    return "snake-body-bottomleft";
  }

  if (
    (nextDirection === "Down" && direction === "Left") ||
    (nextDirection === "Right" && direction === "Up")
  ) {
    return "snake-body-bottomright";
  }

  return `snake-body-${nextDirection}`;
}

export default bodyImage