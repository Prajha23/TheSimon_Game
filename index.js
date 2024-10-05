 var buttoncolors=["red","blue","green","yellow"];
 var gamepattern=[];
 var userclick = []

var started = false;

var level = 0;


$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level "+level);    
    nextseq();
    started = true;
    }
    
});

$(".btn").click(function(){
    var usercolor= $(this).attr("id");
    userclick.push(usercolor);
    
    playsound(usercolor);
    animate(usercolor);
    checkAnswer(userclick.length-1);
})

function checkAnswer(currenlevel){
    if (gamepattern[currenlevel]===userclick[currenlevel]){
        if(userclick.length===gamepattern.length){
            setTimeout(function(){
                nextseq()
            },1000);
        }
    } 
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
    $("#level-title").text("Game Over,Press any key to restart!");
    }
    }

function nextseq(){
        userclick=[];
        level++;
        
        $("#level-title").text("Level "+level);
        
        var rannum = Math.floor(Math.random() * 4);
        var randomchosencolor = buttoncolors[rannum];
        gamepattern.push(randomchosencolor);
        $("#"+ randomchosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playsound(randomchosencolor);
        }

function animate(currentcolor){
            $( "#" + currentcolor ).addClass( "pressed" ); 
            setTimeout(function() {
                $( "#" + currentcolor ).removeClass( "pressed" );    
              },100);
        
        }

function playsound(name){
            var audio= new Audio("sounds/"+name+".mp3")
            audio.play();
        }

function startOver(){
            level=0;
            gamepattern=[];
            started=false;
        }










