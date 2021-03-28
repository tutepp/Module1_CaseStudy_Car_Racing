
    var canvas = document.getElementById('myCanvas'),
     ctx = canvas.getContext('2d');
    const redCarImg = new Image();
    redCarImg.src = "img/red_car.png";
    // cho input ảnh bằng canvas
    const whiteCarImg = new Image();
    whiteCarImg.src = "img/white_car.png";
    const blueCarImg = new Image();
    blueCarImg.src = "img/blue_car.png";
    /// background race
    const backGroundImg = new Image();
    backGroundImg.src = "img/race.jpg";

    class MainCar {
        constructor(image,x,y,width,height) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.speed = 100;
            this.down = 3;
            this.count = 0;

        }
        //tọa độ x=x+speed trả về di chuyển bên phải
        moveRight(){
            this.x+= this.speed;
            if( this.x+this.width>canvas.width){
                this.x=canvas.width-this.width
                ;
            }
        }
        //tọa độ x=x-speed trả về di chuyển bên trái
        moveLeft() {
            this.x -= this.speed;
            if( this.x<0){
                this.x=0;
            }
        }
        //ô tô đối diện xuống
        carDown(){
            this.y += this.down;
        }
        changeCarPosition1(){
            if (this.y > canvas.height + (this.height * 1)) {
                this.y = 0 - this.height;
                this.x = Math.floor(Math.random()*3)*100;
            } else {
                this.y += this.down;
            }
        }
        changeCarPosition2(){
            if (this.y > canvas.height + (this.height * 2)) {
                this.y = 0 - this.height * 5;
                this.x = Math.floor(Math.random()*3)*100;
                this.count ++; //điểm số
            } else {
                this.y += this.down;
            }
        }
        //hàm vẽ ra ô tô
        draw(){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    }
    const redCar = new MainCar(redCarImg,100,120,100,30);
    const whiteCar = new MainCar(whiteCarImg,200,0,100,30);
    const blueCar = new MainCar(blueCarImg,0,0,100,30);
// dùng event keycode để gán phím di chuyển cho nhân vật ô tô đỏ (sang phải:39 ; sang trái:37)
    document.addEventListener('keydown',function (evt) {
        if (evt.keyCode === 39) {
            redCar.moveRight();
            redCar.draw();
        } else if (evt.keyCode === 37) {
            redCar.moveLeft();
            redCar.draw();
        }
    })
//yêu cầu trình duyệt thực hiện một animation và chạy function star cho xe di chuyển
            //function chạy lệnh

function start(){


    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(backGroundImg,0,0,canvas.width,canvas.height);

    redCar.draw();
    blueCar.draw();
    blueCar.changeCarPosition1();
    whiteCar.changeCarPosition2();
    whiteCar.draw();
    if (redCar.x + redCar.width >= blueCar.x && redCar.x <= blueCar.x + blueCar.width
        && redCar.y <= blueCar.y + blueCar.height && redCar.x + redCar.width +blueCar.x + blueCar.width <300 ) {
        alert('game over')
        return false;

    }

    requestAnimationFrame(start);
}
start();




