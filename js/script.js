// Birthday flow: Loading -> Nokia -> Decrypting -> Intro
const loadingScreen = document.getElementById("loading-screen");
const phoneScreen = document.getElementById("phone-screen");
const decryptScreen = document.getElementById("decrypt-screen");
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

// Clock
function updateClock() {
    const now = new Date();
    phoneClock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    phoneDate.textContent = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).toUpperCase();
}
updateClock();
setInterval(updateClock, 1000);

// Loading
let loading = 0;
const loadingTimer = setInterval(() => {
    loading++;
    if (loadingBar) loadingBar.style.width = loading + "%";
    if (loadingPercent) loadingPercent.textContent = loading + "%";

    if (loading < 20) loadingStatus.textContent = "Initializing...";
    else if (loading < 40) loadingStatus.textContent = "Loading music...";
    else if (loading < 60) loadingStatus.textContent = "Preparing birthday message...";
    else if (loading < 80) loadingStatus.textContent = "Almost ready...";
    else loadingStatus.textContent = "Ready!";

    if (loading >= 100) {
        clearInterval(loadingTimer);
        showPhone();
    }
}, 30);

// Nokia phone
function showPhone() {
    loadingScreen.style.display = "none";
    phoneScreen.classList.remove("hidden");
    phoneScreen.style.display = "flex";
}

if (openBtn) {
    openBtn.addEventListener("click", () => {
        const bgm = document.getElementById("bgm");
        if (bgm) bgm.play().catch(() => {});

        if (typeof gsap !== "undefined") {
            gsap.to(".phone", {
                scale: 0.92,
                opacity: 0,
                duration: 0.45,
                ease: "power2.in",
                onComplete: showDecrypt
            });
        } else {
            showDecrypt();
        }
    });
}

// Decrypt
function showDecrypt() {
    phoneScreen.classList.add("hidden");
    phoneScreen.style.display = "none";

    decryptScreen.classList.remove("hidden");
    decryptScreen.style.display = "flex";
    decryptBar.style.width = "0%";
    decryptPercent.textContent = "0%";

    let value = 0;
    const decryptTimer = setInterval(() => {
        value++;
        decryptBar.style.width = value + "%";
        decryptPercent.textContent = value + "%";

        if (value >= 100) {
            clearInterval(decryptTimer);
            decryptPercent.textContent = "Verified ✓";

            setTimeout(() => {
                decryptScreen.classList.add("hidden");
                decryptScreen.style.display = "none";
                showIntro();
            }, 700);
        }
    }, 18);
}

// Intro — stop here after the birthday message.
function showIntro() {
    introScreen.classList.remove("hidden");
    introScreen.style.display = "flex";

    const lines = [
        "Hi Anna...",
        "I made something for you.",
        "It took me quite a while...",
        "I wanted this to be special.",
        "So...",
        "Today is your birthday ❤️",
        "Happy Birthday ❤️"
    ];

    let line = 0;

    function typeLine() {
        if (line >= lines.length) return;

        let i = 0;
        introText.textContent = "";

        const typing = setInterval(() => {
            introText.textContent += lines[line][i];
            i++;

            if (i >= lines[line].length) {
                clearInterval(typing);
                setTimeout(() => {
                    line++;
                    typeLine();
                }, 1200);
            }
        }, 50);
    }

    typeLine();
}
