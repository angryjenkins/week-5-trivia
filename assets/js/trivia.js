$(document).ready(function(){
	//initialize all questions.

	$('#triviaRound').hide();
	$('#gameEnd').hide();
	$('.question').hide();
	$('#ticker').hide();

	var step=0;
 	var	right=0;
	var wrong=0;
	var	counter;
	var counter2;

	var questions = [
	 		q1:{question:'In what year did Martin Luther King deliver his famous "I Have a Dream" speech?',
	 			correct: '1963',
	 			choices: ['1963','1961','1965','1969']},

	 		q2:{
	 			question:'Which of the original 13 colonies was the first to abolish slavery?',
	 			correct: 'Vermont',
	 			choices: ['Vermont','New York','Delaware','Rhode Island']
	 		},

	 		q3:{
	 			question:'Who was the first African American bilionaire?',
	 			correct: 'Robert Johnson',
	 			choices: ['Robert Johnson','Oprah Winfrey','Jay-Z','Whoopi Goldberg']
	 		},

	 		q4:{
	 			question:'Who was the first African American published poet?',
	 			correct: 'Phyllis Wheatley',
	 			choices: ['Phyllis Wheatley','Langston Hughes','Toni Morrison','Maya Angelou']
	 		},

	 		q5:{
	 			question:'Who was the first African American female to win a Grammy?',
	 			correct: 'Ella Fitzgerald',
	 			choices: ['Ella Fitzgerald','Langston Hughes','Delaware','Rhode Island']
	 		},

	 		q6:{
	 			question:'Who was the first African American female to win an Oscar?',
	 			correct: 'Hattie McDaniel',
	 			choices: ['Hattie McDaniel','Josephine Baker','Lena Horne','Dorothy Dandridge']
	 		},

	 		q7:{
	 			question:'In what year did Martin Luther King deliver his famous "I Have a Dream" speech?',
	 			correct: '1963',
	 			choices: ['1963','1961','1965','1968']
	 		},

	 		q8:{
	 			question:'In what year was Malcolm X assassinated?',
	 			correct: '1965',
	 			choices: ['1961','1963','1968']
	 		},

	 		q9:{
	 			question:'Who said "Man, if you gotta ask [what jazz is] you%27ll never know."?',
	 			correct: 'Louie Armstrong',
	 			choices: ['Duke Ellington','Cab Calloway','BB King']
	 		},

	 		q10:{
	 			question:'Who said "A man who stands for nothing will fall for anything."?',
	 			correct: 'Malcolm X',
	 			choices: ['W.E.B DuBois','Frederick Douglass','Richard Wright']
	 		}	
	 	];

 	var currentQuestion = {
 		question:"",
 		correct:"",
 		choices:[]
 	};

 	var shuffle = function(a){
		a.sort(function(){
			return 0.5 - Math.random()
			});
		};

 	var timer = {
		time:30,
		reset:function(){
		 	timer.time = 20;
		    $(".ticker").html("20");
		},

		start: function(){
		    var counter=setInterval(timer.count,1000);
		    var counter2=setTimeout(timer.timeUp,20000);
		},

		stop: function(){
		    clearInterval(counter);
		    clearTimeout(counter2);
		},

		count: function(){
		    timer.time--;
		    $(".ticker").html(timer.time);
		},

		timeUp: function(){
			wrong++;
			timer.stop();
			timer.reset();
			$("#startGame").show();
			$("#triviaRound").hide();
			$("#result").html("TIME!!!!");
			$(".scoreboard").html("Correct: "+right+"<br>Incorrect: "+wrong);
			$(".startButton").html("CONTINUE");
		}
	}

	$(".startButton").click(function(){
		

		$("#startGame").hide();
		trivia();

		for(i=0;i<questions.length;i++){
			
			var currentQuestion = {
		 		question:questions.q[i-1].question,
		 		correct:questions.q[i-1].correct,
		 		choices:shuffle(questions.q[i-1].choices)
		 	};

			$(".question").html();
			$("#option"+i).html(questions.q[i-1].choices[i]);
			$("#option"+i).html(questions.q[i-1].choices[i+1]);
			$("#option"+i).html(questions.q[i-1].choices[i+2]);
			$("#option"+i).html(questions.q[i-1].choices[i+3]);

			return currentQuestion;
		};
	});

	


	function trivia(){
		timer.start();
		var currentQuestion = questions[step];
		
		$('.question').show();

		newQuestion();
		step++;
	};

	var newQuestion = function(){
		$('#triviaRound').show();
		$('.question').html(currentQuestion.question);
		shuffle(currentQuestion.choices);

		for(i=0;i<currentQuestion.choices.length;i++){
			$("button#option"+i).html(currentQuestion.choices[i]);	
		}	
	};

	function verify(b){
		//correct answer, keep playing.
		if(b==currentQuestion.correct && step<10){
			right++;
			timer.reset();
			$("#startGame").show();
			$(".question").hide();
			$("#result").html("CORRECT!");
			$(".startButton").html("Next Question");
			$(".scoreboard").html("Right: "+right+"<br>Wrong: "+wrong);
		} else if (b!=currentQuestion.correct && step<10){
			wrong++;
			timer.reset();
			$("#startGame").show();
			$(".question").hide();
			$("#result").html("WRONG!");
			$(".startButton").html("Next Question");
			$(".scoreboard").html("Right: "+right+"<br>Wrong: "+wrong);
		} else if (b==currentQuestion.correct && step==10){
			timer.stop();
			right++;
			$("#triviaRound").hide();
			$("#gameEnd").show();
			$(".scoreboard").html("Right: "+right+"<step>Wrong: "+wrong);
		} else if (b!=currentQuestion.correct && step==10){
			timer.stop();
			right++;
			$(".question").hide();
			$("#gameEnd").show();
			$(".scoreboard").html("Right: "+right+"<br>Wrong: "+wrong);
		} else {
			//play on, playa!
		}
	};

		//RESETS THE GAME
	$("#playAgain").on("click", function(){
		right=0;
		wrong=0;
		step=0;
		$("#gameEnd").hide();
		newQuestion();
	});
});
