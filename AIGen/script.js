let load = true;
let found = false;
var imgold = new Image();
imgold.src = "./image/load.jpg";
let count = 0;

class Cell{
    constructor(noun, amount){
        this.noun=noun;
        this.amount=amount;
    }
}
iIndex = new Array();
const Cells = [];

//onload function
window.onload = function() {
    fetch('./index.txt')
    .then(response => response.text())
    .then(textString => {
        iIndex = textString.split(/\r?\n|,/);
        for (i=0; i<iIndex.length; i+=2){
            let cell = new Cell(iIndex[i], iIndex[i+1]);
            Cells.push(cell);
        }
        // /\r?\n/
    });
};

//Run on Button Press
function Press(){

    document.body.style.cursor = "wait";
    let button = document.getElementById("button");
    button.style.cursor = 'wait';
    button.disabled=true;
    setTimeout(function activate(){

        if (count == 1){
            document.documentElement.style.setProperty("--col-04", "rgb(0,0,0)");
            let prompt = document.getElementById("prompt-container");
            prompt.style.setProperty("top", "85%");
            console.log(prompt.style.top)
        }

        Print();

        if (count > 3){
            Color("--col-01");
            Color("--col-02");
            Color("--col-03");
            Color("--col-04");
            Color("--col-05");
        }

        if (count > 7){
            Alter("picture-box")
            CreateCanvas();
        }
        document.body.style.cursor = "default";
        button.style.cursor = 'pointer';
        button.disabled=false;

    }, 500);

    count ++;
    console.log(count);
}


function Print(){
    let text = document.getElementById("prompt").value;
    const textArray = text.split(" ");
    shuffle(textArray)
    let img = new Image();
    
    for (i=0; i<textArray.length; i++){
        for(j=0; j<Cells.length; j++){
            if(textArray[i]==Cells[j].noun && Cells[j].amount!=0){
                do{
                    var y = Math.floor(Math.random()*Cells[j].amount)+1;
                    img.src = "./image/"+Cells[j].noun+y+".jpg";
                }while(imgold.src == img.src);
                found = true;
                //console.log(Cells[j].noun)
                i=textArray.length+1;
            }
            else if(Cells[j] == Cells[Cells.length-1] && found == false){
                for (i=0; i<Cells.length; i++){
                    var o = Math.floor(Math.random()*Cells.length);
                    var y = Math.floor(Math.random()*Cells[o].amount)+1;
                    //console.log(Cells[o].amount)
                    if(Cells[o].amount!=0){
                        img.src = "./image/"+Cells[o].noun+y+".jpg";
                        break
                    }
                    else{
                    }
                } 
            }
            else{}
        }
    }
    found = false;
    img.id = "picture";
    let image = document.getElementById("picture-box");

    //If I press the button then run this code
    if (count >= 5){
        img.onerror = function() {
            // any logic in case of error
            alert("Please type something else");
            return;
        }
        img.onload = function() {
            document.body.appendChild(img);
            img.style.height= (Math.random()*250) + 100 +"px";
            img.style.width= img.style.height;
            img.style.top = Math.ceil(Math.random() * (window.innerHeight-img.height)) + "px";
            img.style.left = Math.ceil(Math.random() * (window.innerWidth-img.width)) +"px";
            imgold=img; 
        }
        load = false;
    }

    else if(load == false){
        img.onerror = function() {
            // any logic in case of error
            alert("Please type something else");
            return;
        }
        img.onload = function() {
            image.replaceChild(img, imgold);
            imgold=img;
        }
    }

    else {
        img.onerror = function() {
            // any logic in case of error
            alert("Please type something else");
            return;
        }
        img.onload = function() {
            image.appendChild(img);
            img.height=400;
            imgold=img; 
        }
        load = false;
    }
}

//shuffles the prompt words
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

//run to change the color of any property 
function Color(property){

    var rand = Math.round(Math.random()* 99)+1;
    if (rand <= 60){
        
    }
    else if (rand <= 90 && rand >= 60){
        document.documentElement.style.setProperty(property, "rgb"+getRandomColor());
    }
    else{
        function changeColor(){
            document.documentElement.style.setProperty(property, "rgb"+getRandomColor());
        }setInterval(changeColor, 500);
    }
}

//random color function
function getRandomColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    randomColor = "("+r+","+g+","+b+")";
    return randomColor;
}

//randomly change the picture box position
function Alter(element){
    let div = document.getElementById(element);
    div.style.top = Math.ceil(Math.random() * (window.innerHeight-375)) + "px";
    div.style.left = Math.ceil(Math.random() * (window.innerWidth-375)) + "px";
}

//create canvas
function CreateCanvas(){
    //create canvas
    let canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
     //random canvas size
    canvas.height = Math.round(Math.random()*300 + 100);
    canvas.width = canvas.height;

    canvas.style.zIndex = 2;
    canvas.style.position = "absolute";
    canvas.style.top = Math.random()*(window.innerHeight -canvas.height) +"px";
    canvas.style.left = Math.random()*(window.innerWidth - canvas.width) +"px";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    //ctx
    let ctx = canvas.getContext("2d");

    const myImage = new Image();
    for (i=0; i<Cells.length; i++){
            var o = Math.floor(Math.random()*Cells.length);
            var y = Math.floor(Math.random()*Cells[o].amount)+1;
            console.log(Cells[o].amount)
        if(Cells[o].amount!=0){
            myImage.src = "./image/"+Cells[o].noun+y+".jpg";
            break
        }
        else{
        }
    } 

    //GENERATE RDM to choose canvas drawing//
    let rdm = Math.random() * 10;


    // Setting up a function with the code to run after the image is loaded
    myImage.onload = () => {
        // Once the image is loaded, we will get the width & height of the image
        // get the scale
        // it is the min of the 2 ratios
        let scaleFactor = Math.max(canvas.width / myImage.width, canvas.height / myImage.height);
        
        // Finding the new width and height based on the scale factor
        let newWidth = myImage.width * scaleFactor;
        let newHeight = myImage.height * scaleFactor;
        
        // get the top left position of the image
        // in order to center the image within the canvas
        let x = (canvas.width / 2) - (newWidth / 2);
        let y = (canvas.height / 2) - (newHeight / 2);
        
        // When drawing the image, we have to scale down the image
        // width and height in order to fit within the canvas
        ctx.drawImage(myImage, x, y, newWidth, newHeight);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0,0,canvas.width, canvas.height);

        let particlesArray = [];
        const numberOfParticles = Math.round(canvas.height/100) * 375;

        let mappedImage = [];

        for (let y = 0; y < canvas.height; y++){
            let row = [];

            for (let x = 0; x < canvas.width; x++){
                const red = pixels.data[(y*4*pixels.width) + (x*4)];
                const green = pixels.data[(y*4*pixels.width) + (x*4+1)];
                const blue = pixels.data[(y*4*pixels.width) + (x*4+2)];
                const brightness = calculateRelativeBrightness(red, green, blue);
                const cell = [
                    cellBrightness = brightness,
                    cellColor = 'rgb('+red+','+green+','+blue+')'
                ]
                row.push(cell);
            }
            mappedImage.push(row);
        }

        //calculates how our eyes perceive the brightness of the pixel
        function calculateRelativeBrightness(red, green, blue){
            return Math.sqrt(
                (red*red) * .299 + 
                (green*green) * .587 +
                (blue*blue) * .114
            )/100;
        }

        class Particle{
            constructor(){
                this.x = Math.random()*canvas.width;
                this.y = 0;
                this.speed = 0;
                this.velocity = Math.random() * 0.5;
                this.size = Math.random() * 1.5 +1;
                this.position1 = Math.floor(this.y);
                this.position2 = Math.floor(this.x);
                this.angle=0;
            }
            //Update particle method for motion and color
            update(){
                this.position1 = Math.floor(this.y);
                this.position2 = Math.floor(this.x);
                if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                    this.speed = mappedImage[this.position1][this.position2][0];
                }
                let movement = (2.5 - this.speed) + this.velocity;
                this.angle += this.speed/20;
                this.size=this.speed * 3.5;

                //RDM MOVEMENT STATEMENTS
                if (rdm > 8){
                    this.y += movement;
                    this.x +=movement;
                }
                else if (rdm > 6){
                    this.y += movement;
                }

                //RESET MOVEMENT WHEN OUT OF FRAME
                if(this.y >= canvas.height){
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
                if(this.x >= canvas.width){
                    this.x = 0;
                    this.y = Math.random() * canvas.width;
                }
            }
            draw(){
                ctx.beginPath();

                //color assignments
                if (rdm > 8){
                    if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                        ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
                    }
                }

                else if (rdm > 6){
                    if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                        ctx.strokeStyle = "green";
                    }
                }

                ctx.strokeRect(this.x, this.y, this.size, this.size);
                ctx.fill();
            }
        }
        function init(){
            for(let i = 0; i < numberOfParticles; i++){
                particlesArray.push(new Particle)
            }
        }
        init();

        function animate(){
            ctx.globalAlpha = 0.05;
            //background alpha color, every frame draws over, clear out canvas
            if (rdm > 8){
                ctx.fillStyle = 'rgba(0,50,0,.5)';
            }

            else if (rdm > 6){
                ctx.fillStyle = 'rgba(0,0,0,.5)';
            }
            ctx.fillRect(0,0,canvas.width,canvas.height);
            for(let i = 0; i < particlesArray.length; i++){
                particlesArray[i].update();
                ctx.globalAlpha = particlesArray[i].speed * 0.5;
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();
    };
}