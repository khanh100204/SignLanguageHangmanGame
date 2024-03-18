const words = [
    "abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes",
    "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", 
    "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", 
    "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", 
    "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", 
    "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", 
    "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", 
    "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", 
    "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", 
    "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", 
    "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", 
    "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", 
    "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", 
    "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", 
    "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", 
    "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", 
    "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", 
    "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", 
    "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", 
    "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", 
    "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", 
    "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", 
    "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", 
    "zigzagging", "zilch", "zipper", "zodiac", "zombie"
    ];
let chosenWord = '';
let guessedLetters = [];
let attemptsLeft = words.length;

function startGame() {
  attemptsLeft = 6;
  guessedLetters = [];
  chosenWord = words[Math.floor(Math.random() * words.length)];
  
  let display = '';
  for (let i = 0; i < chosenWord.length; i++) {
    display += '_ ';
  }
  
  document.getElementById('word-display').innerText = display;
  document.getElementById('attempt-count').innerText = attemptsLeft;
  document.getElementById('hangman-img').src = '../static/images/hangman-0.png';
}

function makeGuess() {
  if (attemptsLeft === 0) {
    alert('Out of attempts! The word was: ' + chosenWord);
    resetGame();
    return;
  }

  const guessInput = document.getElementById('guess-input');
  const guess = guessInput.value.toUpperCase();

  if (!/[A-Z]/.test(guess) || guessedLetters.includes(guess)) {
    alert('Please enter a valid letter that you haven\'t guessed before.');
    return;
  }

  guessedLetters.push(guess);
  guessInput.value = '';

  let display = '';
  let correctGuess = false;
  
  for (const letter of chosenWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + ' ';
    } else {
      display += '_ ';
    }
    if (letter === guess) {
      correctGuess = true;
    }
  }

  document.getElementById('word-display').innerText = display;
  document.getElementById('guesses').innerText = `Guessed letters: ${guessedLetters.join(', ')}`;

  if (!display.includes('_')) {
    alert('You won! The word was: ' + chosenWord);
    resetGame();
  } else if (!correctGuess) {
    attemptsLeft--;

    document.getElementById('attempt-count').innerText = attemptsLeft;
    document.getElementById('img').src = `../static/images/${6 - attemptsLeft}.png`;
    if (attemptsLeft === 0) {
      setTimeout(function() {
        alert('Out of attempts! The word was: ' + chosenWord);
        resetGame();
      }, 1000);


    }
  }
}

function resetGame() {
  document.getElementById('word-display').innerText = '';
  document.getElementById('guesses').innerText = '';
  document.getElementById('attempt-count').innerText = attemptsLeft;
  document.getElementById('img').src = '../static/images/0.png';
  startGame();
}

startGame();
