const setupKey = new URLSearchParams(window.location.search);
const timer = document.getElementById('timerDisplay');
const timerC = document.getElementById('timerDisplay').children;
const timeWheel = document.getElementById('timeWheel');

const totalSeconds = (setupKey.get('h')*60*60)+ (setupKey.get('m')*60) + (setupKey.get('s')*1);
let seconds = 0;
var bombBlownUp = false;
var bombDisarmed = false;




console.log(setupKey,totalSeconds);
timerC[0].innerHTML = setupKey.get('h');
timerC[1].innerHTML = setupKey.get('m');
timerC[2].innerHTML = setupKey.get('s');
var ticker;

const bombArmMenu = document.getElementById('bombArmMenu');
const menuBlur = document.getElementById('blur');
function armMenu(){
    bombArmMenu.classList.add('hide');
    menuBlur.classList.add('hide');
    ticker = setInterval(timerTick, 1000);
    //tickAudio();
}
const armBombButton = document.getElementById('armBombButton');



function timerTick() {
    if(seconds >= totalSeconds){
        clearInterval(ticker);
        blowupFail();
        return;
    }
    timerC[2].innerHTML = Number(timerC[2].innerHTML)-1;
    for(let i=2;i>0;i--){
        if((timerC[i].innerHTML == '-1')){;
            timerC[i-1].innerHTML = Number(timerC[i-1].innerHTML)-1;
            timerC[i].innerHTML = '59';
        }
    }
    seconds++;
    timeWheel.style.background = "conic-gradient(rgb(26, 255, 0) "+ (360*(seconds/totalSeconds)) +"deg, rgb(255, 0, 0) 1deg)" ;
}

let tickDelay = 1;
var bombTick = null;
armBombButton.addEventListener('click', () => {
    bombTick = new Audio('sound/sound/wrongCode.mp3');
    tickAudio();
})
function tickAudio() {
    if(bombDisarmed || bombBlownUp){return;}
    bombTick.play();
    if((seconds+32-totalSeconds > 0)){
        tickDelay += 0.1
        timer.style.color = 'red';
        if(seconds+10-totalSeconds > 0){
            tickDelay += 0.05
        }
    }
    console.log(seconds, 2000/tickDelay, seconds/((totalSeconds-30)))
    setTimeout(tickAudio, 2000/tickDelay);
}


function blowupFail(){
    bombBlownUp = true
}
function bombDisarmedAlive(){
    var correct = new Audio('sound/correct1.mp3');
    correct.play();
    bombDisarmed = true;
    timer.style.color = 'green';
}


//keypad
let digit = 0;
var disarmCode = '';


const codeDisplay = document.getElementById('codeDisplay').children;
console.log(codeDisplay)
function keyPadChange(key){
    var keyClick = new Audio('sound/KeyPad.wav');
    var otherKey = new Audio('sound/enter.wav');
    var backspace = new Audio('sound/backspace.wav');
    var wrongCode = new Audio('sound/wrongCode.mp3');
    
    var num = key.innerHTML;
    console.log(key,num,digit);
    if (num == 'ENTER'){
        otherKey.play();
        if(bombDisarmed){return;}
        console.log(disarmCode , setupKey.get('code'))
        if(disarmCode == setupKey.get('code')){
            clearInterval(ticker);
            bombDisarmedAlive();
        }
        digit = 0;
        for(const digit of codeDisplay){
            if(bombDisarmed){
                digit.style.color = 'green';
            }else{
                wrongCode.play();
                digit.innerHTML = '_';
                digit.style.color = 'red';
                    setTimeout(function(){
                    digit.style.color = '';
                }, 1000);
            }   
        }
        disarmCode = '';
    } else if (num == '&lt;'){
        //backspace
        backspace.play();
        if(bombDisarmed){return;}
        digit--;
        if( digit < 0) {digit = 0}
        codeDisplay[digit].innerHTML = '_';
        disarmCode = disarmCode.slice(0, -1);
    }else if(digit <= 3){
        keyClick.play();

        if(bombDisarmed){return;}
        codeDisplay[digit].innerHTML = num;
        disarmCode += num;
        digit++;
    }
    console.log(disarmCode);
}