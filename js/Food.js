var Food = function(x,y,color)
{
	this.x = x;
	this.y = y;

	this.respawn = function()
  {
		this.x = Math.floor(Math.random() * (canvas.width-30)+30);
		this.y = Math.floor(Math.random() * (canvas.height-30)+30);
	}

	this.draw = function()
  {
		context.beginPath();
		context.arc(this.x,this.y,7,0,Math.PI*2,false);
		context.fillStyle = color;
		context.fill();
		// foodCount = 1;
	}
};
