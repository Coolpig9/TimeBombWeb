//adds touch support for dang safari... hopefully
var allButtons = document.getElementsByTagName('button')
for(const button of allButtons){
    button.ontouchstart += function() {
        element.classList.add('buttonActive');
    }
    button.ontouchend += function() {
        element.classList.remove('buttonActive');
    }
}

//Set Timer buttons
const hour   = document.getElementById('hour'  ).children[2];
const minute = document.getElementById('minute').children[2];
const second = document.getElementById('second').children[2];
var timer = {"h":hour,"m":minute,"s":second};
console.log(hour,minute,second);
function timerChange(p, amt){
    timer[p].innerHTML =  Number(timer[p].innerHTML)+amt;
    if(timer[p].innerHTML > 59){
        timer[p].innerHTML = 0;
    }else if(timer[p].innerHTML < 0){
        timer[p].innerHTML = 59;
    }

}

//numpad buttons & display logic
let digit = 0;
var disarmCode = '';
const codeDisplay = document.getElementById('codeDisplay').children;
console.log(codeDisplay)
function keyPadChange(key){
    num = key.innerHTML;
    console.log(key,num,digit);
    if (num == 'C'){
        digit = 0
        for(const digit of codeDisplay){
            digit.innerHTML = '_';
        }
        disarmCode = '';
    } else if (num == '&lt;'){
        //backspace
        digit--;
        if( digit < 0) {digit = 0}
        codeDisplay[digit].innerHTML = '_';
        disarmCode = disarmCode.slice(0, -1);
    }else if(digit <= 3){
        codeDisplay[digit].innerHTML = num;
        disarmCode += num;
        digit++;
    }
    console.log(disarmCode);
}


//Submit button
const blur = document.getElementById('blur');
const bombLink = document.getElementById('bombLink');
const submitConfirm = document.getElementById('submitConfirm');
const submitErr = document.getElementById('submitErr');
let reason = '';
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
    bombLink.href += '?a=1';
}
submitErrReason
//common close menu button
function closeMenu(parID){
    console.log('closing',parID,document.getElementById(parID))
    document.getElementById(parID).classList.add('hide');
    blur.classList.add('hide');
}


