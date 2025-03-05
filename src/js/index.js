'use strict';

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

const player = {
    name: "Sascha",
    chips: 200,
};

let cards;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message="";
const messageEl = document.getElementById("message-el");
const sumEL = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

const startGame = function(){
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    cardsEl.textContent = "Cards: ";
    renderGame();
};

const renderGame = function(){

    cardsEl.textContent = "Cards: ";
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
