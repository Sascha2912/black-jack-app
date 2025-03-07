'use strict';

// Get DOM-Elements
const messageEl = document.getElementById("message-el");
const sumEL = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const dealerEl = document.getElementById("dealer-el");
const playerEl = document.querySelector(".player-el");
const errorEl = document.querySelector(".error-el");
const startArea = document.getElementById("start-area");
const settingtArea = document.getElementById("setting-area");
const playArea = document.getElementById("play-area");
const betArea = document.getElementById("bet-area");
const chooseArea = document.getElementById("choose-area");
const playerName = document.getElementById("player-name");
const chashInput = document.getElementById("chash-input");

// Declare variables
let playerCards = [];
let dealerCards = [];
let sum = 0;
let dealerHand = 0;
let hasBlackJack = false;
let isAlive = false;
let message="";

const player = {
    name: "",
    chips: 10,
};

const getRandomCard = function(){

    let randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if(randomNumber === 1){
        return 11;
    }else if(randomNumber > 10){
        return 10;
    }else{
        return randomNumber;
    }
    
};

const hold = function(){
    isAlive = false;
    checkState();
}

const checkState = function(){
    if(isAlive){
        if( sum <= 20){
            message ="Do you want to draw a new card?";
        }else if( sum === 21){
            message = "Wohoo! You've got Blackjack!";
            hasBlackJack = true;
        }else{
            message ="You're out of the game!";
            isAlive = false;
        };
    
        
    }else{
        dealerEl.textContent = "Dealer: ";
        for(let i = 0; i < dealerCards.length; i++){
            dealerEl.textContent += dealerCards[i] + " ";
        }

        if(dealerHand < 22){
            sum > dealerHand ? message = "YOU WON!" : message = "YOU LOST!";
        }else if(sum === dealerHand){
            message = "DRAW!";
        }else{
            message = "YOU WON!"; 
        }
        
    }
    messageEl.textContent = message;
};

const renderBoard = function(){
    dealerEl.textContent = "Dealer: " + dealerCards[0] + " ?";
    
    playArea.style.display = "block";
    cardsEl.textContent = "Your cards: ";
    for(let i = 0; i < playerCards.length; i++){
        cardsEl.textContent += playerCards[i] + " ";
    }
    sumEL.textContent = "Sum: " + sum;
};

const getStartHands = function(){
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    playerCards = [firstCard, secondCard];
    sum = firstCard + secondCard;

    let dealerFirstCard = 0;
    let dealerSecoundCard = 0;
    
    do{
        dealerFirstCard = getRandomCard();
        dealerSecoundCard = getRandomCard();
        dealerHand = dealerFirstCard + dealerSecoundCard;
    }while(dealerHand < 16);
    dealerCards = [dealerFirstCard, dealerSecoundCard];
};

const startGame = function(){
    errorEl.textContent = "";
    let validateInput = playerName.value;
    if(validateInput.trim() !== ""){
        player.name = validateInput;
        playerEl.textContent = player.name + ": $" + player.chips;
        startArea.style.display = "none";
    }else{
        errorEl.textContent = "Pls enter your name."
        return;
    }
    renderGame();
};

const renderGame = function(){
    isAlive = true;
    
    getStartHands();
    
    renderBoard();

    checkState();
};

const newCard = function(){
    if(isAlive === true && hasBlackJack === false){
        let newCard = getRandomCard();
        sum += newCard;
        playerCards.push(newCard);
    
        renderBoard();
        checkState();
    }
    return;
};
