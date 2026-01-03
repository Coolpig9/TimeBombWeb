//sounds
const keyClick    = new Howl({src: ['sound/enter.wav']});
const backspace   = new Howl({src: ['sound/backspace.wav']});

//Set Timer buttons
const hour   = document.getElementById('hour'  ).children[2];
const minute = document.getElementById('minute').children[2];
const second = document.getElementById('second').children[2];
var timer = {"h":hour,"m":minute,"s":second};
console.log(hour,minute,second);
var buttonCooldown = false

function timerChange(p, amt){
    if(buttonCooldown){return}
    buttonCooldown = true;
    keyClick.rate(.5);

    keyClick.play();
    timer[p].innerHTML =  Number(timer[p].innerHTML)+amt;
    if(timer[p].innerHTML > 59){
        timer[p].innerHTML = 0;
    }else if(timer[p].innerHTML < 0){
        timer[p].innerHTML = 59;
    }

    setTimeout(() => {buttonCooldown = false}, 10);
}

//numpad buttons & display logic


let digit = 0;
var disarmCode = '';
const codeDisplay = document.getElementById('codeDisplay').children;
console.log(codeDisplay)
function keyPadChange(key){
    if(buttonCooldown){return}
    buttonCooldown = true;
    keyClick.rate(1);

    num = key.innerHTML;
    console.log(key,num,digit);
    if (num == 'C'){
        keyClick.play();
        digit = 0
        for(const digit of codeDisplay){
            digit.innerHTML = '_';
        }
        disarmCode = '';
    } else if (num == '&lt;'){
        //backspace
        backspace.play();
        digit--;
        if( digit < 0) {digit = 0}
        codeDisplay[digit].innerHTML = '_';
        disarmCode = disarmCode.slice(0, -1);
    }else if(digit <= 3){
        keyClick.rate(1+num/10).play();
        codeDisplay[digit].innerHTML = num;
        disarmCode += num;
        digit++;
    }
    setTimeout(() => {buttonCooldown = false}, 10);
}


//Submit button
const blur = document.getElementById('blur');
const bombLink = document.getElementById('bombLink');
const submitConfirm = document.getElementById('submitConfirm');
const submitErr = document.getElementById('submitErr');
let reason = '';
let timeVar = '';
function summitSetup(){
    blur.classList.remove('hide');
    
    const timerERR = ((timer['h'].innerHTML+timer['m'].innerHTML+timer['s'].innerHTML) == '000')
    const codeERR  = (disarmCode.length != 4)
    if(timerERR || codeERR){
        reason = '';
        if(timerERR){
            reason += " 'Timer'";
        }
        if(codeERR){
            reason += " 'Code'";
        }
        document.getElementById('submitErrReason').innerHTML = reason;

        submitErr.classList.remove('hide');

        console.log('error');
        return;
    }
    submitConfirm.classList.remove('hide');
    //adds data to screen
    document.getElementById('code').innerHTML = disarmCode;
    const submitTime = document.getElementById('sumitTime');
    console.log(submitTime.children);
    
    for(let i = 0; i<3; i++){

        console.log(i,submitTime.children[i*2].innerHTML,timer[['h','m','s'][i]].innerHTML);
        const tKey = ['h','m','s'];
        const t = timer[tKey[i]].innerHTML;
        timeVar += '&' + tKey[i] + '=' + t;
        submitTime.children[i*2].innerHTML = t;
    }
    bombLink.href = 'timer.html'+'?code='+disarmCode+timeVar;
}

submitErrReason
//common close menu button
function closeMenu(parID){
    console.log('closing',parID,document.getElementById(parID))
    document.getElementById(parID).classList.add('hide');
    blur.classList.add('hide');
}


