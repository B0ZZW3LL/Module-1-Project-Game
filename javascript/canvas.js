// ***** ANY CLASSES GO UP TOP ***** 

// I think we'll end up with two - one for each "falling object" allowing for mutliple generation.
// In reviewing car game lab - looks like most if not all is within the below start game function.

let scoreCounter = document.getElementById('score-counter');

// *** ON WINDOW LOAD -> ANON FUNCTION = EVENT LISTNER ON START-BUTTON -> Start game function ***

window.onload = () => {                                                                                 //<-- DOM structure is not available until window load.
    console.log('canvas file connected'); 
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    // CONTEXT(game area) = 600(height) X 1000(width) 
 
    function startGame() {
        const gameCanvas = document.getElementById('game-space');
        const ctx = gameCanvas.getContext('2d');                                                        // <-- method to obtain rendering context & drawing functions asigned to 'ctx' (so this is our context going forard).

        let numFrame = 0;
        scoreCounter.innerText = 0;                                                                     // *** DEFAULT THE SCORE LATER TO 0 IN HTML!!! ***

        /* <-- draw test...
        function draw () { 
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, 80, 109);
        }

        draw();
        */

        const playerImage = new Image();                                                                // <-- we load or player image using the image contstructor - which essentially creates a new element in the DOM.
        playerImage.src = './images/player.png';

        const playerObject = {
            img: playerImage,
            x: 460,
            y: 485, 
            width: 80,
            height: 109,
            speed: 4,

            moveLeft: function(){                                                                       // <-- when called updates the objects x key value (negative = we reduce x = traverse left).
                this.x -= 2 * this.speed;
            },

            moveRight: function(){
                this.x += 2 * this.speed;
            },

            draw: function() { 
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
            },

        };

        function updateGameCanvas() {
            numFrame += 1;

            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);                                   // <-- Clear the previous before drawing the new, else you'll get a "drag" effect. 

            playerObject.draw();

            requestAnimationFrame(updateGameCanvas);
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

        updateGameCanvas();

    };


};
