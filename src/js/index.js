'use strict';

// === DOM-Elemente ===
const messageElement = document.getElementById("message-element");
const sumELement = document.getElementById("sum-element");
const cardsElement = document.getElementById("cards-element");
const dealerElement = document.getElementById("dealer-element");
const betElement = document.getElementById("bet-element");
const playerElement = document.querySelector(".player-element");
const boardElement = document.getElementById("board-element");
// === Spiel-Abschnitte ===
const startAreaElement = document.getElementById("start-area");
const chooseAreaElement = document.getElementById("choose-area");
const playAreaElement = document.getElementById("play-area");
const betAreaElement = document.getElementById("bet-area");
// === Input-Elemente ===
const playerNameInput = document.getElementById("player-name-input");
const cashInput = document.getElementById("cash-input");
// === Error-Elemente ===
const nameErrorElement = document.getElementById("name-error");
const betErrorElement = document.getElementById("bet-error");

// === Button-Elemente ===
const btnStartGame = document.getElementById('btn-start-game');
const btnSetBet = document.getElementById('btn-set-bet');
const btnDrawCard = document.getElementById('btn-draw-card');
const btnHold = document.getElementById('btn-hold');
const btnNewRound = document.getElementById('btn-new-round');
const btnCashOut = document.getElementById('btn-cash-out');

// == Spielvariablen ===
let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let currentBet = 0;
let dealerSum = 0;
let isGameActive = false;
let currentMessage="";

const player = {
    name: "",
    chips: 10,
};

// === Funktionen ===

/**
 * Gibt ene zufällige Karte zurück zwischen 2 und 11.
 * Bei einem Ass wird 11 zurückgegeben, bei Bildkarten 10.
 */
const getRandomCard = () => {
    const randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if (randomNumber === 1) return 11;
    if (randomNumber > 10) return 10;
    return randomNumber; 
};

/**
 * Bewertet den Spielstand und aktualisiert die Anzeige.
 */
const evaluateGameState = () => {
    // Wenn das Spiel aktiv ist (Spieler zieht Karten)
    if (isGameActive) {
        if ( playerSum <= 20) {
            currentMessage ="Do you want to draw a new card?";
        } else if ( playerSum === 21) {
            currentMessage = `Wohoo! You've got Blackjack! You won ${currentBet * 4}$`;
            player.chips += currentBet * 4;
            displayDealerHand();
            playAreaElement.style.display = 'none';
            chooseAreaElement.style.display = 'block';
        } else {
            currentMessage ="You're out of the game!";
            isGameActive = false;
            displayDealerHand();
        };  
    } else {
        // Spielende: Vergleich von Spieler und Dealer
        if (playerSum === dealerSum || (dealerSum > 21 && playerSum > 21)) {
            currentMessage = `DRAW! you got ${currentBet}$ back.`;
            player.chips += currentCurrentBet;
        } else if (dealerSum < 22) {
            if (playerSum > dealerSum && playerSum < 22) {
                currentMessage = `YOU WON! You earend ${currentBet * 2}$`;
                player.chips += currentBet * 2;
            } else {
                currentMessage = "YOU LOST!";
            }
        } else {
            currentMessage = `YOU WON! You earned ${currentBet * 2}$`;
            player.chips += currentBet * 2; 
        }
        displayDealerHand();
        if (player.chips <= 0) {
            boardElement.style.display = 'none';
            playerElement.style.display = 'none';
            messageElement.style.color = 'darkred';
            messageElement.style.marginTop = '120px';
            messageElement.textContent = "YOU ARE OUT!";
            return;
        } else {
            playAreaElement.style.display = 'none';
            chooseAreaElement.style.display = 'block';
        }
    }

    messageElement.textContent = currentMessage;
    playerElement.textContent = `${player.name}: $${player.chips}`;
};

/**
 * Zeigt die Hand des Dealers an.
 */
const displayDealerHand = () => {
    dealerElement.textContent = "Dealer: ";
        dealerCards.forEach(card => {
            dealerElement.textContent += `${card} `;
        });
};

/**
 * Aktualisiet das Spielfeld (Spielerhand, Summe etc.) 
 */
const updateGameBoard = () => {
    boardElement.style.display = 'block';
    playAreaElement.style.display = 'block';
    chooseAreaElement.style.display = 'none';
    
    // Zeige erste Karte des Dealers und Platzhalter.
    dealerElement.textContent = `Dealer: ${dealerCards[0]} ?`;
    
    // Spielerhand anzeigen
    cardsElement.textContent = "Your cards: ";
    playerCards.forEach(card => {
        cardsElement.textContent += `${card} `
    });
    sumELement.textContent = `Sum: ${playerSum}`;
};


/**
 * Teilt die Anfangshände aus.
 * Für Dealer wird solange neu gezogen, bis die Summe mindestens 17 beträgt
 */
const dealInitialHands = () => {
    const firstPlayerCard = getRandomCard();
    const secondPlayerCard = getRandomCard();
    playerCards = [firstPlayerCard, secondPlayerCard];
    playerSum = firstPlayerCard + secondPlayerCard;

    let firstDealerCard, secoundDealerCard;
    
    do {
        firstDealerCard = getRandomCard();
        secoundDealerCard = getRandomCard();
        dealerSum = firstDealerCard + secoundDealerCard;
    } while (dealerSum < 17);
    dealerCards = [firstDealerCard, secoundDealerCard];
};

 /**
  *  Startet das Spiel, nach dem der Spieler seinen Namen eingegeben hat.
  */
const gameStarted = () => {
    nameErrorElement.textContent = "";
    const playerName = playerNameInput.value;
    if (playerName.trim() !== "") {
        player.name = playerName;
        playerElement.textContent = `${player.name}: $${player.chips}`;
        startAreaElement.style.display = 'none';
        roundStarted();
    } else {
        nameErrorElement.textContent = "Pls enter your name."
    }
};

/**
 *  Setzt den Einsatz des Spielers.
 */
const setBet = () => {
    betErrorElement.textContent = "";
    const betValue = parseInt(cashInput.value);
    if (betValue > 0 && betValue <= player.chips) {
        currentBet = betValue;
        cashInput.value = "";
        player.chips -= currentBet;
        playerElement.textContent = `${player.name}: $${player.chips}`;
        betElement.textContent = `BET: ${currentBet}$`;
        betAreaElement.style.display = 'none';
        renderGame();
    } else {
        betErrorElement.textContent = `Pls enter a value between 1 and ${player.chips}`;
    }  
};

/**
 * Startet eine neue Runde, indem der Wetteinsatzbereich angezeigt wird.
 */
const roundStarted = () => {
    boardElement.style.display = 'none';
    betAreaElement.style.display = 'block';
};

/**
 * Rendert das Spiel: teilt Karten aus, aktualisiert das Board und prüft den Spielstand.
 */
const renderGame = () => {
    isGameActive = true;
    dealInitialHands();
    updateGameBoard();
    evaluateGameState();
};

/**
 * Fügt dem Spieler eine neue Karte hinzu.
 */
const cardDrawn = () => {
    if (isGameActive) {
        const drawnCard = getRandomCard();
        playerSum += drawnCard;
        playerCards.push(drawnCard);

        if (playerSum > 21) isGameActive = false;
        updateGameBoard();
        evaluateGameState();
    }
};

/**
 * Beendet die Runde und übergibt das Spiel an den Dealer.
 */
const holdGame = () => {
    isGameActive = false;
    evaluateGameState();
};

const cashOut = () => {
    boardElement.style.display = 'none';
    playerElement.style.display = 'none';
    messageElement.textContent = `You won $${player.chips}`;
};

// === Event-Bindings ===
btnStartGame.addEventListener('click', gameStarted);
btnSetBet.addEventListener('click', setBet);
btnDrawCard.addEventListener('click', cardDrawn);
btnHold.addEventListener('click', holdGame);
btnNewRound.addEventListener('click', roundStarted);
btnCashOut.addEventListener('click', cashOut);