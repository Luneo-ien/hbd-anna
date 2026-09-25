const quotes = [
    "Sinä kysyit itseltäsi, miksi kaikki meni pieleen,",
    "mutta ehkä mikään ei oikeasti ollut menossa pieleen.",
    "Ehkä se oli suojelua, jota et vain vielä nähnyt.",
    "Kaikki, mikä tuntuu menetykseltä, ei oikeasti ole menetys.",
    "Joskus se, mikä sattuu eniten, suojelee sinua hiljaa joltain vielä pahemmalta.",
    "Toivon, että tämä päivä saa sinut hymyilemään.",
    "Kiitos, että olet osa elämääni.",
    "Ja vielä kerran...",
    "Hyvää syntymäpäivää ❤️"
];

const quotesScreen = document.getElementById("quotes-screen");
const quoteText = document.getElementById("quote-text");
let quoteIndex = 0;

function showQuotes() {
    if (!quotesScreen || !quoteText) {
        showCake();
        return;
    }

    quotesScreen.classList.remove("hidden");
    quotesScreen.style.display = "flex";
    quoteIndex = 0;
    nextQuote();
}

function nextQuote() {
    if (quoteIndex >= quotes.length) {
        quotesScreen.classList.add("hidden");
        quotesScreen.style.display = "none";

        if (typeof showCake === "function") {
            showCake();
        }
        return;
    }

    quoteText.style.opacity = "0";

    setTimeout(() => {
        quoteText.textContent = quotes[quoteIndex];
        quoteText.style.opacity = "1";
        quoteIndex++;

        setTimeout(nextQuote, 3200);
    }, 500);
}
