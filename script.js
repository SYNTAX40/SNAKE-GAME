let score= document.querySelector('.score');
let highScore= document.querySelector('.high-score');
const playArea= document.querySelector('.play-area');

let gameover=false;
let axeX=0,axeY=0;
let foodX,foodY;
let snakeBody = [];
let snakeX=5,snakeY=10;
let Vscore=0;
let setIntervalId;

let localVar = localStorage.getItem("high-score") || 0;
highScore.innerText = `High Score: ${localVar}`; 

const changePositionFood = ()=>{
    foodX= Math.floor(Math.random() * 30) + 1;
    foodY= Math.floor(Math.random() * 30) + 1;
}

const gameOver = () =>{
    clearInterval(setIntervalId);
    alert("game over! Press Ok to replay...");
    location.reload();
}

const  changeDirection = e =>{
    if(e.key ==="ArrowUp" && axeY != 1){
        axeX= 0;
        axeY= -1;
    }else if(e.key === "ArrowDown" && axeY !=-1){
        axeX=0;
        axeY= 1;
    }else if(e.key ===  "ArrowLeft" && axeX != 1){
        axeX= -1;
        axeY=0;
    }else if(e.key === "ArrowRight" && axeX != -1){
        axeX=1;
        axeY=0;
    }
}

const snakeGame = () =>{
    if(gameover) return gameOver();

    let HTML = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    if(snakeX === foodX && snakeY == foodY ){
        changePositionFood();
        snakeBody.push([foodY,foodX]);
        Vscore++;
        localVar = Vscore >= localVar ? Vscore : localVar;
        localStorage.setItem("high-score",localVar);
        score.innerText=`Score: ${Vscore}`;
        highScore.innerText=`High Score: ${localVar}`;
    }

    snakeX += axeX;
    snakeY += axeY;
    
    for(let i=snakeBody.length - 1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    
    snakeBody[0]=[snakeX,snakeY];

    if(snakeX <=0 || snakeX>30 || snakeY <= 0 || snakeY >30){
        return gameover = true;
    }
    
    for(let i=0 ;i< snakeBody.length ;i++){
      HTML += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
      if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameover = true;
    }
    }

    playArea.innerHTML = HTML;
}
    

changePositionFood();
setIntervalId = setInterval(snakeGame,100);
document.addEventListener("keyup",changeDirection);