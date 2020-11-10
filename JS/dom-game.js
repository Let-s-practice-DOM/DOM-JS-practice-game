(function (){
    const canvas = document.getElementById("pacMan");
    const context = canvas.getContext("2d");

    const size = 25;

    let pacman = {
        x: 50,
        y: 50,
        move: function (direction){
            switch (direction){
                case "Up":
                    if(this.y < 0) {
                        this.y = canvas.height;
                    } else {this.y -=10;}
                    break;
                case "Down":
                    if(this.y > canvas.height) {
                        this.y = 0;
                    } else { this.y += 10;}
                    break;
                case "Left":
                    if(this.x < 0) {
                       this.x = canvas.width;
                    }else {this.x -= 10;}
                    break;
                case "Right":
                    if(this.x > canvas.width){
                        this.x= 0;
                    } else {this.x += 10;}
                    break;
            }
        }
    }
    var ghost1 = {
        x: 100,
        y: 100,
    }

    setInterval(load, 50);
    function load (){
        draw()
    }
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