'use strict';

// Get DOM-Elements
const messageEl = document.getElementById("message-el");
const sumEL = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const dealerEl = document.getElementById("dealer-el");
const betEl = document.getElementById("bet-el");
const playerEl = document.querySelector(".player-el");
const errorEl = document.querySelector(".error-el");
const betErrorEl = document.getElementById("bet-error-el");
const startArea = document.getElementById("start-area");
const boardEl = document.getElementById("board-el");
const playArea = document.getElementById("play-area");
const betArea = document.getElementById("bet-area");
const chooseArea = document.getElementById("choose-area");
const playerName = document.getElementById("player-name");
const chashInput = document.getElementById("chash-input");

// Declare variables
let playerCards = [];
let dealerCards = [];
let sum = 0;
let bet = 0;
let dealerHand = 0;
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
};

const showdealerHand = function(){
    dealerEl.textContent = "Dealer: ";
        for(let i = 0; i < dealerCards.length; i++){
            dealerEl.textContent += dealerCards[i] + " ";
        }
};

const checkState = function(){
    if(isAlive){
        if( sum <= 20){
            message ="Do you want to draw a new card?";
        }else if( sum === 21){
            message = "Wohoo! You've got Blackjack! You won " + ( bet * 3 + bet) + "$";
            player.chips += bet * 3 + bet;
            showdealerHand();
            playArea.style.display = "none";
            chooseArea.style.display = "block";
        }else{
            message ="You're out of the game!";
            isAlive = false;
            showdealerHand();
        };
        
    }else{
        
        if(sum === dealerHand){
            message = "DRAW! you got " + bet + "$";
            player.chips += bet;
        }else if(dealerHand < 22){
            if(sum > dealerHand && sum < 22){
                message = "YOU WON! " + (bet + bet) + "$";
                player.chips += (bet + bet);
            }else{
                message = "YOU LOST!";
            }
        }else{
            message = "YOU WON! " + (bet + bet) + "$";
            player.chips += (bet + bet); 
        }
        showdealerHand();
        if(player.chips <= 0){
            boardEl.style.display = "none";
            playerEl.style.display = "none";
            messageEl.style.color = "darkred";
            messageEl.style.marginTop = "120px";
            messageEl.textContent = "YOU ARE OUT!";
            return;
        }else{
            playArea.style.display = "none";
            chooseArea.style.display = "block";
        }
    }

    messageEl.textContent = message;
    playerEl.textContent = player.name + ": $" + player.chips;
};

const renderBoard = function(){
    boardEl.style.display = "block";
    playArea.style.display = "block";
    chooseArea.style.display = "none";
    dealerEl.textContent = "Dealer: " + dealerCards[0] + " ?";
    
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
        newRound();
    }else{
        errorEl.textContent = "Pls enter your name."
        return;
    }
};

const setBet = function(){
    betErrorEl.textContent = "";
    let validateInput = parseInt(chashInput.value);
    if(validateInput > 0 && validateInput <= player.chips){
        bet = validateInput;
        chashInput.value = "";
        player.chips -= bet;
        playerEl.textContent = player.name + ": $" + player.chips;
        betEl.textContent = "BET: " + bet + "$";
        betArea.style.display = "none";
    }else{
        betErrorEl.textContent = "Pls enter a value between 1 and " + player.chips; 
        return;
    }

    renderGame();
};

const newRound = function(){
    boardEl.style.display = "none";
    betArea.style.display = "block";
};

const renderGame = function(){
    isAlive = true;
    
    getStartHands();
    
    renderBoard();

    checkState();
};

const newCard = function(){
    if(isAlive === true){
        let newCard = getRandomCard();
        sum += newCard;
        playerCards.push(newCard);

        if(sum > 21){
            isAlive = false;
        }
    
        renderBoard();
        checkState();
    }
    return;
};

const chashOut = function(){
    boardEl.style.display = "none";
    playerEl.style.display = "none";
    messageEl.textContent = "You won " + player.chips + "$"
};
