var playing = false;
var score;
var action;
var timeremaining;
var correctAns;

document.getElementById("startreset").onclick = function(){
    if(playing === true){
        location.reload();
    }else{
        playing = true;
        score = 0;

        changeHTMLContent("scorevalue",score);
        showElement("timeremaining");
        changeHTMLContent("startreset","Reset Game");
        hideElement("gameover");

        timeremaining = 60;
        changeHTMLContent("timeremainingvalue",timeremaining);

        startCountdown();

        generateQA();
    }
}

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing === true){
            if(this.innerHTML == correctAns){
                score++;
                changeHTMLContent("scorevalue",score);
    
                hideElement("wrong");
                showElement("correct");
                setTimeout(function(){
                    hideElement("correct");
                },1000);

                generateQA();

            }else{
                hideElement("correct");
                showElement("wrong");
                setTimeout(function(){
                    hideElement("wrong");
                },1000);
            }
        }
    }
}

function startCountdown(){
    action = setInterval(function(){
        timeremaining--;
        changeHTMLContent("timeremainingvalue",timeremaining);
        if(timeremaining === 0){
            clearInterval(action);
            showElement("gameover");
            changeHTMLContent("gameover", "<p>Game Over!</p><p>Your Score is " + score +".</p>");
            hideElement("timeremaining");
            hideElement("correct");
            hideElement("wrong");
            playing = false;
            changeHTMLContent("startreset","Start Game");
        }
    },1000);
}

function showElement(id){
    document.getElementById(id).style.display = "block";
}

function hideElement(id){
    document.getElementById(id).style.display = "none";
}

function changeHTMLContent(id, newValue){
    document.getElementById(id).innerHTML = newValue;
}

function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    changeHTMLContent("question", x+"x"+y);

    correctAns = x*y;
    var correctPosition = 1+Math.round(3*Math.random());
    changeHTMLContent("box"+correctPosition,correctAns);

    var answers = [correctAns];
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAns;
            
            do{
                wrongAns = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAns)>-1)

            changeHTMLContent("box"+i,wrongAns);
            answers.push(wrongAns);
        }
    }
}