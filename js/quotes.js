const quotes = [
    "You questioned everything going wrong for you,",
    "but maybe nothing was going wrong.",
    "Maybe it was protection you couldn't see yet.",
    "Not everything that feels like a loss is actually a loss.",
    "Sometimes what hurts the most is quietly saving you from something worse.",
    "I hope today makes you smile.",
    "Thank you for being part of my life.",
    "And once again...",
    "Happy Birthday ❤️",
    "Blak busy"
];

const quotesScreen = document.getElementById("quotes-screen");
const quoteText = document.getElementById("quote-text");
let quoteIndex = 0;

function showQuotes(){
    quotesScreen.classList.remove("hidden");
    quotesScreen.style.display = "flex";
    quoteIndex = 0;
    nextQuote();
}

function nextQuote(){
    if(quoteIndex >= quotes.length){
        quotesScreen.classList.add("hidden");
        quotesScreen.style.display = "none";
        if(typeof showCake === "function") showCake();
        return;
    }

    quoteText.style.opacity = "0";

    setTimeout(()=>{
        quoteText.textContent = quotes[quoteIndex];
        quoteText.style.opacity = "1";
        quoteIndex++;

        setTimeout(nextQuote, 3200);
    }, 500);
}