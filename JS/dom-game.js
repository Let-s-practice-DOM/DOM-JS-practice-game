(function (){
    const canvas = document.getElementById("pacMan");
    const context = canvas.getContext("2d");

    const size = 25;
    const moveSpeed = 10;
    const pacman = {
        x: 50,
        y: 50,
        move: function (direction){
            switch (direction){
                case "Up":
                    if(this.y < 0) {
                        this.y = canvas.height;
                    } else {
                        this.y -= moveSpeed;
                    }
                    break;
                case "Down":
                    if(this.y > canvas.height) {
                        this.y = 0;
                    } else {
                        this.y += moveSpeed;
                    }
                    break;
                case "Left":
                    if(this.x < 0) {
                       this.x = canvas.width;
                    } else {
                        this.x -= moveSpeed;
                    }
                    break;
                case "Right":
                    if(this.x > canvas.width){
                        this.x= 0;
                    } else {
                        this.x += moveSpeed;
                    }
                    break;
            }
        }
    }
    const ghost1 = {
        x: 100,
        y: 100,
        track: function () {
            if (this.x < 0) {
                this.x = canvas.width;
            }
            if (this.x > canvas.width) {
                this.x = 0;
            }
            if (this.y > canvas.height) {
                this.y = 0;
            }
            if (this.y < 0) {
                this.y = canvas.height;
            }
            if(bestMovementX(this.x, pacman.x, canvas.width, 0)){//need to account for walls later
                if(this.x > pacman.x){
                    this.x += moveSpeed;
                } else this.x -= moveSpeed;
            } else {
                if(this.x > pacman.x){
                    this.x -= moveSpeed;
                } else this.x += moveSpeed;
            }
            if(bestMovementY(this.y, pacman.y, canvas.height, 0)){// account for wall later
                if(this.y > pacman.y){
                    this.y += moveSpeed;
                } else this.y -= moveSpeed;
            } else {
                if(this.y > pacman.y){
                    this.y -= moveSpeed;
                } else this.y += moveSpeed;
            }
        }
    }
    function makePos(num){
        if(num < 0){
            return num * -1;
        }
        return num;
    }
    //=========BUGGY STILL, SOMETIMES DOES NOT MAKE THE RIGHT DECISION=========//
    // this will set up for a preferred movement to go through the end of the map to come out the other side if it is a
    // shorter path to get to pacman rather than turning around
    function bestMovementX(predatorX, preyX, canvasW, base){
        let goOtherWayX = false;
        let currentDistanceX = predatorX - preyX;
        currentDistanceX = makePos(currentDistanceX);
        let possibleBestDistanceX = (makePos((base - predatorX)) + makePos((canvasW - preyX)));
        if(possibleBestDistanceX < currentDistanceX){
            goOtherWayX = true;
        }
        return goOtherWayX;
    }
    function bestMovementY(predatorY, preyY, canvasH, base){
        let goOtherWayY = false;
        let currentDistanceY = predatorY - preyY;
        currentDistanceY = makePos(currentDistanceY);
        let possibleBestDistanceY = (makePos((base - predatorY)) + makePos((canvasH - preyY)));
        if(possibleBestDistanceY < currentDistanceY){
            goOtherWayY = true;
        }
        return goOtherWayY;
    }

    //playerX, playerY, ghostX, ghostY, size
    function contact(px, py, gx, gy, s){
        if((px + s > gx && px < gx + s) &&(py + s > gy && py < gy + s)){
            console.log("CONTACT");
        }
    }
    setInterval(tracking, 350);
    function tracking(){
        ghost1.track();
        contact(pacman.x, pacman.y, ghost1.x, ghost1.y, size);
    }

    setInterval(load, 50);
    function load (){
        draw();
    }
    function draw(){
        fill(0,0, canvas.width, canvas.height, "black"); //This is for canvas
        // these are the top two short vertical lines.
        fill(150, 0, 10, 75,"#093593")
        fill(450, 0, 10, 75,"#093593")
        // these are the bottom two short vertical lines
        fill(150, 725, 10, 75,"#093593")
        fill(450, 725, 10, 75,"#093593")
        // These are the left most short hortizontal lines
        fill(0, 150, 75, 10,"#093593")
        fill(0, 650, 75, 10,"#093593")
        //these are
        fill(525, 150, 75,10,"#093593")
        fill(525, 650, 75, 10,"#093593")
        fill(pacman.x, pacman.y, 25, 25, "yellow");//this is for the pacman
        fill(ghost1.x, ghost1.y, size, size, "red")
    }
    function fill(x, y, w, h, c){
        context.fillStyle = c;
        context.fillRect(x, y, w, h);

    }

    window.addEventListener("keydown", function (e){
       const direction = e.key.replace("Arrow", "");
       pacman.move(direction);
    });

})();