const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=1;
handlSlider();
// set strength circle to grey


// set password length
function handlSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}

function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperrCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
const randNum= getRndInteger(0,symbols.length);
return symbols.charAt(randNum);
}

function caclStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbols=false;
    if(uppercaseCheck.checked ) hasUpper=true;
    if(lowercaseCheck.checked ) hasLower=true;
    if(numbersCheck.checked ) hasNumber=true;
    if(symbolsCheck.checked ) hasSymbols=true;

    if(hasUpper && hasLower && hasNumber && passwordLength>=7){
        setIndicator("#32de84");
    }
    else if(hasUpper|| hasNumber|| hasSymbols || passwordLength>=4){
        setIndicator("#ffa368");
    }
    else setIndicator("#cc5500");
}

async function copyContent(){

try{
     navigator.clipboard.writeText(passwordDisplay.value);
     copyMsg.innerText="copied";
}

catch(e){
         copyMsg.innerText="failed";
}

copyMsg.classList.add("active");

setTimeout(
    ()=>{
        copyMsg.classList.remove("active");
    },2000); 
}

function handleCheckBox(){
checkCount=0;
allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
        checkCount++;
});
 //special cond
 if(passwordLength<checkCount){
    passwordLength=checkCount;
    handlSlider();
 }

}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handlSlider();
})

copyBtn.addEventListener('copy',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click',()=>{
   // none of checkboxes are selected 

   if(checkCount<=0) return;

   if(passwordLength < checkCount){
    passwordLength=checkCount;
    handlSlider();
   }
  
   // removing old password

   password="";

   if(uppercaseCheck.checked){
    password+=generateUpperrCase();
   }

   if(lowercaseCheck.checked){
    password+=generateLowerCase();
   }

   if(numbersCheck.checked){
    password+=generateRandomNumber();
   }

   if(symbolsCheck.checked){
    password+=generateSymbol ();
   }


})