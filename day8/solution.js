const fs = require("fs");

/**
 *
 *
 *
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day8/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const fileAsGrid = [];
    fileAsArray.forEach((row) => fileAsGrid.push(row.split("")));
    console.log(countVisibleTrees(fileAsGrid));
  }
);

/** 
Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. 
Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, 
there are no trees to block the view.
Consider your map; how many trees are visible from outside the grid?
*/
const isTreeVisible = (i, j, forestGrid) => {
  const height = forestGrid[i][j];
  // check top
  let topVisible = true;
  let index = i - 1;
  while (index >= 0) {
    let value = forestGrid[index][j];
    if (value >= height) {
      topVisible = false;
      break;
    }
    index--;
  }
  if (topVisible) {
    return true;
  }
  // check bottom
  let bottomVisible = true;
  index = i + 1;
  while (index < forestGrid.length) {
    if (forestGrid[index][j] >= height) {
      bottomVisible = false;
      break;
    }
    index++;
  }
  if (bottomVisible) {
    return true;
  }
  // check left
  let leftVisible = true;
  index = j - 1;
  while (index >= 0) {
    if (forestGrid[i][index] >= height) {
      leftVisible = false;
      break;
    }
    index--;
  }
  if (leftVisible) {
    return true;
  }
  // check right
  let rightVisible = true;
  index = j + 1;
  while (index < forestGrid[0].length) {
    if (forestGrid[i][index] >= height) {
      rightVisible = false;
      break;
    }
    index++;
  }

  return rightVisible;
};

/**
 * To measure the viewing distance from a given tree, look up, down, left, and right from that tree;
 * stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration.
 * (If a tree is right on the edge, at least one of its viewing distances will be zero.)
 * A tree's scenic score is found by multiplying together its viewing distance in each of the four directions.
 * Consider each tree on your map. What is the highest scenic score possible for any tree?
 */
const isTreeVisibleWithViewCount = (i, j, forestGrid) => {
  const height = forestGrid[i][j];
  // check top
  let topVisible = true;
  let topVisibilityCount = 0;
  let index = i - 1;
  while (index >= 0) {
    topVisibilityCount++;
    let value = forestGrid[index][j];
    if (value >= height) {
      topVisible = false;
      break;
    }
    index--;
  }
  // check bottom
  let bottomVisible = true;
  let bottomVisibilityCount = 0;
  index = i + 1;
  while (index < forestGrid.length) {
    bottomVisibilityCount++;
    if (forestGrid[index][j] >= height) {
      bottomVisible = false;
      break;
    }
    index++;
  }
  // check left
  let leftVisible = true;
  let leftVisibilityCount = 0;
  index = j - 1;
  while (index >= 0) {
    leftVisibilityCount++;
    if (forestGrid[i][index] >= height) {
      leftVisible = false;
      break;
    }
    index--;
  }
  // check right
  let rightVisible = true;
  let rightVisibilityCount = 0; 
  index = j + 1;
  while (index < forestGrid[0].length) {
    rightVisibilityCount++;
    if (forestGrid[i][index] >= height) {
      rightVisible = false;
      break;
    }
    index++;
  }

  const isTreeVisible =
    topVisible || bottomVisible || leftVisible || rightVisible;
  const scenicScore = topVisibilityCount * bottomVisibilityCount * leftVisibilityCount * rightVisibilityCount;
  return { isTreeVisible, scenicScore };
};

const countVisibleTrees = (forestGrid) => {
  // track visible trees
  let visibleTreeCount = 0;
  let currentHighestScenicScore = 0;
  for (let i = 0; i < forestGrid.length; i++) {
    const row = forestGrid[i];
    for (let j = 0; j < row.length; j++) {
      if (
        i === 0 ||
        i === forestGrid.length - 1 ||
        j === 0 ||
        j === row.length - 1
      ) {
        visibleTreeCount += 1;
      } else {
        const { isTreeVisible, scenicScore } = isTreeVisibleWithViewCount(i, j, forestGrid);
        if (isTreeVisible) {
          visibleTreeCount += 1;
        }
        if(scenicScore > currentHighestScenicScore){
          currentHighestScenicScore = scenicScore;
        }
      }
    }
  }

  return {visibleTreeCount, currentHighestScenicScore};
};
