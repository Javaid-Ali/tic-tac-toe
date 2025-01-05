let btns = document.querySelectorAll('#btn')
let chance = 'X';
let turn = document.querySelector('.playerTurn')
let winCountX = 0;
let winCountO = 0;
let drawCount = 0;
let scoreBoard = document.querySelector('.scoreBoard')
let resetBtn = document.querySelector('.restartBtn')

const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8]
]

function checkWinner(){
    for(let combinations of winningCombinations){
        const [a, b, c] = combinations;
        if(btns[a].textContent !== '' &&
            btns[a].textContent === btns[b].textContent && 
            btns[b].textContent === btns[c].textContent  
        ){
            return btns[a].textContent;
        }
    }
    return null;
}

function updateScoreboard() {
    scoreBoard.innerHTML = `
        <p>Player X Wins: ${winCountX}</p>
        <p>Player O Wins: ${winCountO}</p>
        <p>Draws: ${drawCount}</p>
    `;
}

function playerTurn(event){
    if(event.target.textContent !== ''){
        return;
    }

    event.target.textContent = chance;

    const winner = checkWinner();
    if(winner){
        turn.textContent = `Player ${winner}'s Win!`;

        if(winner === 'X'){
            winCountX++;
        } else {
            winCountO++;
        }

        updateScoreboard();
        btns.forEach((btn) => btn.disabled = true)
        return;
    }

    if(Array.from(btns).every(btn => btn.textContent !== '')){
        turn.textContent = `Match Draw!`
        drawCount++;
        updateScoreboard();
        return;
    }


    if(chance === 'X'){
        event.target.style.backgroundColor = '#ffcccc';
        event.target.style.border = 'none';
        chance = 'O'
    } else {
        event.target.style.backgroundColor = '#cce5ff';
        event.target.style.border = 'none';
        chance = 'X'
    }

    turn.textContent = `Player ${chance}'s Turn`;
}

function resetGame(){
    btns.forEach((btn) => {
        btn.textContent = '';
        btn.disabled = false;
        btn.style.backgroundColor = '';
        btn.style.border = '';
    })

    chance = 'X';
    turn.textContent = `Player ${chance}'s Turn`;
    updateScoreboard();

}

Array.from(btns).forEach(btn => {
    btn.addEventListener('click', playerTurn);
})

resetBtn.addEventListener('click', resetGame)

turn.textContent = `Player ${chance}'s Turn`;
turn.classList.add('turn')

updateScoreboard();