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
var score = 0;
var questionList = 0;
var timerDiv = document.querySelector("#timerDiv");
var timer = document.querySelector("#startBtn");
var quizContent = document.querySelector("#quizContent");
var wrapper = document.querySelector("#wrapper");
var timeLeft = 70;
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


// checks if answer is correct. if incorrect, 5 seconds are deducted from time
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionList].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionList].answer;
        }

    }
}
