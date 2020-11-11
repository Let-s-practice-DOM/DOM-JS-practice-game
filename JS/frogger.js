(function (){
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");

    window.addEventListener("keydown", function (evt){
        const direction = evt.key.replace("Arrow", "");
        frog.move(direction);
    });

    const frog = {
        x: 375,
        y: 750,
        w: 50,
        moveSpeed: 50,
        move: function (direction){
            if(direction === "Up"){
                this.y -= this.moveSpeed;
            }
        }
    }

    setInterval(load, 100);
    function load(){
        draw();
    }
    function draw(){
        fill(0, 0, canvas.width, canvas.height, "#1d1c1c");
        fill(0, 400, canvas.width, 100, "blue");
        fill(0, 425, 100, 50, "brown")
        fill(frog.x, frog.y, frog.w, frog.w, "#278625");
    }
    function fill(leftX, topY, w, h, c){
        context.fillStyle = c;
        context.fillRect(leftX, topY, w, h);
    }


})();