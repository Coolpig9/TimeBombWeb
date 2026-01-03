//import {Howl, Howler} from 'dep/howler/howler.core.js';

//setup vars
const setupKey = new URLSearchParams(window.location.search);
const timer = document.getElementById('timerDisplay');
const timerC = document.getElementById('timerDisplay').children;
const timeWheel = document.getElementById('timeWheel');

const totalSeconds = (setupKey.get('h')*60*60)+ (setupKey.get('m')*60) + (setupKey.get('s')*1);
let seconds = 0;
var bombBlownUp = false;
var bombDisarmed = false;

//======================
//Sound init

//explode/not explode sounds
const wrong       = new Howl({src: ['sound/wrongCode.mp3']});
const correct     = new Howl({src: ['sound/correct1.mp3']});

//keypad
const keyClick    = new Howl({src: ['sound/enter.wav']});
const tryKey    = new Howl({src: ['sound/KeyPad.wav']});
const backspace   = new Howl({src: ['sound/backspace.wav']});
const wrongCode   = new Howl({src: ['sound/wrongCode.mp3']});

//bomb Tick
const bombTick    = new Howl({src: ['sound/beep.wav']});

//======================
console.log(setupKey,totalSeconds);
timerC[0].innerHTML = setupKey.get('h');
timerC[1].innerHTML = setupKey.get('m');
timerC[2].innerHTML = setupKey.get('s');
var ticker;

function closeArmMenu(){
    const bombArmMenu = document.getElementById('bombArmMenu');
    const menuBlur = document.getElementById('blur');
    bombArmMenu.classList.add('hide');
    menuBlur.classList.add('hide');
    ticker = setInterval(timerTick, 1000);
    timerTickAudio();
}
const armBombButton = document.getElementById('armBombButton');

//timer logic
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


function timerTickAudio() {
    if(bombBlownUp){return} //ends loop when 'player' loses
    bombTick.play();
    if(seconds >= totalSeconds-30){
        lowTime=(500/(15)*seconds);
        timer.style.color = 'red';
    }
    if(timer.style.fontWeight == 'none')
        {timer.style.fontWeight  = 'bold';}
    else 
        {timer.style.fontWeight  = 'bold';}
    setTimeout(timerTickAudio, 1000-lowTime)
}


function blowupFail(){
    bombBlownUp = true

}
function bombDisarmedAlive(){
    correct.play();
    bombDisarmed = true;
    timer.style.color = 'green';
}


//keypad
let digit = 0;
var disarmCode = '';


const codeDisplay = document.getElementById('codeDisplay').children;
console.log(codeDisplay)


let keyCooldown = false;
let wrongCooldown = false;
function keyPadChange(key){
    if(keyCooldown || wrongCooldown){return}
    keyCooldown = true;
    keyClick.rate(1);

    var num = key.innerHTML;
    console.log(key,num,digit);
    if (num == 'TRY'){
        //check code
        tryKey.play();
        if(bombDisarmed){return;}
        console.log(disarmCode , setupKey.get('code'))
        if(disarmCode == setupKey.get('code')){
            clearInterval(ticker);
            bombDisarmedAlive();
        }
        wrongCode.play();
        keyCooldown = true;

        wrongCooldown = true;
        for(const codeDigit of codeDisplay){
            if(bombDisarmed){
                codeDigit.style.color = 'green';
            }else{
                codeDigit.innerHTML = '_';
                codeDigit.style.color = 'red';
                setTimeout(function(){
                    codeDigit.style.color = '';
                    wrongCooldown = false;
                }, 1000);
            }   
        }
        digit = 0;
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
        //num key
        keyClick.rate(1+num/10).play();

        if(bombDisarmed){return;}
        codeDisplay[digit].innerHTML = num;
        disarmCode += num;
        digit++;
    }
    setTimeout(() => {keyCooldown = false}, 10)
}
