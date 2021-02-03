var canvas = document.getElementsByTagName('canvas')[0];
var content = document.getElementsByClassName('content')[0];
var context = canvas.getContext('2d');
canvas.width = content.offsetWidth;
canvas.height =  content.offsetHeight;

var speed = 4;
var foodCount = 0;
var foodCount2 = 0;
var foodX = 0;
var foodY = 0;
var previousCoords = {x:0, y:0};
var previousCoords2 = {x:0, y:0};

var valid_move = true;
var valid_move_p2 = true;
var score = {playerOne: 0, playerTwo: 0};
var highScore = {playerOne: 0, playerTwo: 0};

var gameType = 0;


var gameOver = function()
{
  document.getElementsByClassName('gameOverContainer')[0].classList.add('show');
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function()
{
  var sContainer = document.getElementsByClassName('startContainer')[0];
  sContainer.classList.add('show');

  $('.singlePlayerBtn').click(function()
  {
    gameType = 1;
    sContainer.classList.remove('show');
    var table = document.getElementsByClassName('multiplayer');
    table[0].classList.add('hide');
    table[1].classList.add('hide');
    $.getScript("js/PlayerOneScript.js",function(){
      animate();
    });
    // startGame();
  });
  $('.multiPlayer').click(function()
  {
    sContainer.classList.remove('show');
    $.getScript("js/PlayerTwoScript.js",function()
    {
      gameType = 2;
      var table = document.getElementsByClassName('singlePlayer');
      table[0].classList.add('hide');
      table[1].classList.add('hide');
      animate();
    });
  });

  $('.restart').click(function()
  {
    if(gameType == 1)
    {
      $.getScript('js/PlayerOneScript.js', function(){
        document.getElementsByClassName('gameOverContainer')[0].classList.remove('show');
        valid_move = true;
        upDateScores();
        animate();
      });
    }else if (gameType == 2)
    {
      $.getScript('js/PlayerTwoScript.js', function(){
        document.getElementsByClassName('gameOverContainer')[0].classList.remove('show');
        valid_move = true;
        valid_move_p2 = true;
        upDateScores();
        animate();
      });
    }
  });
});
