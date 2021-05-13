// constants and variables---

let Directions = { x: 0, y: 0 };
const mainMusic = new Audio('media/music.mp3');
const foodSound = new Audio('media/food.mp3');
const gameOver = new Audio('media/gameover.mp3');
const MovementSound = new Audio('media/move.mp3');
let score = 0;
let speed = 14;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food =
    { x: 8, y: 9 };


// mainGameFunction---
//   game loop
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
// when snake collide with the margin
function onCollission(snake) {
    // body collide
    // for(let i of snakeArr) 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // // margin collide
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;

    }
    // return false;
}
function gameEngine() {
    // 1. Updating Snake and food
    if (onCollission(snakeArr)) {
        mainMusic.pause();
        gameOver.play();
        Directions = { x: 0, y: 0 };
        alert('press SPACE to PLAY AGAIN');
        score = 0;
        scorecard.innerHTML = "Score: " + score;

        snakeArr = [{ x: 13, y: 15 }];
        mainMusic.play();
        gameOver.pause();

    }
    // snake increment and random food generation
    // snake increment
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scorecard.innerHTML = "Score: " + score;
        if (score > hiscorevalue) {
            hiscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            highscore.innerHTML = "Highscore: " + hiscorevalue;
        }
        snakeArr.unshift({ x: snakeArr[0].x + Directions.x, y: snakeArr[0].y + Directions.y });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }
    // moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += Directions.x;
    snakeArr[0].y += Directions.y;

    //  2. displaying snake and food
    // displaying snake
    board.innerHTML = "";
    snakeArr.forEach((el, index) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;

        if (index === 0) {
            snakeElement.classList.add('snakehead');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });
    // displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// main logic
//   highscore updation code
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscorevalue = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
}
else {
    hiscorevalue = JSON.parse(hiscore);
    highscore.innerHTML = "Highscore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    // gameshure
    mainMusic.play();
    Directions = { x: 0, y: 1 };  // gameshure
    MovementSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('arrow up');
            Directions.x = 0;
            Directions.y = -1
            break;
        case "ArrowDown":
            console.log('arrow down');
            Directions.x = 0;
            Directions.y = 1
            break;
        case "ArrowLeft":
            console.log('arrow left');
            Directions.x = -1;
            Directions.y = 0;
            break;
        case "ArrowRight":
            console.log('arrow right');
            Directions.x = 1;
            Directions.y = 0;
            break;

        default:
            break;
    }
})
