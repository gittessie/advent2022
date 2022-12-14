const fs = require("fs");

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day9/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    console.log(getSpotsVisitedByTail(fileAsArray));
    console.log(getSpotsVisitedByTailWithNKnots(fileAsArray, 10));
  }
);

/** 
Consider a rope with a knot at each end; these knots mark the head and the tail of the rope. 
If the head moves far enough away from the tail, the tail is pulled toward the head.
the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching)
If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step 
in that direction so it remains close enough
Otherwise, if the head and tail aren't touching and aren't in the same row or column, 
the tail always moves one step diagonally to keep up
work out where the tail goes as the head follows a series of motions. 
Assume the head and the tail both start at the same position, overlapping.
How many positions does the tail of the rope visit at least once? (starting position counts)
*/
const movementFuncs = {
  L: (startLocation) => (startLocation.x -= 1),
  R: (startLocation) => (startLocation.x += 1),
  U: (startLocation) => (startLocation.y += 1),
  D: (startLocation) => (startLocation.y -= 1),
};
const moveTail = (headLocation, tailLocation) => {
  const inSameRow = headLocation.y === tailLocation.y;
  const inSameCol = headLocation.x === tailLocation.x;
  const verticalDistance = Math.abs(headLocation.y - tailLocation.y);
  const horizontalDistance = Math.abs(headLocation.x - tailLocation.x);
  // If the head is ever two steps directly up, down, left, or right from the tail,
  // the tail must also move one step in that direction
  if (inSameCol && verticalDistance > 1) {
    if (headLocation.y < tailLocation.y) {
      tailLocation.y--;
    } else {
      tailLocation.y++;
    }
  } else if (inSameRow && horizontalDistance > 1) {
    if (headLocation.x < tailLocation.x) {
      tailLocation.x--;
    } else {
      tailLocation.x++;
    }
  }
  // if the head and tail aren't touching and aren't in the same row or column,
  // the tail always moves one step diagonally to keep up
  else if (
    !inSameCol &&
    !inSameRow &&
    (verticalDistance > 1 || horizontalDistance > 1)
  ) {
    if (headLocation.y < tailLocation.y) {
      tailLocation.y--;
    } else {
      tailLocation.y++;
    }
    if (headLocation.x < tailLocation.x) {
      tailLocation.x--;
    } else {
      tailLocation.x++;
    }
  }

  return tailLocation;
};
const getSpotsVisitedByTail = (headMovements) => {
  let headPosition = { x: 0, y: 0 };
  let tailPosition = { x: 0, y: 0 };
  let spotsVisitedByTail = new Set();
  spotsVisitedByTail.add("0,0");

  for (let i = 0; i < headMovements.length; i++) {
    let [direction, count] = headMovements[i].split(" ");
    count = parseInt(count);
    const moveHead = movementFuncs[direction];
    while (count > 0) {
      moveHead(headPosition);
      const newTailPosition = moveTail(headPosition, tailPosition);
      spotsVisitedByTail.add(`${newTailPosition.x},${newTailPosition.y}`);
      count--;
    }
  }
  return spotsVisitedByTail.size;
};
/**
 * Rather than two knots, you now must simulate a rope consisting of ten knots.
 * One knot is still the head of the rope and moves according to the series of motions.
 * Each knot further down the rope follows the knot in front of it using the same rules as before.
 * Now, you need to keep track of the positions the new tail visits.
 * How many positions does the tail of the rope visit at least once?
 */
const getSpotsVisitedByTailWithNKnots = (headMovements, numKnots) => {
  let knotPositions = Array.from({ length: numKnots }, () => ({
    x: 0,
    y: 0,
  }));
  let spotsVisitedByTail = new Set();
  spotsVisitedByTail.add("0,0");

  for (let i = 0; i < headMovements.length; i++) {
    let [direction, count] = headMovements[i].split(" ");
    count = parseInt(count);
    const moveHead = movementFuncs[direction];
    while (count > 0) {
      moveHead(knotPositions[0]);
      for(let j = 0; j < knotPositions.length - 1 ; j++){
        moveTail(knotPositions[j], knotPositions[j+1]);
      }
      spotsVisitedByTail.add(`${knotPositions[numKnots-1].x},${knotPositions[numKnots-1].y}`);
      count--;
    }
  }
  return spotsVisitedByTail.size;
};
