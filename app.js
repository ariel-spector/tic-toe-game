let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let playvscomputer = document.querySelector('#playvscomputer');
let turnIndicator = document.querySelector('#turn-indicator');


let turn0 = true;
let isVsComputer = false;




let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function disableBoxes() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function checkWinner() {
    winCombos.forEach((combo) => {
        let [a, b, c] = combo;

        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val1 === val3) {
            showWinner(val1);
            return;
        }
    });
    let isTie = Array.from(boxes).every(box => box.innerText !== "");
    if (isTie) {
        showTie();
    }
}



function showTie() {
    msg.innerText = "It's a tie";
    msgContainer.classList.remove('hide');
    disableBoxes();
}

function showWinner(winner) {
    msg.innerText = `Congratulations!     ${winner} wins`;
    msgContainer.classList.remove('hide');
}
const computerMove = () => {
    const strategies = [
        
    ()=>{
    for (let [a, b, c] of winCombos) {
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        if (values.filter(val => val === "X").length === 2 && values.includes("")) {
            let winIndex = [a, b, c].find(index => boxes[index].innerText === "");
            boxes[winIndex].innerText = "X";
            boxes[winIndex].disabled = true;
            turn0 = true;
            checkWinner();
            return true;
        }
        }
    return false;
    },
    
    ()=>{
        for (let [a, b, c] of winCombos) {
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        if (values.filter(val => val === "O").length === 2 && values.includes("")) {
            let blockIndex = [a, b, c].find(index => boxes[index].innerText === "");
            boxes[blockIndex].innerText = "X";
            boxes[blockIndex].disabled = true;
            turn0 = true;
            checkWinner();
            return true;
        }
    }
    return false;
},
 ()=>{
    if (boxes[4].innerText === "") {
        boxes[4].innerText = "X";
        boxes[4].disabled = true;
        turn0 = true;
        checkWinner();
        return true;
    }
    return false;

    },
    ()=>{

    let corners = [0, 2, 6, 8];
    let availableCorners = corners.filter(corner => boxes[corner].innerText === "");
    if (availableCorners.length > 0) {
        let randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        boxes[randomCorner].innerText = "X";
        boxes[randomCorner].disabled = true;
        turn0 = true;
        checkWinner();
        return true;
        }
        return false;
    },
    ()=>{
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = "X";
        randomBox.disabled = true;
        turn0 = true;
        checkWinner();
        return true;
    }
    return false;
}
    ];
    const shuffledStrategies = strategies.sort(() => Math.random() - 0.5);
    for (let strategy of shuffledStrategies) {
        if (strategy()) {
            return;
        }
    }
};


function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add('hide');
    turn0 = true;
    turnIndicator.innerText = "Player O's turn";

    if (isVsComputer && !turn0) {
        setTimeout(() => {
            computerMove();
            turnIndicator.innerText = "Player O's turn";
        }, 500);
    }
}

function handlePlayerTurn(box) {
    if (box.innerText !== "") {
        return;
    }

    if (turn0) {
        box.innerText = "O";
        box.disabled = true;
        turn0 = false;
        turnIndicator.innerText = isVsComputer ? "Computer's turn" : "Player X's turn";
        if (checkWinner()) {
            return;
        }

        if (isVsComputer) {
            setTimeout(() => {
                computerMove();
                turnIndicator.innerText = "Player O's turn";
            }, 500);
        }
    } else {
        box.innerText = "X";
        box.disabled = true;
        turn0 = true;
        turnIndicator.innerText = "Player O's turn";
        checkWinner();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        handlePlayerTurn(box);
    });
});




playvscomputer.addEventListener("change", () => {
    isVsComputer = playvscomputer.checked;

   if (isVsComputer && !turn0) {
    setTimeout(() => {
        computerMove();
        turnIndicator.innerText = "Player O's turn";
    }, 500);
   }
});
        





resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);

