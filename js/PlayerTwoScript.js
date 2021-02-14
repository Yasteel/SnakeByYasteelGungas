var snakeOne = [];
var snakeTwo = [];

snakeOne[0] = new Snake((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#17B890');
snakeOne[0].draw();
snakeTwo[0] = new Snake((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#4287f5');
snakeTwo[0].draw();

var foodOne = new Food((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#17B890');
var foodTwo = new Food((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#4287f5');


//Animate//
var animate = function()
{
	var id = requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

//========================Food Checks========================//
	if(alive.playerOne)
	{
		if(foodCount == 0)
		{
			foodOne.respawn();
			foodCount = 1;
		}
		foodOne.draw();

		if(snakeOne.length > 1)
		{
			moveBody(snakeOne);
		}else
		{
			snakeOne[0].move();
		}

		for(var i=0;i<snakeOne.length;i++)
		{
			snakeOne[i].draw();
		}

		if(snakeOne[0].eats(foodOne)) //Eats Own Food
		{
			foodCount = 0;
			previousCoords.x = snakeOne[snakeOne.length-1].x;
			previousCoords.y = snakeOne[snakeOne.length-1].y;
			snakeOne.push(new Snake(previousCoords.x,previousCoords.y-10,'#17B890'));
			upDateScores();
		}
		if(snakeOne[0].eats(foodTwo)) //Eats Other Food
		{
			foodCount2 = 0;
			if(snakeOne.length > 1)
			{
				snakeOne.pop();
			}
			upDateScores();
		}

		cannibalized(snakeOne);
	}


	//========================Snake One========================//
	//========================Snake Two========================//
	if(alive.playerTwo)
	{
		if(foodCount2 == 0)
		{
			foodTwo.respawn();
			foodCount2 = 1;
		}
		foodTwo.draw();

		if(snakeTwo.length > 1)
		{
			moveBody(snakeTwo);
		}else
		{
			snakeTwo[0].move();
		}

		for(var i=0;i<snakeTwo.length;i++)
		{
			snakeTwo[i].draw();
		}

		if(snakeTwo[0].eats(foodTwo)) //Eats Own Food
		{
			foodCount2 = 0;
			previousCoords2.x = snakeTwo[snakeTwo.length-1].x;
			previousCoords2.y = snakeTwo[snakeTwo.length-1].y;
			snakeTwo.push(new Snake(previousCoords2.x,previousCoords2.y-10,'#4287f5'));
			upDateScores();
		}
		if(snakeTwo[0].eats(foodOne)) //Eats Other Food
		{
			foodCount = 0;
			if(snakeTwo.length > 1)
			{
				snakeTwo.pop();
			}
			upDateScores();
		}

		cannibalized(snakeTwo);
	}
	//=========================Snake Two========================//

	if(snakeOne[0].dies())
	{
		alive.playerOne = false;
	}

	if(snakeTwo[0].dies())
	{
		alive.playerTwo = false;
	}



	if(!alive.playerOne && !alive.playerTwo)
  {
		cancelAnimationFrame(id);
    gameOver();
    upDateScores();
	}
}
//Animate//
//=====================Move Body=====================//
var moveBody = function(snake)
{
	for(var i = snake.length-1; i>0; i--){
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}
	snake[0].move();
}
//=====================Move Body=====================//
//=====================Eat Self======================//
var cannibalized = function(snake)
{
	var breakPoint = 0;
	for(var i=1; i<snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			breakPoint = i;
			for(var j= breakPoint; j< snake.length; j++){
				snake.pop();
			}
      upDateScores();
			break;
		}
	}
}
//=====================Eat Self======================//
//===================Update Scores===================//
var upDateScores = function()
{
	score.playerOne = snakeOne.length-1;
	if(highScore.playerOne < score.playerOne)
	{
		highScore.playerOne = score.playerOne;
		setCookie("snake1",highScore.playerOne,30);
	}

		$('.player_one_current').html(score.playerOne);
		$('.player_one_highest').html(highScore.playerOne);

	score.playerTwo = snakeTwo.length-1;
	if(highScore.playerTwo < score.playerTwo)
	{
		highScore.playerTwo = score.playerTwo;
		setCookie("snake2",highScore.playerTwo,30);

	}

		$('.player_two_current').html(score.playerTwo);
		$('.player_two_highest').html(highScore.playerTwo);
}

//===================Update Scores===================//
//===============Check for key pressed===============//
window.addEventListener("keypress",checkKeyPress,false);

function checkKeyPress(event){
  console.log(event.code + ' : ' + event.keyCode);
  //==================Player 1 Keys==================//
  if(snakeOne[0].xDisplacement !== speed)
  {
		if(event.keyCode == "97" && valid_move) //Left
    {
			snakeOne[0].xDisplacement = -speed;
			snakeOne[0].yDisplacement = 0;
      valid_move = false;
		}
	}
	if(snakeOne[0].yDisplacement !== speed)
  {
		if(event.keyCode == "119") //Up
    {
			snakeOne[0].xDisplacement = 0;
			snakeOne[0].yDisplacement = -speed;
      valid_move = true;
		}
	}
	if(snakeOne[0].xDisplacement !== -speed)
  {
		if(event.keyCode == "100" && valid_move)//right
    {
			snakeOne[0].xDisplacement = speed;
			snakeOne[0].yDisplacement = 0;
      valid_move = false;
		}
	}
	if(snakeOne[0].yDisplacement !== -speed)
  {
		if(event.keyCode == "115") //Down
    {
			snakeOne[0].xDisplacement = 0;
			snakeOne[0].yDisplacement = speed;
      valid_move = true;
		}
	}
  //==================Player 1 Keys==================//
  //==================Player 2 Keys==================//
  if(snakeTwo[0].xDisplacement !== speed)
  {
    if(event.keyCode == "52" && valid_move_p2){ //left
      snakeTwo[0].xDisplacement = -speed;
      snakeTwo[0].yDisplacement = 0;
      valid_move_p2 = false;
    }
	}
	if(snakeTwo[0].yDisplacement !== speed)
  {
    if(event.keyCode == "56"){ // Up
      snakeTwo[0].xDisplacement = 0;
      snakeTwo[0].yDisplacement = -speed;
      valid_move_p2 = true;
    }
	}
	if(snakeTwo[0].xDisplacement !== -speed)
  {
    if(event.keyCode == "54" && valid_move_p2){ // Right
      snakeTwo[0].xDisplacement = speed;
      snakeTwo[0].yDisplacement = 0;
      valid_move_p2 = false;
    }
	}
	if(snakeTwo[0].yDisplacement !== -speed)
  {
    if(event.keyCode == "50"){ // Down
      snakeTwo[0].xDisplacement = 0;
      snakeTwo[0].yDisplacement = speed;
      valid_move_p2 = true;
    }
	}
  //==================Player 2 Keys==================//

}
//===============Check for key pressed===============//
