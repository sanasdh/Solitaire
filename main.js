
/*----- constants -----*/

/*----- app's state (variables) -----*/
let cards; // (0,12) diamonds, (13,25) hearts, (26,38) spades, (39,51) clubs
let deck,b,d;
let move=0;
let timer = [0,0,0,0];
let interval;
let timerRunning = false;
let clickedCard;
let push=0;
let frontPile=[];
let hasClickedCard=false;
let previousPosition,currentPosition,clickedCard1;
let arr=[];

/*----- cached element references -----*/

let backPile=document.querySelector(".backPile");
let frontPileClass=document.querySelector(".frontPile");
let resetBtn=document.querySelector(".resetBtn");
let time=document.querySelector(".time");
let moveCards=document.querySelector(".moves");
let ul= document.querySelectorAll('ul');
let main= document.querySelector(".main");
let firstMR= document.querySelector(".firstMR");
let secondMR= document.querySelector(".secondMR");
let thirdMR= document.querySelector(".thirdMR");
let fourthMR= document.querySelector(".fourthMR");
let fifthMR= document.querySelector(".fifthMR");
let sixthMR= document.querySelector(".sixthMR");
let seventhMR= document.querySelector(".seventhMR");
let top1=document.querySelector(".top1");
let top2= document.querySelector(".top2");
let top3 = document.querySelector(".top3");
let top4 = document.querySelector(".top4");
let stock= document.querySelector(".stock");

let newDeck= init();
let topDeck=newDeck.slice(28);

/*----- event listeners -----*/

backPile.addEventListener("click", backPileFun);
frontPileClass.addEventListener("click", clickingCards);
resetBtn.addEventListener("click", reset);
let firstMREvt= firstMR.addEventListener("click", clickingCards);
let secondMREvt= secondMR.addEventListener("click", clickingCards);
let thirdMREvt= thirdMR.addEventListener("click", clickingCards);
let fourthMREvt= fourthMR.addEventListener("click", clickingCards);
let fifthMREvt= fifthMR.addEventListener("click", clickingCards);
let sixthMREvt= sixthMR.addEventListener("click", clickingCards);
let seventhMREvt= seventhMR.addEventListener("click", clickingCards);
top1.addEventListener("click", clickingCards);
top2.addEventListener("click", clickingCards);
top3.addEventListener("click", clickingCards);
top4.addEventListener("click", clickingCards);


// main.addEventListener("click", startingTime);

/*----- calling functions -----*/


dealing(newDeck);



/*----- functions -----*/
function init() {
   cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
   deck = shuffle(cards);
  console.log(deck);
  return deck;
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

// start the time
function startingTime(evt){
  clickedCard = evt.target;
  if(!clickedCard.classList.contains("card")) {
  return;}
  interval = setInterval(runTimer, 10);
}


// dealing the cards at the top left corner
function backPileFun(){
    moveFun();
    console.log("topDeck");
    console.log(topDeck);
    if (topDeck.length > 0) {
        while(arr.length>0){
          frontPileClass.classList.remove(arr[0]);
          arr.pop();
        }
        // console.log("frontPileClass.classList");
        // console.log(frontPileClass.classList.length);
        // console.log("frontPileClass.classList [0]");
        // console.log(frontPileClass.classList[0]);
        // console.log("frontPileClass.classList [1]");
        // console.log(frontPileClass.classList[1]);
        // console.log("frontPileClass.classList [2]");
        // console.log(frontPileClass.classList[2]);
        // console.log("frontPileClass.classList [3]");
        // console.log(frontPileClass.classList[3]);
        // console.log("frontPileClass.classList [4]");
        // console.log(frontPileClass.classList[4]);
      if(frontPileClass.classList.length>3){
      console.log("in frontPileClass.classList 4");
        // frontPileClass.classList.remove(suits(frontPile[0]));
        let a = frontPileClass.classList[3]
        frontPileClass.classList.remove(a)
      }
      arr.push(suits(topDeck[0]));
      frontPile.unshift(topDeck.shift());
      console.log("a[0]");
      console.log(arr[0]);
      console.log("a");
      console.log(arr);
      frontPileClass.classList.add(arr);
      console.log("frontPile");
      console.log(frontPile);
      console.log("frontPile class list");
      console.log(frontPileClass.classList);


}
    else fillipingCards(topDeck);
}

function fillipingCards(newDeck) {
    if (newDeck.length === 0) {
        for (var i = frontPile.length; i > 0; i--) {
            newDeck.unshift(frontPile.shift());
        }};
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
console.log("newDeck");
console.log(newDeck);
return newDeck;
 }
// adding the suits
function suits(card){
  // console.log("at suit function...")
let a;
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
  console.log("in dealing card function ...");
  let i=0
  for(let column=1; column<=7; column++){
    for(let row=1; row<=7; row++){
    let li = document.createElement('li');
       li.textContent = newDeck[i];
      a=suits(newDeck[i]);
      li.classList.add("card");
      li.classList.add("back");
      ul[column-1].appendChild(li);
      i++;
      if(row===column){
          li.classList.remove("back");
          li.classList.add(a);
          row=7;
      }
    }
  }
}

// clicking two cards
function clickingCards(evt){
  clickedCard = evt.target;
  if(!clickedCard.classList.contains("card")) {
  return;}
  console.log("frontPile in clickingCards function");
  console.log(frontPile);
  let b= gettingTheSuitsValue(clickedCard);
  let charSuit= b.slice(0,1);
  let value= b.substring(1);
  let wholeClass=b;
  class SingleCard{
    constructor(charSuit, value, clickedCard1){
      this.charSuit=charSuit;
      this.value=value;
      this.clickedCard1=clickedCard1;
      this.wholeClass=wholeClass;
    }
  }
  if(!hasClickedCard && !clickedCard.classList.contains("back")){
     previousPosition = new SingleCard(b.slice(0,1), b.substring(1), evt.target, b);
     clickedCard.classList.add("outline")
     hasClickedCard=true;
  } else if(hasClickedCard){
      previousPosition.clickedCard1.classList.remove("outline")
      currentPosition = new SingleCard(b.slice(0,1), b.substring(1), evt.target, b);
      compare(previousPosition, currentPosition);
      hasClickedCard=false;
      previousPosition=undefined;
      currentPosition=undefined;
}
  winning();
  return push, charSuit, value;
};


function gettingTheSuitsValue(clickedCard){
  let a;
  for(let i=0; i<=13; i++){

    // for hearts
     a="h"+i;
    if(clickedCard.classList.contains(a)){
        b=a;
        i=13}
    // for diamonds
     a="d"+i;
    if(clickedCard.classList.contains(a)){
        b=a;
        i=13}
  // for spades
     a="s"+i;
    if(clickedCard.classList.contains(a)){
        b=a;
        i=13}
  // for clubs
       a="c"+i;
      if(clickedCard.classList.contains(a)){
          b=a;
          i=13}
  }
  return b;
}
// Comparing function
  function compare(previousPosition, currentPosition){
    let x =currentPosition.clickedCard1.parentElement;
    let countcurentUL= x.querySelectorAll("li").length;
    let z =previousPosition.clickedCard1;
    let y =z.parentElement;

    // using cards into the game
   if((previousPosition.charSuit=="s" || previousPosition.charSuit=="c") && (currentPosition.charSuit=="h" || currentPosition.charSuit=="d") ||
    (previousPosition.charSuit=="h" || previousPosition.charSuit=="d") && (currentPosition.charSuit=="s" || currentPosition.charSuit=="c"))
    {
     let curVal=currentPosition.value;
     let preVal=parseInt(previousPosition.value)+1;
      if(curVal==preVal){
        // from top left corner
      if(z.classList.contains("frontPile")){
        dealingFromTLtoMR(z,x)}
       else if(z.nextSibling){
         moveWholeLi(z,x,y,countcurentUL)
       }
       // using middle row cards
       else if(previousPosition.value != 0) {
        y.removeChild(z);
        x.appendChild(z);
        moveFun()
        filippingMR(y)
      }
      }
    }
    // writting for moving kings into empty spots
    else if(previousPosition.value=="13" &&
        (currentPosition.clickedCard1.classList.contains("card")  )) {
          if(z.nextSibling){
            if(z.classList.contains("frontPile")){
              dealingFromTLtoMR(z,x)
              // x.appendChild(z);
              // y.removeChild(z);
            }else{
            moveWholeLi(z,x,y,countcurentUL)
            filippingMR(y)
            }
          }else{
          y.removeChild(z);
          x.appendChild(z);
          filippingMR(y)
        }
        moveFun()

          currentPosition.clickedCard1.remove()
        }
    // writting for A->k
    else if(previousPosition.charSuit===currentPosition.charSuit){
      stocking(previousPosition, currentPosition);
    }
  }

  function dealingFromTLtoMR(z,x){
  // if(z.classList.contains("frontPile"))
    let shiftedVal = frontPile.shift();
    let shiftedSuit= suits(shiftedVal);
    let li = document.createElement('li');
    li.classList.add(shiftedSuit);
    li.classList.add("card");
    x.appendChild(li);
    frontPileClass.classList.remove(shiftedSuit)
    frontPileClass.classList.add(suits(frontPile[0]));
    moveFun()
    return frontPile;
  }



// filipping the middleRow cards
function filippingMR(y){
  if( y.lastChild==y.first){
    let li = document.createElement('li');
    li.classList.add("card");
    let newLi = y.appendChild(li)
  } else if(y.lastChild.classList.contains("back")){
      y.lastChild.classList.remove("back");
      y.lastChild.classList.add(suits(y.lastChild.textContent));
  }
}

// building the 4 foundation cards
function stocking(previousPosition, currentPosition){

  let curVal=currentPosition.value;
  let preVal=parseInt(previousPosition.value)-1;
  if(curVal==preVal){
    console.log("frontPile in stocking function begining...");
    console.log(frontPile);
    let z =previousPosition.clickedCard1;
    let x =currentPosition.clickedCard1;
    if(z.classList.contains("frontPile")){
      let shiftedVal = frontPile.shift();
      let shiftedSuit= suits(shiftedVal);
      frontPileClass.classList.remove(shiftedSuit)
      frontPileClass.classList.add(suits(frontPile[0]));
      x.classList.remove(currentPosition.wholeClass);
      x.classList.add(shiftedSuit);
      moveFun()
      console.log("frontPile in stocking function end...");
      console.log(frontPile);
      return frontPile;
      }
      else{
      let y =z.parentElement; //ul
      let child=previousPosition.clickedCard1;
      x.classList.remove(currentPosition.wholeClass);
      x.classList.add(previousPosition.wholeClass);
      y.classList.remove(previousPosition.wholeClass);
      y.removeChild(child);
      moveFun()
      filippingMR(y)
    }
}
}

// moving the face up card and all the underneath li's
function moveWholeLi(z,x,y,countcurentUL){
  let lastChilsUL = z.parentElement.lastChild
  while(z.nextSibling){
    x.appendChild(z.nextSibling);
  }
  x.insertBefore(z, x.childNodes[countcurentUL]);
  moveFun();
  filippingMR(y)
}

// winning
function winning(){
if((top1.classList.contains("d13")) && (top2.classList.contains("c13")) &&
  (top3.classList.contains("h13")) && (top4.classList.contains("s13")) ){
  console.log("you won");
  startConfetti();
}
else {
  return;
}
}

// Reset everything:
    function reset() {
        clearInterval(interval);
        interval = null;
        timer = [0,0,0,0];
        timerRunning = false;
        time.innerHTML = "Time: 00:00:00";
        moveCards.innerHTML = "Moves: 0";
        deck=null;
        init();
        dealing(newDeck)

    }
// count the number of moves
    function moveFun(){
      move++;
      console.log(move);
      moveCards.innerHTML = "Moves: " + move;
    }
