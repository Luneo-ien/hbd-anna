// =========================================

// ELEMENTS

// =========================================

const loadingScreen = document.getElementById("loading-screen");

const phoneScreen = document.getElementById("phone-screen");

const decryptScreen = document.getElementById("decrypt-screen");

const unlockScreen = document.getElementById("unlock-screen");

const introScreen = document.getElementById("intro-screen");



const loadingBar = document.querySelector(".loading-progress");

const loadingPercent = document.getElementById("loading-percent");

const loadingStatus = document.getElementById("loading-status");



const phoneClock = document.getElementById("phone-clock");

const phoneDate = document.getElementById("phone-date");



const openBtn = document.getElementById("open-btn");



const decryptBar = document.getElementById("decrypt-progress");

const decryptPercent = document.getElementById("decrypt-percent");



const introText = document.getElementById("intro-text");



// =========================================

// CLOCK

// =========================================

function updateClock(){

    const now = new Date();

    phoneClock.textContent = now.toLocaleTimeString([],{ hour:"2-digit", minute:"2-digit" });

    phoneDate.textContent = now.toLocaleDateString("en-GB",{

        day:"2-digit", month:"short", year:"numeric"

    }).toUpperCase();

}

updateClock();

setInterval(updateClock, 1000);



// =========================================

// LOADING

// =========================================

let loading = 0;

const timer = setInterval(()=>{

    loading++;

    loadingBar.style.width = loading + "%";

    loadingPercent.textContent = loading + "%";



    if(loading < 20) loadingStatus.textContent = "Initializing...";

    else if(loading < 40) loadingStatus.textContent = "Loading images...";

    else if(loading < 60) loadingStatus.textContent = "Loading music...";

    else if(loading < 80) loadingStatus.textContent = "Preparing memories...";

    else loadingStatus.textContent = "Almost ready...";



    if(loading >= 100){

        clearInterval(timer);

        showPhone();

    }

}, 30);



// =========================================

// PHONE & DECRYPT

// =========================================

function showPhone(){

    loadingScreen.style.display = "none";

    phoneScreen.classList.remove("hidden");

    phoneScreen.style.display = "flex";

}



openBtn.addEventListener("click", () => {

    // Play BGM if available

    const bgm = document.getElementById("bgm");

    if(bgm) bgm.play().catch(()=>{});



    gsap.to(".phone",{

        scale: 0.92,

        opacity: 0,

        duration: 0.45,

        ease: "power2.in",

        onComplete: ()=>{

            phoneScreen.classList.add("hidden");

            phoneScreen.style.display = "none";

            showDecrypt();

        }

    });

});



function showDecrypt(){

    decryptScreen.classList.remove("hidden");

    decryptScreen.style.display = "flex";

    decryptBar.style.width = "0%";

    decryptPercent.textContent = "0%";



    let value = 0;

    const timer = setInterval(()=>{

        value++;

        decryptBar.style.width = value + "%";

        decryptPercent.textContent = value + "%";



        if(value >= 100){

            clearInterval(timer);

            decryptPercent.textContent = "Verified ✓";

            setTimeout(()=>{

                decryptScreen.classList.add("hidden");

                decryptScreen.style.display = "none";

                showUnlock();

            }, 700);

        }

    }, 18);

}



function showUnlock(){

    unlockScreen.classList.remove("hidden");

    unlockScreen.style.display = "flex";



    gsap.from(".unlock-box",{

        y: 25,

        opacity: 0,

        duration: 0.6

    });



    if(typeof initUnlock === "function"){

        initUnlock();

    } else {

        // Fallback nếu không dùng unlock.js

        setTimeout(showIntro, 1000);

    }

}



// ======================================

// INTRO

// ======================================

function showIntro(){

    unlockScreen.style.display = "none";

    unlockScreen.classList.add("hidden");



    introScreen.classList.remove("hidden");

    introScreen.style.display = "flex";



    const lines = [

        "Hi Anna...",

        "I made something for you.",

        "It took me quite a while...",

        "I wanted this to be special.",

        "So...",

        "❤️ Happy Birthday ❤️", 

        "HEHEHE"

    ];



    let line = 0;



    function typeLine(){

        if(line >= lines.length){

            setTimeout(() => {

                introScreen.classList.add("hidden");

                introScreen.style.display = "none";

                if(typeof showWrapped === "function") showWrapped();

            }, 1000);

            return;

        }



        let i = 0;

        introText.textContent = "";



        const typing = setInterval(()=>{

            introText.textContent += lines[line][i];

            i++;



            if(i >= lines[line].length){

                clearInterval(typing);

                setTimeout(()=>{

                    line++;

                    typeLine();

                }, 1200);

            }

        }, 50);

    }



    typeLine();

}       
