const container = document.querySelector('.container');
const nav = document.querySelector('.nav');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const clock = document.querySelector('.clock');
const sky = document.querySelector('.sky');
const dong = document.querySelector('.dong');
const person = document.querySelector('.person');
const ground = document.querySelector('.ground');
const popup = document.querySelector('.popup');
const restart = document.querySelector('.popup_btn');


let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let intervalItem;
let intervalTime;
let intervalMove

function getTime() {
    
    miliseconds++;

    if(miliseconds == 100){
        miliseconds = 0;
        seconds++;
    }

    if(seconds == 60) {
        seconds = 0;    
        minutes++
    }

    clock.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}:${miliseconds}`;
}



function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


skyRect = sky.getBoundingClientRect();

function addItem() {    
    const x1 = 0;
    const x2 = skyRect.width - 26;
    
    const item = document.createElement('img');
    
    item.setAttribute('class', 'dong');
    item.setAttribute('src', 'dong.png');
    item.style.position = 'absolute';
    let x = randomNumber(x1, x2);
    item.style.left = `${x}px`;
    
    let dongY = 4;
    let y = 0;
    item.style.Top = `${y}px`;
    
    sky.appendChild(item);
    
    function moveItem() {
        y += dongY;
        item.style.marginTop = `${y}px`;
        if(y  > 600) {
            item.remove();
        }
        
        if(item.x <= person.x  && item.x + 26 >= person.x && item.y === person.y ||
            item.x <= person.x + 14 && item.x + 26 >= person.x + 14 && item.y === person.y) {
                gameOver();
                getPop();
                return;
            } 
        }
    intervalMove = setInterval(moveItem,10);
}    
    

const SHOW = "showing";
const NONE = "none";



function init() {
    start.classList.add(NONE);
    stop.classList.remove(NONE);
    stop.classList.add(SHOW);
    
    intervalItem = setInterval(addItem,50);
    intervalTime = setInterval(getTime,10);
}

start.addEventListener('click', () => {
    init();
});

stop.addEventListener('click', () => {
    clearInterval(intervalItem);
    clearInterval(intervalTime); 
});


document.addEventListener('keydown', (event) => human(event));

let personX = 250;

function human(event) {
    if(event.key === "Right" || event.key === "ArrowRight") {
        personX+=20;
        person.style.marginLeft = `${personX}px`;
    }else if(event.key === "Left" || event.key === "ArrowLeft") {
        personX-=20;
        person.style.marginLeft = `${personX}px`; 
    }
    
    if(personX < 20) {
        personX = 20;
    }else if(personX > 470) {
        personX = 470;
    }
}

function gameOver() {
    clearInterval(intervalItem);
    clearInterval(intervalTime);
}


function getPop() {
    popup.classList.add(SHOW)
    popup.classList.remove(NONE);

    const score = document.createElement('h1');

    score.setAttribute('class', 'score')
    score.innerHTML = clock.innerHTML;
    
    popup.appendChild(score);
}

function again() {
    start.classList.remove(NONE);
    start.classList.add(SHOW);
    stop.classList.remove(SHOW);
    stop.classList.add(NONE);
    popup.classList.add(NONE)
    popup.classList.remove(SHOW);

    clock.innerHTML = `00:00:0`;
}

restart.addEventListener('click', () => {
    again();
})