/*Global Variables
==============================================================*/
//Counter
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
var wrongElement = document.createElement("audio");
wrongElement.setAttribute("src", "assets/sound/Wrong.mp3");
var correctElement = document.createElement("audio");
correctElement.setAttribute("src", "assets/sound/Correct.mp3");
var timerElement = document.createElement("audio");
timerElement.setAttribute("src", "assets/sound/timer.mp3");
var gameElement = document.createElement("audio");
gameElement.setAttribute("src", "assets/sound/GameOver.mp3");
//======================
var timer = '';
var qA = {
			1:{
				question:'Steve Jobs, Steve Wozniak, and Ronald Wayne founded what company in 1976?',
				answers:['Google','Apple','Sony','Microsoft'],
				correct:'Apple',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Apple!",
				imageUrl:'assets/images/APPLE.jpg'
			   },
			2:{
				question:'In computer science, what does "GUI" stand for?',
				answers:['Graphical user interface','Gaming user interface','Git user interface','None of the Above'],
				correct:'Graphical user interface',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Graphical user interface!",
				imageUrl:'assets/images/GUI.png'
			},
			3:{
				question:'In database programming, SQL is an acronym for what?',
				answers:['Super Query Language','Storage Query Language','Structured Query Language','None of the Above'],
				correct:'Structured Query Language',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Structured Query Language!",
				imageUrl:'assets/images/what-does-SQL-stand-for.jpg'
			},
			4:{
				question:'What do the letters in the acronym CD-ROM stand for?',
				answers:['Compact Disk Read Over Memory','Computer Disk Read Only Memory','Compact Disk Read Only Memory','None of the Above'],
				correct:'Compact Disk Read Only Memory',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Compact Disk Read Only Memory!",
				imageUrl:'assets/images/CD_ROM.jpg'
			},
			5:{
				question:'Nintendo is a consumer electronics and video game company founded in what country?',
				answers:['Europe','China','United States','Japan'],
				correct:'Japan',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Japan!",
				imageUrl:'assets/images/japan.jpg'
			},
			6:{
				question:'In 1975 an engineer created the first electronic camera while working for what company?',
				answers:['Kodak','Sega','Microsoft','Logitech'],
				correct:'Kodak',
				right: 'Correct!',
				wrong: "Wrong! The Answer is: Kodak!",
				imageUrl:'assets/images/Kodak.jpg'
			},

	};
/*Functions
==============================================================*/
var start = function(){
	//When buttons is clicked clear trivSection
	$('.startBtn').on('click',function(){
		//Emptys trivia section
		$('.trivSection').empty();
		createQuestions();
	});
}
var createQuestions = function(){
	timerStart();
	timerElement.play();
	//Get question
	var question = qA[qACount]['question'];
	//assign div element to newDiv
	var newDiv = $('<div>');
	//Add a class to newDIv
	newDiv.addClass('question');
	//Add text to question
	newDiv.text(question);
	//Add question to DOM
	$('.trivSection').append(newDiv);
	createAnswers();
}
var createAnswers = function(){
	var answerLength = qA[qACount]['answers'].length;
	for(var i = 0; i < answerLength;i++){
		//get answers
		var answers = qA[qACount]['answers'][i];
		//Create new div to hold answers
		var newBtn = $('<button>');
		//Add class to new Div
		newBtn.addClass('answers redBtn');
		//Give buttons attribute
		newBtn.attr('data-type',answers);
		//add text to new Div
		newBtn.text(answers);
		//Add answers to DOM
		$('.trivSection').append(newBtn);
	}
	//Prevents click event from being saved
	$(document).off('click','.answers',checkAnswer);
	$(document).on('click','.answers',checkAnswer);
}
var checkAnswer = function(){
	 //Get users answer choice
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];
	var correctImg = qA[qACount]['imageUrl'];

	var right = qA[qACount]['right'];
	var wrong = qA[qACount]['wrong'];
	console.log(qACount);
	if(userAnswer === correctAnswer){
		correctElement.play();
		//Update rightCount
		rightCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		//Create Div
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('rightAnswer');
		//adds CORRECT! text to div
		newDiv.text(right);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		if(qACount <= 6){
			//removes CORRECT! text and continues to create next question after 3 seconds
			setTimeout(
				function(){
					$('.trivSection').empty();
					createQuestions();
					},3500);
		}
		else{
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src',correctImg);
			$('.trivSection').append(newImg);
			//Create Div
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('rightAnswer');
			//adds CORRECT! text to div
			newDiv.text(right);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer)
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
	else{
		wrongElement.play();
		wrongCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('wrongAnswer');
		//adds Wrong! text to div
		newDiv.text(wrong);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;

		if(qACount <= 6){
			setTimeout(function(){
			$('.trivSection').empty();
			createQuestions();
			},3500);
		}
		else{
			//Clears out triv Section
			$('.trivSection').empty();
			var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('wrongAnswer');
			//adds Wrong! text to div
			newDiv.text(wrong);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer);
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
//==========================================
var timerStart = function(){
	$('.timerSection').empty();
	//Sets time to 10
	trivTime = 100;
	//Progress Bar
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('progress-bar');
	progressBar.width(trivTime + '%');

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);
	//Decrements Time
	timer = setInterval(timeDecrement,100);
}
var timeDecrement = function(){
	//Progress bar decrement
	$('.progress-bar').width(trivTime + '%');
	trivTime--;
	//if time gets to 0
	if(trivTime === -10){
		userAnswer = false;
		//Clears Time
		clearInterval(timer);
		checkAnswer();
	}

}
var gameOver = function(){
	timerElement.pause();
	gameElement.play();
	//Remove everything in trivia section
	$('.trivSection').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.trivSection').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text(rightCount +" out of 6! "+ ' Play Again ?');
	//Append game over text to DOM
	$('.trivSection').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('redBtn resetBtn');
	//Give btn reset Text
	newBtn.text('Reset');
	//Append
	$('.trivSection').append(newBtn);
	//Reset all value
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	//When reset button is clicked.......
	$('.resetBtn').on('click',function(){
		$('.trivSection').empty()
		//Starts game over
		createQuestions();
	});
}

/*Main
==============================================================*/
start();
