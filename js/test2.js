snake[0] = new Snake((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#17B890');
snake[0].draw();
snakeTwo[0] = new Snake((Math.floor(Math.random() * canvas.width) + 50),canvas.height-10,'#4287f5');
snakeTwo[0].draw();

alert("Goodluck");

window.addEventListener("keypress",checkKeyPress,false);

function checkKeyPress(event){
  console.log(event.code + ' : ' + event.keyCode);
	if(snake.xDisplacement !== speed){
		if(event.keyCode == "97"){
			snake[0].xDisplacement = -speed;
			snake[0].yDisplacement = 0;
		}
		if(event.keyCode == "52"){
			snakeTwo[0].xDisplacement = -speed;
			snakeTwo[0].yDisplacement = 0;
		}
	}
	if(snake[0].yDisplacement !== speed){
		if(event.keyCode == "119"){
			snake[0].xDisplacement = 0;
			snake[0].yDisplacement = -speed;
		}
		if(event.keyCode == "56"){
			snakeTwo[0].xDisplacement = 0;
			snakeTwo[0].yDisplacement = -speed;
		}
	}
	if(snake[0].xDisplacement !== -speed){
		if(event.keyCode == "100"){
			snake[0].xDisplacement = speed;
			snake[0].yDisplacement = 0;
		}
		if(event.keyCode == "50"){
			snakeTwo[0].xDisplacement = speed;
			snakeTwo[0].yDisplacement = 0;
		}
	}
	if(snake[0].yDisplacement !== -speed){
		if(event.keyCode == "115"){
			snake[0].xDisplacement = 0;
			snake[0].yDisplacement = speed;
		}
		if(event.keyCode == "52"){
			snakeTwo[0].xDisplacement = 0;
			snakeTwo[0].yDisplacement = speed;
		}
	}
}
