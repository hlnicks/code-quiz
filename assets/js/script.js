var questions = [
    {
        title: "1.  A ________ is a block of code that performs a specific task.",
        choices: ["variable", "function", "boolean", "value"],
        answer: "function"
    },
    {
        title: "2.  What is a variable?",
        choices: ["Data in an application at a specific point in time.",
        "A named location for a value that gets stored in the browser's memory when a program is run.",
        "A structure in code where the same action(s) occur multiple times in a row.",
        "A type of function that returns the value of another function."],
        answer: "A named location for a value that gets stored in the browser's memory when a program is run."
    },
    {
        title: "3.  What is the DOM?",
        choices: ["A Cloud based repository.",
         "A JavaScript library.",
         "A data representation of the objects that comprise the structure and content of a document on the web.",
         "A callback function."],
        answer: "A data representation of the objects that comprise the structure and content of a document on the web."
    },
    {
        title: "4.  _________ is a plain-language description of the steps that an algorithm or application must complete.",
        choices: ["HTML", "Pseudocode", "console.log()", "Debugger"],
        answer: "Pseudocode"
    },
    {
        title: "5.  What does an array do?",
        choices: ["Links a JavaScript file to an HTML file.",
        "Stores multiple items under a single variable name.",
        "Stores data is the browser’s memory.",
        "Refers back to the beginning of a function."],
        answer: "Stores multiple items under a single variable name."
    },
    {
        title: "6.  Which of the following is a boolean operator?",
        choices: ["AND", "OR", "NOT", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "7.  True or False: The DOM is built into JavaScript",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "8.  What does || stand for?",
        choices: ["IF", "AND", "OR", "BUT"],
        answer: "OR"
    },
    {
        title: "9.  What is JSON?",
        choices: ["Another term for JavaScript",
        "A format for organizing data that’s transferred from one place to another.",
        "A format that is only compatible with CSS",
        "A function that retrieves data from localStorage"],
        answer: "A format for organizing data that’s transferred from one place to another."
    }
];
var score = 0;
var questionList = 0;
var timerDiv = document.querySelector("#timerDiv");
var timer = document.querySelector("#startBtn");
var quizContent = document.querySelector("#quizContent");
var wrapper = document.querySelector("#wrapper");
var timeLeft = 60;
var holdInterval = 0;
var penalty = 7;
var makeList = document.createElement("ul");


// renders questions/answers in quizContent
function render(questionList) {
    quizContent.innerHTML = "";
    makeList.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionList].title;
        var userAnswer = questions[questionList].choices;
        quizContent.textContent = userQuestion;
    }
    userAnswer.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizContent.appendChild(makeList);
        makeList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}


// triggers time countdown once start button is clicked
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeLeft--;
            timerDiv.textContent = "Time Remaining: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                finishQuiz();
                timerDiv.textContent = "Time's Up!";
            }
        }, 1000);
    }
    render(questionList);
});


// checks if answer is correct. if incorrect, 5 seconds are deducted from time
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");
        if (element.textContent == questions[questionList].answer) {
            score++;
            answerDiv.textContent = "Correct!";
        } else {
            timeLeft = timeLeft - penalty;
            answerDiv.textContent = "Incorrect! The correct answer is:  " + questions[questionList].answer;
        }
    }
    questionList++;
    if (questionList >= questions.length) {
        finishQuiz();
        answerDiv.textContent = "";
    } else {
        render(questionList);
    }
    quizContent.appendChild(answerDiv);
}


function finishQuiz() {
    quizContent.innerHTML = "";
    timerDiv.innerHTML = "";

    var createH1 = document.createElement("H2");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Let's see how you did:"
    quizContent.appendChild(createH1);

    var createH2 = document.createElement("H3");
    createH2.setAttribute("id", "createH2");
    createH2.textContent = "You got  " + score + "/" + questions.length + " correct!"
    quizContent.appendChild(createH2);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    quizContent.appendChild(createP);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizContent.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your Initials: ";

    quizContent.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizContent.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submitBtn");
    createSubmit.textContent = "Submit";

    quizContent.appendChild(createSubmit);

    // user can submit initials to highscore on localstorage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === null) {
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var savedScores = localStorage.getItem("savedScores");
            if (savedScores === null) {
                savedScores = [];
            } else {
                savedScores = JSON.parse(savedScores);
            }
            savedScores.push(finalScore);
            var newScore = JSON.stringify(savedScores);
            localStorage.setItem("savedScores", newScore);

            window.location.replace("./highscores.html");
        }
    });
}