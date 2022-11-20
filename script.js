const gridContainer = document.querySelector('.grid-container');
const gridBtn = document.querySelector('.grid-btn'); 
const errorMessage = document.createElement('p');
const grayBtn = document.querySelector('.gray-btn');
const colorBtn = document.querySelector('.color-btn');
let color = 'rainbow';
let gridSize = 4;

function createGrid(size){
    for(let i = 0;  i < size; i++){
        let squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');
    
        for(let j = 0; j < size; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            squareContainer.appendChild(square);
        }
        
        gridContainer.appendChild(squareContainer);
    }
    
}




function hoverSquares(){
    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.cssText = `background: ${generateColor(square)}`
        })
    })
}

gridBtn.addEventListener('click', () => {
    gridSize = prompt('how many rows would you like the grid to be?', '');
    errorMessage.textContent = '';
    if(gridSize <= 100){
        setUpNewGrid(gridSize)
    }
    else{
        setUpErrorMessage()
    }
    
})
colorBtn.addEventListener('click', ()=>{
    color = 'rainbow';
    setUpNewGrid(gridSize)
    colorBtn.style.cssText = `background: gray`;
    grayBtn.style.cssText = `background: white`;
})
grayBtn.addEventListener('click', ()=>{
    color = 'gray';
    grayBtn.style.cssText = `background: gray`;
    colorBtn.style.cssText = `background: white`;
    setUpNewGrid(gridSize);
})


function setUpNewGrid(size){
    removeChildren(gridContainer);
    createGrid(size);
    hoverSquares();
}

function removeChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function setUpErrorMessage(){
    errorMessage.textContent = 'input out of range. try a number between one and 100.';
    errorMessage.classList.add('error-message');
    document.body.appendChild(errorMessage);
}

function generateColor(square){
    if(color == 'rainbow') return returnRandomColor(square);
    else return returndarkerColor(square);
}

function getRandomNum(range){
    return Math.floor(Math.random() * range);
}

function returnRandomColor(){
    let value1 = getRandomNum(255);
    let value2 = getRandomNum(255);
    let value3 = getRandomNum(255);
    return `rgb(${value1},${value2},${value3})`;
}

function returndarkerColor(square){
    console.log(square);
    let saturation = 90;
    if(square.getAttribute("saturation")){
        saturation = parseInt(square.getAttribute("saturation")) - 10;
    }
    square.setAttribute("saturation", saturation);
    return `hsl(0, 0%, ${saturation}%)`;
}


createGrid(4);
hoverSquares();
