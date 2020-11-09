(function (){
    const canvas = document.getElementById("pacMan");
    const context = canvas.getContext("2d");

    let pacMan = {
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

    window.addEventListener("keydown", function (e){
       const direction = e.key.replace("Arrow", "");
       pacMan.move(direction);

    });




})();