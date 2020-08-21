var units = [];
var pairings = [];

var unitNames = [
    'walter', 'lionel', 'zachary', 'bradley', 'shaun', 'chase', 'lydia',
    'shelby', 'yufin', 'ava', 'max', 'sally', 'marcie', 'dorian', 'zoe', 'vin',
    'cielo', 'victor', 'ron', 'locritus', 'colt', 'hoff', 'cindy', 'regis',
    'wilson', 'terry', 'harriet', 'patty', 'candace', 'jack', 'jeremy',
    'sarah', 'alicia', 'elias', 'nicole', 'gideon', 'luceil', 'emily',
    'terril', 'marvin'
];

for (var name in unitNames) {
    // Establish a dictionary-like object with unit information
    units.push({
        score: 0,
        unitName: unitNames[name].charAt(0).toUpperCase() + unitNames[name].slice(1),
        imgName: unitNames[name] + "png.png"
    });
}

var unit1;
var unit2;
var lowestScore = 0;
var done = false;

function loadUnits() {
    if (!done) {
        // Assigns the index of the unit to global vars unit1 and unit2
        var randomUnits = getRandomUnits();
        unit1 = randomUnits[0];
        unit2 = randomUnits[1];

        // Display each unit on the page
        document.getElementById("unit1name").innerHTML = units[unit1].unitName;
        document.getElementById("unit2name").innerHTML = units[unit2].unitName;
        document.getElementById("unit1img").src = units[unit1].imgName;
        document.getElementById("unit2img").src = units[unit2].imgName;
    } else {
        loadResultsPage();
    }
}

function selectUnitOne() {
    if (!done) {
        units[unit1].score += 1;
        // Store pairings data to avoid repeats
        pairings.push({
            units: [units[unit1], units[unit2]],
            winner: units[unit1]
        });
        loadUnits();
    }
}

function selectUnitTwo() {
    if (!done) {
        units[unit2].score += 1;
        // Store pairings data to avoid repeats
        pairings.push({
            units: [units[unit1], units[unit2]],
            winner: units[unit2]
        });
        loadUnits();
    }
}

function getRandomUnits() {
    // Returns an array of two units with the same (lowest) score as long as there are at least 2

    while (true)
    {
        var selectableUnits = [];
        while (true)
        {
            for (var unit in units) {
                if (units[unit].score == lowestScore) {
                    selectableUnits.push(units[unit]);
                }
            }
            console.log(selectableUnits.length);
            if (selectableUnits.length < 2) {
                lowestScore += 1;
                if (weAreDone()) {
                    done = true;
                    return;
                } else {
                    continue;
                }
            } else {
                break;
            }
        }
        var random1 = selectableUnits[Math.floor(Math.random() * selectableUnits.length)];
        var random2 = random1;
        while (random2 == random1) {
            random2 = selectableUnits[Math.floor(Math.random() * selectableUnits.length)];
        }

        // Check to see that this pairing hasn't occurred before
        tryAgain = false;
        for (var pairing in pairings)
        {
            var currentPairing = pairings[pairing];
            if (currentPairing.units.indexOf(random1) != -1 && currentPairing.units.indexOf(random2) != -1)
            {
                // Assign a point to the last winner and move on
                var index = units.indexOf(currentPairing.winner);
                units[index].score += 1;
                tryAgain = true;
            }
        }

        if (!tryAgain) {
            break;
        }
    }

    // Return the indicies of the two selected units
    return [units.indexOf(random1), units.indexOf(random2)];
}

function weAreDone() {
    var scores = [];
    for (var unit in units) {
        if (scores.includes(units[unit].score)) {
            return false;
        } else {
            scores.push(units[unit].score);
        }
    }
    loadResultsPage();
    return true;  // Each unit has a unique score
}

function loadResultsPage() {
    document.getElementById("votingContainer").remove();

    // Sort the results in descending score order
    units.sort((a, b) => (a.score < b.score) ? 1: -1);

    // Then go through them and set the proper image
    for (var unit in units) {
        idName = "unit";
        var idNum = Number(unit) + 1;
        idName += idNum;
        console.log(idName);
        document.getElementById(idName).src = units[unit].imgName;
    }

    // Then display the results
    document.getElementById("resultsContainer").style.display = "block";
}
