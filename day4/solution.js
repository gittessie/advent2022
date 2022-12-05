const fs = require("fs");

/**
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day4/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    console.log(countFullyContainedRanges(fileAsArray));
    console.log(countAnyOverlap(fileAsArray));
  }
);

const countFullyContainedRanges = (elfAssignmentPairs) => {
  let total = 0;

  for (let i = 0; i < elfAssignmentPairs.length; i++) {
    const [firstRange, secondRange] = elfAssignmentPairs[i].split(",");
    const [firstBottom, firstTop] = firstRange.split("-");
    const [secondBottom, secondTop] = secondRange.split("-");
    const firstBottomInt = parseInt(firstBottom);
    const firstTopInt = parseInt(firstTop);
    const secondBottomInt = parseInt(secondBottom);
    secondTopInt = parseInt(secondTop);
    if (
      (firstBottomInt <= secondBottomInt && firstTopInt >= secondTopInt) ||
      (secondBottomInt <= firstBottomInt && secondTopInt >= firstTopInt)
    ) {
      total++;
    }
  }
  return total;
};

const countAnyOverlap = (elfAssignmentPairs) => {
  let total = 0;

  for (let i = 0; i < elfAssignmentPairs.length; i++) {
    const [firstRange, secondRange] = elfAssignmentPairs[i].split(",");
    const [firstBottom, firstTop] = firstRange.split("-");
    const [secondBottom, secondTop] = secondRange.split("-");
    const firstBottomInt = parseInt(firstBottom);
    const firstTopInt = parseInt(firstTop);
    const secondBottomInt = parseInt(secondBottom);
    secondTopInt = parseInt(secondTop);
    if (
      (firstBottomInt >= secondBottomInt && firstBottomInt <= secondTopInt) ||
      (secondBottomInt >= firstBottomInt && secondBottomInt <= firstTopInt) ||
      (firstTopInt >= secondBottomInt && firstTopInt <= secondTopInt) ||
      (secondTopInt >= firstBottomInt && secondTopInt <= firstTopInt)
    ) {
      total++;
    }
  }
  return total;
};
