var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;


var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  $("#start-btn").removeClass("hidden");
}

$(document).keypress(function () {
  if (!isMobile && !started) {
    startGame();
  }
});


$("#start-btn").click(function () {
  if (!started) {
    startGame();
  }
});


function startGame() {
  
  level = 0;
  gamePattern = [];

  started = true;
  $("#level-title").text("Level " + level);
  nextSequence();

  
  $("#start-btn").addClass("hidden");
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key or Tap Start Button to Restart!");

    
    if (level > highScore) {
      highScore = level - 1;  
      $("#high-score").text(highScore);
    }

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  
  $("#level-title").text("Level " + level);
  $("#level-score").text(level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
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

  
  if (isMobile) {
    $("#start-btn").removeClass("hidden");
  }

  $("#level-score").text(level);
}

function resetScores() {
  highScore = 0;
  $("#high-score").text(highScore);
}
