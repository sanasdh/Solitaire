
/*----- constants -----*/

/*----- app's state (variables) -----*/
let cards; // (0,12) diamonds, (13,25) hearts, (26,38) spades, (39,51) clubs
let deck;
let move=0;
let timer = [0,0,0,0];
let interval;
let timerRunning = false;
let clickedCard;
/*----- cached element references -----*/

let backPile=document.querySelector(".backPile");
let frontPile=document.querySelector(".frontPile");
let resetBtn=document.querySelector(".resetBtn");
let time=document.querySelector(".time");
let moveCards=document.querySelector(".moves");
let ul= document.querySelectorAll('ul');
let main= document.getElementById("main");



/*----- event listeners -----*/

backPile.addEventListener("click", backPileFun());
frontPile.addEventListener("click", frontPileFun());
resetBtn.addEventListener("click", reset());
main.addEventListener("click", clickingCards);

/*----- functions -----*/
function init() {
   cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
   deck = shuffle(cards);
  console.log(deck);
  return deck;
}

// start the time................
function start() {

    if (!timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }

}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    time.innerHTML = "Time " +currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// dealing the cards at the top left corner
function backPileFun(event){
  if (backPile.length > 0) {
      frontPile.unshift(backPile.shift())
      moves++
      render();
  }
  else fillipingCards();
}

function fillipingCards() {
    if (backPile.length === 0) {
        for (var i = frontPile.length; i > 0; i--) {
            backPile.unshift(frontPile.shift());
        }};
}

function frontPileFun(event){
  if (frontPile.length > 0) {
      firstPile.length = 0;
      firstPile.unshift(frontPile[0]); //change the firstPile
  }
}

// shuffling the cards
 function shuffle(cards){
   console.log("at shuffle function...")
   let num, i=cards.length, newDeck=[];
   while (i !==0) {
  num = Math.floor(Math.random() * (i));
  newDeck.push(cards[num]);
  cards.splice(num,1);
  i--;
}
console.log(newDeck);
return newDeck;
 }
// adding the suits
function suits(card){
  console.log("at suit function...")

      if(card>0 && card<=13){
        a="d"+card;
    } else if(card>13 && card<=26){
        card=card-13;
        a="h"+card;
    } else if (card>26 && card<=39) {
        card=card-26;
        a="s"+card;
    } else if (card>39 && card<=52) {
        card=card-39;
        a="c"+card;
    }
    return a;
}

// dealing the cards in the middle row
function dealing(newDeck){
  console.log("in dealing card function");
  let i=0
  for(let column=1; column<=7; column++){
    for(let row=1; row<=7; row++){
    let li = document.createElement('li');
       li.textContent = newDeck[i];
      i++;
      a=suits(newDeck[i]);
      li.classList.add("card");
      li.classList.add("back");
      ul[column-1].appendChild(li);

      if(row===column){
          // faced up card
          console.log("column")
          console.log(column)
          console.log("a")
          console.log(a)

          li.classList.remove("back");
          li.classList.add(a);
          row=7;
      }
    }
  }

}

function clickingCards(evt){

  clickedCard = evt.target;
  if(!clickedCard.classList.contains("card")) {
  return;}
  for(let i=0; i<=13; i++){
    let a="h"+i;
    console.log(a);
    if(clickedCard.classList.contains(a)){
        b=a;
        i=13}
  }
  let charSuit= b.charAt(0);
  let value= b-charSuit;
  console.log(b);
  return b;
};
// Reset everything:
    function reset() {
        clearInterval(interval);
        interval = null;
        timer = [0,0,0,0];
        timerRunning = false;

        time.innerHTML = "Time: 00:00:00";

    }
// count the number of moves
    function moveFun(){
      move++;
      console.log(move);
      moveCards.innerHTML = "Move " + move;
    }

/*----- calling functions -----*/

let newDeck= init();;
dealing(newDeck);

moveFun();
