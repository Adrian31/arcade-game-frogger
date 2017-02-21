var RIGHT_EDGE = 403;
var BOTTOM_EDGE = 375;

var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

var HAS_REACHED_WATER = false;


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

    //Move enemy to the left side of the canvas once they've passed the edge of the right
    if (this.x < 510) {
        this.x += dt * this.speed;
    } else {
        this.x = -100;
    }

    //Collision detection
    if (player.x < this.x + 50 &&
        player.x + 50 > this.x &&
        player.y < this.y + 40 &&
        player.y + 40 > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;

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

    if (player.score >= 5 && player.y === 0) {
        $('#game-won').show();
        $('.won').click(function() {
            $('#game-won').hide();
            document.location.reload();
        });
        setTimeout(gameLoop, 1000 / 30);
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
    if (HAS_REACHED_WATER) {
        this.score++;
        setTimeout(resetPlayer);
        HAS_REACHED_WATER = false;
    }
};

Player.prototype.reset = function() {
  this.x = 201;
  this.y = 375;
  this.lives = this.lives - 1;

  if (this.lives <= -1) {
      $('#game-over').show();
      $('.lost').click(function() {
          $('#game-over').hide();
          document.location.reload();
      });
      setTimeout(gameLoop, 1000 / 30);
  }
};

//switchcase that gets the arrow direction desired and checks for wall collision
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - TILE_WIDTH < 0) {
                this.x = 0;
            } else {
                this.x -= TILE_WIDTH;
            }
            break;

        case 'right':
            if (this.x + TILE_WIDTH >= RIGHT_EDGE) {
                this.x = 404;
            } else {
                this.x += TILE_WIDTH;
            }
            break;

        case 'up':
            if (this.y - TILE_HEIGHT < 0) {
                HAS_REACHED_WATER = true;
                this.y = 0;
            } else {
                this.y -= TILE_HEIGHT;
            }
            break;

        case 'down':
            if (this.y + TILE_HEIGHT >= BOTTOM_EDGE) {
                this.y = 375;
            } else {
                this.y += TILE_HEIGHT;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-100, 60, 500), new Enemy(-100, 140, 300), new Enemy(-100, 225, 225)];

//not entirely sure if this is the best way of doing this.... But it had the desired effect
//spawn 3 extra enemies
var spawnEnemy = function() {
    for (var i = 0; i < 3; i++) {
        var enemyX = -400;
        var enemyY = 225;
        if (i == 1) {
            enemyY = 140;
        } else if (i == 2) {
            enemyY = 60;
        }

        var enemy = new Enemy(enemyX, enemyY);
        allEnemies.push(enemy);
    };
};
spawnEnemy();

var player = new Player(201, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener("keydown", function(e) {
// space and arrow keys
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
}, false);
