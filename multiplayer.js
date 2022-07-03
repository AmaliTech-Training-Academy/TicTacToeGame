// user and objects loaded from storage
let p1 = JSON.parse(sessionStorage.getItem("user"))
let p2 = JSON.parse(sessionStorage.getItem("computer"))

// saves gameData
let saveData;
// saves classList for saveData
let arr; 

//set current player based on selected starting icon
let currentPlayer;

// sets current player based on mark chosen
if (p1[2] == "playerO") {
    currentPlayer = p2
} else {
    currentPlayer = p1
}

// set score area text and color
if (p1[2] == 'playerO') {
    document.getElementById('you').innerHTML = 'O (P1)'
    document.getElementById('p1-rg').style.backgroundColor = p1[1]
    document.getElementById('cpu').innerHTML = 'X (P2)'
    document.getElementById('p2-rg').style.backgroundColor = p2[1]
}

//turn icon functions
let turnIcon = document.getElementById('turn-icon-img')

//changes the turn icon based on current player
const changeTurnIcon = () => {
    turnIcon.src = currentPlayer[3]
}


let p1Score = Number(document.getElementById('player-score').innerHTML);
let tiesCount = Number(document.getElementById('ties-count').innerHTML);
let p2Score = Number(document.getElementById('cpu-score').innerHTML);
let restartBtn = document.getElementById('restart-icon')
let confirmRestart = document.getElementById('restart')
let overlay = document.getElementById('overlay')
let cancelBtn = document.getElementById('cancel')
const nextRound = document.getElementById('next-round')
const boxArr = Array.from(document.querySelectorAll('.box'));

//trackers
let gamesLeft = 1
// switches turn
let turn = p1[2] == 'playerX'

// BROWSER RELOAD SAVE FUNCTIONALITY START
function saveGameState () {
    classes()
    saveData = {
        p1Score,
        turn,
        tiesCount,
        p2Score,
        currentPlayer,
        arr
    }
    sessionStorage.setItem("gameData", JSON.stringify(saveData))
    // console.log('saved game state')
}

function restoreGameState() {
    // console.log('called restoreGamestate')
    saveData = JSON.parse(sessionStorage.getItem("gameData"))
    console.log(saveData)
    turn = saveData.turn
    currentPlayer = saveData.currentPlayer
    p1Score = saveData.p1Score
    tiesCount = saveData.tiesCount
    p2Score = saveData.p2Score
    boxArr.forEach((box, index) => {
        box.classList.add(saveData.arr[index])
    })

    // update scores
    document.getElementById('cpu-score').innerHTML = p2Score.toString();
    document.getElementById('player-score').innerHTML = p1Score.toString();
    document.getElementById('ties-count').innerHTML = tiesCount.toString();
    console.log(turn)
    console.log(currentPlayer[2])

    //solve turn issues
    if ((turn == false) && (currentPlayer[2] == p1[2])){
        console.log('checking conditions')
        turn = true
        gameplay()
        turn = (!turn)
        console.log(turn)
    } else if ((turn == true) && (currentPlayer[2] == p2[2])){
        turn = false
        gameplay()
        turn = (!turn)
    } else {
        gameplay()
    }
}
// save data for class list
const classes = () => {
    arr = []
    boxArr.forEach(box => {
        if (box.classList.contains('playerX')){
            arr.push('playerX')
        } else if (box.classList.contains('playerO')){
            arr.push('playerO')
        } else {
            arr.push('a')
        }
        return arr
    })
}
// BROWSER END

// get empty boxes
const getEmpty = () => {
    return boxArr.filter(cell => 
        !cell.classList.contains(p1[2]) && !cell.classList.contains(p2[2])
    )  
}

//WIN, LOSE AND TIED STATE
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// check win
const checkWin = (mark) => {
    return WIN_COMBOS.some((combo) => {
        return combo.every((element) => {
            let condition = boxArr[element].classList.contains(mark);
            return condition;
        })
    })
}

// check if gameboard is full
const boardFull = () => {
    return boxArr.every((val) => 
    val.classList.contains(p1[2]) || val.classList.contains(p2[2]))
}

// brings up restart state
const restartState = () => {
    document.getElementById('restart-ttr').innerHTML = 'RESTART GAME?'
    document.getElementById('restart-ttr').style.color = '#A8BFC9'
    document.getElementById('restart-states').style.visibility = 'visible'
    overlay.style.visibility = 'visible'
}

restartBtn.addEventListener('click', restartState)

// restart game
confirmRestart.addEventListener('click', () => {
    clrScreen()
    saveGameState()
    gamesLeft++
    gameplay()
})

// removes restart state
cancelBtn.addEventListener('click', function(){
    document.getElementById('restart-states').style.visibility = 'hidden'
    overlay.style.visibility = 'hidden' 
})

// brings up tied state
const tiedState = () => {
    tiesCount += 1
    document.getElementById('ties-count').innerHTML = tiesCount.toString();
    document.getElementById('state-text').innerHTML = ''
    document.getElementById('win-icon').innerHTML = ''
    document.getElementById('ttr').innerHTML = 'ROUND TIED'
    document.getElementById('ttr').style.color = '#A8BFC9'
    document.getElementById('states-message').style.columnGap = '0px'
    document.getElementById('states').style.visibility = 'visible'
    overlay.style.visibility = 'visible'
}

//clear screen
const clrScreen = () => boxArr.forEach((item) => {
    item.classList.remove(p1[2])
    item.classList.remove(p2[2])
    document.getElementById('states').style.visibility = 'hidden'
    document.getElementById('restart-states').style.visibility = 'hidden'
    overlay.style.visibility = 'hidden'
    item.style.backgroundColor = '#1F3641'
    item.style.backgroundImage = ''
})


// setting hovers
const hover = (item) => {
    if (currentPlayer[2] == 'playerO') {
        item.style.backgroundImage = 'url(./starter-code/assets/icon-o-outline.svg)' 
    } else {
        item.style.backgroundImage = 'url(./starter-code/assets/icon-x-outline.svg)' 
    }
    item.style.backgroundRepeat = 'no-repeat'
    item.style.backgroundPosition = '50%'
}

const setHover = () => {
    getEmpty().forEach(cell => {
        cell.addEventListener('mouseenter', (user) => hover(cell))
        cell.addEventListener('mouseleave', () => cell.style.backgroundImage = '')
    })
}

// create highight on win icons
const winEffect = (caller) => {
    const winArr = []
    boxArr.forEach(box => {
        if (box.classList.contains(caller[2])){
            winArr.push(Number(box.id))
        }
    })
    WIN_COMBOS.forEach(combo => {
        if (combo.every(e => winArr.includes(e))) {
            combo.forEach(item => {
                // console.log(item)
                boxArr[item].style.backgroundColor = caller[1]
                // console.log()
                boxArr[item].style.backgroundImage = caller[4]
            })
        }
    })
}

// checks if box is empty
const isValid = (box) => {
    if (box.classList.contains(p1[2]) || box.classList.contains(p2[2])){
        return false;
    }
    return true;
};


const updateScore = () => {
    if (currentPlayer == p1) {
        p1Score += 1
    } else {
        p2Score +=1
    }
}

// brings up win state
const statePop = () => {
    if (currentPlayer == p1) {
        document.getElementById('player-score').innerHTML = p1Score.toString();
        document.getElementById('state-text').innerHTML = 'PLAYER 1 WINS!'
        document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
        document.getElementById('states-message').style.columnGap = '24px'
        document.getElementById('win-icon').innerHTML = p1[0]
        document.getElementById('ttr').style.color = p1[1]
        document.getElementById('states').style.visibility = 'visible'
        overlay.style.visibility = 'visible'
    } else {
        document.getElementById('cpu-score').innerHTML = p2Score.toString();
        document.getElementById('state-text').innerHTML = 'PLAYER 2 WINS!'
        document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
        document.getElementById('states-message').style.columnGap = '24px'
        document.getElementById('win-icon').innerHTML = p2[0]
        document.getElementById('ttr').style.color = p2[1]
        document.getElementById('states').style.visibility = 'visible' 
        overlay.style.visibility = 'visible'  
    }
}

// changes currentPlayer
const changePlayer = () => {
    if (currentPlayer == p1) {
        currentPlayer = p2      
    } else {
        currentPlayer = p1
    }
    return currentPlayer
}


// player actions
function action (evt) {
    if(isValid(evt.target) && !boardFull()) {
        evt.target.classList.add(currentPlayer[2])
        evt.target.addEventListener('mouseenter', () => evt.target.style.backgroundImage = '')
        if (checkWin(currentPlayer[2])) {
            winEffect(currentPlayer)
            updateScore()
            statePop()
            changePlayer()
            changeTurnIcon()
            saveGameState()
            return
        }
        changePlayer();
        changeTurnIcon()
        console.log(currentPlayer[2])
        saveGameState()
        if (boardFull()) {
            tiedState()
        }
    }
}

// calls next round
nextRound.addEventListener('click', () => {
    gamesLeft += 1
    turn = (!turn)
    clrScreen()
    saveGameState()
    gameplay()
})

// game play
const gameplay = () => {
    console.log('gameplay called')
    setHover()
    while (gamesLeft > 0) {
        if (turn) {
            currentPlayer = p1
            turnIcon.src = p1[3]
            boxArr.forEach((box) => {
                box.addEventListener('click', action);
            }); 
            gamesLeft--
        } else {
            currentPlayer = p2
            turnIcon.src = p2[3]
            boxArr.forEach((box) => {
                box.addEventListener('click', action);
            }); 
            gamesLeft-- 
        }
    } 
}


if (sessionStorage.getItem("gameData") !== null){
    restoreGameState()
}

gameplay()