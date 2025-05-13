let score = 0;
let flippedCards = [];
let matchedCards = [];
let gameStarted = false;
let gameTimer;
let highScores = [];

const cards = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H", 
    "I", "I", 
];

function startGame() {
    const nameInput = document.getElementById("player-name");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Bitte gib deinen Namen ein.");
        return;
    }

    document.getElementById("start-menu").style.display = "none";
    document.getElementById("game-area").style.display = "block";
    document.getElementById("greeting").textContent = "Viel Glück, " + name + "!";
    
    startTimer();
    shuffleCards();
}


function shuffleCards() {
   
    const shuffledCards = cards.slice().sort(() => Math.random() - 0.5);

    const gameArea = document.getElementById("memory-game");
    gameArea.innerHTML = '';  

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("memory-card", "memory-back-cover"); 
        cardElement.dataset.card = card;
        cardElement.innerText = "";  
        cardElement.addEventListener("click", flipCard);
        gameArea.appendChild(cardElement);
    });

}

function flipCard(event) {
    const clickedCard = event.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains("flipped") && !matchedCards.includes(clickedCard)) {
        clickedCard.innerText = clickedCard.dataset.card;
        clickedCard.classList.add("flipped");
        flippedCards.push(clickedCard);
        
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
        score += 10;
        matchedCards.push(flippedCards[0], flippedCards[1]);
        flippedCards = [];

        document.getElementById("score").innerText = score;

        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                const time = document.getElementById("time").innerText;
                displayGameOver(score, time);
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.innerText = "";
                card.classList.remove("flipped");
            });
            flippedCards = [];
        }, 1000);
    }
}

function displayGameOver(score, time) {

    document.getElementById("game-area").style.display = "none";
    
    const gameOverArea = document.createElement("div");
    gameOverArea.classList.add("game-over");
    gameOverArea.innerHTML = `
        <h2>Spiel beendet!</h2>
        <p>Deine Punktzahl: ${score}</p>
        <p>Benötigte Zeit: ${time}</p>
        <button onclick="restartGame()">Neustarten</button>
    `;
    
    document.body.appendChild(gameOverArea);
}

function restartGame() {
   
    location.reload();
}

function startTimer() {
    let time = 0;
    gameTimer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById("time").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}
