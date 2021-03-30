var canvas = document.getElementById('myCanvas')
ctx = canvas.getContext('2d');

const redCarImg = new Image();
redCarImg.src = "img/red_car.png";
// cho input ảnh bằng canvas
const whiteCarImg = new Image();
whiteCarImg.src = "img/white_car.png";
const blueCarImg = new Image();
blueCarImg.src = "img/blue_car.png";
/// background race
const backgroundImg = new Image();
backgroundImg.src = "img/race.jpg";
// background endgame
const endGameImg = new Image();
endGameImg.src = "img/accident.jpg";


class MainCar {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 100;
        this.down = 3;

    }

    //tọa độ x=x+speed trả về di chuyển bên phải
    moveRight() {
        this.x += this.speed;
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width
            ;
        }
    }

    //tọa độ x=x-speed trả về di chuyển bên trái
    moveLeft() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    //ô tô đối diện xuống
    carDown() {
        this.y += this.down;
    }

    changeCarPosition1() {
        if (this.y > canvas.height + (this.height * 1)) {
            this.y = 0 - this.height;
            this.x = Math.floor(Math.random() * 3) * 100;
        } else {
            this.y += this.down;
        }
    }

    changeCarPosition2() {
        if (this.y > canvas.height + (this.height * 2)) {
            this.y = 0 - this.height * 5;
            this.x = Math.floor(Math.random() * 3) * 100;
        } else {
            this.y += this.down;
        }
    }

    //hàm vẽ ra ô tô
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

const redCar = new MainCar(redCarImg, 100, 120, 100, 30);
const whiteCar = new MainCar(whiteCarImg, 200, 0, 100, 30);
const blueCar = new MainCar(blueCarImg, 0, 0, 100, 30);
// dùng event keycode để gán phím di chuyển cho nhân vật ô tô đỏ (sang phải:39 ; sang trái:37)
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 39) {
        redCar.moveRight();
    } else if (evt.keyCode === 37) {
        redCar.moveLeft();
    }
})
//=========================================================================

let pause = true;
let count = 0;

function checkLose(player, character) {
    let x1, y1, w1, h1, x2, y2, w2, h2;
    x1 = player.x;
    y1 = player.y;
    h1 = player.height;
    w1 = player.width;
    x2 = character.x;
    y2 = character.y;
    h2 = character.height;
    w2 = character.width;
    if (
        ((x1 + w1) > x2 && (x1 + w1) < (x2 + w2 + w1)) && ((y1 + h1) > y2 && (y1 + h1) < (y2 + h2 + h1))
    ) {
        pause = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(endGameImg, 0, 0, canvas.width, canvas.height);


    }
}

function start() {
    if (pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        redCar.draw();
        blueCar.draw();
        blueCar.changeCarPosition1();
        whiteCar.changeCarPosition2();
        whiteCar.draw();
        count++;
        ctx.fillStyle = "white";
        ctx.font = "10px"
        ctx.fillText("Score:" + " " + Math.floor(count / 100), 10, 15);
        checkLose(redCar, blueCar);
        checkLose(redCar, whiteCar);
    }
    requestAnimationFrame(start);
}

start();




