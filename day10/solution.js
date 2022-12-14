const fs = require("fs");

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day10/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    const {sum, values} = getSumSignalStrengths(fileAsArray)
    console.log(sum);
    values.pop(); // for some reason I had an extra value :shrug:
    console.log(renderImage(values));
  }
);
/**
Start by figuring out the signal being sent by the CPU. The CPU has a single register, X, which starts with the value 1. 
It supports only two instructions:
addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
noop takes one cycle to complete. It has no other effect.
consider the signal strength (the cycle number multiplied by the value of the X register) 
during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
What is the sum of these six signal strengths?
 */
const getSumSignalStrengths = (programInstructions) => {
  const values = [1];
  for (let i = 0; i < programInstructions.length; i++) {
    const instruction = programInstructions[i];
    if(instruction === 'noop'){
      values.push(values[values.length-1]);
    }else{
      let [,increase] = instruction.split(' ');
      increase = parseInt(increase);
      const currentValue = values[values.length-1]
      values.push(currentValue);
      values.push(currentValue + increase);
    }
  }
  let indeciesWanted = [20, 60, 100, 140, 180, 220];
  let sum = 0;
  indeciesWanted.forEach((indexWanted)=>{
    sum+= values[indexWanted-1] * indexWanted;
  })
  return {sum, values};
};

/**
 * It seems like the X register controls the horizontal position of a sprite. 
 * Specifically, the sprite is 3 pixels wide, and the X register sets the horizontal position of the middle of that sprite.
 * You count the pixels on the CRT: 40 wide and 6 high. This CRT screen draws the top row of pixels left-to-right,
 * then the row below that, and so on. The left-most pixel in each row is in position 0, and the right-most pixel 
 * in each row is in position 39.

Like the CPU, the CRT is tied closely to the clock circuit: the CRT draws a single pixel during each cycle. 
If the sprite is positioned such that one of its three pixels is the pixel currently being drawn, 
the screen produces a lit pixel (#); otherwise, the screen leaves the pixel dark (.).
Render the image given by your program. What eight capital letters appear on your CRT? 
*/
const renderImage = (signalStrengthValues) => {
  const results = Array.from({ length: 6 }, () => (
    Array.from({ length: 40 }, () => ('.'))
  ));

  signalStrengthValues.forEach((signalVal, index) => {
    const resultsIndexHeight = Math.floor(index/40);
    const resultsIndexWidth = index%40;
    if(Math.abs(signalVal - resultsIndexWidth) < 2){
      results[resultsIndexHeight][resultsIndexWidth] = '#';
    }
  })

  const image = [];
  results.forEach(x =>  image.push(x.join('')));
  return image;
}
