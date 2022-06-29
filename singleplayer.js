// user objects loaded from storage
let user = JSON.parse(sessionStorage.getItem("user"))
let cpu = JSON.parse(sessionStorage.getItem("computer"))


// saves gameData
let saveData;
let arr;

// set score area text and color
if (user[2] == 'playerO') {
    document.getElementById('you').innerHTML = 'O (YOU)'
    document.getElementById('you-rg').style.backgroundColor = user[1]
    document.getElementById('cpu').innerHTML = 'X (CPU)'
    document.getElementById('cpu-rg').style.backgroundColor = cpu[1]
}

// turn icon functions
let turnIcon = document.getElementById('turn-icon-img')

const changeToUser = () => {
    turnIcon.src = user[3]
}

const changeToCpu = () => {
    turnIcon.src = cpu[3]
}


let userScore = Number(document.getElementById('player-score').innerHTML);
let tiesCount = Number(document.getElementById('ties-count').innerHTML);
let cpuScore = Number(document.getElementById('cpu-score').innerHTML);
let restartBtn = document.getElementById('restart-icon')
let confirmRestart = document.getElementById('restart')
let overlay = document.getElementById('overlay')
let cancelBtn = document.getElementById('cancel')
const boxes = document.querySelectorAll(".box");
let boxArr = Array.from(boxes);
const nextRound = document.getElementById('next-round')


//trackers
let gamesLeft = 1
// switches turn
let turn = user[2] == 'playerX'


// BROWSER RELOAD SAVE FUNCTIONALITY START
function saveGameState () {
    classes()
    saveData = {
        userScore,
        turn,
        tiesCount,
        cpuScore,
        arr
    }
    sessionStorage.setItem("gameData", JSON.stringify(saveData))
    console.log('saved game state')
}

function restoreGameState() {
    console.log('called restoreGamestate')
    saveData = JSON.parse(sessionStorage.getItem("gameData"))
    console.log(saveData)
    turn = saveData.turn
    userScore = saveData.userScore
    tiesCount = saveData.tiesCount
    cpuScore = saveData.cpuScore
    boxArr.forEach((box, index) => {
        console.log('inside class restore')
        box.classList.add(saveData.arr[index])
    })
    // update scores
    document.getElementById('cpu-score').innerHTML = cpuScore.toString();
    document.getElementById('player-score').innerHTML = userScore.toString();
    document.getElementById('ties-count').innerHTML = tiesCount.toString();
    
    // solve pc playing on every reload
    if (turn) {
        console.log(turn)
        gameplay()
    } else {
        turn = true
        gameplay()
        turn = (!turn)
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

//get empty boxes
const getEmpty = () => {
    return boxArr.filter(cell => 
        !cell.classList.contains(user[2]) && !cell.classList.contains(cpu[2])
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
    val.classList.contains(user[2]) || val.classList.contains(cpu[2]))
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
cancelBtn.addEventListener('click', () => {
    document.getElementById('restart-states').style.visibility = 'hidden' 
    overlay.style.visibility = 'hidden'
})


//brings up tied State
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

//clears screen
const clrScreen = () => boxArr.forEach((item) => {
    item.classList.remove(user[2])
    item.classList.remove(cpu[2])
    document.getElementById('states').style.visibility = 'hidden'
    document.getElementById('restart-states').style.visibility = 'hidden'
    overlay.style.visibility = 'hidden'
    item.addEventListener('mouseenter', (user) => hover(item))
    item.style.backgroundColor = '#1F3641'
    item.style.backgroundImage = ''
})

// setting hovers
const hover = (item) => {
    if (user[2] == 'playerO') {
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

// create highlight on win icons
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


// CPU Starts
const player = Players();

//return computer choice
function Players (){
    const machine = () => {          
        let play = Math.floor(Math.random() * boxArr.length);
        while(boxArr[play].classList.contains(user[2]) || boxArr[play].classList.contains(cpu[2])){
            play = Math.floor(Math.random() * boxArr.length);
        }
        boxArr[play].classList.add(cpu[2])
        if (boardFull() && !checkWin(user[2]) && !checkWin(cpu[2])) {
            tiedState()
            return
        }
        boxArr[play].addEventListener('mouseenter', () => boxArr[play].style.backgroundImage = '')

        if (checkWin(cpu[2])){
            winEffect(cpu)
            cpuScore += 1
            document.getElementById('cpu-score').innerHTML = cpuScore.toString();
            document.getElementById('state-text').innerHTML = 'OH NO, YOU LOST...'
            document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
            document.getElementById('states-message').style.columnGap = '24px'
            document.getElementById('win-icon').innerHTML = cpu[0]
            document.getElementById('ttr').style.color = cpu[1]
            document.getElementById('states').style.visibility = 'visible'
            overlay.style.visibility = 'visible'            
        }
        saveGameState()
        // console.log(saveData)
    }
    return {machine}
} 

function cpuChoice () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            player.machine();
            resolve() 
        }, 900);
    })
}
// CPU ends

// checks if user has won
const checkUserWin = () => {
    if (checkWin(user[2])){
        winEffect(user)
        userScore += 1
        saveGameState()
        console.log('saved on user win')
        document.getElementById('player-score').innerHTML = userScore.toString();
        document.getElementById('state-text').innerHTML = 'YOU WON!'
        document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
        document.getElementById('states-message').style.columnGap = '24px'
        document.getElementById('win-icon').innerHTML = user[0]
        document.getElementById('ttr').style.color = user[1]
        document.getElementById('states').style.visibility = 'visible'
        overlay.style.visibility = 'visible'
        return true
    } else {
        return false
    }

}

// removes hover on clicked box
function remove (evt){
    evt.target.style.backgroundImage = ''
}

// USER starts
function userChoice (evt) {
    if (!evt.target.classList.contains(cpu[2])) {
        evt.target.classList.add(user[2])
        changeToCpu()
    } else {
        return
    }
    evt.target.addEventListener('mouseenter', remove)
    evt.target.removeEventListener('click', userChoice)
    if (checkUserWin()) {
        return
    }
    if (boardFull() && !checkWin(user[2]) && !checkWin(cpu[2])) {
        tiedState()
        return
    }
    // run saveState and log data
    saveGameState()
    // console.log(saveData)
    cpuChoice().then(() => changeToUser)
}

// player object
const play = {
    cells: getEmpty(),
    addEvt () {
        this.cells.forEach(cell => {
            cell.addEventListener('click', userChoice)
        })
    },
    rmEvt () {
        this.cells.forEach(cell => {
            cell.removeEventListener('click', userChoice)
        })
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
    setHover()
    while (gamesLeft > 0) {
        if (turn) {
            changeToUser()
            play.addEvt()
            gamesLeft--
        } else {
            cpuChoice().then(changeToUser)
            play.addEvt()
            gamesLeft--
        }
    }    
}


if (sessionStorage.getItem("gameData") !== null){
    restoreGameState()
}
gameplay()

// if (sessionStorage.getItem("gameData") !== null){
//     restoreGameState()
// }



