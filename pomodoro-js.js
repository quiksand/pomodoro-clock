/**
 * FILENAME:    pomodoro-js.js
 * DESCRIPTION: This is the javascript for codyschindler.com/fcc/pomodoro.
 * REQS:        jQuery
 * VERISON:     1.0.0
 * UPDATED:     2015-10-27
 * WRITTEN BY:  Cody Schindler (quiksand)
 * ORGANIZATION: n/a
 * CHANGELOG:  
 * 1.0.0 (2015-10-27): Creation
**/
//TODO: Pause on zero skips the next timer for some reason. Fix.

$(document).ready(function(){

	//prints session/break numbers on screen only
	function setCounter(setter){
		$(setter[1]).text(setter[0] > 9 ? setter[0] : ("0"+setter[0]));
	}
	//subtracts one minute from session or break
	function sub1(setter){
		setter[0] -= 1;
		if(setter[0] < minTime){ setter[0] = minTime;};
		setCounter(setter);
	}
	//adds one minute from session or break
	function add1(setter){
		setter[0] += 1;
		if(setter[0] > maxTime){ setter[0] = maxTime;};
		setCounter(setter);
	}
	//changes between session and break
	function swapSessionBreak(){
		if(globeset == sessionTime){
				globeset = breakTime;
		}
		else {
			globeset = sessionTime;
		}
		//setColors();
		startTime = new Date();
	}
	//updates the time to display and detects end of session
	function updateTimer(){
		setColors();
		var header = globeset[2];
		var setTime = globeset[0]*60; //set time in seconds
		//weird things happened: system call took too long, so elapsed time got too long and gave a negative which cascaded issues
		elapsedTime = new Date().getTime() - startTime.getTime() + savedElapse;
		var displayTime = setTime - Math.floor(elapsedTime/1000);
		//display time is in seconds
		var hrs = Math.floor(displayTime / 3600);
		var mins = Math.floor((displayTime % 3600) / 60 );
		var secs = displayTime % 60;
		//doesn't fix lag issue, but mitigates them to one bad cycle (well for short times)
		if(displayTime <= 0){
			swapSessionBreak();
			savedElapse = 0;
			//Early return to avoid displaying negative values
			$(".sand").height(0);
			noise.play();
			return [0,0,0,header];
		}
		return [hrs, mins, secs, header];
	}
	//prints time to screen
	function printTimer(){
		var tm = updateTimer();
		var hrs = tm[0];
		var mins = tm[1];
		var secs = tm[2];
		var header = tm[3];
		$(".counter-label").text(header);
		$(".counter").text(
			(hrs == 0 ? "" : ((hrs < 10 ? "0" : "") + hrs
			+ ":")) +
			(mins < 10 ? "0" : "") + mins
			+ ":" +
			(secs < 10 ? "0" : "") + secs
			);
		sandFill();
	}
	//creates an interval timer
	function createTimer(foo){
		var tmr = setInterval(function(){
			foo();
		}, 
		1000);
		return tmr;
	}
	//adjusts height of "sand" in timer circle
	function sandFill(){
		var h = 296 * (elapsedTime / (globeset[0]*60000));
		$(".sand").height(h);
	}
	//adjusts the colors on the screen
	function setColors(){
		$("h1").css("color",globeset[3]);
		$(".sand").css("background-color",globeset[3]);
		$(".clock-outer").css("border-color", globeset[3]);
		$(".countdown").css("color",globeset[4]);
	}
	//clears the interval timer
	function stopTimer(a){
		clearInterval(a);
	}

	//page load items
	var savedElapse = 0;
	var minTime = 0;
	var maxTime = 90;
	var sessionTime = [25, ".session-time", "Session", "#00AAA0", "#FFB85F"];
	var breakTime = [5, ".break-time", "Break!","#FFB85F", "#00AAA0"];
	var minSandHeight = "0px";
	var maxSandHeight = "294px";
	var play = false;
	var timer;
	var startTime = new Date();
	var globeset = sessionTime;
	var elapsedTime = 0;
	var noise = new Audio("noise.mp3");
	setCounter(breakTime);
	setCounter(sessionTime);
	//end page load items

//click functions below

	$(".break-minus").click(function(){
		if (!play){
			sub1(breakTime);
			startTime = new Date();
			savedElapse = 0;
			printTimer();
		}
	});

	$(".break-plus").click(function(){
		if (!play){
			add1(breakTime);
			startTime = new Date();
			savedElapse = 0;
			printTimer();
		}
	});

	$(".session-minus").click(function(){
		if (!play){
			sub1(sessionTime);
			startTime = new Date();
			savedElapse = 0;
			printTimer();
		}
	});

	$(".session-plus").click(function(){
		if (!play){
			add1(sessionTime);
			startTime = new Date();
			savedElapse = 0;
			printTimer();
		}
	});

	$(".fa-arrows-h").click(function(){
		//swap labels
		if(!play){
			swapSessionBreak();
			savedElapse = 0;
			printTimer();
		}
	});

	$(".fa-refresh").click(function(){
		// code for refresh button
		play = false;
		startTime = new Date();
		sessionTime = [25, ".session-time", "Session", "#00AAA0", "#FFB85F"];
		breakTime = [5, ".break-time", "Break!","#FFB85F", "#00AAA0"];
		globeset = sessionTime;
		savedElapse = 0;
		$(".center-span").addClass("fa-play");
		$(".center-span").removeClass("fa-pause");
		setCounter(sessionTime);
		setCounter(breakTime);
		printTimer();
		stopTimer(timer);
		setColors();
	});

	$(".center-icon").click(function(){
		if($(".center-span").hasClass("fa-play")){
			$(".center-span").addClass("fa-pause");
			$(".center-span").removeClass("fa-play");
			startTime = new Date();
			play = true;
			timer = createTimer(printTimer);
		}
		else{
			$(".center-span").addClass("fa-play");
			$(".center-span").removeClass("fa-pause");
			savedElapse = elapsedTime;
			stopTimer(timer);
			play = false;
		}
	});

}); //document.ready()
