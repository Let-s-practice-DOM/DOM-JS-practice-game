// (function (){
// })();

// game start button
const startGame = document.getElementById("startGame");
const guessBox = document.getElementById("guessBox");
const assertCode = document.getElementById("assert");

// elements to manipulate
let headingSection = document.getElementById("nameToAdd");

let listSection = document.getElementById("listToEdit");

startGame.addEventListener("click", function(){

   let randomNum = Math.floor(Math.random() * 2) + 1;


   if(randomNum === 1){
       headingSection.style.display = "block";
       listSection.style.display = "none";
   } else if(randomNum === 2){
       listSection.style.display = "block";
       headingSection.style.display = "none";
   }

   assertCode.addEventListener("click", function (){
      //something about guessBox.value applying to the innerHTML of
      // whichever element there???
   });
















});








