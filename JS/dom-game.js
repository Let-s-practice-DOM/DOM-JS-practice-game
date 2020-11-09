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
        fill(200, 10, 10, canvas.height/2,"#093593")
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