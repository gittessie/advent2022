const fs = require("fs");

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day11/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    //console.log(getMonkeyToNumItemInspections(inputMonkeys)); // 50616
    console.log(getWorryLevelAfter10000(inputMonkeys, inputMonkeysMod)); //
  }
);
/**
Monkeys operate based on how worried you are about each item
Each monkey has several attributes:

Starting items lists your worry level for each item the monkey is currently holding in the order they will be inspected.
Operation shows how your worry level changes as that monkey inspects an item. (An operation like new = old * 5 means 
  that your worry level after the monkey inspected the item is five times whatever your worry level was before inspection.)
Test shows how the monkey uses your worry level to decide where to throw an item next.
  If true shows what happens with an item if the Test was true.
  If false shows what happens with an item if the Test was false.
After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection 
didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.

The monkeys take turns inspecting and throwing items. On a single monkey's turn, it inspects and throws 
all of the items it is holding one at a time and in the order listed. Monkey 0 goes first, then monkey 1, 
and so on until each monkey has had one turn. The process of each monkey taking a single turn is called a round.

When a monkey throws an item to another monkey, the item goes on the end of the recipient monkey's list. 
A monkey that starts a round with no items could end up inspecting and throwing many items by the time its turn comes around. 
If a monkey is holding no items at the start of its turn, its turn ends.

Count the total number of times each monkey inspects items over 20 rounds
Return the product of the inspected items of the two most active monkeys 
 */
const createMonkeys = (input) => {
  const monkeys = [];
  for (let i = 0; i < input.length; i += 7) {
    const [, startingItems] = input[i + 1].split(": ");
    const startingItemsArray = JSON.parse("[" + startingItems + "]");
    const [, operation] = input[i + 1].split("= old ");
    const [operator, value] = operation.split(" ");
  }
};
const inputMonkeys = [
  {
    items: [78, 53, 89, 51, 52, 59, 58, 85],
    operation: (y) => y * 3,
    test: (y) => {
      return y % 5 === 0 ? 2 : 7;
    },
  },
  {
    items: [64],
    operation: (y) => y + 7,
    test: (y) => {
      return y % 2 === 0 ? 3 : 6;
    },
  },
  {
    items: [71, 93, 65, 82],
    operation: (y) => y + 5,
    test: (y) => {
      return y % 13 === 0 ? 5 : 4;
    },
  },
  {
    items: [67, 73, 95, 75, 56, 74],
    operation: (y) => y + 8,
    test: (y) => {
      return y % 19 === 0 ? 6 : 0;
    },
  },
  {
    items: [85, 91, 90],
    operation: (y) => y + 4,
    test: (y) => {
      return y % 11 === 0 ? 3 : 1;
    },
  },
  {
    items: [67, 96, 69, 55, 70, 83, 62],
    operation: (y) => y * 2,
    test: (y) => {
      return y % 3 === 0 ? 4 : 1;
    },
  },
  {
    items: [53, 86, 98, 70, 64],
    operation: (y) => y + 6,
    test: (y) => {
      return y % 7 === 0 ? 7 : 0;
    },
  },
  {
    items: [88, 64],
    operation: (y) => y * y,
    test: (y) => {
      return y % 17 === 0 ? 2 : 5;
    },
  },
];
const inputMonkeysMod = 5 * 2 * 13 * 19 * 11 * 3 * 7 * 17;

const testMonkeys = [
  {
    items: [79, 98],
    operation: (y) => y * 19,
    test: (y) => {
      return y % 23 === 0 ? 2 : 3;
    },
  },
  {
    items: [54, 65, 75, 74],
    operation: (y) => y + 6,
    test: (y) => {
      return y % 19 === 0 ? 2 : 0;
    },
  },
  {
    items: [79, 60, 97],
    operation: (y) => y * y,
    test: (y) => {
      return y % 13 === 0 ? 1 : 3;
    },
  },
  {
    items: [74],
    operation: (y) => y + 3,
    test: (y) => {
      return y % 17 === 0 ? 0 : 1;
    },
  },
];
const testMonkeysMod = 23 * 19 * 13 * 17;

const getMonkeyToNumItemInspections = (monkeys) => {
  const inspectionCounts = new Array(monkeys.length).fill(0);
  for (let numRounds = 20; numRounds > 0; numRounds--) {
    for (let index = 0; index < monkeys.length; index++) {
      const itemsToInspect = monkeys[index].items;
      inspectionCounts[index] += itemsToInspect.length;
      for (let item = 0; item < itemsToInspect.length; item++) {
        const start = itemsToInspect[item];
        // operation
        const afterOp = monkeys[index].operation(start);
        // divide by three, round down to nearest int
        const relief = Math.floor(afterOp / 3);
        // test and send to next monkey
        const nextMonkey = monkeys[index].test(relief);
        monkeys[nextMonkey].items.push(relief);
      }
      // monkey got rid of all items
      monkeys[index].items = [];
    }
  }
  inspectionCounts.sort((a, b) => b - a);
  return inspectionCounts[0] * inspectionCounts[1];
};

/**
 * Worry levels are no longer divided by three after each item is inspected;
 * you'll need to find another way to keep your worry levels manageable.
 * Starting again from the initial state in your puzzle input, what is the level of monkey business after 10000 rounds?
 */
const getWorryLevelAfter10000 = (monkeys, mod) => {
  const inspectionCounts = new Array(monkeys.length).fill(0);
  for (let numRounds = 10000; numRounds > 0; numRounds--) {
    for (let index = 0; index < monkeys.length; index++) {
      const itemsToInspect = monkeys[index].items;
      inspectionCounts[index] += itemsToInspect.length;
      for (let item = 0; item < itemsToInspect.length; item++) {
        const start = itemsToInspect[item];
        // operation
        const afterOp = monkeys[index].operation(start);
        // new form of relief needed
        const relief = afterOp % mod;
        // test and send to next monkey
        const nextMonkey = monkeys[index].test(relief);
        monkeys[nextMonkey].items.push(relief);
      }
      // monkey got rid of all items
      monkeys[index].items = [];
    }
  }
  inspectionCounts.sort((a, b) => b - a);
  return inspectionCounts[0] * inspectionCounts[1];
};
