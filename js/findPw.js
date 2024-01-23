const sendBtn = document.querySelector('button');
const codeInput = document.getElementsByClassName('input_div')[1];
sendBtn.onclick = ()=>{
    sendBtn.innerText = 'send Code';
    sendBtn.style.color ='#6DA7FF'; 
    codeInput.style.display = 'block';
} 
let customInputDiv = document.getElementsByClassName('input_custom');
let input = Array.from(document.getElementsByClassName('input'));

input.forEach(element => {
    element.onfocus = ()=> element.parentElement.style.borderColor = '#2291F8';
    element.onblur = () => element.parentElement.style.borderColor = '#616161';
});