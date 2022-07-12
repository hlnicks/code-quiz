var highScores = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// clears scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// pulls data from localStorage
var savedScores = localStorage.getItem("savedScores");
savedScores = JSON.parse(savedScores);

if (savedScores !== null) {

    for (var i = 0; i < savedScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = savedScores[i].initials + " " + savedScores[i].score;
        highScores.appendChild(createLi);

    }
}
// returns to main page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});