var rightEdge = 403;
var bottomEdge = 375;

var tileWidth = 101;
var tileHeight = 83;

var hasReachedWater = false;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;

    this.speed = Math.floor(Math.random() * 250 + 1);

    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < 510){
      this.x += dt * this.speed;
    }else {
      this.x = -100;
    };




};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 201;
  this.y = 375;

  this.score = 0;
  //Players score

  this.lives = 3;
  //Default lives of the player

  this.sprite = 'images/char-boy.png';
};

var resetPlayer = function() {
  player.x = 201;
  player.y = 375;
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
  this.drawText();
  this.increaseScore();
  this.enemyCollision();


    if(player.score >= 5 && player.y === 0) {
        $('#game-won').show();
        $('.won').click(function() {
            $('#game-won').hide();
            document.location.reload();
        });
    }
};

Player.prototype.drawText = function() {
  ctx.clearRect(0, 0, 120, 20);
  ctx.clearRect(400, 0, 100, 20);
  ctx.font = "20px Verdana";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + this.score, 8, 20);
  ctx.fillText("Lives: " + this.lives, 400, 20);
};


Player.prototype.increaseScore = function() {
    if(hasReachedWater) {
        this.score++;
        setTimeout(resetPlayer);
        hasReachedWater = false;
    }
};

Player.prototype.enemyCollision = function() {
    var bug = checkCollisions(allEnemies);
    //if collision detected, reduce a player life.
    //Game over if all lives lost.
    if(bug) {
        if(this.lives !== 0) {
            this.lives--;
            resetPlayer();
        }
        else {
            $('#game-over').show();
            $('.lost').click(function() {
                $('#game-over').hide();
                document.location.reload();
            });
        }
    }
};

var checkCollisions = function(targetArray) {
    for(var i = 0; i < targetArray.length; i++) {
        if(player.x < targetArray[i].x + 50 &&
            player.x + 50 > targetArray[i].x &&
            player.y < targetArray[i].y + 40 &&
            player.y + 40 > targetArray[i].y) {
                return targetArray[i];
        }
    }
};

  //switchcase that gets the arrow direction desired and checks for wall collision
  Player.prototype.handleInput = function(key){
    switch(key) {
        case 'left':
        if(this.x - tileWidth < 0){
            this.x = 0;
        }
        else {
            this.x -= tileWidth;
        }
        break;

        case 'right':
        if(this.x + tileWidth >= rightEdge){
            this.x = 404;
        }
        else {
            this.x += tileWidth;
        }
        break;

        case 'up':
        if(this.y - tileHeight < 0){
            hasReachedWater = true;
            this.y = 0;
        }
        else {
            this.y -= tileHeight;
        }
        break;

        case 'down':
        if(this.y + tileHeight >= bottomEdge){
            this.y = 375;
        }
        else {
            this.y += tileHeight;
        }
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [  new Enemy(-100, 60, 500), new Enemy(-100, 140, 300), new Enemy(-100, 225, 225) ];
  /*new Enemy(0, 60, 500),
  new Enemy(0, 140, 300),
  new Enemy(0, 225, 225) */
  //if(hasReachedWater){
  for(var i = 0; i < 1; i++){
    var enemyX = -100/* * (6 - 1)) + 1) * 101 */;
    var enemyY = (Math.floor(Math.random() * 6 )+ 100) /* * (5 - 1)) + 1) * 50 */;
    var enemy = new Enemy(enemyX, enemyY);
    allEnemies.push(enemy);

  //};
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
