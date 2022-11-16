const colorsArray = document.querySelectorAll(".colors-list li");
const mainColor = localStorage.getItem("myColor");

colorsArray.forEach(el=>{
  el.classList.remove("active");
  if (el.dataset.color === mainColor){
    document.documentElement.style.setProperty("--main-color", mainColor);
    el.classList.add("active");
  }
});

document.querySelector(".setting-box i").onclick = function(){
  // toggle class fa-spin on icon to make rounding animatino
  this.classList.toggle("fa-spin");

  // toogle class open on setting box
  document.querySelector(".setting-box").classList.toggle("open");
}



// add Event Click for all Elements in ColorArray
colorsArray.forEach(li=>{

  li.addEventListener('click', (e)=>{
    // set --main-color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // add current color to local storage
    localStorage.setItem("myColor", e.target.dataset.color);

    // remove class active to li color
    e.target.parentElement.querySelectorAll(".active").forEach(el=>{
      el.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

// dark mode button
document.querySelector(".setting-box .option-box #btn-dark").addEventListener("click", e=>{
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")){
    localStorage.setItem("dark-mode", "yes");
  }
  else{
    localStorage.setItem("dark-mode", "no");
  }
});


let nav = document.getElementsByClassName('navbar')[0];
let menu = document.getElementsByClassName('menu')[0];
let menu_btnArr = document.getElementsByClassName('menu-btn');

var anitxt = document.getElementsByClassName('anitxt');
var txtArr = ["Frontend-Developer", "backend-Developer", "Freelancer", "Moataz Bahaa"]
var txt = "";
let idx = 0;
let arrIdx = 0;
function updateText(){
    txt = txtArr[arrIdx % txtArr.length];
    arrIdx++;
    addLetter();
}
function addLetter(){
    setTimeout(function(){
        anitxt[0].textContent += txt.charAt(idx);
        anitxt[1].textContent += txt.charAt(idx);
        idx++;
        if (idx < txt.length){
            addLetter();
        }else{
            setTimeout(function(){
                removeLetter();
            }, 1000);
        }
    }, 100);
}

function removeLetter(){
    idx--;
    if (idx >= 0){
        setTimeout(function(){
            anitxt[0].textContent = txt.slice(0, idx);
            anitxt[1].textContent = txt.slice(0, idx);
            removeLetter();
        }, 100);
    }else{
        updateText();
    }
}


document.addEventListener('DOMContentLoaded', function()
{
  document.documentElement.scrollTop = 0;
  updateText();
  // check if dark mode is stored in local sorage or not
  (()=>{
    // if yes set dark mode
    if (localStorage.getItem("dark-mode") === "yes"){
      document.body.classList.add("dark-mode");
      document.querySelector(".setting-box #toggle-switch").checked = true;
    }
    else{
      // else set light mode
      document.body.classList.remove("dark-mode");
      document.querySelector(".setting-box #toggle-switch").checked = false;
    }
  })();
  document.addEventListener('scroll', function(){
    if (scrollY > 30){
        nav.classList.add('stickly');
    }else{
        nav.classList.remove('stickly');
    }
    if (scrollY > 400){
        document.getElementsByClassName('btn-up')[0].classList.add('btn-up-show');
    }else{
        document.getElementsByClassName('btn-up')[0].classList.remove('btn-up-show');
    }
  });

  let b = true;
  for (let i = 0; i < menu_btnArr.length; i++){
    menu_btnArr[i].addEventListener('click', function(){
      menu.classList.toggle('active');
      if (b){
        menu_btnArr[6].textContent = "x";
        b = false;
      }else{
        menu_btnArr[6].textContent = "=";
        b = true;
      }
    });
  }

  document.getElementsByClassName('btn-up')[0].addEventListener('click', function(){
    document.body.scrollTop = 0;    // for safari
    document.documentElement.scrollTop = 0;     // for chrome, firefox, IE and Opera
  });


  // triggle animation when element is in view
  (function() {
    var elements;
    var windowHeight;
  
    function init() {
      elements = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
    }
  
    function checkPosition() {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var positionFromTop = elements[i].getBoundingClientRect().top;
        
        // check if the element is in view
        if (positionFromTop - windowHeight <= -300) {
          element.classList.add('fade-in-element');
          element.classList.remove('hidden');
        }
        // else{
        //   element.classList.remove('fade-in-element');
        //   element.classList.add('hidden');
        // }
      }
    }
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
  })();

});