const wrappedSlides = [

    { image: "images/memories/1.jpg", title: "2026", text: "This year wasn't easy." },

    { image: "images/memories/2.jpg", title: "", text: "But you kept going." },

    { image: "images/memories/3.jpg", title: "", text: "You laughed.\nYou cried.\nYou grew." },

    { image: "images/memories/4.jpg", title: "", text: "There were memories\nI'll never forget." },

    { image: "images/memories/5.jpg", title: "", text: "And today...\nIt's your birthday ❤️" }

];



const wrappedScreen = document.getElementById("wrapped-screen");

const wrappedImage = document.getElementById("wrapped-image");

const wrappedTitle = document.getElementById("wrapped-title");

const wrappedText = document.getElementById("wrapped-text");

const wrappedProgress = document.getElementById("wrapped-progress-fill");



let wrappedIndex = 0;

let wrappedTimer = null;

let wrappedProgressTimer = null;



function showWrapped(){

    wrappedScreen.classList.remove("hidden");

    wrappedScreen.style.display = "flex";

    wrappedIndex = 0;

    renderWrapped();

}



function nextWrapped(){

    wrappedIndex++;

    if(wrappedIndex >= wrappedSlides.length){

        clearInterval(wrappedProgressTimer);

        clearTimeout(wrappedTimer);

        wrappedScreen.classList.add("hidden");

        wrappedScreen.style.display = "none";

        if(typeof showQuotes === "function") showQuotes();

        return;

    }

    renderWrapped();

}



wrappedScreen.addEventListener("click", nextWrapped);



function renderWrapped(){

    clearInterval(wrappedProgressTimer);

    clearTimeout(wrappedTimer);



    const slide = wrappedSlides[wrappedIndex];

    wrappedScreen.classList.remove("active");

    wrappedImage.style.opacity = "0";



    setTimeout(()=>{

        wrappedImage.src = slide.image;

        wrappedTitle.textContent = slide.title;

        wrappedText.textContent = slide.text;



        wrappedTitle.classList.remove("wrapped-show");

        wrappedText.classList.remove("wrapped-show");

        void wrappedTitle.offsetWidth; // Force Reflow



        wrappedTitle.classList.add("wrapped-show");

        wrappedText.classList.add("wrapped-show");



        wrappedScreen.classList.add("active");

        wrappedImage.style.opacity = "1";



        wrappedProgress.style.width = "0%";

        let progress = 0;



        wrappedProgressTimer = setInterval(()=>{

            progress += 2;

            wrappedProgress.style.width = progress + "%";

            if(progress >= 100){

                clearInterval(wrappedProgressTimer);

            }

        }, 100);



    }, 200);



    // Tự động chuyển slide sau 5s nếu không click

    wrappedTimer = setTimeout(() => {

        nextWrapped();

    }, 5000);

}

