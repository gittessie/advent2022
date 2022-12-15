const fs = require("fs");

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day14/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const { rockLocations, maxY } = getRockLocations(fileAsArray);
    console.log(countNumberOfSandLanded(rockLocations, maxY));
    console.log(countNumberOfSandLandedWithFloor(rockLocations, maxY));
  }
);
/**
You scan a two-dimensional vertical slice of the cave above you (your puzzle input) and discover 
that it is mostly air with structures made of rock.
Your scan traces the path of each solid rock structure and reports the x,y coordinates that form the shape of the path, 
where x represents distance to the right and y represents distance down. 
Each path appears as a single line of text in your scan. After the first point of each path, each point indicates the end of 
a straight horizontal or vertical line to be drawn from the previous point.}
 */
const formatRockPathsToArraysOfCoordinates = (rockPathsInput) => {
  rockPathsInput.forEach((path, index) => {
    const coords = path.split(" -> ");
    coords.forEach((coord, index) => {
      let [x, y] = coord.split(",");
      x = parseInt(x);
      y = parseInt(y);
      coords[index] = [x, y];
    });
    rockPathsInput[index] = coords;
  });
};
const getRockLocations = (rockPaths) => {
  formatRockPathsToArraysOfCoordinates(rockPaths);
  const rockLocations = new Set();
  let maxY = 0;
  let minY = 1000;
  let maxX = 0;
  let minX = 1000;
  rockPaths.forEach((path) => {
    for (let i = 0; i < path.length - 1; i++) {
      let [x, y] = path[i];
      const [xNext, yNext] = path[i + 1];
      // check if modifying bounds
      if (x > maxX) {
        maxX = x;
      }
      if (x < minX) {
        minX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
      if (y < minY) {
        minY = y;
      }
      // add current coordinate &
      // add all coordinates between self and next coord
      if (x === xNext) {
        // move y
        while (y < yNext) {
          rockLocations.add(JSON.stringify([x, y]));
          y++;
        }
        while (y > yNext) {
          rockLocations.add(JSON.stringify([x, y]));
          y--;
        }
      } else {
        // move x
        while (x < xNext) {
          rockLocations.add(JSON.stringify([x, y]));
          x++;
        }
        while (x > xNext) {
          rockLocations.add(JSON.stringify([x, y]));
          x--;
        }
      }
    }
    // add last coord in path to set
    const lastC = path[path.length - 1];
    rockLocations.add(JSON.stringify(lastC));
  });
  return { rockLocations, minX, maxX, minY, maxY };
};

/**
 * Sand is produced one unit at a time, and the next unit of sand is not produced until 
 * the previous unit of sand comes to rest. A unit of sand is large enough to fill one 
 * tile of air in your scan.
A unit of sand always falls down one step if possible. 
If the tile immediately below is blocked (by rock or sand), the unit of sand attempts 
to instead move diagonally one step down and to the left. If that tile is blocked, the unit of 
sand attempts to instead move diagonally one step down and to the right. Sand keeps moving as 
long as it is able to do so, at each step trying to move down, then down-left, then down-right. 
If all three possible destinations are blocked, the unit of sand comes to rest and no longer moves, 
at which point the next unit of sand is created back at the source.

How many units of sand come to rest before sand starts flowing into the abyss below?

The sand is pouring into the cave from point 500,0.
 */
const countNumberOfSandLanded = (rockLocations, maxY) => {
  const sandLocations = new Set();
  const sandStart = [500, 0];
  let sandHitAbyss = false;
  while (!sandHitAbyss) {
    let location = sandStart;
    let canFall = true;
    while (canFall) {
      let [x, y] = location;
      //check if we've gone into the abyss
      if (y > maxY) {
        canFall = false;
        sandHitAbyss = true;
      }
      // move down first
      else if (
        !rockLocations.has(JSON.stringify([x, y + 1])) &&
        !sandLocations.has(JSON.stringify([x, y + 1]))
      ) {
        location = [x, y + 1];
      } else if (
        !rockLocations.has(JSON.stringify([x - 1, y + 1])) &&
        !sandLocations.has(JSON.stringify([x - 1, y + 1]))
      ) {
        //move down left
        location = [x - 1, y + 1];
      } else if (
        !rockLocations.has(JSON.stringify([x + 1, y + 1])) &&
        !sandLocations.has(JSON.stringify([x + 1, y + 1]))
      ) {
        //moveDownRight
        location = [x + 1, y + 1];
      } else {
        //mark spot
        sandLocations.add(JSON.stringify(location));
        canFall = false;
      }
    }
  }
  return sandLocations.size;
};

/**
 * You realize you misread the scan. There isn't an endless void at the bottom of the scan 
 * - there's floor, and you're standing on it!

Assume the floor is an infinite horizontal line 
with a y coordinate equal to two plus the highest y coordinate of any point in your scan.
To find somewhere safe to stand, you'll need to simulate falling sand until a unit of sand 
comes to rest at 500,0, blocking the source entirely and stopping the flow of sand into the cave.

simulate the falling sand until the source of the sand becomes blocked. 
How many units of sand come to rest?
 */

const countNumberOfSandLandedWithFloor = (rockLocations, maxY) => {
  const sandLocations = new Set();
  const sandStart = [500, 0];
  let sandHitStart = false;
  while (!sandHitStart) {
    let location = sandStart;
    let canFall = true;
    while (canFall) {
      let [x, y] = location;

      // move down first
      if (
        !rockLocations.has(JSON.stringify([x, y + 1])) &&
        !sandLocations.has(JSON.stringify([x, y + 1])) &&
        y + 1 !== maxY + 2
      ) {
        location = [x, y + 1];
      } else if (
        !rockLocations.has(JSON.stringify([x - 1, y + 1])) &&
        !sandLocations.has(JSON.stringify([x - 1, y + 1])) &&
        y + 1 !== maxY + 2
      ) {
        //move down left
        location = [x - 1, y + 1];
      } else if (
        !rockLocations.has(JSON.stringify([x + 1, y + 1])) &&
        !sandLocations.has(JSON.stringify([x + 1, y + 1])) &&
        y + 1 !== maxY + 2
      ) {
        //moveDownRight
        location = [x + 1, y + 1];
      } else {
        //mark spot
        sandLocations.add(JSON.stringify(location));
        canFall = false;
        // check if we just closed the sand hole
        if (x === 500 && y === 0) {
          sandHitStart = true;
        }
      }
    }
  }
  return sandLocations.size;
};
