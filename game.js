var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var start = false;

function playSound(color) {

    $("#sound-" + color)[0].play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var x = Math.random() * 4;
    var y = Math.floor(x);
    var select = buttonColours[y];
    gamePattern.push(select);
    $("#" + select).fadeOut(100).fadeIn(100);
    playSound(select);

}

$(".btn").click(function() {
    var clickedColor = this.id;

    userClickedPattern.push(clickedColor);

    $("#" + clickedColor).addClass("pressed");
    setTimeout(function() {
        $("#" + clickedColor).removeClass("pressed");
    }, 100);
    playSound(clickedColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
    if (!start) {
        nextSequence();
        start = true;
        $("#start-btn").hide();
        $(".container").show();
    }
});

$("#start-btn").click(function() {
    if (!start) {
        nextSequence();
        start = true;
        $(this).hide();
        $(".container").show();
    }
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("<span class='game-over-text'>Game Over at Level " + level + "</span>");
        startOver();

    }
}

function startOver() {
    $("#start-btn").show().text("Restart Game");
    $(".container").hide();
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}