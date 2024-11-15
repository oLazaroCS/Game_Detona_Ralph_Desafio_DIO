const state = {

    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },

    values:{
        timerId: null,
        countDowntimerId: null,
        gameVelocity: 850,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        allLives: 3,
    },
}

function countLives(){
    state.view.lives.textContent = state.values.allLives

    if (state.values.allLives <= 0){
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDowntimerId);
        alert("Game Over! Não foi dessa vez... Mas continue tentando :)" );
        resetGame();
    }
}

function resetGame() {
    state.values.curretTime = 60; 
    state.values.result = 0;
    state.values.allLives = 3, 
    state.view.time.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;

    countLives()
    initialize();
}

function playSound(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.1;
    audio.play();
}

function countDown(){
    state.values.curretTime--;
    state.view.time.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        clearInterval(state.values.timerId);
        clearInterval(state.values.countDowntimerId);
        alert("Ops!!! Jogo acabou. Sua pontuação foi: " + state.values.result);
        resetGame();
    }
}
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")

    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox(){

    state.view.squares.forEach((square) => {
        const newSquare = square.cloneNode(true);
        square.parentElement.replaceChild(newSquare, square);
    });

    state.view.squares = document.querySelectorAll(".square");
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.allLives--;
                countLives();
            }
        });
    });
}

function initialize(){
    state.view.time.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
    state.values.countDowntimerId = setInterval(countDown, 1000);
    countLives()
    moveEnemy();
    addListenerHitbox();
}

initialize();