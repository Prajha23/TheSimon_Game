var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;
var score = 0;
var highScore = 0;

$(document).keypress(function() {
    if (!started) {
        startGame();
    }
});

$("#start-btn").click(function() {
    if (!started) {
        startGame();
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    
    playsound(userChosenColor);
    animate(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

function startGame() {
    userClickPattern = [];
    level = 0;
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
}

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    updateScore();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key or Start to Restart!");
        resetGame();
    }
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function updateScore() {
    score++;
    $("#score").text(score);
    if (score > highScore) {
        highScore = score;
        $("#high-score").text(highScore);
    }
}

function resetGame() {
    score = 0;
    gamePattern = [];
    started = false;
}
