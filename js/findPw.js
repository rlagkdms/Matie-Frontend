const sendBtn = document.querySelector('button');
sendBtn.onclick = ()=>{
    sendBtn.style.color ='#6DA7FF'; 
} 
let customInputDiv = document.getElementsByClassName('input_custom');
let input = Array.from(document.getElementsByClassName('input'));

input.forEach(element => {
    element.onfocus = ()=> element.parentElement.style.borderColor = '#2291F8';
    element.onblur = () => element.parentElement.style.borderColor = '#616161';
});