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
    // will make more ghost later
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
    //------made to compare the values easier in the best movement functions--------//
    function makePos(num){
        if(num < 0){
            return num * -1;
        }
        return num;
    }
    //=========SEEMS TO BE BEST MOVEMENT IF IT IS TO CONTINUE TO THE LEFT AND THE Y MOVE WORKS WHEN IT IS GOING UP TO APPEAR AT THE BOTTOM=======//
    //========MAY NEED TO WRITE 2 MORE FUNCTIONS FOR THE RIGHT AND DOWN MOVEMENTS==================//
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
    // written in a way to allow any of the other ghost positions to be passed through for contact checking
    function contact(px, py, gx, gy, s){
        if((px + s > gx && px < gx + s) &&(py + s > gy && py < gy + s)){
            //game will restart in some way
            console.log("CONTACT");
        }
    }
    // tracking ran at a different interval to keep the ghost movements to a relatively slower speed
    setInterval(tracking, 350);
    function tracking(){
        ghost1.track();
        contact(pacman.x, pacman.y, ghost1.x, ghost1.y, size);
    }

    // to be ran over and over
    setInterval(load, 50);
    function load (){
        draw();
        createFoods();
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

    function fillC(cX, cY, r, c){
        context.fillStyle = c;
        context.beginPath();
        context.arc(cX, cY, r, 0, Math.PI*2, true);
        context.stroke();
        context.fill();
    }
    //====assign the random numbers only one time on initial load;
    let ranNumArr = [];
    function generateFoodsSpots(){
        for(let i = 0; i < 25; i++){
            let ranX = Math.floor(Math.random() * 500) + 50;
            let ranY = Math.floor(Math.random() * 700) + 50;
            ranNumArr.push(ranX);
            ranNumArr.push(ranY);
        }
        return ranNumArr;
    }
    //to be ran only on initial load;
    window.onload = function(){
        generateFoodsSpots();
    }
    //-----drawing the food pellets around from the random numbers;
    function createFoods(){
        for(let i = 0; i < 25; i++){
            for(let j = 0; j < ranNumArr.length; j+=2){
                fillC(ranNumArr[j], ranNumArr[j+1], 5, "#ffffff");
            }
        }
    }

    //for movement
    window.addEventListener("keydown", function (e){
       const direction = e.key.replace("Arrow", "");
       pacman.move(direction);
    });

})();