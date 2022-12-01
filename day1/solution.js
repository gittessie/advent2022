// get filesystem module
const fs = require("fs");

/**
 Suppose the Elves finish writing their items' Calories and end up with the following list:

1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
This list represents the Calories of the food carried by five Elves:

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying? 
*/

// using the readFileSync() function
// and passing the path to the file
fs.readFile(
  "/Users/turtubia/Documents/advent2022/day1/input.txt",
  (err, buff) => {
    // if any error
    if (err) {
      console.error(err);
      return;
    }

    // otherwise log contents
    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const calorieTotals = getCalorieTotals(fileAsArray);
    const maxVal = findMaxVal(calorieTotals);
    const topThree = sumThreeTopVals(calorieTotals);
    console.log(maxVal);
    console.log(topThree);
  }
);

const getCalorieTotals = (valuesAsArray) => {
  const calorieTotals = [];
  let currentSum = 0;
  for (let i = 0; i < valuesAsArray.length; i++) {
    if (valuesAsArray[i] === "") {
      calorieTotals.push(currentSum);
      currentSum = 0;
    } else {
      const numberToAdd = parseInt(valuesAsArray[i]);
      currentSum += numberToAdd;
    }
  }
  return calorieTotals;
};

const findMaxVal = (calorieTotals) => {
  const maxVal = Math.max(...calorieTotals);
  return maxVal;
};

/**
PART 2
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
   */

const sumThreeTopVals = (calorieTotals) => {
  const sorted = calorieTotals.sort((a, b) => {
    return b - a;
  });
  return sorted[0] + sorted[1] + sorted[2];
};
