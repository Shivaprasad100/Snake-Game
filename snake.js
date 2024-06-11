let gameBoard = document.querySelector(".gameBoard");
const ctx = gameBoard.getContext("2d");

let scoreText = document.querySelector(".scoreText");
let highestScoreText = document.querySelector(".highestScore");
let resetBtn = document.querySelector(".resetBtn");

let gameWidth = gameBoard.width;
let gameHeight = gameBoard.height;

const gameBackgroundColor = "rgb(237, 234, 234)";

const snakeColor = "lightgreen";
const snakeBorder = "black";

const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;

let foodX;
let foodY;

let score = 0;
let highestScore = 0;

let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];


let xVelocityPaused;
let yVelocityPaused;
let paused = false;


window.addEventListener("keydown", changeDirection);

//Adding Moving-Functoinalities
function changeDirection(event){
    //Keys are p=pause, upArrow, rightArrow, downArrow, leftArrow
    let keyPressed = event.keyCode;

    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;
    const leftKey = 37;

    
    //Snake on moving directions
    let goingRight = (xVelocity == unitSize);
    let goingDown = (yVelocity == unitSize);
    let goingLeft = (xVelocity == -unitSize);
    let goingUp = (yVelocity == -unitSize);


    //To go upWard by upArtow key
    if(!goingUp && keyPressed == upKey){
        xVelocity = 0;
        yVelocity = -unitSize;
    }
    //To go RightWard by DownWard arrow 
    else if(!goingRight && keyPressed == rightKey){
        xVelocity = unitSize;
        yVelocity = 0;

    }
    //To go DownWard by DownAtrow
    else if(!goingDown && keyPressed == downKey){
        xVelocity = 0;
        yVelocity = unitSize;
    }
    //To go Left
    else if(!goingLeft && keyPressed == leftKey){
        xVelocity = -unitSize;
        yVelocity = 0;
    }

    //To pause game and Resume
    if(keyPressed == 80 && running === true){
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
}

resetBtn.addEventListener("click", resetGame);

gameStart();

//To start the Game
function gameStart(){

    running = true;
    scoreText.textContent = 0;
    createFood();
    drawFood();
    nextTick();

}

//Next Move on Time
function nextTick(){
    
    if(running && !paused){
        setTimeout(()=>{
            clearBoard();
            drawBoard();
            drawSnake();

            moveSnake();
            checkGameOver();
            nextTick();
        }, 300);
    }
    else if(!running){
        displayGameOver();
    }

}

function createFood(){
    function randomFood(min, max){
        let randNum = Math.round((Math.random()*(max-min) + min)/unitSize)*unitSize;
        return randNum;
    }

    foodX = randomFood(0, gameWidth-unitSize);
    foodY = randomFood(0, gameWidth-unitSize);
    console.log(foodX, foodY);
    drawFood();
    //drawHead(snake[0]);
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function clearBoard(){

    ctx.fillStyle = gameBackgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    drawFood();
};
function drawBoard(){};
function moveSnake(){
    let head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }

    snake.unshift(head);
    

    
    
    if(snake[0].x === foodX && snake[0].y === foodY){
        score++;
        scoreText.textContent = score;
        createFood();

    }
    else{
        snake.pop();
    }
};

//draw head stroke to Red
function drawHead(headToStyle){
    ctx.strokeStyle = "red";
    ctx.strokeRect(headToStyle.x, headToStyle.y, unitSize, unitSize);
    ctx.stroke();
}

//Drawing Snake
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });

    drawHead(snake[0]);
}

function checkGameOver(){
    if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= gameWidth || snake[0].y >= gameHeight){
        running = false;
    }   
}

function displayGameOver(){
    ctx.font = "50PX MV BOLI";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER..", gameWidth/2, gameHeight/2);
}

function resetGame(){
    if(highestScore < score){
        highestScore = score;
        highestScoreText.textContent = highestScore;
    }

    paused = false;
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize*4, y:0},
        {x: unitSize*3, y:0},
        {x: unitSize*2,  y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart();
}
