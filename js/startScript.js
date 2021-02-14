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
var alive = {playerOne: true, playerTwo: true};

var gameType = 0;


var gameOver = function()
{
  document.getElementsByClassName('gameOverContainer')[0].classList.add('show');
}

////////////////////////////COOKIE CODE/////////////////////////////////////////
function getCookie(cname)
{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for(var i = 0; i <ca.length; i++)
  {
    console.log(ca[i]);
    var c = ca[i];
    while (c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
    var table = document.getElementsByClassName('singlePlayer');
    table[0].classList.remove('hide');
    table[1].classList.remove('hide');
    $.getScript("js/PlayerOneScript.js",function(){

      var spCookie = getCookie("snake0");
      if(spCookie == "")
      {
        setCookie("snake0",0,30);
      }else
      {
        highScore.playerOne = parseInt(spCookie);
        upDateScores();
      }


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
      var table = document.getElementsByClassName('multiplayer');
      table[0].classList.remove('hide');
      table[1].classList.remove('hide');

      var mpCookie1 = getCookie("snake1");
      var mpCookie2 = getCookie("snake2");

      if(mpCookie1 == "" || mpCookie2 == "")
      {
        setCookie("snake1",0,30);
        setCookie("snake2",0,30);
      }else
      {
        highScore.playerOne = parseInt(mpCookie1);
        highScore.playerTwo = parseInt(mpCookie2);
        upDateScores();
      }

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
