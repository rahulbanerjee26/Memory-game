//A list of all the elements
let cards=['fa fa-diamond','fa fa-diamond','fa fa-paper-plane','fa fa-paper-plane','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bomb','fa fa-bomb','fa fa-bicycle','fa fa-bicycle'];

//Variables which will be needed
let deck =document.querySelector('.deck');
let openCard=[];
let matchingCards=[];
let moves=0;
let stars=3;
let displayMoves=document.querySelector('.moves');
let displayStar1=document.querySelector('.star1');
let displayStar2=document.querySelector('.star2');
let displayStar3=document.querySelector('.star3');
let restart=document.querySelector('.restart');
let displayTime=document.querySelector('.time');
let seconds=0;
let currentTimer;
let isMove=false;

function initial(){
cards=shuffle(cards);
timer();
for(let i=0;i<cards.length;i++){
  //Dynamically creates the card
  const Card=document.createElement("li");
  Card.classList.add("card");
  Card.innerHTML=`<i class="${cards[i]}"></i>`;
  deck.appendChild(Card);
  //Click event for each card is added
  $(Card).on('click',function(){
      if(openCard.length==1&&!($(Card).hasClass("open"))){
        Card.classList.add('open','show');
        openCard.push(this);
        isMove=true;
        compare(openCard[0],openCard[1]);
      }
      else if(!($(Card).hasClass("open"))){
        Card.classList.add('open','show');
        openCard.push(this);
        isMove=true;
      }
      if(isMove){
        moves++;
        isMove=false;
      }
      displayMoves.textContent=`${Math.round(moves/2)} `;
      starCount();
      if(matchingCards.length==16){
      setTimeout(function(){
        clearInterval(currentTimer);
        alert(`Congratulations you played ${Math.round(moves/2)} moves and took ${seconds} seconds. You scored ${stars} stars`);
        var button=confirm("Press ok to quit and cancel to restart");
        if(!button)
          reset();
        },400);
      }
    });
}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function compare(card_1,card_2){
  if(card_1.innerHTML==card_2.innerHTML){
    matchingCards.push(card_1,card_2);
    $(card_1).off('click');
    $(card_1).off('click');
  }
  else{
    card_1.classList.add("shake");
    card_2.classList.add("shake");
    setTimeout(function(){
      card_1.classList.remove("open","show","shake");
      card_2.classList.remove("open","show","shake");
    },300);
  }
  openCard.pop();
  openCard.pop();
}


function timer() {
    currentTimer=setInterval(function(){ displayTime.textContent=seconds;seconds++; }, 1000);
}
function starCount(){
  if(moves===30)
  {  displayStar1.classList.remove("fa-star"); stars--; }
  if(moves===40)
  {  displayStar2.classList.remove("fa-star"); stars--; }
}

function reset(){
  displayMoves.textContent=0;
  deck.innerHTML='';
  openCard=[];
  matchingCards=[];
  moves=0;
  stars=3;
  seconds=0;
  clearInterval(currentTimer);
  displayStar1.classList.add("fa-star")
  displayStar2.classList.add("fa-star")
  displayStar3.classList.add("fa-star")
  initial();
}
restart.addEventListener('click',reset);
initial();
