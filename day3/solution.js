const fs = require("fs");

/**
 * The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, 
 * which means its first compartment contains the items vJrwpWtwJgWr, 
 * while the second compartment contains the items hcsFMMfFFhFp. 
 * The only item type that appears in both compartments is lowercase p.
 * 
 * To help prioritize item rearrangement, every item type can be converted to a priority:

Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
In the above example, the priority of the item type that appears in both compartments is 16 (p)

Find the item type that appears in both compartments of each rucksack. 
What is the sum of the priorities of those item types?
 */

fs.readFile(
  "/Users/turtubia/Documents/advent2022/day3/input.txt",
  (err, buff) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileAsString = buff.toString();
    const fileAsArray = fileAsString.split("\n");
    console.log(getItemPrioritySum(fileAsArray));
    console.log(getBadgesPrioritySum(fileAsArray));
  }
);
// lowercase a - z = ascii 97 - 122 (sub 96)
// capital A - Z = ascii 65- 90 (sub 38)

const getPriority = (letter) => {
  //assume valid input
  const ascii = letter.charCodeAt(0);
  if (ascii > 90) {
    return ascii - 96;
  } else {
    return ascii - 38;
  }
};

const getItemPrioritySum = (rucksacks) => {
  let total = 0;
  rucksacks.forEach((sack) => {
    let midPoint = (sack.length / 2);
    const firstCompartmentContents = new Set();
    for(let i = 0; i< sack.length; i++){
        const item= sack[i];
        if(i < midPoint){
            firstCompartmentContents.add(item)
        }else{
            if(firstCompartmentContents.has(item)){
                total += getPriority(item);
                return false;
            }
        }
    }
  });
  return total;
};

// for each group of 3 rucksacks find the common item, sum those item priorities
const getItemSet = (sack) => {
    const uniqueItems = new Set();
    for(let i = 0; i< sack.length; i++){
        const item = sack.charAt(i);
        uniqueItems.add(item)
    }
    return uniqueItems;
}
const getBadgesPrioritySum = (rucksacks) => {
    let total = 0;

    for(let i = 0; i < rucksacks.length; i+=3){
        const sackOne = rucksacks[i];
        const sackTwo = rucksacks[i+1];
        const sackThree = rucksacks[i+2];
        const sackOneSet = getItemSet(sackOne);
        const sackTwoSet = getItemSet(sackTwo);
        const sackThreeSet = getItemSet(sackThree);
        sackOneSet.forEach(item => {
            if(sackTwoSet.has(item) && sackThreeSet.has(item)){
                total += getPriority(item);
            }
        })
    }
    return total;
}
