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
    function bestMovementX(ghostX, pacX, canvasW, base){
        let currentDistanceX = ghostX - pacX;
        currentDistanceX = makePos(currentDistanceX);
        let possibleBestDistanceX = (makePos((base - ghostX)) + makePos((canvasW - pacX)));
        return (possibleBestDistanceX < currentDistanceX)

    }
    function bestMovementY(ghostY, pacY, canvasH, base){
        let currentDistanceY = ghostY - pacY;
        currentDistanceY = makePos(currentDistanceY);
        let possibleBestDistanceY = (makePos((base - ghostY)) + makePos((canvasH - pacY)));
        return (possibleBestDistanceY < currentDistanceY)

    }

    //playerX, playerY, ghostX, ghostY, size
    // written in a way to allow any of the other ghost positions to be passed through for contact checking
    function contact(px, py, gx, gy, s){
        if((px + s > gx && px < gx + s) &&(py + s > gy && py < gy + s)){
            //game will restart in some way
            // console.log("CONTACT");
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

    //=======for debugging and help with adding features==========//
    function logPositions(){
        console.log(`pacman X pos: ${pacman.x}`);
        console.log(`pacman Y pos: ${pacman.y}`);
    }
    setInterval(logPositions, 1000);


    function draw(){
        fill(0,0, canvas.width, canvas.height, "black"); //This is for canvas

        // These are the two center lines
        fill(295, 0, 10, 75,"#093593")
        // fill(305, 0, 10, 75,"#093593")

        // top left square
        fill(45, 45, 55, 10,"#093593")
        fill(45, 110, 55, 10,"#093593")
        fill(45, 45, 10, 75,"#093593")
        fill(100,45,10,75, "#093593")


        // second second square
        fill(190, 45, 55, 10,"#093593")
        fill(190, 110, 55, 10,"#093593")
        fill(190, 45, 10, 75,"#093593")
        fill(240, 45, 10, 75,"#093593")


        // third right square
        fill(350, 45, 55, 10,"#093593")
        fill(350, 110, 55, 10,"#093593")
        fill(350, 45, 10, 75,"#093593")
        fill(400, 45, 10, 75,"#093593")

        // // top right square
        fill(500, 45, 65, 10,"#093593")
        fill(500, 110, 65, 10,"#093593")
        fill(555, 45, 10, 75,"#093593")
        fill(500, 45, 10, 75,"#093593")

        // top left square
        fill(45, 160, 65, 10,"#093593")
        fill(45, 210, 55, 10,"#093593")
        fill(45, 160, 10, 50,"#093593")
        fill(100,160,10,60, "#093593")

        // top left square
        fill(500, 160, 55, 10,"#093593")
        fill(500, 210, 55, 10,"#093593")
        fill(500, 160, 10, 50,"#093593")
        fill(555,160,10,60, "#093593")
        // middle T
        fill(250, 160, 110, 10,"#093593")
        fill(250, 210, 110, 10,"#093593")
        fill(250, 160, 10, 50,"#093593")
        fill(350,160,10,60, "#093593")
        fill(280,210,10,75, "#093593")
        fill(320,210,10,75, "#093593")
        fill(280,280,50,10, "#093593")

        // left
        fill(150,160,50,10, "#093593")
        fill(150,350,50,10, "#093593")
        fill(150,160,10,190, "#093593")
        fill(200,160,10,200, "#093593")

        // right
        fill(400,160,50,10, "#093593")
        fill(400,350,50,10, "#093593")
        fill(400,160,10,190, "#093593")
        fill(450,160,10,200, "#093593")

        fill(0,300,100,10, "#093593")
        fill(0,350,100,10, "#093593")
        fill(100,300,10,60, "#093593")
        fill(0,475,100,10, "#093593")
        fill(0,425,100,10, "#093593")
        fill(100,425,10,60, "#093593")


        fill(500,300,100,10, "#093593")
        fill(500,350,100,10, "#093593")
        fill(500,300,10,60, "#093593")
        fill(500,475,100,10, "#093593")
        fill(500,425,100,10, "#093593")
        fill(500,425,10,60, "#093593")










        // // these are the top two short vertical lines.
        // fill(150, 0, 10, 75,"#093593")
        // fill(450, 0, 10, 75,"#093593")
        // // these are the bottom two short vertical lines
        // fill(150, 725, 10, 75,"#093593")
        // fill(450, 725, 10, 75,"#093593")
        // // These are the left most short hortizontal lines
        // fill(0, 150, 75, 10,"#093593")
        // fill(0, 650, 75, 10,"#093593")
        // //these are
        // fill(525, 150, 75,10,"#093593")
        // fill(525, 650, 75, 10,"#093593")

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

    // create food along x 130 and 480 top to bottom
    // at y 140 left to right

    let leftFoodArr = [];
    let rightFoodArr = [];
    let topFoodArr = [];
    function generateFoodsSpotsLeft(){
        let ranY = 50;
        for(let i = 0; i < 10; i++){
            let foodX = 130;
            leftFoodArr.push(foodX);
            leftFoodArr.push(ranY);
            ranY+=75;
        }
        return leftFoodArr;
    }
    function generateFoodsSpotsRight(){
        let ranY = 50;
        for(let i = 0; i < 10; i++){
            let foodX = 480;
            rightFoodArr.push(foodX);
            rightFoodArr.push(ranY);
            ranY+=75;
        }
        return rightFoodArr;
    }
    function generateFoodsSpotsTop(){
        let ranX = 50;
        for(let i = 0; i < 10; i++){
            let foodY = 140;
            topFoodArr.push(ranX);
            topFoodArr.push(foodY);
            ranX+=55;
        }
        return topFoodArr;
    }


    //to be ran only on initial load to create the food;
    window.onload = function(){
        generateFoodsSpotsLeft();
        generateFoodsSpotsRight();
        generateFoodsSpotsTop();
    }




    function createFoods(){
        for(let i = 0; i < 25; i++){
            for(let j = 0; j < leftFoodArr.length; j+=2){
                fillC(leftFoodArr[j], leftFoodArr[j+1], 5, "#ffffff");
            }
            for(let j = 0; j < rightFoodArr.length; j+=2){
                fillC(rightFoodArr[j], rightFoodArr[j+1], 5, "#ffffff");
            }
            for(let j = 0; j < topFoodArr.length; j+=2){
                fillC(topFoodArr[j], topFoodArr[j+1], 5, "#ffffff");
            }
        }
    }

    //for movement
    window.addEventListener("keydown", function (e){
       const direction = e.key.replace("Arrow", "");
       pacman.move(direction);
    });

})();