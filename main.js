
/*----- constants -----*/

/*----- app's state (variables) -----*/
let cards; // (0,12) diamonds, (13,25) hearts, (26,38) spades, (39,51) clubs
let deck,b,d,m;
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
let newDeck= init();
let topDeck=newDeck.slice(28);
let music=true;

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
let winCar = document.querySelector(".winCar");
let h1= document.querySelector("h1")
let matchingCards= document.getElementById("matchingCards");
let name = prompt("Hello there, please enter your name:");
let shuffleCards=document.getElementById("shuffleCards");
let speakerOn=document.querySelector(".speakerOn");
let speakerOff=document.querySelector(".speakerOff");
let speaker=document.querySelector(".speaker");
let cheering=document.getElementById("cheering");
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
winCar.addEventListener("click",winningArr);
speaker.addEventListener("click", muteSpeaker);

/*----- calling  -----*/
if (name==null){
  m=h1.textContent="Welcome to Solitaire, ";
}else{
  let m=h1.textContent="Welcome to Solitaire, " + name;
}
if(m){
  shuffleCards.play();
}
dealing(newDeck);
// speaker.classList.add("speakerOn");


/*----- functions -----*/
function init() {
   cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
   deck = shuffle(cards);
  return deck;
}

// playing with the winning array
function winningArr(){
  if(move==0){
    ul.forEach(function(singleUL){
      // singleUL=null;
      singleUL.textContent="";
    });
    newDeck=[1,14,27,15,2,40,3,16,28,41,42,4,17,30,29,6,19,5,18,31,43,46,20,7,33,45,44,32,8,21,34,47,9,22,35,48,10,23,36,49,11,24,37,50,12,25,38,51,13,26,39,52];
    topDeck=newDeck.slice(28);
    setTimeout(dealing(newDeck),1000);
  }
  return newDeck, topDeck;
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
  interval = setInterval(runTimer, 10);
}

// dealing the cards at the top left corner
function backPileFun(){
    moveFun();
    if (topDeck.length > 0) {
      if(!backPile.classList.contains("back")){
        backPile.classList.add("back");
      }
      if(topDeck.length==1){
        backPile.classList.remove("back");
      }
        while(arr.length>0){
          frontPileClass.classList.remove(arr[0]);
          arr.pop();
        }
      if(frontPileClass.classList.length>3){
        let a = frontPileClass.classList[3]
        frontPileClass.classList.remove(a)
      }
      arr.push(suits(topDeck[0]));
      frontPile.unshift(topDeck.shift());
      frontPileClass.classList.add(arr);
}
    else fillipingCards(topDeck);
}

// functions to filip the cards
function fillipingCards(newDeck) {
    if (newDeck.length === 0) {
        for (var i = frontPile.length; i > 0; i--) {
            newDeck.unshift(frontPile.shift());
        }};
}

// shuffling the cards
 function shuffle(cards){
   let num, i=cards.length, newDeck=[];
   while (i !==0) {
  num = Math.floor(Math.random() * (i));
  newDeck.push(cards[num]);
  cards.splice(num,1);
  i--;
}
return newDeck;
 }
// adding the suits
function suits(card){
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
  let i=0
  for(let column=1; column<=7; column++){
    for(let row=1; row<=7; row++){
    let li = document.createElement('li');
       li.textContent = newDeck[i];
      a=suits(newDeck[i]);
      li.classList.add("card");
      li.classList.add("back-half");
      ul[column-1].appendChild(li);
      i++;
      if(row===column){
          li.classList.remove("back-half");
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
      if(!currentPosition.clickedCard1.classList.contains("frontPile")){

        compare(previousPosition, currentPosition);
        hasClickedCard=false;
        previousPosition=undefined;
        currentPosition=undefined;
    }
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
       else if(z.nextSibling && !z.classList.contains("stock")){
         moveWholeLi(z,x,y,countcurentUL)
       }
       // from foundation cards to middle rows
       else if (z.classList.contains("stock")){
         foundationToMR(z,x)
         moveFun()
       // using middle row cards
     }else if(previousPosition.value != 0) {
       currentPosition.clickedCard1.classList.add("shortCards")
        y.removeChild(z);
        x.appendChild(z);
        moveFun()
        filippingMR(y)
      }
      }
    }
    // writting for moving kings into empty spots
    else if(previousPosition.value=="13" &&
        (currentPosition.clickedCard1.classList.contains("card") &&
        !(currentPosition.clickedCard1.classList.contains("d12") || currentPosition.clickedCard1.classList.contains("h12") || currentPosition.clickedCard1.classList.contains("s12") || currentPosition.clickedCard1.classList.contains("c12")))) {
          if(z.nextSibling){
            if(z.classList.contains("frontPile")){
              dealingFromTLtoMR(z,x)
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
    let shiftedVal = frontPile.shift();
    let shiftedSuit= suits(shiftedVal);
    let li = document.createElement('li');
    li.classList.add(shiftedSuit);
    li.classList.add("card");
    x.appendChild(li);
    currentPosition.clickedCard1.classList.add("shortCards")
    frontPileClass.classList.remove(shiftedSuit)
    frontPileClass.classList.add(suits(frontPile[0]));
    moveFun()
    return frontPile;
  }

// choosing cards from foundation cards and play it in the middle row
function foundationToMR(z,x){
  let shiftedVal = z.classList[4];
  let li = document.createElement('li');
  li.classList.add(shiftedVal);
  li.classList.add("card");
  x.appendChild(li);
  z.classList.remove(shiftedVal);
  let oldClass= shiftedVal.slice(0,1)+(shiftedVal.substring(1)-1)
  z.classList.add(oldClass);
  currentPosition.clickedCard1.classList.add("shortCards")
}

// filipping the middleRow cards
function filippingMR(y){
  if( y.lastChild==y.first){
    let li = document.createElement('li');
    li.classList.add("card");
    let newLi = y.appendChild(li)
  } else if(y.lastChild.classList.contains("back-half")){
      y.lastChild.classList.remove("back-half");
      y.lastChild.classList.add(suits(y.lastChild.textContent));
  }
}

// building the 4 foundation cards
function stocking(previousPosition, currentPosition){
  if(currentPosition.clickedCard1.classList.contains("stock")){
    let curVal=currentPosition.value;
    let preVal=parseInt(previousPosition.value)-1;
    if(curVal==preVal){
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
   confetti.start();
   alert(`congratulations you won in ${move} moves`)
   cheering.play();
  }
  else {
    return;
  }
}

// Reset everything:
    function reset() {
        clearInterval(interval);
        confetti.remove();
        cheering.pause()
        interval = null;
        timer = [0,0,0,0];
        timerRunning = false;
        move=0;
        time.innerHTML = "Time: 00:00:00";
        moveCards.innerHTML = "Moves: 0";
        deck=null;
        ul.forEach(function(singleUL){
        singleUL.textContent="";
      });
      if(!top1.classList.contains("d0")){
        top1.classList.remove(top1.classList[4])
        top1.classList.add("d0")
      }
      if(!top2.classList.contains("c0")){
        top2.classList.remove(top2.classList[4])
        top2.classList.add("c0")
      }
      if(!top3.classList.contains("h0")){
        top3.classList.remove(top3.classList[4])
        top3.classList.add("h0")
      }
      if(!top4.classList.contains("h0")){
        top4.classList.remove(top4.classList[4])
        top4.classList.add("s0")
      }
      frontPileClass.classList.remove(frontPileClass.classList[3])
      backPile.classList.add("back")

       newDeck = shuffle(newDeck);
        dealing(newDeck)
        topDeck=newDeck.slice(28);
    }

// sound on and off
function muteSpeaker(evt){
  let clickIcon=evt.target;
    if(clickIcon.classList.contains("speakerOn")){
      clickIcon.classList.remove("speakerOn");
      clickIcon.classList.add("speakerOff")
      music=false;
    } else if(clickIcon.classList.contains("speakerOff")){
      clickIcon.classList.remove("speakerOff");
      clickIcon.classList.add("speakerOn")
      music=true;
    }
  return music;
}
// count the number of moves
    function moveFun(){
      if(music){
      matchingCards.play();
    }
      move++;
      if(move==1){
        startingTime();
      }
      moveCards.innerHTML = "Moves: " + move;
    }
