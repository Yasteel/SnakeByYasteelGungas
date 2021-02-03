var Snake = function(x,y,color)
{
  this.x = x;
  this.y = y;
  this.d = 10;
  this.xDisplacement = 0;
  this.yDisplacement = -speed;

  this.draw = function()
  {
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.d, this.d);
  }

  this.move = function()
  {
    this.x += this.xDisplacement;
    this.y += this.yDisplacement;
  }

  this.eats = function(food)
  {
    if(this.x >= (food.x-10) && this.x <= (food.x+10) && this.y >= (food.y-10) && this.y <= (food.y+10)){
      return true;
		}else{
      return false;
		}
  }

  this.dies = function()
  {
    if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height)
    {
			return true;
		}
  }
}
