(function (){
    const canvas = document.getElementById("pacMan");
    const context = canvas.getContext("2d");

    let pacman = {
        x: 50,
        y: 50,
        move: function (direction){
            switch (direction){
                case "Up":
                    this.y -= 10;
                    break;
                case "Down":
                    this.y += 10;
                    break;
                case "Left":
                    this.x -= 10;
                    break;
                case "Right":
                    this.x += 10;
                    break;
            }
        }
    }
    setInterval(load, 50);
    function load (){
        draw()
    }
    function draw(){
        fill(0,0, canvas.width, canvas.height, "black"); //This is for canvas
        fill(pacman.x, pacman.y, 25, 25, "yellow");//this is for the pacman
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