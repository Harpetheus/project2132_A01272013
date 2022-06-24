/* hangman JS */

let arrayNumber = null;
let selectedWord = '';
let selectedHint = '';
const correctLetters = [];
const anotherLetter = [];
const wrongLetters = [];
const displayWords = document.getElementById('word');
const numberWrong = document.getElementById('wrong');
const displayHint = document.getElementById('hints');
const imagePath = 'images/hangmantree-';
let wrongNumber = wrongLetters.length;
let innerWord = null;
const youLost = document.getElementById('youLostPop');
youLost.style.display = "none";

const youWon = document.getElementById('youWonPop');
youWon.style.display = "none";



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



/* non object words and such */

const wordly = ['typically', 'respect', 'hadoop', 'expression', 'construct', 'function'];
const hintMe = ['Most often', 'A feeling', 'framework', 'Conveys a meaning', 'To build','Input & output'  ];

function randomGen (){
arrayNumber = Math.floor(Math.random()*wordly.length);
selectedWord = wordly[arrayNumber];
selectedHint = hintMe[arrayNumber];
displayHint.innerHTML = `${selectedHint}`;
document.getElementById('wordWas').innerHTML = ` ${selectedWord}`;
}

randomGen();







// guesses
const numOfTries = 6;
const numberOfGuesses = document.getElementById('numberOfTries');
numberOfGuesses.innerHTML = `${numOfTries}`;

// random generater






// display keyboard function



function gererateKeyboard (){
  let buttonJazz = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
      <button class="buttons" id="` + letter +`" onClick="handleGuess('`+ letter +`');">` + letter +`</button>

    `).join('');
  document.getElementById('keyboard').innerHTML = buttonJazz;
}




// class toggle





// handling numberOfGuesses

function handleGuess (chosenLetter){
  correctLetters.indexOf(chosenLetter) === -1 ? correctLetters.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true,);



     if (selectedWord.indexOf(chosenLetter) >= 0){
         displayW();
         anotherLetter.push(chosenLetter);
         correctWord ();

      }else if (selectedWord.indexOf(chosenLetter) >= -1){
         wrongLetters.push(chosenLetter);
         document.getElementById('hanged').src = `images/hangmantree-${wrongLetters.length}.png`;
         updateWrongLetter ();

      }









}






// object splash


 class Word {
   constructor (word, hint){
     this.word = word;
     this.hint = hint;
   }


 }




/* object library */
class Library {
    constructor (){
      this.words = ['typically', 'respect', 'hadoop', 'expression', 'construct', 'function'];
      this.hints = ['Most often', 'A feeling', 'framework', 'Conveys a meaning', 'To build','Input & output'  ];

      this.combo = [];

      for (let counter = 0, libraryCounter = this.words.length;  libraryCounter > counter; counter++  ){
        let catalog = new Word(this.words[counter], this.hints[counter]);
        this.combo.push(catalog);
      }
    }
}

const wordCombo = new Library();









//show hidden word
function displayW(){
  innerWord = selectedWord.split('').map(letter =>(correctLetters.indexOf(letter) >= 0 ? letter : "_" )).join('');
  displayWords.innerHTML = innerWord ;







}

function correctWord (){
  if (innerWord === selectedWord ){
     youWon.style.diplay = 'block';
  }
}

// hints




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
  randomGen();
  youWon.style.display = "none";
  wrongLetters.splice(0);
  correctLetters.splice(0);

  displayW();
  document.getElementById('hanged').src = "images/hangmantree-0.png";
  updateWrongLetter();
 gererateKeyboard();

});


playLost.addEventListener("click", function(){
  randomGen();
  youLost.style.display = "none";
  wrongLetters.splice(0);
  correctLetters.splice(0);
  displayW();
  updateWrongLetter();
  document.getElementById('hanged').src = "images/hangmantree-0.png";
  gererateKeyboard();

});

displayW();
gererateKeyboard();
