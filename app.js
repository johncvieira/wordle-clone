let keys = {
  'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
  'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
  'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
};

let guesses = [];
let currentGuess = [];

//changed SecretWord to pick form the cornwords randomly
const SecretWord = cornwords[Math.floor(Math.random()*cornwords.length)];
const NumberOfGuesses = 6;
const Correct = 'correct';
const Found = 'found';
const Wrong = 'wrong';

//list of all 399 words with the word corn in it
//there are plural words because I'm too lazy to remove them rn
var cornwords = ["cornifications", 
"oncornaviruses", 
"picornaviruses", 
"scornfulnesses", 
"cornification", 
"catercornered", 
"picornavirus", 
"oncornavirus", 
"lamellicorns", 
"scornfulness", 
"cornbraiding", 
"cornerstones", 
"cornstarches", 
"cornhuskings", 
"cornerstone", 
"tricornered", 
"lamellicorn", 
"cornhusking", 
"cornflowers", 
"cornettists", 
"cornucopian", 
"cornucopias", 
"corninesses", 
"cornerbacks", 
"corneitises", 
"cornbraided", 
"catercorner", 
"barleycorns", 
"outscorning", 
"peppercorns", 
"cornerback", 
"cornstarch", 
"cornucopia", 
"cornflakes", 
"peppercorn", 
"cornflower", 
"barleycorn", 
"cornerwise", 
"cornerways", 
"cornetcies", 
"cornetists", 
"cornfields", 
"cornettist", 
"cornichons", 
"cornstalks", 
"cornrowing", 
"cornifying", 
"broomcorns", 
"cornelians", 
"corncrakes", 
"cornbraids", 
"cornbreads", 
"outscorned", 
"longicorns", 
"scornfully", 
"cornfield", 
"cornstalk", 
"corncrake", 
"cornerman", 
"cornetist", 
"cornelian", 
"broomcorn", 
"corneitis", 
"cornbraid", 
"longicorn", 
"outscorns", 
"tricornes", 
"corncakes", 
"cornbread", 
"corncribs", 
"cornering", 
"clavicorn", 
"cornballs", 
"amelcorns", 
"cornhusks", 
"cornicing", 
"cornicles", 
"corniches", 
"cornichon", 
"cornpones", 
"cornrowed", 
"cornmeals", 
"corniness", 
"cornified", 
"cornifies", 
"corniche", 
"cornmeal", 
"cornball", 
"cornhusk", 
"cornpone", 
"corncrib", 
"corneous", 
"cornicle", 
"corniest", 
"cornices", 
"corniced", 
"cornetcy", 
"cornrows", 
"cornuses", 
"cornered", 
"corncobs", 
"corncake", 
"cavicorn", 
"amelcorn", 
"bicornes", 
"cornuted", 
"cornutos", 
"outscorn", 
"popcorns", 
"scorners", 
"scornful", 
"scorning", 
"tricorne", 
"tricorns", 
"unicorns", 
"popcorn", 
"unicorn", 
"cornice", 
"corncob", 
"cornrow", 
"tricorn", 
"cornute", 
"cornify", 
"cornily", 
"corning", 
"cornual", 
"cornier", 
"cornets", 
"cornfed", 
"corneal", 
"corneas", 
"corners", 
"cornels", 
"acorned", 
"bicorne", 
"bicorns", 
"cornuto", 
"scorned", 
"scorner", 
"corner", 
"cornea", 
"cornel", 
"cornet", 
"cornus", 
"cornua", 
"corned", 
"acorns", 
"bicorn", 
"scorns", 
"scorn", 
"acorn", 
"corny", 
"cornu", 
"corns"]


function initialize() {
  let guessGrid = document.getElementById("guessGrid");
  for (let i = 0; i < NumberOfGuesses; i++) {
    for (let j = 0; j < SecretWord.length; j++) {
      guessGrid.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`
    }
    guessGrid.innerHTML += '<br/>'
  }

  let keyboard = document.getElementById("keyboard");
  Object.keys(keys).forEach((key) => {
    if (key.includes('break')) {
      keyboard.innerHTML += '<br/>';
    } else {
      keyboard.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">` + key + '</button>';
    }
  });
}
initialize()

function keyClick(key) {
  switch (key) {
    case '⌫':
      backspace();
      break;
    case 'enter':
      enter();
      break;
    default:
      if (currentGuess.length < SecretWord.length
        && guesses.length < NumberOfGuesses) {
        currentGuess.push({ key: key, result: '' });
        updateCurrentGuess();
      }
  }
}

function backspace() {
  if (currentGuess.length > 0) {
    currentGuess.pop();
  }
  updateCurrentGuess();
}

function enter() {
  if (currentGuess.length < SecretWord.length || guesses.length >= NumberOfGuesses) {
    return;
  }
  //TODO check a dictionary for a valid word

  currentGuess.forEach((keyGuess, index) => {
    if (SecretWord.charAt(index) == keyGuess.key) {
      keyGuess.result = Correct
    } else if (SecretWord.includes(keyGuess.key)) {
      keyGuess.result = Found
    } else {
      keyGuess.result = Wrong
    }

    if (keys[keyGuess.key] != Correct) {
      keys[keyGuess.key] = keyGuess.result
    }
  });
  updateCurrentGuess(true);
  guesses.push(currentGuess);
  currentGuess = [];
}

function updateKeyboard() {
  for (const key in keys) {
    if (keys[key] != '') {
      let keyElement = document.getElementById(`${key}`);
      keyElement.className = '';
      keyElement.classList.add(keys[key]);
      keyElement.classList.add('key');
    }
  }
}

function updateCurrentGuess(guessed = false) {
  let index = guesses.length;
  for (let i = 0; i < SecretWord.length; i++) {
    let guessGrid = document.getElementById(`${index}${i}`);
    if (currentGuess[i]) {
      guessGrid.innerHTML = currentGuess[i].key;
    } else {
      guessGrid.innerHTML = '';
    }
    if (guessed) {
      guessGrid.classList.add(currentGuess[i].result);
    }
  }
  if (guessed) {
    updateKeyboard();
  }
}