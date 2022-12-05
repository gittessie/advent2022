const fs = require("fs");

/**
 * 
 * 
 Given starting stacks and instructions for items moved around stacks, 
 return tops of stacks at the end of all the moving 

Starting stacks: 
    [H]         [D]     [P]        
[W] [B]         [C] [Z] [D]        
[T] [J]     [T] [J] [D] [J]        
[H] [Z]     [H] [H] [W] [S]     [M]
[P] [F] [R] [P] [Z] [F] [W]     [F]
[J] [V] [T] [N] [F] [G] [Z] [S] [S]
[C] [R] [P] [S] [V] [M] [V] [D] [Z]
[F] [G] [H] [Z] [N] [P] [M] [N] [D]
 1   2   3   4   5   6   7   8   9 
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day5/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const startingStacks = {
      1: ["F", "C", "J", "P", "H", "T", "W"],
      2: ["G", "R", "V", "F", "Z", "J", "B", "H"],
      3: ["H", "P", "T", "R"],
      4: ["Z", "S", "N", "P", "H", "T"],
      5: ["N", "V", "F", "Z", "H", "J", "C", "D"],
      6: ["P", "M", "G", "F", "W", "D", "Z"],
      7: ["M", "V", "Z", "W", "S", "J", "D", "P"],
      8: ["N", "D", "S"],
      9: ["D", "Z", "S", "F", "M"],
    };
    const startingStacksJson = JSON.stringify(startingStacks);
    console.log(getStackTops(JSON.parse(startingStacksJson), fileAsArray));
    console.log(getStackTopsWithMultipleLift(JSON.parse(startingStacksJson), fileAsArray));
  }
);

const getTopOfStacksString = (stacks) => {
  return (
    stacks["1"].pop() +
    stacks["2"].pop() +
    stacks["3"].pop() +
    stacks["4"].pop() +
    stacks["5"].pop() +
    stacks["6"].pop() +
    stacks["7"].pop() +
    stacks["8"].pop() +
    stacks["9"].pop()
  );
};

const getStackTops = (startingStacks, instructions) => {
  // do all the instructions
  for (let i = 0; i < instructions.length; i++) {
    const currentLine = instructions[i];
    let instructionArray = currentLine
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",")
      .split(",");
    const [numToMove, fromStack, toStack] = instructionArray;
    let count = parseInt(numToMove);
    while (count > 0) {
      const block = startingStacks[fromStack].pop();
      startingStacks[toStack].push(block);
      count--;
    }
  }
  return getTopOfStacksString(startingStacks);
};

//** Now when we move multiple crates the order stays in tact */
const getStackTopsWithMultipleLift = (startingStacks, instructions) => {
  // do all the instructions
  for (let i = 0; i < instructions.length; i++) {
    const currentLine = instructions[i];
    let instructionArray = currentLine
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",")
      .split(",");
    const [numToMove, fromStack, toStack] = instructionArray;
    let count = parseInt(numToMove);
    //console.log("start", startingStacks[fromStack], startingStacks[toStack])
    //console.log('numToMove', count)
    const finalLength = startingStacks[fromStack].length - count;
    const boxesToMove = startingStacks[fromStack].slice(-count);
    startingStacks[toStack].push(...boxesToMove);
    startingStacks[fromStack].splice(finalLength);

    //console.log("end", startingStacks[fromStack], startingStacks[toStack])
  }
  return getTopOfStacksString(startingStacks);
};

const getStackTopsWithMultipleLiftsTempStack = (
  startingStacks,
  instructions
) => {
  // do all the instructions
  for (let i = 0; i < instructions.length; i++) {
    const currentLine = instructions[i];
    let instructionArray = currentLine
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",")
      .split(",");
    const [numToMove, fromStack, toStack] = instructionArray;
    let count = parseInt(numToMove);
    const blocksInCraneHand = [];

    while (count > 0) {
      const block = startingStacks[fromStack].pop();
      blocksInCraneHand.unshift(block);
      count--;
    }
    startingStacks[toStack].push(...blocksInCraneHand);
  }
  return getTopOfStacksString(startingStacks);
};
