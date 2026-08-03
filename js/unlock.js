// ======================================
// QUESTIONS
// ======================================

const questions = [

    {

        question: "Where did we first meet?",

        answers: [
            "david"
        ]

    },

    {

        question: "What nickname do you call me?",

        answers: [
            "anh",
            "cục"
        ]

    }

];

let currentQuestion = 0;
let attempts = 5;



// ======================================

function initUnlock(){

    currentQuestion = 0;
    attempts = 5;

    renderQuestion();

}
function renderQuestion(){

    const q = questions[currentQuestion];

    document.getElementById("question-area").innerHTML = `

        <div class="question-card">

            <h3>
                Question ${currentQuestion + 1} / ${questions.length}
            </h3>

            <p class="question-text">
                ${q.question}
            </p>

            <input
                id="answer-input"
                type="text"
                autocomplete="off"
                placeholder="Your answer...">

            <p id="attempt-text">
                Attempts left : ${attempts}
            </p>

            <button id="confirm-btn">
                CONFIRM
            </button>

        </div>

    `;

    document
        .getElementById("confirm-btn")
        .addEventListener("click", checkAnswer);

}

// ======================================

function renderChemQuestion(){

    document.getElementById("question-area").innerHTML = `

    <div class="equation-card">

        <h3>FINAL SECURITY CHECK</h3>

        <p>Balance the chemical equation</p>

        <div class="equation">

            <div class="eq-row">

                <input class="coef" id="c1" maxlength="1">
                <span>Cr(OH)<sub>3</sub></span>

                <span> + </span>

                <input class="coef" id="c2" maxlength="1">
                <span>KMnO<sub>4</sub></span>

                <span> + </span>

                <input class="coef" id="c3" maxlength="1">
                <span>KOH</span>

            </div>

            <div class="arrow">↓</div>

            <div class="eq-row">

                <input class="coef" id="c4" maxlength="1">
                <span>K<sub>2</sub>CrO<sub>4</sub></span>

                <span> + </span>

                <input class="coef" id="c5" maxlength="1">
                <span>K<sub>2</sub>MnO<sub>4</sub></span>

                <span> + </span>

                <input class="coef" id="c6" maxlength="1">
                <span>H<sub>2</sub>O</span>

            </div>

        </div>

        <button id="confirm-chem">

            CONFIRM

        </button>

    </div>

    `;

    document
        .getElementById("confirm-chem")
        .addEventListener("click", checkChemAnswer);

}

function checkAnswer(){

    const input = document.getElementById("answer-input");

    const answer =
        input.value.trim().toLowerCase();

    const correct =
    questions[currentQuestion].answers;

const isCorrect = correct.some(keyword =>
    answer.includes(keyword.toLowerCase())
);

if(isCorrect){

    nextQuestion();

    return;

}

    attempts--;

    document.getElementById("attempt-text").textContent =
        "Attempts left : " + attempts;

    if(attempts <= 0){

        accessDenied();

    }

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion == questions.length){

        renderChemQuestion();

        return;

    }

    renderQuestion();

}

function checkChemAnswer(){

    const answer = [

        c1.value,
        c2.value,
        c3.value,
        c4.value,
        c5.value,
        c6.value

    ];

    const correct = [

        "2",
        "3",
        "4",
        "2",
        "3",
        "5"

    ];

    if(JSON.stringify(answer) === JSON.stringify(correct)){

        finishUnlock();

    }else{

        attempts--;

        alert("Wrong equation!\nAttempts left: " + attempts);

        if(attempts <= 0){

            accessDenied();

        }

    }

}

function accessDenied(){

    alert("ACCESS DENIED");

    location.reload();

}

function finishUnlock(){

    console.log("finishUnlock");

    document.getElementById("question-area").innerHTML = `
        <h2>ACCESS GRANTED</h2>
        <p>Loading birthday surprise...</p>
    `;

    setTimeout(() => {

        console.log("calling showIntro");

        showIntro();

    },1800);

}  



