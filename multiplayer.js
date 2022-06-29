let p1 = JSON.parse(sessionStorage.getItem("user"))
let p2 = JSON.parse(sessionStorage.getItem("computer"))
let setTurn = true;

//set current player based on selected starting icon
let currentPlayer;

if (p1[2] == "playerO") {
    currentPlayer = p2
} else {
    currentPlayer = p1
}

if (p1[2] == 'playerO') {
    document.getElementById('you').innerHTML = 'O (YOU)'
    document.getElementById('p1-rg').style.backgroundColor = p1[1]
    document.getElementById('cpu').innerHTML = 'X (CPU)'
    document.getElementById('p2-rg').style.backgroundColor = p2[1]
}
console.log(p1[1])
console.log(p2[1])

let turnIcon = document.getElementById('turn-icon-img')

const changeTurnIcon = () => {
    turnIcon.src = currentPlayer[3]
}


let p1Score = Number(document.getElementById('player-score').innerHTML);
let tiesCount = Number(document.getElementById('ties-count').innerHTML);
let p2Score = Number(document.getElementById('cpu-score').innerHTML);
// let userHover = document.getElementsByClassName('box')
let restartBtn = document.getElementById('restart-icon')
let overlay = document.getElementById('overlay')
let cancelBtn = document.getElementById('cancel')
const nextRound = document.getElementById('next-round')
const boxArr = Array.from(document.querySelectorAll('.box'));

//trackers
let small = 1
let turn = p1[2] == 'playerX'

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

// check win for
const checkWin = (mark) => {
    return WIN_COMBOS.some((combo) => {
        return combo.every((element) => {
            let condition = boxArr[element].classList.contains(mark);
            return condition;
        })
    })
}

const boardFull = () => {
    return boxArr.every((val) => 
    val.classList.contains(p1[2]) || val.classList.contains(p2[2]))
}

const restartState = () => {
    document.getElementById('restart-ttr').innerHTML = 'RESTART GAME?'
    document.getElementById('restart-ttr').style.color = '#A8BFC9'
    document.getElementById('restart-states').style.visibility = 'visible'
    overlay.style.visibility = 'visible'
}

restartBtn.addEventListener('click', restartState)

cancelBtn.addEventListener('click', function(){
    document.getElementById('restart-states').style.visibility = 'hidden'
    overlay.style.visibility = 'hidden' 
})

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
    try {
        item.classList.remove(p1[2])
        item.classList.remove(p2[2])
        document.getElementById('states').style.visibility = 'hidden'
        overlay.style.visibility = 'hidden'
    } catch (error) {
        console.log(error)
    }
})

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


nextRound.addEventListener('click', () => {
    clrScreen()
    setHover()
})

// this function must check the class not the innerHTML
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

const changePlayer = () => {
    if (currentPlayer == p1) {
        currentPlayer = p2      
    } else {
        currentPlayer = p1
    }
    return currentPlayer
}


function action (evt) {
    if(isValid(evt.target) && !boardFull()) {
        evt.target.classList.add(currentPlayer[2])
        evt.target.addEventListener('mouseenter', () => evt.target.style.backgroundImage = '')
        if (checkWin(currentPlayer[2])) {
            updateScore()
            statePop()
            changePlayer()
            changeTurnIcon()
            return
        }
        changePlayer();
        changeTurnIcon()
        if (boardFull()) {
            tiedState()
        }
    }
}

boxArr.forEach((box) => {
    setHover()
    box.addEventListener('click', action);
});
