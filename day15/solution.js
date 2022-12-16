const input = [
  { sensor: [2391367, 3787759], beacon: [2345659, 4354867] }, // 45708 + 567108 = 612816
  { sensor: [1826659, 2843839], beacon: [1654342, 3193298] },
  { sensor: [980874, 2369046], beacon: [31358, 2000000] },
  { sensor: [2916267, 2516612], beacon: [3064453, 2107409] },
  { sensor: [3304786, 844925], beacon: [3064453, 2107409] },
  { sensor: [45969, 76553], beacon: [31358, 2000000] },
  { sensor: [2647492, 1985479], beacon: [2483905, 2123337] },
  { sensor: [15629, 2015720], beacon: [31358, 2000000] },
  { sensor: [3793239, 3203486], beacon: [3528871, 3361675] },
  { sensor: [3998240, 15268], beacon: [4731853, 1213406] },
  { sensor: [3475687, 3738894], beacon: [3528871, 3361675] },
  { sensor: [3993022, 3910207], beacon: [3528871, 3361675] },
  { sensor: [258318, 2150378], beacon: [31358, 2000000] },
  { sensor: [1615638, 1108834], beacon: [2483905, 2123337] },
  { sensor: [1183930, 3997648], beacon: [1654342, 3193298] },
  { sensor: [404933, 3377916], beacon: [1654342, 3193298] },
  { sensor: [3829801, 2534117], beacon: [3528871, 3361675] },
  { sensor: [2360813, 2494240], beacon: [2483905, 2123337] },
  { sensor: [2286195, 3134541], beacon: [1654342, 3193298] },
  { sensor: [15626, 1984269], beacon: [31358, 2000000] },
  { sensor: [3009341, 3849969], beacon: [3528871, 3361675] },
  { sensor: [1926292, 193430], beacon: [1884716, -881769] },
  { sensor: [3028318, 3091480], beacon: [3528871, 3361675] },
];
const inputMin = 0;
const inputMax = 4000000;

const testInput = [
  { sensor: [2, 18], beacon: [-2, 15] },
  { sensor: [9, 16], beacon: [10, 16] },
  { sensor: [13, 2], beacon: [15, 3] },
  { sensor: [12, 14], beacon: [10, 16] },
  { sensor: [10, 20], beacon: [10, 16] },
  { sensor: [14, 17], beacon: [10, 16] },
  { sensor: [8, 7], beacon: [2, 10] },
  { sensor: [2, 0], beacon: [2, 10] },
  { sensor: [0, 11], beacon: [2, 10] },
  { sensor: [20, 14], beacon: [25, 17] },
  { sensor: [17, 20], beacon: [21, 22] },
  { sensor: [16, 7], beacon: [15, 3] },
  { sensor: [14, 3], beacon: [15, 3] },
  { sensor: [20, 1], beacon: [15, 3] },
];
const testInputMin = 0; 
const testInputMax = 20;

/**
Because each sensor only identifies its closest beacon, if a sensor detects a beacon, 
you know there are no other beacons that close or closer to that sensor. 
There could still be beacons that just happen to not be the closest beacon to any sensor.
In the row where y=2000000, how many positions cannot contain a beacon?
 */
const numPositionsInRowThatCantHaveBeacon = (closestBeacons, yForRow) => {
  const rowXValsWithoutBeacon = new Set();
  const beaconsInTargetRow = new Set();
  closestBeacons.forEach(({ sensor, beacon }) => {
    // check if there's a beacon in this row
    if (beacon[1] === yForRow) {
      beaconsInTargetRow.add(beacon[0]);
    }
    const distance =
      Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    let targetRowDistanceFromSensor;
    if (yForRow > sensor[1] && sensor[1] + distance >= yForRow) {
      // will have dead zones on row
      targetRowDistanceFromSensor = yForRow - sensor[1];
    } else if (yForRow < sensor[1] && sensor[1] - distance <= yForRow) {
      // will have dead zones on row
      targetRowDistanceFromSensor = sensor[1] - yForRow; // * 2 +1 of remaining distance
    }
    if (targetRowDistanceFromSensor !== undefined) {
      // * 2 +1 of remaining distance
      rowXValsWithoutBeacon.add(sensor[0]);
      for (let i = 1; i <= distance - targetRowDistanceFromSensor; i++) {
        rowXValsWithoutBeacon.add(sensor[0] + i);
        rowXValsWithoutBeacon.add(sensor[0] - i);
      }
    }
  });
  beaconsInTargetRow.forEach((beaconInRow) => {
    rowXValsWithoutBeacon.delete(beaconInRow);
  });
  return rowXValsWithoutBeacon.size;
};

/**
 * Your handheld device indicates that the distress signal is coming from a beacon nearby. 
 * The distress beacon is not detected by any sensor, but the distress beacon must have x and y coordinates 
 * each no lower than 0 and no larger than 4000000.

To isolate the distress beacon's signal, you need to determine its tuning frequency, 
which can be found by multiplying its x coordinate by 4000000 and then adding its y coordinate.
Find the only possible position for the distress beacon. What is its tuning frequency?
 */
const getFirstAvailablePositionInRow = (
  closestBeacons,
  yForRow,
  minXCoord,
  maxXCoord
) => {
  let rangesTaken = [];
  closestBeacons.forEach(({ sensor, beacon }) => {
    // track if there's a beacon in this row
    if (beacon[1] === yForRow) {
      if (beacon[0] <= maxXCoord && beacon[0] >= minXCoord) {
        rangesTaken.push([beacon[0], beacon[0]]);
      }
    }
    const distance =
      Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    let targetRowDistanceFromSensor;
    if (yForRow >= sensor[1] && sensor[1] + distance >= yForRow) {
      // will have dead zones on row
      targetRowDistanceFromSensor = yForRow - sensor[1];
    } else if (yForRow < sensor[1] && sensor[1] - distance <= yForRow) {
      // will have dead zones on row
      targetRowDistanceFromSensor = sensor[1] - yForRow;
    }
    // if the sensors blocked region doesn't intersect with yForRow that we're checking then
    // targetRowDistanceFromSensor will be undefined
    if (targetRowDistanceFromSensor !== undefined) {
      // * 2 +1 of remaining distance
      const sensorX = sensor[0];
      const diff = distance - targetRowDistanceFromSensor;
      let currentMin = sensorX - diff;
      let currentMax = sensorX + diff;
      if (currentMin < minXCoord) {
        currentMin = minXCoord;
      }
      if (currentMax > maxXCoord) {
        currentMax = maxXCoord;
      }
      rangesTaken.push([currentMin, currentMax]);
    }
  });
  rangesTaken.sort((a, b) => {
    return a[0] - b[0];
  });
  const consolidatedRanges = [[...rangesTaken[0]]];
  for (let i = 1; i < rangesTaken.length; i++) {
    const range = rangesTaken[i];
    const lastConsolidated = consolidatedRanges[consolidatedRanges.length - 1];
    if (
      range[0] >= lastConsolidated[0] &&
      range[0] <= lastConsolidated[1] + 1
    ) {
      //overlap
      lastConsolidated[1] = Math.max(range[1], lastConsolidated[1]);
    } else {
      // no overlap means there's a free space
      return range[0] - 1;
    }
  }
};
const findFirstFreeCoordinate = (
  closestBeacons,
  minYCoord,
  maxYCoord,
  minXCoord,
  maxXCoord
) => {
  for (let y = minYCoord; y < maxYCoord + 1; y++) {
    const x = getFirstAvailablePositionInRow(
      closestBeacons,
      y,
      minXCoord,
      maxXCoord
    );
    if (x !== undefined) {
      return [x, y];
    }
  }
};

const getTuningFrequencyOfBeaconLocation = (
  closestBeacons,
  minYCoord,
  maxYCoord,
  minXCoord,
  maxXCoord
) => {
  const [x, y] = findFirstFreeCoordinate(
    closestBeacons,
    minYCoord,
    maxYCoord,
    minXCoord,
    maxXCoord
  );

  return x * 4000000 + y;
};

console.log(numPositionsInRowThatCantHaveBeacon(input, 2000000));
console.log(
  getTuningFrequencyOfBeaconLocation(input, inputMin, inputMax, inputMin, inputMax)
);
