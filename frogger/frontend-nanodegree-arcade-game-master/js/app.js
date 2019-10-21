// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101; //moves enemy one block (101px) on the x axis
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if enemy is onscreen the enemy will move across the screen at a contsant speed, ending just off screen
    if (this.x < this.boundary){
      this.x += this.speed * dt;
    }
    else {
      this.x = this.resetPos; //resets enemy to starting postiion creating a loop
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


 class Player {
  constructor(){
    this.step = 101; //moves character one block(101px) on the x axis
    this.jump = 83; //moves character one block (83px) on the y axis
    this.startX = this.step * 2; //hero starts on middle block of x axis
    this.startY = (this.jump * 5) -20; //hero starts on the bottom row of the board
    this.sprite = 'images/char-horn-girl.png';
    this.x = this.startX;
    this.y = this.startY;
    this.victory= false;
  };

  update(){
     for (let enemy of allEnemies){
       if ((enemy.y + enemy.step/2 > this.y && enemy.y < this.y + this.step/2) && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ){
       this.reset();
     }
   }; //checks for enemy player collisions and sends the player back to the start if collision is detected

   if(this.y <= 82) {
          this.victory = true;
          setTimeout(gameOver, 800);
          //gameOver();
      }
    };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  };



  handleInput(input){
    switch(input){
      case 'left':
      if (this.x > 0){
        this.x -= this.step;
      }; //prevents player from going off screen
      break;
      case 'up':
      if (this.y > this.jump) //stops the player 1 block from top of board so he isn't in the water
      {
        this.y -= this.jump;
      };
      break;
      case 'right':
      if (this.x < this.step * 4){
        this.x += this.step;
      }; //prevents player from going off screen
      break;
      case 'down':
      if (this.y < this.jump * 4){
        this.y += this.jump;
      }; //prevents player from going off screen
      break;
    };
  }; //moves player around the board using arrow clicks

reset() {
    alert("You died!");
    this.y = this.startY;
    this.x = this.startX;
  }
}

function gameOver(){
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
  let restart = document.querySelector('.restartBtn');
  restart.addEventListener('click', function(e) {
            location.reload(true);
            modal.style.display = "none";
          });
        }


const player = new Player();
const bug1a = new Enemy(-101, 150, 300);
const bug1b = new Enemy((-101*2), 150, 300);
const bug1c = new Enemy((-101*3.5), 150, 300);
const bug2 = new Enemy(-101, 83, 400);
const bug3 = new Enemy((-101*2.5), 83, 400);
const bug4 = new Enemy (-101, 250, 380);
const bug5 = new Enemy ((-101*2.5), 250, 380)
const allEnemies = [];
allEnemies.push(bug1a, bug1b, bug1c, bug2, bug3, bug4, bug5);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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
