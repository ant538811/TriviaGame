var startScreen;
var gameHTML;
var counter = 15;
var questions = ["What is the name of the phenomenon where the second hand of a clock looks like it stops moving? ", "What are red king crabs most biologically close to?", "The root words of synesthesia are 'syn' and 'aisthesis.' What do they mean?", "With the advent of the color TV, something else started appearing in color. What is it?", "Do you know the reason why July and August both have thirty-one days?", "What would happen if you keep washing your hair with water that's contaminated with metal?", "The word 'robot' didn't come from English. What country did it come from?", "What event did Roman Emperor Nero add to the Olympics so he could participate?", "What is the name of the light-producing substance in fireflies?", "The suits of cards can all represent a season. What suit does the suit of 'hearts' represent?"];
var answerChoices = [["Time Paradox", "Stopwatch", "The World", "Chronostasis"], ["Shrimp","Sunfish","Hermit Crabs","Spiders"], ["'Sound' and 'color'", "'Apart' and 'senses'", "'Together' and 'senses'", "'Together' and 'color'"], ["Movies","Pencils","Underwear","Dreams"], ["The sun is out longer", "Roman emperors dictated so", "Hottest months deserve more days", "No particular reason"], ["It'll change color","It'll fall out","It'll become a perm","It'll start shining"], ["Slovakia", "Czechoslovakia", "Slovenia", "Austria"], ["Cooking","Singing","Dancing","Bodybuilding"], ["Luminarine", "Berberine", "Luciferin", "Coelenterazine"], ["Spring", "Summer", "Fall", "Winter"]];
var correctAnswerImages = ["<img class='center-block img-right' src='assets/images/clock_chronostasis.png'>", "<img class='center-block img-right' src='assets/images/hermit-crab.jpg'>", "<img class='center-block img-right' src='assets/images/synesthesia.jpg'>", "<img class='center-block img-right' src='assets/images/color-tv.jpg'>", "<img class='center-block img-right' src='assets/images/roman-emperors.jpg'>", "<img class='center-block img-right' src='assets/images/HeavyMetal.jpg'>", "<img class='center-block img-right' src='assets/images/Czechoslovakia_color.png'>", "<img class='center-block img-right' src='assets/images/nero.jpg'>", "<img class='center-block img-right' src='assets/images/dragonfly.jpg'>", "<img class='center-block img-right' src='assets/images/crown_heart.jpg'>"];
var correctAnswers = ["Chronostasis", "Hermit Crabs", "'Together' and 'senses'", "Dreams", "Roman emperors dictated so", "It'll change color", "Czechoslovakia", "Singing", "Luciferin", "Spring"];
var questionCount = 0;
var selecterAnswer;
var theClock;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;


$(document).ready(function() 
{

function initialScreen() 
{
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}
initialScreen();

$("body").on("click", ".start-button", function(event)
{
	event.preventDefault();
	quizLayout();
	timerWrapper();
});

$("body").on("click", ".answer", function(event)
{
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCount]) 
	{
		clearInterval(theClock);
		incrementCorrect();
	}
	else 
	{
		clearInterval(theClock);
		incrementLoss();
	}
});

$("body").on("click", ".reset-button", function(event)
{
	resetGame();
});

});

function incrementLossDueToTimeOut() 
{
	incorrectCount++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + " seconds</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCount]/* + "</p>" + "<img class='center-block img-Incorrect' src='img/x.png'>"*/;
	$(".mainArea").html(gameHTML);
	setTimeout(intermission, 2000);
}

function incrementCorrect() 
{
	correctCount++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + " seconds</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCount] + "</p>" + correctAnswerImages[questionCount];
	$(".mainArea").html(gameHTML);
	setTimeout(intermission, 2000);
}

function incrementLoss() 
{
	incorrectCount++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + " seconds</span></p>" + "<p class='text-center'>Incorrect! The correct answer is: "+ correctAnswers[questionCount]/* + "</p>" + "<img class='center-block img-Incorrect' src='img/x.png'>"*/;
	$(".mainArea").html(gameHTML);
	setTimeout(intermission, 2000);
}

function quizLayout() 
{
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15 seconds</span></p><p class='text-center'>" + questions[questionCount] + "</p><p class='first-answer answer'>" + answerChoices[questionCount][0] + "</p><p class='answer'>"+answerChoices[questionCount][1]+"</p><p class='answer'>"+answerChoices[questionCount][2]+"</p><p class='answer'>"+answerChoices[questionCount][3]+"</p>";
	console.log(gameHTML);
	$(".mainArea").html(gameHTML);
}

function intermission() 
{
	if (questionCount < questions.length-1) 
	{
		questionCount++;
		console.log(questionCount);
		quizLayout();
		counter = 15;
		timerWrapper();
	}
	else 
	{
		resultScreen();
	}
}

function timerWrapper() 
{
	theClock = setInterval(questionTimer, 1000);
	function questionTimer() 
	{
		if (counter === 0) 
		{
			clearInterval(theClock);
			incrementLossDueToTimeOut();
		}
		if (counter > 0) 
		{
			counter--;
		}
		$(".timer").html(counter + " seconds");
	}
}

function resultScreen() 
{
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + " seconds </span></p>" + "<p class='text-center'>Quiz over, here are the results..." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Incorrect Answers: " + incorrectCount + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() 
{
	questionCount = 0;
	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = 0;
	counter = 15;
	quizLayout();
	timerWrapper();
}



