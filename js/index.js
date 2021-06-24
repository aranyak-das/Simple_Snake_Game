//Game constants& variables
let inputDir = {x: 0,y: 0};
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const movingSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3')
let speed = 10;
let score = 0;
let lastPainttime = 0;
let snakeArr = [
    {x: 13,y: 15}
];
food = {x: 9,y: 12}

//Game Functions
function main(ctime){
    //console.log(ctime)
    window.requestAnimationFrame(main);
    if((ctime - lastPainttime)/1000 < 1/speed){
        return;
    }
    lastPainttime = ctime;
    gameEngine();
}
function isCollide(snake){
    //Condition: Bumping into wall or yourself
    for (let i = 1; i<snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }

    }

function gameEngine(){
//Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0,y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = {x: 13,y: 15};
        musicSound.play();
        score = 0;
    }

//Incrementing the score and regenerating the food at random locations
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highscore_val){
            highscore_val = score;
            localStorage.setItem('highscore', JSON.stringify(highscore_val));
            highscoreBox.innerHTML = "Hi Score: " + highscore_val;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
        //Generating random number between a to b
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    //Moving the snake
    musicSound.play();
    for(let i = snakeArr.length-2; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }  

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

//Part 2:Displaying the snake & food
    //Displaying the snake
     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
         snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
         if(index === 0){
             snakeElement.classList.add('head');
         }
         else{
            snakeElement.classList.add('snake');
         }
         board.appendChild(snakeElement);
        })
         //Displaying the snake
         foodElement = document.createElement('div');
         foodElement.style.gridRowStart = food.y;
         foodElement.style.gridColumnStart = food.x;
         foodElement.classList.add('food')
         board.appendChild(foodElement);
}


//Main Logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscore_val = 0;
    localStorage.setItem('highscore', JSON.stringify(highscore_val));
}
else{
    highscore_val = JSON.parse(highscore);
    highscoreBox.innerHTML = "Hi Score: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0,y: 1}
    movingSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})