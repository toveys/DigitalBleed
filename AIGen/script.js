let load = true;
let found = false;
var imgold = new Image();
imgold.src = "./image/load.jpg";

class Cell{
    constructor(noun, amount){
        this.noun=noun;
        this.amount=amount;
    }
}
iIndex = new Array();
const Cells = [];
window.onload = function() {
    fetch('./index.txt')
    .then(response => response.text())
    .then(textString => {
        iIndex = textString.split(/\r?\n|,/);
        for (i=0; i<iIndex.length; i+=2){
            var cell = new Cell(iIndex[i], iIndex[i+1]);
            Cells.push(cell);
        }
        console.log(Cells)
        // /\r?\n/
    });
};

function Print(){
    var text = document.getElementById("prompt").value;
    const textArray = text.split(" ");
    shuffle(textArray)
    var img = new Image();
    
    for (i=0; i<textArray.length; i++){
        for(j=0; j<Cells.length; j++){
            if(textArray[i]==Cells[j].noun && Cells[j].amount!=0){
                do{
                    var y = Math.floor(Math.random()*Cells[j].amount)+1;
                    img.src = "./image/"+Cells[j].noun+y+".jpg";
                }while(imgold.src == img.src);
                found = true;
                console.log(Cells[j].noun)
                i=textArray.length+1;
            }
            else if(Cells[j] == Cells[Cells.length-1] && found == false){
                for (i=0; i<Cells.length; i++){
                    var o = Math.floor(Math.random()*Cells.length);
                    var y = Math.floor(Math.random()*Cells[o].amount)+1;
                    console.log(Cells[o].amount)
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
    img.classList.add("picture");
    var image = document.getElementsByClassName("picture-box")[0];
    if(load == false){
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

    else{
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
