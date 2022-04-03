// ***** ANY CLASSES GO UP TOP ***** 

// I think we'll end up with two - one for each "falling object" allowing for mutliple generation.
// In reviewing car game lab - looks like most if not all is within this start game function

// *** ON WINDOW LOAD -> ANON FUNCTION = EVENT LISTNER ON START-BUTTON -> Start game function ***

window.onload = () => { // <-- DOM structure is not available until window load.
    console.log('canvas file connected'); 
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    // CONTEXT(game area) = 500(height) X 800(width) 
 
    function startGame() {
        const gameCanvas = document.getElementById('game-space');
        const ctx = gameCanvas.getContext('2d'); // <-- method to obtain rendering context & drawing functions asigned to 'ctx' (so this is our context going forard).

        let numFrame = 0;
        //scoreCounter = 0;

        const playerImage = new Image(); // <-- we load or player image using the image contstructor - which essentially creates a new element in the DOM.
        playerImage.src = './images/player.png';

        const playerObject = {
            img: playerImage,
            x: 0,
            y: 0, 
            width: 80,
            height: 109,

            moveLeft: function(){ // when called updates the objects x key value (negative = we reduce x = traverse left).
                this.x -= 6;
            },

            moveRight: function(){
                this.x += 6;
            },

            draw: function() { 
                ctx.drawImage(this.img. this.x, this.y, this.width, this.height)
            },

        };


    };


};


// ***** ANY CLASSES GO UP TOP ***** 

// I think we'll end up with two - one for each "falling object" allowing for mutliple generation.


// *** ON WINDOW LOAD -> ANON FUNCTION = EVENT LISTNER ON START-BUTTON -> Start game function ***

// In reviewing car game lab - looks like most if not all is within this start game function
