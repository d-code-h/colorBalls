// ==================================================
// VARIABLES DECLARATION
// ==================================================
var correctValue, 
    correctColor,  
    singleColor,
    bg = [];

// ==================================================
// GAME FUNCTION
// ==================================================
// game mode
function game(gameMode) {
    // foreplay
    $(".result").text("");
    $(".new a").text("New Color");
    $("main .d-flex").css("background-color", "rgb(0, 123, 255)");
    $("section .col-4").removeClass("invisible");

    // Easy MODE
    if (gameMode == "easy"){
        // changing structure
        $(".medium, .hard").removeClass("active");
        $("section .row:lt(1)").removeClass("d-none");
        $(".easy").addClass("active");
        $(".medium a, .hard a").addClass("text-primary");
        $(".easy a").removeClass("text-primary");
        $("section .row:gt(0)").addClass("d-none");

        // color formation
        for (var i = 0; i < 3; i++){
            singleColor = [
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0, 
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0, 
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0
            ];
            bg[i]= "rgb(" + singleColor + ")";
        }

        // activating effect
        $(".row:eq(0) button:eq(0)").css("background-color", bg[0]);
        $(".row:eq(0) button:eq(1)").css("background-color", bg[1]);
        $(".row:eq(0) button:eq(2)").css("background-color", bg[2]);

        // correct value
        correctValue = Math.floor(Math.random() * (2 - 0 + 0) ) + 0;

        $(".easy a").removeClass("loading");

    // Medium MODE
    }else if (gameMode == "medium"){
        // changing structure
        $(".easy a, .hard a").addClass("text-primary");
        $(".medium a").removeClass("text-primary");
        $(".easy, .hard").removeClass("active");
        $("section .row:lt(2)").removeClass("d-none");
        $(".medium").addClass("active");
        $("section .row:gt(1)").addClass("d-none");

        // color formation
        for (var i = 0; i < 6; i++){
            singleColor = [
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0,
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0,
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0
            ];
            bg[i]= "rgb(" + singleColor + ")";
        }

        // activating effect
        $(".row:eq(0) button:eq(0)").css("background-color",bg[0]);
        $(".row:eq(0) button:eq(1)").css("background-color",bg[1]);
        $(".row:eq(0) button:eq(2)").css("background-color",bg[2]);
        $(".row:eq(1) button:eq(0)").css("background-color",bg[3]);
        $(".row:eq(1) button:eq(1)").css("background-color",bg[4]);
        $(".row:eq(1) button:eq(2)").css("background-color",bg[5]);

        // correct value
        correctValue = Math.floor(Math.random() * (5 - 0 + 0) ) + 0;

        $(".medium a").removeClass("loading");


    // Hard MODE
    }else if (gameMode == "hard"){
        // changing structure
        $(".easy a, .medium a").addClass("text-primary");
        $(".hard a").removeClass("text-primary");
        $(".easy, .medium").removeClass("active");
        $("section .row").removeClass("d-none");
        $(".hard").addClass("active");

        // color formation
        for (var i = 0; i < 9; i++){
            singleColor = [
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0,
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0,
                Math.floor(Math.random() * (255 - 0 + 1) ) + 0
            ];
            bg[i]= "rgb(" + singleColor + ")";
        }

        // activating effect
        $(".row:eq(0) button:eq(0)").css("background-color",bg[0]);
        $(".row:eq(0) button:eq(1)").css("background-color",bg[1]);
        $(".row:eq(0) button:eq(2)").css("background-color",bg[2]);
        $(".row:eq(1) button:eq(0)").css("background-color",bg[3]);
        $(".row:eq(1) button:eq(1)").css("background-color",bg[4]);
        $(".row:eq(1) button:eq(2)").css("background-color",bg[5]);
        $(".row:eq(2) button:eq(0)").css("background-color",bg[6]);
        $(".row:eq(2) button:eq(1)").css("background-color",bg[7]);
        $(".row:eq(2) button:eq(2)").css("background-color",bg[8]);

        // correct value
        correctValue = Math.floor(Math.random() * (8 - 0 + 0) ) + 0;

        $(".hard a").removeClass("loading");


    // UNCERTAIN MODE
    }else{
        // deducing actual mode
        if ($(".active a").text() == "Easy"){
            game("easy");   
        }else if ($(".active a").text() == "Medium"){
            game("medium"); 
        }else {
            game("hard"); 
        }
    }

    // correct color
    correctColor = bg[correctValue].replace(/,/g, ", ");
    // heading showing correct color
    $("h2").text(correctColor.toUpperCase());
}

game(); 

// ==================================================
// EVENTS
// ==================================================

// new color / play again
$(".new").click(function(){
    if ($(".active a").text() == "Easy"){
        game("easy");   
    }else if($(".active a").text() == "Medium"){
        game("medium"); 
    }else{
        game("hard");   
    }
});

// easy
$(".easy").click(function(){
    // checking text content
    if ($(".active a").text() == "Medium" || $(".active a").text() == "Hard"){
        game("easy");   
    }
});

// medium
$(".medium").click(function(){
    // checking text content
    if ($(".active a").text() == "Easy" || $(".active a").text() == "Hard"){
        game("medium"); 
    }
});

// hard
$(".hard").click(function(){
    // checking text content
    if ($(".active a").text() == "Easy" || $(".active a").text() == "Medium"){
        game("hard");   
    }
});

// color box
$("section .col-4").click(function(){
    let activeColor = $(this).css("background-color");
    // click box bgcolor VS correctColor
    if (activeColor == correctColor){
        // success results
        $("main .d-flex").css("background-color", activeColor);
        $(".result").removeClass("text-danger");
        $(".result").addClass("text-success");
        $(".result").text("Correct!"); 
        $(".new a").text("PLAY AGAIN?");
        $("section .col-4").css("background-color", activeColor);
        $("section .col-4").removeClass("invisible");
    }else{
        // failure results
        $(this).addClass("invisible");
        $(".result").addClass("text-danger");
        $(".result").text("Try Again!");
    }
});