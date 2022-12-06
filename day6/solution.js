const fs = require("fs");

/**
 * 
 * 
Find index where previous 4 chars are unique
Specifically, it needs to report the number of 
characters from the beginning of the buffer to the end of the first such four-character marker.
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day6/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    console.log(
      getNumCharactersBeforeNUniqueConsecutiveChars(4, fileAsArray[0])
    );
    // Pt. 2, the same but find 14 unique in a row
    console.log(
      getNumCharactersBeforeNUniqueConsecutiveChars(14, fileAsArray[0])
    );
  }
);

const getNumCharactersBeforeNUniqueConsecutiveChars = (
  numDistinctChars,
  code
) => {
  if (code.length < numDistinctChars) {
    return -1;
  }
  const uniqueConsecutiveChars = [];
  for (let i = 0; i < code.length; i++) {
    const foundIndex = uniqueConsecutiveChars.indexOf(code[i]);
    if (
      foundIndex < 0 &&
      uniqueConsecutiveChars.length === numDistinctChars - 1
    ) {
      return i + 1;
    } else {
      // remove up to found index in uniqueConsecChars
      uniqueConsecutiveChars.splice(0, foundIndex + 1);
      // push new char
      uniqueConsecutiveChars.push(code[i]);
    }
  }
  return -1;
};
