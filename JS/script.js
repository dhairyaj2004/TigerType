const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
let mistakes=document.querySelector(".mistake span");
let timeTag=document.querySelector(".time span b")
let wpmTag=document.querySelector(".wpm span")
let cpmTag=document.querySelector(".cpm span")
let btn=document.getElementById("reset")
let timer
let isTyping=false
maxTime=60;
timeLeft=maxTime;
let charIndex = 0;
let mistake=0;
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeTag.innerText = timeLeft;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}
function randomPara() {
    let random = Math.floor(Math.random() * Paragraphs.length);
    typingText.innerHTML=""
    Paragraphs[random].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function typing(e) {
    const chars = typingText.querySelectorAll("span");
    let typedText = inputField.value.split('')[charIndex];
    if(timeLeft>0 && charIndex<chars.length){
        if(!isTyping){
            isTyping=true
            startTimer()
        }
        if (e.inputType === "deleteContentBackward") {
            if (charIndex > 0) {
                charIndex--; 
                if(chars[charIndex].classList.contains("incorrect")){
                    mistake--;
                }
                chars[charIndex].classList.remove("correct", "incorrect"); 
            }
        } else {
           
            if (typedText === null) {
                return;
            } else {
                if (chars[charIndex].innerText === typedText) {
                    chars[charIndex].classList.add("correct");
                } else {
                    mistake++
                    chars[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
        }
        let wpm=Math.round((( (charIndex-mistake)/5) / (maxTime-timeLeft) )*60);
        if(wpm==0||!wpm||wpm==Infinity){
            wpm=0
        }
        mistakes.innerText=mistake
        wpmTag.innerText=wpm
        cpmTag.innerText=charIndex-mistake
    }
    else{
        inputField.value=""
        clearInterval(timer)
    }
}
function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText=timeLeft
    }else{
        clearInterval(timer)
    }
}
function resetApp(){
    randomPara();
    inputField.value=""
    clearInterval(timer)
    timeLeft=maxTime;
    charIndex = 0;
    mistake=0;
    timeTag.innerText=timeLeft
    mistakes.innerText=mistake
    wpmTag.innerText=0
    cpmTag.innerText=0  
    startTimer()
}
randomPara()
inputField.addEventListener("input", typing);
btn.addEventListener("click",resetApp);