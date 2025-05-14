let score = 0;
let flippedCards = [];
let matchedCards = [];
let gameTimer;
let cards = [
    "A", "A", "B", "B", "C", "C", "D", "D",
    "E", "E", "F", "F", "G", "G", "H", "H", 
    "I", "I"
];

function startGame() {
    const nameInput = document.getElementById("player-name");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Bitte gib deinen Namen ein.");
        return;
    }

    window.currentPlayerName = name;
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

    shuffledCards.forEach((card) => {
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
    if (
        flippedCards.length < 2 &&
        !clickedCard.classList.contains("flipped") &&
        !matchedCards.includes(clickedCard) &&
        !flippedCards.includes(clickedCard)
    ) {
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

        if (matchedCards.length === document.querySelectorAll(".memory-card").length) {
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
    clearInterval(gameTimer);
    saveHighscore(window.currentPlayerName, score, time);

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
    showHighscores();
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

function saveHighscore(name, score, time) {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ name, score, time });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores.slice(0, 5)));
}

function showHighscores() {
    const container = document.getElementById("highscore-list");
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

    if (!container) return;

    if (highScores.length === 0) {
        container.innerHTML = "<p>Noch keine Highscores vorhanden.</p>";
        return;
    }

    const list = document.createElement("ol");
    highScores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score} Punkte (${entry.time})`;
        list.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(list);
}

document.addEventListener("DOMContentLoaded", showHighscores);
