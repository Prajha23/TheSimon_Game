var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClick = [];

var started = false;
var level = 0;
var highScore = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSeq();
    started = true;
  }
});

$(".btn").click(function () {
  var userColor = $(this).attr("id");
  userClick.push(userColor);

  playSound(userColor);
  animate(userColor);
  checkAnswer(userClick.length - 1);
});

$("#start-btn").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSeq();
    started = true;
  } else {
    startOver();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClick[currentLevel]) {
    if (userClick.length === gamePattern.length) {
      setTimeout(function () {
        nextSeq();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any key to restart or click Start");
    if (level > highScore) {
      highScore = level;
      $("#high-score").text(highScore);
    }
    startOver();
  }
}

function nextSeq() {
  userClick = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animate(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#score").text(0);
}

$("#score").text(level);
