var canvas = document.getElementsByTagName('canvas')[0];
var content = document.getElementsByClassName('content')[0];
var context = canvas.getContext('2d');
canvas.width = content.offsetWidth;
canvas.height =  content.offsetHeight;

var speed = 4;
var foodCount = 0;
var foodX = 0;
var foodY = 0;
var chowed = false;
var previousX = 0;
var previousY = 0;
var snake = [];
var snakeTwo = [];
var valid_move = true;
var score = 0;
var highScore = 0;


var gameOver = function()
{
  document.getElementsByClassName('gameOverContainer')[0].classList.add('show');
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function()
{
  var sContainer = document.getElementsByClassName('startContainer')[0];
  sContainer.classList.add('show');

  $('.singlePlayer').click(function()
  {
    sContainer.classList.remove('show');
    $.getScript("js/test1.js",function(){
      animate();
    });
    // startGame();
  });
  $('.multiPlayer').click(function()
  {
    sContainer.classList.remove('show');
    $.getScript("js/test2.js",function()
    {

    });
  });

  $('.restart').click(function()
  {
    $.getScript('js/test1.js', function(){
      document.getElementsByClassName('gameOverContainer')[0].classList.remove('show');
      valid_move = true;
      upDateScores();
      animate();
    });
  });
});
