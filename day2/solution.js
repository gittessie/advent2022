const fs = require("fs");

// 0 for loss; 3 for draw; 6 for win 


// Opponent: A = Rock, B = Paper, C = scissors 
// Me: X = Rock =1, Y = Paper, Z = Scissors 

const RPSScore = {'X' : 1, 'Y': 2, 'Z': 3};
const Scores = {'win': 6, 'draw': 3, 'loss': 0}

const resultsMap = {'A X' : 4, 'B X': 1, 'C X': 7, 'A Y' : 8, 'B Y': 5, 'C Y': 2, 'A Z' : 3, 'B Z': 9, 'C Z': 6, }


// using the readFileSync() function
// and passing the path to the file
fs.readFile(
    "/Users/turtubia/Documents/advent2022/day2/input.txt",
    (err, buff) => {
      // if any error
      if (err) {
        console.error(err);
        return;
      }
  
      // otherwise log contents
      const fileAsString = buff.toString();
      const fileAsArray = fileAsString.split("\n");
      console.log(getScore(fileAsArray));
      console.log(getScorePtTwo(fileAsArray));
    }
  );

  const getScore = (valuesAsArray) => {
    let total = 0; 
    valuesAsArray.forEach(round => {
        total += resultsMap[round]
    });
    return total;
  };

  // X means you need to lose, Y means to draw, Z means to win 
  const valsToLoseWinWithScore = {'A': {'X': 3, 'Y' : 4, 'Z': 8}, B: {'X': 1, 'Y' : 5, 'Z': 9}, C: {'X': 2, 'Y' : 6, 'Z': 7}}
  const getScorePtTwo = (valuesAsArray) => {
    let total = 0; 
    valuesAsArray.forEach(round => {
        const [first, second] = round.split(' ');
        total += valsToLoseWinWithScore[first][second]
    });
    return total;
  }
