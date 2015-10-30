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

$(document).ready(function(){
	//prints numbers on screen only
	function setCounter(setter){
		$(setter[1]).text(setter[0] > 9 ? setter[0] : ("0"+setter[0]));
	}
	function sub1(setter){
		setter[0] -= 1;
		if(setter[0] < minTime){ setter[0] = minTime;};
		setCounter(setter);
	}
	function add1(setter){
		setter[0] += 1;
		if(setter[0] > maxTime){ setter[0] = maxTime;};
		setCounter(setter);
	}

	/*----------------------------------*/
	function swapSessionBreak(){
		if(globeset == sessionTime){
				globeset = breakTime;
			}
			else {globeset = sessionTime;}
			startTime = new Date();
	}
	function updateTimer(){
		console.log(globeset);
		var header = globeset[2];
		var setTime = globeset[0]*60; //set time in seconds
		//weird things happened: system call took too long, so elapsed time got too long and gave a negative which cascaded issues
		//get difference in time in milliseconds
		elapsedTime = new Date().getTime() - startTime.getTime();
		var displayTime = setTime - Math.floor(elapsedTime/1000);
		//display time is in seconds
		var hrs = Math.floor(displayTime / 3600);
		var mins = Math.floor((displayTime % 3600) / 60 );
		var secs = displayTime % 60;
		//doesn't fix lag issue, but mitigates them to one bad cycle (well for short times)
		if(displayTime <= 0) {
			swapSessionBreak();
		}
		//return [hrs, mins, secs, header];
		return [hrs,mins,secs,header];
	}
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
	}
	function createTimer(foo){
		 var tmr = setInterval(function(){
			foo();
		}, 
		1000);
		return tmr;
	}

	// function createTimer(foo, st){
	// 	 var tmr = setInterval(function(){
	// 		foo(st);
	// 	}, 
	// 	1000);
	// 	return tmr;
	// }
	function stopTimer(a){
		clearInterval(a);
	}


	//page load items
	var minTime = 0;
	var maxTime = 90;
	var breakTime = [1, ".break-time", "Break!"];
	var sessionTime = [1, ".session-time", "Session"];
	var minSandHeight = "1px";
	var maxSandHeight = "299px";
	var play = false;
	var clock;
	var timer;
	var startTime;
	var globeset = sessionTime;
	var elapsedTime = 0;

	setCounter(breakTime);
	setCounter(sessionTime);
	//end page load items

	$(".break-minus").click(function(){
		if (!play){
			sub1(breakTime);
			startTime = new Date();
			printTimer();
		}
	});
	$(".break-plus").click(function(){
		if (!play){
			add1(breakTime);
			startTime = new Date();
			printTimer();
		}
	});
	$(".session-minus").click(function(){
		if (!play){
			sub1(sessionTime);
			startTime = new Date();
			printTimer();
		}
	});
	$(".session-plus").click(function(){
		if (!play){
			add1(sessionTime);
			startTime = new Date();
			printTimer();
		}
	});
	$(".fa-arrows-h").click(function(){
		//swap labels
		if(!play){
			swapSessionBreak();
			printTimer();
		}
	});
	$(".fa-refresh").click(function(){
		// code for refresh button
		play = false;
		startTime = new Date();
		breakTime = [5, ".break-time", "Break!"];
		sessionTime = [25, ".session-time", "Session"];
		globeset = sessionTime;
		$(".session-time").text("25");
		$(".break-time").text("5");
		printTimer();
	});
	$(".center-icon").click(function(){
		if($(".center-span").hasClass("fa-play")){
			$(".center-span").addClass("fa-pause");
			$(".center-span").removeClass("fa-play");
			// clock = startClock();
			//timer = startTimer(new Date());
			play = true;
			startTime = new Date();
			timer = createTimer(printTimer);
			

		}
		else {
			$(".center-span").addClass("fa-play");
			$(".center-span").removeClass("fa-pause");
			console.log(timer);
			stopTimer(timer);
			play = false;
			//stopClock(clock);
		}
		//rest of play/pause functionality

	});

}); //document.ready()
















