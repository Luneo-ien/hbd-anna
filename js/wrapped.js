const wrappedScreen = document.getElementById("wrapped-screen");
const wrappedImage = document.getElementById("wrapped-image");
const wrappedTitle = document.getElementById("wrapped-title");
const wrappedText = document.getElementById("wrapped-text");
const wrappedProgress = document.getElementById("wrapped-progress-fill");

const memories = [
    {
        image: "images/memories/6.jpg",
        title: "A little memory",
        text: "Some moments are simple, but they are still worth remembering."
    }
];

let wrappedIndex = 0;

function showWrapped() {
    if (!wrappedScreen) {
        showQuotes();
        return;
    }

    wrappedIndex = 0;
    wrappedScreen.classList.remove("hidden");
    wrappedScreen.style.display = "flex";
    showMemory();
}

function showMemory() {
    const memory = memories[wrappedIndex];

    wrappedScreen.classList.remove("active");
    wrappedImage.classList.remove("wrapped-show");
    wrappedTitle.classList.remove("wrapped-show");
    wrappedText.classList.remove("wrapped-show");

    wrappedImage.src = memory.image;
    wrappedTitle.textContent = memory.title;
    wrappedText.textContent = memory.text;
    wrappedProgress.style.width = ((wrappedIndex + 1) / memories.length) * 100 + "%";

    requestAnimationFrame(() => {
        wrappedScreen.classList.add("active");
        wrappedImage.classList.add("wrapped-show");
        wrappedTitle.classList.add("wrapped-show");
        wrappedText.classList.add("wrapped-show");
    });
}

wrappedScreen?.addEventListener("click", () => {
    wrappedIndex++;

    if (wrappedIndex >= memories.length) {
        wrappedScreen.classList.add("hidden");
        wrappedScreen.style.display = "none";

        if (typeof showQuotes === "function") {
            showQuotes();
        }
        return;
    }

    showMemory();
});
