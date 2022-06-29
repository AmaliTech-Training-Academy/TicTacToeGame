
let user = JSON.parse(sessionStorage.getItem("user"))
let cpu = JSON.parse(sessionStorage.getItem("computer"))

if (user[2] == 'playerO') {
    document.getElementById('you').innerHTML = 'O (YOU)'
    document.getElementById('you-rg').style.backgroundColor = user[1]
    document.getElementById('cpu').innerHTML = 'X (CPU)'
    document.getElementById('cpu-rg').style.backgroundColor = cpu[1]
}

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
let overlay = document.getElementById('overlay')
let cancelBtn = document.getElementById('cancel')
const boxes = document.querySelectorAll(".box");
let boxArr = Array.from(boxes);
const nextRound = document.getElementById('next-round')


//trackers
let small = 1
let turn = user[2] == 'playerX'

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
    val.classList.contains(user[2]) || val.classList.contains(cpu[2]))
}
const restartState = () => {
    document.getElementById('restart-ttr').innerHTML = 'RESTART GAME?'
    document.getElementById('restart-ttr').style.color = '#A8BFC9'
    document.getElementById('restart-states').style.visibility = 'visible'
    overlay.style.visibility = 'visible'
}

restartBtn.addEventListener('click', restartState)

cancelBtn.addEventListener('click', () => {
    document.getElementById('restart-states').style.visibility = 'hidden' 
    overlay.style.visibility = 'hidden'
})
//tied State
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
    item.classList.remove(user[2])
    item.classList.remove(cpu[2])
    document.getElementById('states').style.visibility = 'hidden'
    overlay.style.visibility = 'hidden'
    item.addEventListener('mouseenter', (user) => hover(item))
    item.style.backgroundColor = '#1F3641'
    item.style.backgroundImage = ''
})

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

//Start game
const player = Players();

//return play choice and computer choice
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

const checkUserWin = () => {
    if (checkWin(user[2])){
        winEffect(user)
        userScore += 1
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

function remove (evt){
    evt.target.style.backgroundImage = ''
}

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
    cpuChoice().then(changeToUser)
}


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

nextRound.addEventListener('click', () => {
    small += 1
    turn = (!turn)
    clrScreen()
    gameplay()
})

const gameplay = () => {
    setHover()
    while (small > 0) {
        if (turn) {
            changeToUser()
            play.addEvt()
            small--
        } else {
            cpuChoice().then(changeToUser)
            play.addEvt()
            small--
        }
    }    
}

gameplay()





