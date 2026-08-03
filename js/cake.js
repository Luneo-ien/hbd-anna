const cakeScreen = document.getElementById("cake-screen");
const flame = document.getElementById("flame");
const endingScreen = document.getElementById("ending-screen");

function showCake(){
    cakeScreen.classList.remove("hidden");
    cakeScreen.style.display = "flex";
    cakeScreen.style.opacity = "1";
}

if(flame){
    flame.addEventListener("click", ()=>{
        flame.style.transition = "opacity .4s ease";
        flame.style.opacity = "0";

        setTimeout(()=>{
            flame.style.display = "none";
            
            // Effect khi thổi nến
            if(typeof startConfetti === "function") startConfetti();

            setTimeout(()=>{
                cakeScreen.style.transition = "opacity 1s ease";
                cakeScreen.style.opacity = "0";
                
                setTimeout(()=>{
                    cakeScreen.classList.add("hidden");
                    cakeScreen.style.display = "none";
                    showEnding();
                }, 1000);
            }, 2500);

        }, 400);
    });
}

function showEnding(){
    endingScreen.classList.remove("hidden");
    endingScreen.style.display = "flex";
    gsap.from("#ending-screen h1", { y: -20, opacity: 0, duration: 1 });
    gsap.from("#ending-screen p", { y: 20, opacity: 0, duration: 1, delay: 0.3 });
}

