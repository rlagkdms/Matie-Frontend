let selectedDiv = document.getElementsByClassName("selected")[0];
let selectedValue = document.getElementsByClassName("selected-value")[0];
document.getElementsByTagName('main')[0].style.display = 'block';
document.getElementsByTagName('main')[1].style.display = 'none';    



//드롭다운메뉴 
function toggleSelectBox(){
    selectedDiv.nextElementSibling.classList.toggle('active');
}
function menuClick(string) {
    selectedValue.innerText = string;
    selectedDiv.nextElementSibling.classList.toggle('active');
    if(string === 'Daily challenges'){
        document.getElementsByTagName('main')[0].style.display = 'block';
        document.getElementsByTagName('main')[1].style.display = 'none';    
    }
    else{
        document.getElementsByTagName('main')[0].style.display = 'none';
        document.getElementsByTagName('main')[1].style.display = 'flex';    

    }

}

//슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const showEachChallenge = [...document.querySelectorAll('.challenge_box')];
showEachChallenge[0].style.display = 'flex';
function showSlide(index) {
  if (index < 0) {
    currentIndex = 0; 
  } else if (index >= totalSlides) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }


  const translationValue = -currentIndex * 100 + '%';
  document.querySelector('.slider-wrapper').style.transform = 'translateX(' + translationValue + ')';

  for(var i=0; i<totalSlides; i++){
    if(i==currentIndex)  showEachChallenge[currentIndex].style.display = 'flex';
    else showEachChallenge[i].style.display = 'none';

  }
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

//그룹-메뉴 
let challengeDiv = [...document.querySelectorAll('section')]

function showChallenge(index){
    for(var el of challengeDiv){
        el.style.display = 'none';
    }
    challengeDiv[index].style.display = 'flex';
}
