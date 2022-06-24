/* hangman JS */


let selectedWord = '';
let selectedHint = '';
const correctLetters = [];
const wrongLetters = [];

const displayWords = document.getElementById('word');
const numberWrong = document.getElementById('wrong');
const displayHint = document.getElementById('hints');
const imagePath = 'images/hangmantree-';
let wrongNumber = wrongLetters.length;


// popUp hide
const youLost = document.getElementById('youLostPop');
youLost.style.display = "none";

const youWon = document.getElementById('youWonPop');
youWon.style.display = "none";

// fade in image

const delay = 1000;
const fadeIn = document.getElementById('hanged');

setTimeout(function(){

  let opacity = 0;
  let intervalID = setInterval(function() {

    if (opacity < 1) {
        opacity = opacity + 0.1
        fadeIn.style.opacity = opacity;

    } else {
        clearInterval(intervalID);
    }
  }, 200);

}, delay);


// object word




 class Word {
   constructor (word, hint){
     this.word = word;
     this.hint = hint;
    }

   wordIs (){
     return this.word;
    }

    hintIs (){
     return this.hint;
    }


 }




/* object library */

class Library {
    constructor (){
      this.words = ['typically', 'respect', 'hadoop', 'expression', 'construct', 'function', 'earth', 'mettle'];
      this.hints = ['Most often', 'A feeling', 'framework', 'Conveys a meaning', 'To build','Input & output', 'Third planet from the sun', 'strenght of character'  ];

      this.combo = [];

      for (let counter = 0, libraryCounter = this.words.length;  libraryCounter > counter; counter++  ){
        let catalog = new Word(this.words[counter], this.hints[counter]);
        this.combo.push(catalog);
      }
    }
}



Library.prototype.chosen = function(){

  let j, x, i;

  for (i = this.combo.length - 1; i > 0; i--) {

      j = Math.floor(Math.random() * (i + 1));
      x = this.combo[i];

      this.combo[i] = this.combo[j];
      this.combo[j] = x;
  }

  return this.combo[j];
}

// using that object

const wordCombo = new Library();
let newTry = wordCombo.chosen();
let newWord = newTry.wordIs();
let newHint = newTry.hintIs();


// random generator


function randomGen (){

selectedWord = newWord;
selectedHint = newHint;
displayHint.innerHTML = `${selectedHint}`;
document.getElementById('wordWas').innerHTML = ` ${selectedWord}`;
}

randomGen();




// guesses
const numOfTries = 6;
const numberOfGuesses = document.getElementById('numberOfTries');
numberOfGuesses.innerHTML = `${numOfTries}`;





// display keyboard function



function gererateKeyboard (){
  let buttonJazz = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
      <button class="buttons" id="` + letter +`" onClick="handleGuess('`+ letter +`');">` + letter +`</button>

    `).join('');
  document.getElementById('keyboard').innerHTML = buttonJazz;
}





// handling numberOfGuesses

function handleGuess (chosenLetter){
  correctLetters.indexOf(chosenLetter) === -1 ? correctLetters.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true,);

   if (selectedWord.indexOf(chosenLetter) >= 0){
         displayW();


      }else if (selectedWord.indexOf(chosenLetter) >= -1){
         wrongLetters.push(chosenLetter);
         document.getElementById('hanged').src = `images/hangmantree-${wrongLetters.length}.png`;
         updateWrongLetter ();

      }


}




//show hidden word
function displayW(){
  displayWords.innerHTML = selectedWord.split('').map(letter =>(correctLetters.indexOf(letter) >= 0 ? letter : "_" )).join('');

  letterMatch = displayWords.innerText.replace(/\n/g,'');
  if (letterMatch === selectedWord){
   youWon.style.display = 'block';
  }


}



// wrong letters

function updateWrongLetter (){
  numberWrong.innerHTML = `${wrongLetters.length}`;
  if (wrongLetters.length === numOfTries){
     youLost.style.display = 'block';

   }

}



//popup close


const noThankYouL = document.getElementById('closePopupL');
noThankYouL.addEventListener("click", function(){
  youLost.style.display = "none";

});

const noThankYouW = document.getElementById('closePopupW');
noThankYouW.addEventListener("click", function(){
  youWon.style.display = "none";

});

//play again button and reset

const playWin = document.getElementById('play_againW');
const playLost = document.getElementById('play_againL');


playWin.addEventListener("click", function(){
location.reload();

});


playLost.addEventListener("click", function(){
location.reload();

});

displayW();
gererateKeyboard();
