let menuBtn = Array.from(document.querySelectorAll('.menu_bar input'));
let menuStatics = Array.from(document.querySelectorAll('.static'));
console.log(menuBtn);
console.log(menuStatics)

//수정 필요 
function showStatics (index){
    for(static of menuStatics){
        static.style.display = 'none'
    }
    menuStatics[index].style.display = 'block'
} 
