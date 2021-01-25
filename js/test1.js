snake = [];

snake[0] = new Snake((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10, '#17B890');
snake[0].draw();

var newFood = new Food((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#17B890');

//Animate//
var animate = function()
{
	var id = requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	if(foodCount == 0)
  {
	   newFood.respawn();
	}
	newFood.draw();

	if(snake.length > 1)
  {
		moveBody();
	}else
  {
		snake[0].move();
	}

	for(var i=0;i<snake.length;i++)
  {
		snake[i].draw();
	}

	snake[0].eats(newFood);
	if(chowed == true)
  {
		foodCount = 0;
		previousX = snake[snake.length-1].x;
		previousY = snake[snake.length-1].y;
		snake.push(new Snake(previousX,previousY-10,'#17B890'));
    upDateScores();
	}
	cannibalized();
	if(snake[0].dies(snake[0].x,snake[0].y))
  {
		cancelAnimationFrame(id);
    gameOver();
    upDateScores();
	}
}
//Animate//
//Move Body//
var moveBody = function()
{
	for(var i = snake.length-1; i>0; i--){
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}
	snake[0].move();
}
//Move Body//
//Eat Self//
var cannibalized = function()
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
//Eat Self//
//Update Scores//
var upDateScores = function()
{
  score = snake.length-1;
  if(highScore < score)
  {
    highScore = score;
  }

    $('.currentScore').html(score);
    $('.highestScore').html(highScore);
}
//Update Scores//
//===============Check for key pressed===============//
window.addEventListener("keypress",checkKeyPress,false);

function checkKeyPress(event)
{
	if(snake.xDisplacement !== speed)
  {
		if(event.keyCode == "97" && valid_move) //Left
    {
			snake[0].xDisplacement = -speed;
			snake[0].yDisplacement = 0;
      valid_move = false;
		}
	}
	if(snake[0].yDisplacement !== speed)
  {
		if(event.keyCode == "119") //Up
    {
			snake[0].xDisplacement = 0;
			snake[0].yDisplacement = -speed;
      valid_move = true;
		}
	}
	if(snake[0].xDisplacement !== -speed)
  {
		if(event.keyCode == "100" && valid_move)//right
    {
			snake[0].xDisplacement = speed;
			snake[0].yDisplacement = 0;
      valid_move = false;
		}
	}
	if(snake[0].yDisplacement !== -speed)
  {
		if(event.keyCode == "115") //Down
    {
			snake[0].xDisplacement = 0;
			snake[0].yDisplacement = speed;
      valid_move = true;
		}
	}
}
