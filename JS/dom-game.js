(function (){
    const canvas = document.getElementById("pacMan");
    const context = canvas.getContext("2d");

    let direction;

    let foodCount = document.getElementById("foodCount");
    let count = 0;
    let livesLeftCounter=3;

    let ranNum1 = 0;
    let ranNum2 = 0;
    let ranNum3 = 0;
    let ranNum4 = 0;


    const size = 25;
    const eyes = 5;
    const moveSpeed = 10;
    const pacman = {
        x: 25,
        y: 20,
        r: 18,
        move: function (direction){
            if(allowMovements(this.x, this.y)){
                switch (direction) {
                    case "Up":
                        if (this.y < 0) {
                            this.y = canvas.height;
                        } else {
                            this.y -= moveSpeed;
                        }
                        break;
                    case "Down":
                        if (this.y > canvas.height) {
                            this.y = 0;
                        } else {
                            this.y += moveSpeed;
                        }
                        break;
                    case "Left":
                        if (this.x < 0) {
                            this.x = canvas.width;
                        } else {
                            this.x -= moveSpeed;
                        }
                        break;
                    case "Right":
                        if (this.x > canvas.width) {
                            this.x = 0;
                        } else {
                            this.x += moveSpeed;
                        }
                        break;
                }
            }
        }
    }
    const ghost1 = {
        x: 320,
        y: 410,
        c: "#d42c2c",
        travel: function () {
            //========EVERY TIME THEY HIT A WALL PULL A NEW RANDOM NUMBER????
            // let ranNum = ~~(Math.random()*4);
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
            if(ranNum1 === 0){
                this.y -= moveSpeed;
            } else if(ranNum1 === 1){
                this.x += moveSpeed;
            } else if(ranNum1 === 2){
                this.y += moveSpeed;
            } else {
                this.x -= moveSpeed;
            }
        }
    }
    const ghost2 = {
        x: 270,
        y: 370,
        c: "#9829cf",
        travel: function () {
            //========EVERY TIME THEY HIT A WALL PULL A NEW RANDOM NUMBER????
            // let ranNum = ~~(Math.random()*4);
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
            if(ranNum2 === 0){
                this.y -= moveSpeed;
            } else if(ranNum2 === 1){
                this.x += moveSpeed;
            } else if(ranNum2 === 2){
                this.y += moveSpeed;
            } else {
                this.x -= moveSpeed;
            }
        }
    }
    const ghost3 = {
        x: 320,
        y: 370,
        c: "#e6510a",
        travel: function () {
            //========EVERY TIME THEY HIT A WALL PULL A NEW RANDOM NUMBER????
            // let ranNum = ~~(Math.random()*4);
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
            if(ranNum3 === 0){
                this.y -= moveSpeed;
            } else if(ranNum3 === 1){
                this.x += moveSpeed;
            } else if(ranNum3 === 2){
                this.y += moveSpeed;
            } else {
                this.x -= moveSpeed;
            }
        }
    }
    const ghost4 = {
        x: 280,
        y: 410,
        c: "#73d228",
        travel: function () {
            //========EVERY TIME THEY HIT A WALL PULL A NEW RANDOM NUMBER????
            // let ranNum = ~~(Math.random()*4);
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
            if(ranNum4 === 0){
                this.y -= moveSpeed;
            } else if(ranNum4 === 1){
                this.x += moveSpeed;
            } else if(ranNum4 === 2){
                this.y += moveSpeed;
            } else {
                this.x -= moveSpeed;
            }
        }
    }




    //===========WHAT I WAS THINKING FOR THE MOVE LOGIC AROUND WALLS FOR NOW===============//
    function allowMovements(x, y){
        let noWall = false;
        if(x >= 0 && x <= 20 && y <= 270){
            noWall = true;
        }
        if(x >= 110 && x <= 120 && y <= 660){
            noWall = true;
        }
        if(x <= 120 && y <= 20){
            noWall = true;
        }
        if(y >= 120 && y <= 130){
            noWall = true;
        }





        //added temporarily until logic is figured out
        noWall = true;
        //=========//
        return noWall;
    }



    // written in a way to allow any of the other ghost positions to be passed through for contact checking
    function contact(pacManX, pacManY, ghostX, ghostY, ghostSize, pacManRadius){
        if((pacManX + pacManRadius > ghostX && pacManX < ghostX + ghostSize) &&(pacManY + pacManRadius > ghostY && pacManY < ghostY + ghostSize)){
            return true;
        }
    }

    //========CONTACT IS A LITTLE BUGGY, NEEDS SOME WORK========//
    // function contact(pacManX, pacManY, ghostX, ghostY, ghostSize, pacManRadius){
    //     if((ghostX < pacManX + pacManRadius && ghostX + ghostSize > pacManX + pacManRadius) && (ghostY < pacManY + pacManRadius && ghostY + ghostSize > pacManY - pacManRadius)){
    //         return true;
    //     }
    // }

    function pickNum (){
        ranNum1 = ~~(Math.random() * 4);
        ranNum2 = ~~(Math.random() * 4);
        ranNum3 = ~~(Math.random() * 4);
        ranNum4 = ~~(Math.random() * 4);
    }

    setInterval(pickNum, 2000);
    // tracking ran at a different interval to keep the ghost movements to a relatively slower speed
    setInterval(tracking, 350);
    function tracking(){
        ghost1.travel();
        ghost2.travel();
        ghost3.travel();
        ghost4.travel();
        if(contact(pacman.x, pacman.y, ghost1.x, ghost1.y, size, pacman.r)){
            ghost1.x = 320;
            ghost1.y = 410;
            livesLeftCounter -= 1;
        }
        if(contact(pacman.x, pacman.y, ghost2.x, ghost2.y, size, pacman.r)){
            ghost2.x = 270;
            ghost2.y = 370;
            livesLeftCounter -= 1;
        }
        if(contact(pacman.x, pacman.y, ghost3.x, ghost3.y, size, pacman.r)){
            ghost3.x = 320;
            ghost3.y = 370;
            livesLeftCounter -= 1;
        }
        if(contact(pacman.x, pacman.y, ghost4.x, ghost4.y, size, pacman.r)){
            ghost4.x = 280;
            ghost4.y = 410;
            livesLeftCounter -= 1;
        }
    }

    // to be ran over and over
    setInterval(load, 100);
    function load (){
        draw();
        createFoods();
        livesLeft();
        eatFoods(pacman.x, pacman.y, pacman.r, allFoods);
    }

    //=======for debugging and help with adding features==========//
    function logPositions(){
        console.log(`pacman X pos: ${pacman.x}`);
        console.log(`pacman Y pos: ${pacman.y}`);
    }
    // setInterval(logPositions, 1000);



    //=====create pacman, canvas, walls, and ghosts
    function draw(){
        fill(0,0, canvas.width, canvas.height, "black"); //This is for canvas


        // top row 1st square
        fill(45, 45, 55, 2,"#093593")
        fill(45, 118, 55, 2,"#093593")
        fill(45, 45, 2, 75,"#093593")
        fill(100,45,2,75, "#093593")
        // top row 1st square inner
        fill(52, 50, 43, 8,"#093593")
        fill(52, 105, 43, 8,"#093593")
        fill(52, 50, 8, 62,"#093593")
        fill(88,50,8,62, "#093593")

        // Top row - second object - short vertical line
        fill(145, 0, 2, 84,"#093593")
        fill(150, 0, 8, 80,"#093593")
        fill(161, 0, 2, 84,"#093593")
        fill(145, 82, 18, 2,"#093593")

        // top row second object - middle rectangle - outer thin layer
        fill(200, 45, 200, 2,"#093593")
        fill(200, 118, 200, 2,"#093593")
        fill(200, 45, 2, 75,"#093593")
        fill(400, 45, 2, 75,"#093593")
        // top row second object - middle rectangle - inner thick layer
        fill(207, 50, 189, 8,"#093593")
        fill(207, 105, 189, 8,"#093593")
        fill(207, 50, 8, 62,"#093593")
        fill(389, 50, 8, 62,"#093593")

        // Top row - fourth object - short vertical line
        fill(450, 0, 8, 80,"#093593")
        fill(445, 0, 2, 84,"#093593")
        fill(461, 0, 2, 84,"#093593")
        fill(445, 82, 18, 2,"#093593")
        // // top row fifth object fourth square - outer

        fill(503, 45, 55, 2,"#093593")
        fill(503, 118, 55, 2,"#093593")
        fill(558, 45, 2, 75,"#093593")
        fill(503,45,2,75, "#093593")
        // // top row fifth object fourth square - inner thick
        fill(510, 50, 43, 8,"#093593")
        fill(510, 105, 43, 8,"#093593")
        fill(545, 50, 8, 62,"#093593")
        fill(510,50,8,62, "#093593")



        // second row first object - small square on left
        fill(45, 160, 65, 10,"#093593")
        fill(45, 245, 65, 10,"#093593")
        fill(45, 160, 10, 95,"#093593")
        fill(100,160,10,95, "#093593")
        // second row second object - vertical rectangle
        fill(150,160,50,10, "#093593")
        fill(150,350,50,10, "#093593")
        fill(150,160,10,190, "#093593")
        fill(200,160,10,200, "#093593")
        // second row third object - middle T
        fill(250, 160, 110, 10,"#093593")
        fill(250, 210, 110, 10,"#093593")
        fill(250, 160, 10, 50,"#093593")
        fill(350,160,10,60, "#093593")
        fill(280,210,10,75, "#093593")
        fill(320,210,10,75, "#093593")
        fill(280,280,50,10, "#093593")
        // second row fourth object - vertical rectangle
        fill(400,160,50,10, "#093593")
        fill(400,350,50,10, "#093593")
        fill(400,160,10,190, "#093593")
        fill(450,160,10,200, "#093593")
        // second row fifth object - small square on right
        fill(500, 160, 55, 10,"#093593")
        fill(500, 245, 55, 10,"#093593")
        fill(500, 160, 10, 95,"#093593")
        fill(555,160,10,95, "#093593")

        // third row - first object -left entrance
        fill(0,300,100,10, "#093593")
        fill(0,350,100,10, "#093593")
        fill(100,300,10,60, "#093593")
        fill(0,475,100,10, "#093593")
        fill(0,425,100,10, "#093593")
        fill(100,425,10,60, "#093593")


        // third row - center rectangle

        fill(250,350,110,10, "#093593")
        fill(250,450,110,10, "#093593")
        fill(250,350,10,100, "#093593")
        fill(350,350,10,110, "#093593")
        fill(275,350,60,10, "#FFFFFF")

        // third row - third object - right exit
        fill(500,300,100,10, "#093593")
        fill(500,350,100,10, "#093593")
        fill(500,300,10,60, "#093593")
        fill(500,475,100,10, "#093593")
        fill(500,425,100,10, "#093593")
        fill(500,425,10,60, "#093593")


        // fourth row - first object -left square
        fill(50, 535, 50, 10,"#093593")
        fill(50, 535, 10, 95,"#093593")
        fill(100, 535, 10, 95,"#093593")
        fill(50,625,60,10, "#093593")
        // fourth row - second object - left vertical rectangle
        fill(150, 425, 50, 10,"#093593")
        fill(150, 425, 10, 150,"#093593")
        fill(200, 425, 10, 150,"#093593")
        fill(150,575,60,10, "#093593")
        // fourth row - third object -lower middle t
        fill(250, 500, 110, 10,"#093593")
        fill(250, 550, 110, 10,"#093593")
        fill(250, 500, 10, 50,"#093593")
        fill(350,500,10,60, "#093593")
        fill(280,550,10,75, "#093593")
        fill(320,550,10,75, "#093593")
        fill(280,625,50,10, "#093593")
        // fourth row fourth object - vertical rectangle right side
        fill(400, 425, 50, 10,"#093593")
        fill(400, 425, 10, 150,"#093593")
        fill(450, 425, 10, 150,"#093593")
        fill(400,575,60,10, "#093593")
        // fourth row fifth object small vertical rectangle rightside
        fill(500, 535, 60, 10,"#093593")
        fill(500, 535, 10, 95,"#093593")
        fill(550, 535, 10, 95,"#093593")
        fill(500,625,60,10, "#093593")


        // bottom row - first object - left L
        fill(50, 685, 155, 10,"#093593")
        fill(50, 735, 155, 10,"#093593")
        fill(50, 685, 10, 60,"#093593")
        fill(200,685,10,60, "#093593")
        fill(200,625,10,60, "#093593")
        fill(150,625,10,60, "#093593")
        fill(150,625,60,10, "#093593")

        // bottom row - second object - middle rectangle
        hollowFill(280, 695, 50, 50, "#093593");
        // fill(275, 685, 50, 10,"#093593")
        // fill(275, 735, 50, 10,"#093593")
        // fill(275, 685, 10, 50,"#093593")
        // fill(325,685,10,60, "#093593")
        // bottom row - third object - right L
        hollowFill(400, 695, 155, 50, "#093593");
        hollowFill(400, 635, 50, 60, "#093593");
        // fill(400, 685, 155, 10,"#093593")
        // fill(400, 735, 155, 10,"#093593")
        // fill(550, 685, 10, 60,"#093593")
        // fill(400,685,10,60, "#093593")
        // fill(400,625,10,60, "#093593")
        // fill(450,625,10,60, "#093593")
        // fill(400,625,60,10, "#093593")





        fillC(pacman.x, pacman.y, pacman.r, "yellow");
        context.font="20px Arial";
        context.fillText(`Lives left: ${livesLeftCounter}`,480,20)
        if(direction === "Right") {
            fillC(pacman.x + pacman.r / 3, pacman.y - pacman.r / 3, 1.5, "#000000");
        } else if (direction === "Up" || direction === "Left"){
            fillC(pacman.x - pacman.r / 3, pacman.y - pacman.r / 3, 1.5, "#000000");
        } else if(direction === "Down"){
            fillC(pacman.x + pacman.r / 3, pacman.y + pacman.r / 3, 1.5, "#000000");
        }
        fill(ghost1.x, ghost1.y, size, size, ghost1.c);
        fill(ghost1.x + size/4.25, ghost1.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost1.x + size/1.5, ghost1.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost2.x, ghost2.y, size, size, ghost2.c);
        fill(ghost2.x + size/4.25, ghost2.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost2.x + size/1.5, ghost2.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost3.x, ghost3.y, size, size, ghost3.c);
        fill(ghost3.x + size/4.25, ghost3.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost3.x + size/1.5, ghost3.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost4.x, ghost4.y, size, size, ghost4.c);
        fill(ghost4.x + size/4.25, ghost4.y + size/4, eyes, eyes, "#ffffff");
        fill(ghost4.x + size/1.5, ghost4.y + size/4, eyes, eyes, "#ffffff");

















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
    function hollowFill(x, y, w, h, c){
        context.strokeStyle = c;
        context.lineWidth = 8;
        context.strokeRect(x, y, w, h);
    }

    //=======================//


    //for movement
    window.addEventListener("keydown", function (e){
        if(e.key.includes("Arrow")){
            e.preventDefault();
        }
        direction = e.key.replace("Arrow", "");
        pacman.move(direction);
    });





    let leftFoodArr = [];
    let rightFoodArr = [];
    let topFoodArr = [];
    let bottomFoodArr = [];
    let topLFoodArr = [];
    let topRFoodArr = [];
    let bottomLFoodArr = [];
    let bottomRFoodArr = [];
    let middleLFA = [];
    let middleRFA = [];
    let topMFA = [];
    let allFoods = [];
    function tMF(){
        let x = 180;
        let y = 20;
        for(let i = 0; i < 5; i++){
            topMFA.push(x);
            topMFA.push(y);
            allFoods.push(x);
            allFoods.push(y);
            x+=60;
        }
        return topMFA;
    }
    function mLF(){
        let x = 225;
        let y = 180;
        for(let i = 0; i < 9; i++){
            middleLFA.push(x);
            middleLFA.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return middleLFA;
    }
    function mRF(){
        let x = 380;
        let y = 180;
        for(let i = 0; i < 9; i++){
            middleRFA.push(x);
            middleRFA.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return middleRFA;
    }
    function bLFood(){
        let x = 20;
        let y = 510;
        for(let i = 0; i < 4; i++){
            bottomLFoodArr.push(x);
            bottomLFoodArr.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return bottomLFoodArr;
    }
    function bRFood(){
        let x = 580;
        let y = 510;
        for(let i = 0; i < 4; i++){
            bottomRFoodArr.push(x);
            bottomRFoodArr.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return bottomRFoodArr;
    }
    function topLeftFood(){
        let x = 20;
        let y = 25;
        for(let i = 0; i < 4; i++){
            topLFoodArr.push(x);
            topLFoodArr.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return topLFoodArr;
    }
    function topRightFood(){
        let x = 580;
        let y = 25;
        for(let i = 0; i < 4; i++){
            topRFoodArr.push(x);
            topRFoodArr.push(y);
            allFoods.push(x);
            allFoods.push(y);
            y+=70;
        }
        return topRFoodArr;
    }
    function generateFoodsSpotsLeft(){
        let ranY = 20;
        let foodX = 130;
        for(let i = 0; i < 10; i++){
            leftFoodArr.push(foodX);
            leftFoodArr.push(ranY);
            allFoods.push(foodX);
            allFoods.push(ranY);
            ranY+=70;
        }
        return leftFoodArr;
    }
    function generateFoodsSpotsRight(){
        let ranY = 20;
        for(let i = 0; i < 10; i++){
            let foodX = 480;
            rightFoodArr.push(foodX);
            rightFoodArr.push(ranY);
            allFoods.push(foodX);
            allFoods.push(ranY);
            ranY+=70;
        }
        return rightFoodArr;
    }
    function generateFoodsSpotsTop(){
        let ranX = 50;
        for(let i = 0; i < 10; i++){
            let foodY = 140;
            topFoodArr.push(ranX);
            topFoodArr.push(foodY);
            allFoods.push(ranX);
            allFoods.push(foodY);
            ranX+=55;
        }
        return topFoodArr;
    }

    function generateFoodsSpotBottom(){
        let ranX = 50;
        for(let i = 0; i < 10; i++){
            let foodY = 770;
            topFoodArr.push(ranX);
            topFoodArr.push(foodY);
            allFoods.push(ranX);
            allFoods.push(foodY);
            ranX+=55;
        }
        return bottomFoodArr;
    }


    function eatFoods(px, py, s, arr){
        for(let i = 0; i < arr.length; i+=2){
            let x = arr[i];
            let y = arr[i + 1];
            if((px + s > x && px - s < x) && (py + s > y && py - s < y)){
                arr.splice(arr.indexOf(i), 1);
                arr.splice(arr.indexOf(i+1), 1);
                count++;
            }
        }
        foodCount.innerText = count;
    }



    //to be ran only on initial load to create the food;
    window.onload = function(){
        generateFoodsSpotsLeft();
        generateFoodsSpotsRight();
        generateFoodsSpotsTop();
        generateFoodsSpotBottom();
        topLeftFood();
        topRightFood();
        bRFood();
        bLFood();
        mRF();
        mLF();
        tMF();
    }


    function createFoods(){
        for(let i = 0; i < allFoods.length; i+=2){
            fillC(allFoods[i], allFoods[i+1], 4, "#ffffff");
        }
    }




//----------------------------//----------------------------//----------------------------//----------------------------

//function for lives---PENDING
    //MOVED INTO TRACKING CONTACT FUNCTION

    function livesLeft() {
            if (contact()) {
                livesLeftCounter -= 1;
            }
        }







})();