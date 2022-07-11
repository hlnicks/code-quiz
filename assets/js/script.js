var questions = [
    {
        title: "question 1",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 2",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 3",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 4",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 5",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 6",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 7",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 8",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 9",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
    {
        title: "question 10",
        choices: ["choice1", "choice2", "choice3", "choice 4"],
        answer: "answer"
    },
];

var questionList = 0;
var holdInterval = 0;
var timeLeft = 60;
var timer = document.querySelector("#startBtn");
var timerDiv = document.querySelector("#timerDiv");
var quizContent = document.querySelector("#quizContent");


// renders questions/answers in quizContent
function render(questionList) {
    quizContent.innerHTML = "";
    makeUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionList].title;
        var userAnswer = questions[questionList].choices;
        quizContent.textContent = userQuestion;
    }
    userAnswer.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizContent.appendChild(makeUl);
        makeUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// triggers time countdown once start button is clicked
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeLeft--;
            timerDiv.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                timesUp();
                timerDiv.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionList);
});


