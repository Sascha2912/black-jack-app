'use strict';

// Get DOM-Elements
const messageEl = document.getElementById("message-el");
const sumEL = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
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
let cards, sum, hasBlackJack, isAlive, message;

const player = {
    name: "",
    chips: 10,
};

const initPlayer = function(){
    errorEl.textContent = "";
    let validateInput = playerName.value;
    if(validateInput.trim() !== ""){
        player.name = validateInput;
        playerEl.textContent = player.name + ": $" + player.chips;
        renderGame();
    }else{
        errorEl.textContent = "Pls enter your name."
    }
    
}

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

const startGame = function(){
    startArea.style.display = "none";
    settingtArea.style.display = "block";
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
    message="";
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    cardsEl.textContent = "Cards: ";
};

const renderGame = function(){
    settingtArea.style.display = "none";
    playArea.style.display = "block";
    cardsEl.textContent = "Your cards: ";
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " ";
    }

    sumEL.textContent = "Sum: " + sum;
    if( sum <= 20){
        message ="Do you want to draw a new card?";
    }else if( sum === 21){
        message = "Wohoo! You've got Blackjack!";
        hasBlackJack = true;
    }else{
        message ="You're out of the game!";
        isAlive = false;
    };

    messageEl.textContent = message;
};

const newCard = function(){
    if(isAlive === true && hasBlackJack === false){
        let newCard = getRandomCard();
        sum += newCard;
        cards.push(newCard);
    
        renderGame();
    }
    return;
};
