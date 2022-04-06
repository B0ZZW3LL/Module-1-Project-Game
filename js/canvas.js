let scoreCounter = document.getElementById('score-counter');
let heart1 = document.getElementById('heart-1');
let heart2 = document.getElementById('heart-2');
let heart3 = document.getElementById('heart-3');
let instructionsBox = document.getElementById('instructions');

let gravity = 0.1;

const playerImage = new Image();                                                                        // <-- Load our images using the image contstructor which essentially creates a new element in the DOM.                                                      
playerImage.src = './images/player.png';

const donutImage = new Image();                                                                       
donutImage.src = './images/donut1.png';

const ballImage = new Image();
ballImage.src = './images/bowling_ball.png'

const hotDogImage = new Image();
hotDogImage.src = './images/hotdog.png'

const gameOverImage = new Image();
gameOverImage.src = './images/gameover.png'


class FallingObject {                                                                                   // <-- falling object generation/creation class
    constructor(ctx, image, type){                                                                      // <-- when doing so, we'll provide our context (our 2D drawing surface), a randomly seleted image (donut or ball) & and a type 'donut' or 'bowling ball'.
      this.ctx = ctx;
      this.type = type
      this.img = image;
      this.width = 60;  
      this.height = 50;  
      this.x = Math.floor(Math.random() * (1000 - this.width + 1));                                     // <-- beginning x location selected randomly between 1 & 940 (canvas with minues object width).
      this.y = -40;                                                                                     // <-- negative should allow for the object to seem like it started a bit above canvas - rather than a object appearing instantly at top.
      this.vx = this.randomVX();                                                                        // <-- we call our method below to return to us a random number between -10 <-> 10 (but not 0).
      this.vy = 1;                                                                                      
    }
    
    randomVX(){
        let xyNumber = (Math.floor(Math.random() * 10 + 1));
        let xySign = (Math.floor(Math.random() * 100) % 2 === 0) ?'-' :''; 
        return Number(xySign + xyNumber);
    }

    move(){                                                                                             // <-- We will repeatedly call this method in our "updateGameCanvas" loop below, which will increment the y axis by 1 each time... causing the object to "fall", once drawn of course (traverse the screen top to bottom).
      this.y += 1.5;
    }
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);                            // <-- When called from "updateGameCanvas" loop below, here we actually "re-draw" the object on the canvas. 
    }
    leftBorder() {
        return this.x;
    }
    rightBorder() {
        return this.x + this.width;
    }
    topBorder() {
        return this.y;
    }
    bottomBorder() {
        return this.y + this.height;
    }
    isOffBottomOfCanvas(){                                                                              // <-- when method invoked it will check for the object to see if it's current y value is greater than the canvas height (i.e, is it complely off the canvas out of view).  
       return this.y > 600;
    }

};

window.onload = () => {                                                                                 //<-- DOM structure is not available until window load.
    document.getElementById('start-button').onclick = () => {
      startGame();
    };                                                                                                  // <--  CONTEXT(game area) = 600(height) X 1000(width) 
 
    function startGame() {
        const gameCanvas = document.getElementById('game-space');                                       // <-- we locate our canvas element in the DOM. 
        const ctx = gameCanvas.getContext('2d');                                                        // <-- method to obtain rendering context & drawing functions asigned to 'ctx' (so this is our drawing surface going forard).

        let numFrame = 0;
        let score = 0;
        scoreCounter.innerText = score;                                                                 // <-- set score and corresponding DOM element "back to start" = 0 points/score.
        
        heart1.className = '';                                                                          // <-- re-display our "health hearts" when new game starts (removing "hide-hearts" class from element). 
        heart2.className = '';
        heart3.className = '';
        instructionsBox.className = 'hide';

        const playerObject = {
            img: playerImage,
            health: 3,
            vx: 5,                                                                                      // <-- rather than decrement points - let's go with "health system" - I.E gain points with each donut, if hit x amount of times then game stops... 
            x: 460,
            y: 491, 
            width: 80,
            height: 109,

            moveLeft: function(){                                                                       // <-- when called updates the objects x key value (negative = we reduce x = traverse left).
                this.x -= 60;
            },

            moveRight: function(){
                this.x += 60;
            },

            draw: function() {
                if(this.x > 940 ? this.x = 940 : this.x);                                               // <-- Try to keep the player within the game area
                if(this.x <= 0 ? this.x = 0 : this.x);
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
            },

            left() {
                return this.x;
            },
            right() {
                return this.x + this.width;
            },
            top() {
                return this.y;
            },
            bottom() {
                return this.y + this.height;
            },
            collision(aFallingObject){ 
                return !(this.bottom() < aFallingObject.topBorder() || this.top() > aFallingObject.bottomBorder() || this.right() < aFallingObject.leftBorder() || this.left() > aFallingObject.rightBorder());
            }
        };

        const fallingObjectArray = [];

        function updateGameCanvas() {

            if(numFrame % 50 === 0) {
                let objectSelector = (Math.floor(Math.random() * 100) % 2 === 0) ?'A' :'B';             // <-- Randomly generate falling objects
                    if(objectSelector === 'A') {
                        fallingObjectArray.push(new FallingObject(ctx, donutImage, 'donut')); 
                    } else {
                       fallingObjectArray.push(new FallingObject(ctx, ballImage, 'bowling ball'));
                    }
            }

            if(numFrame % 75 === 0) {
                let objectSelector = (Math.floor(Math.random() * 100) % 2 === 0) ?'A' :'B';             // <-- Randomly generate falling objects
                    if(objectSelector === 'A') {
                        fallingObjectArray.push(new FallingObject(ctx, donutImage, 'donut')); 
                    } else {
                       fallingObjectArray.push(new FallingObject(ctx, ballImage, 'bowling ball'));
                    }
            }

            if(numFrame % 90 === 0) {
                fallingObjectArray.push(new FallingObject(ctx, donutImage, 'donut'));                   // <-- let make sure there is plenty of donuts to chase. 
            }

            if(numFrame % 200 === 0) {
                let objectSelector = (Math.floor(Math.random() * 100) % 2 === 0) ?'A' :'B';             // <-- Randomly generate falling objects, this one should introduce a hot dog every so often.
                    if(objectSelector === 'A') {
                        fallingObjectArray.push(new FallingObject(ctx, donutImage, 'donut')); 
                    } else {
                       fallingObjectArray.push(new FallingObject(ctx, hotDogImage, 'hot dog'));
                    }
            }
        
            numFrame += 1;

            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);                                   // <-- Clear the previous before drawing the new, else you'll get a "drag" effect. 

            playerObject.draw();

            if(fallingObjectArray[0].isOffBottomOfCanvas()){                                            // <-- We assume and check if the first object in the array is below the bottom border - then remove from array.  Seemed like good "house keeping" from race care lab. 
                fallingObjectArray.shift();
            }

            for(let i = 0; i < fallingObjectArray.length; i++) {                                         //<-- Now for each object in our array we move and re-draw. 

                fallingObjectArray[i].move();
                fallingObjectArray[i].draw();
                fallingObjectArray[i].vy += gravity;                                                    // <-- with each draw we apply "gravity" = acceleration on the y axies is increase with each "draw".
                fallingObjectArray[i].y += fallingObjectArray[i].vy;
                fallingObjectArray[i].x += fallingObjectArray[i].vx;
                if((fallingObjectArray[i].x + fallingObjectArray[i].width) + fallingObjectArray[i].vx > gameCanvas.width || fallingObjectArray[i].x + fallingObjectArray[i].vx < 0) {
                    fallingObjectArray[i].vx *= -1;                                                     // <-- if falling object hits left or right canvas border we switch direction of vx, keeping the object "in play".
                }
            }
            
            for(let i = 0; i < fallingObjectArray.length; i++) { 
                if(playerObject.collision(fallingObjectArray[i])) {

                    if(fallingObjectArray[i].type === 'donut' || fallingObjectArray[i].type === 'hot dog') {       // <-- if playerObject collides with donut or hot dog call "increaseScore".  Else it was a bowling ball so remove one from player health. 
                        increaseScore(fallingObjectArray[i].type); 

                    } else {
                        reduceHealth();
                        if(playerObject.health === 0) {                                                 // <-- once health is zero we'll draw the "game over" image to canvas... It will clear once updateGameCanvas is invoked again (= push start game button)
                            ctx.drawImage(gameOverImage, 275, 80, 450, 420);                            // <-- after checking if health is now 0, we'll return - stopping the updateGameCanvas "loop".
                            return;                                                                     
                        }
                    };
                    fallingObjectArray.splice([i], 1);                                                  // <-- remove the object collided with from the array. 
                }
            }
            stopId = window.requestAnimationFrame(updateGameCanvas);                                    // <-- might want to change to setinterval after to run every 16 milliseconds - smooth out the animations.
        };

        function increaseScore(objectType) {                                                            // <-- Increase score accordingly based on which object player collided with.  If it was a hot dog, also call increaseHealth... as we will also increase this. 
            switch (objectType) {
                case 'donut':
                    score += 25;
                    break;
                case 'hot dog':
                    score += 100;
                    increaseHealth();
                    break;
            }
            scoreCounter.innerText = score;
        };

        function increaseHealth() {
            switch(playerObject.health){                                                                // <-- based on current health, let's add a heart back to the screen and increase health to a max of 3. 
                case 1:
                    heart2.className = '';
                    break;
                case 2:
                    heart1.className = '';
                    break;
            }
            if (playerObject.health < 3){
                playerObject.health ++; 
            }
        };

        function reduceHealth() {
            playerObject.health --;                                                                     // <-- reduce health by 1
            switch(playerObject.health){                                                                // <-- based on current health, hide another heart from screen... 
                case 2:
                    heart1.className = 'hide';
                    break;
                case 1:
                    heart2.className = 'hide';
                    break;
                case 0:
                    heart3.className = 'hide';
                    break;
            }
        };

        window.addEventListener('keydown', event => {
            switch (event.key){
              case 'ArrowRight':
                playerObject.moveRight();
                break;
              case 'ArrowLeft':
                playerObject.moveLeft();
                break;
            }
        });
        
        document.addEventListener('mousemove', e => {
            playerObject.x = e.clientX - gameCanvas.width/2
        });

       updateGameCanvas();

    };


};
