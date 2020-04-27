$(function(){

    var playing = false;
    var score;
    var trailsleft;
    var step, action;
    var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon']

    $("#startreset").click(function(){
        if(playing == true)
            location.reload();
        else{
            playing = true;

            score = 0;
            $("#scorevalue").html(score);

            $("#trailsleft").show();
            trailsleft = 3;
            addHearts();

            $("#gameover").hide();

            $("#startreset").html("Reset Game");

            generateRandomFruits();
        }
    });

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);

        $("#slicesound")[0].play();

        clearInterval(action);
        $("#fruit1").hide("explode",500);

        setTimeout(generateRandomFruits,500);
    });

    function addHearts(){
        $("#trailsleft").empty();
        for(i=0; i<trailsleft; i++){
            $("#trailsleft").append('<img src="images/heart.png" class="life">');
        }
    }

    function generateRandomFruits(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left': Math.round(550*Math.random()), 'top':-50});

        step = 1+Math.round(5*Math.random());
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                if(trailsleft > 1){
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({'left': Math.round(550*Math.random()), 'top':-50});

                    step = 1+Math.round(5*Math.random());

                    trailsleft--;
                    addHearts();

                }else{
                    playing = false;

                    $("#startreset").html("Start Game");

                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');

                    $("#trailsleft").hide();

                    clearInterval(action);
                    $("fruit1").hide();
                }
            }
        },10);
    }

    function chooseFruit(){
        var randomIndex = Math.round(8*Math.random());
        $("#fruit1").attr('src','images/'+fruits[randomIndex]+'.png');
    }
});