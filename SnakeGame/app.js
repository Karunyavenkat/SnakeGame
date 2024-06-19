const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');

const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;

let xVelo = 25 ; // left movement
let yVelo = 0;

let score = 0;
let active = true;
let started = false;

let snake = [
    {x:UNIT*3, y:0},
    {x:UNIT*2, y:0},
    {x:UNIT, y:0},
    {x:0, y:0}
];
window.addEventListener('keydown',keypress);

startGame();

function startGame(){

    context.fillStyle = 'black';
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();  
    nextTick();
}
    
function clearBoard(){
    context.fillStyle = 'black';
    context.fillRect(0,0,WIDTH,HEIGHT);

}
function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = 'green';
    context.strokeStyle = 'black';
    snake.forEach((snakePath) =>{
        context.fillRect(snakePath.x,snakePath.y,UNIT,UNIT);
        context.strokeRect(snakePath.x,snakePath.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVelo, y:snake[0].y+yVelo}
    snake.unshift(head); //to add in the snake array
    if(snake[0].x==foodX && snake[0].y==foodY)
    {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    snake.pop(); //delete the back one
}

function nextTick(){
    if(active)
    {
            setTimeout(() =>{
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },300); 
    }
    else{
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,HEIGHT/2);
    }
}

function keypress(event){
    if(!started)
    {
        started = true;
        nextTick();
    }

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;  //search:arrow keys keycode; code for each keys

    switch(true){
        case(event.keyCode==LEFT && xVelo!=UNIT):
            xVelo = -UNIT;
            yVelo = 0;
            break;
        case(event.keyCode==RIGHT && xVelo!=-UNIT):
            xVelo = UNIT;
            yVelo = 0;
            break;
        case(event.keyCode==UP && yVelo!=UNIT):
            xVelo = 0;
            yVelo = -UNIT;
            break;
        case(event.keyCode==DOWN && yVelo!=-UNIT):
            xVelo = 0;
            yVelo = UNIT;
            break;
        
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        case(snake[0].x >= WIDTH):
        case(snake[0].y < 0):
        case(snake[0].y >= HEIGHT):
            active = false;
            break;
    }
}
