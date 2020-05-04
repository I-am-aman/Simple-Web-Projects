$(function(){
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinutes, timeSeconds, timeCentiseconds,
        lapMinutes, lapSeconds, lapCentiseconds;

    hideShowButtons("#startButton","#lapButton");

    $("#startButton").click(function(){
        mode = 1;

        hideShowButtons("#stopButton","#lapButton");
        startAction();
    });

    $("#stopButton").click(function(){
        hideShowButtons("#resumeButton","#resetButton");
        stopAction();
    });

    $("#resumeButton").click(function(){
        hideShowButtons("#stopButton","#lapButton");
        startAction();
    });

    $("#resetButton").click(function(){
        location.reload();
    });

    $("#lapButton").click(function(){
        if(mode == 1){
            stopAction();
            lapCounter = 0;
            addLap();
            startAction();
        }
    });

    function hideShowButtons(btn1,btn2){
        $(".control").hide();
        $(btn1).show();
        $(btn2).show();
    }

    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100)
                timeCounter = 0;

            lapCounter++;
            if(lapCounter == 100*60*100)
                lapCounter = 0;

            updateTime();
        },10);
    }

    function stopAction(){
        clearInterval(action);
    }

    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;

        $("#timeMinutes").text(formatTime(timeMinutes));
        $("#timeSeconds").text(formatTime(timeSeconds));
        $("#timeCentiseconds").text(formatTime(timeCentiseconds));

        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;

        $("#lapMinutes").text(formatTime(lapMinutes));
        $("#lapSeconds").text(formatTime(lapSeconds));
        $("#lapCentiseconds").text(formatTime(lapCentiseconds));
    }

    function formatTime(number){
        if(number < 10)
            return '0'+number;
        else
            return number;
    }

    function addLap(){
        lapNumber++;

        var newLapDetails = 
            '<div class="newLap">'+
                '<div class="lapTimeTitle">'+
                    'Lap' + lapNumber +
                '</div>'+
                '<div class="lapTime">'+
                    '<span>' + formatTime(lapMinutes) + '</span>'+
                    ':<span>' + formatTime(lapSeconds) + '</span>'+
                    ':<span>' + formatTime(lapCentiseconds) + '</span>'+
                '</div>'+
            '</div>';

        $(newLapDetails).prependTo("#laps");
    }
});