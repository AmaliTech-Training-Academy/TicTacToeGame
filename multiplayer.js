window.addEventListener('DOMContentLoaded', () => {
    let p1 = JSON.parse(sessionStorage.getItem("user"))
    let p2 = JSON.parse(sessionStorage.getItem("computer"))

    let p1Score = Number(document.getElementById('player-score').innerHTML);
    let tiesCount = Number(document.getElementById('ties-count').innerHTML);
    let p2Score = Number(document.getElementById('cpu-score').innerHTML);
    let restartBtn = document.getElementById('restart-icon')

    const restartState = () => {
        document.getElementById('restart-ttr').innerHTML = 'RESTART GAME?'
        document.getElementById('restart-ttr').style.color = '#A8BFC9'
        document.getElementById('restart-states').style.visibility = 'visible'
        
        let cancelBtn = document.getElementById('cancel')
        cancelBtn.addEventListener('click', function(){
            document.getElementById('restart-states').style.visibility = 'hidden' 
        })
    }

    restartBtn.addEventListener('click', restartState)

    const boxes = Array.from(document.querySelectorAll('.box'));

    const tiedState = () => {
        tiesCount += 1
        document.getElementById('ties-count').innerHTML = tiesCount.toString();
        document.getElementById('state-text').innerHTML = ''
        document.getElementById('win-icon').innerHTML = ''
        document.getElementById('ttr').innerHTML = 'ROUND TIED'
        document.getElementById('ttr').style.color = '#A8BFC9'
        document.getElementById('states-message').style.columnGap = '0px'
        document.getElementById('states').style.visibility = 'visible'
    }
    
    //clear screen
    const clrScreen = () => boxes.forEach((item) => {
        try {
            item.classList.remove(p1[2])
            item.classList.remove(p2[2])
            document.getElementById('states').style.visibility = 'hidden'
        } catch (error) {
            console.log(error)
        }
    })

    restartBtn.addEventListener('click', restartState)
    
    const nextRound = document.getElementById('next-round')
    nextRound.addEventListener('click', clrScreen)

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
                let condition = boxes[element].classList.contains(mark);
                return condition;
            })
        })
    }

    const boardFull = () => {
        return boxes.every((val) => 
        val.classList.contains(p1[2]) || val.classList.contains(p2[2]))
    }


    //set current player based on selected starting icon
    let currentPlayer;

    if (p1[2] == "playerX") {
        currentPlayer = p1
    } else {
        currentPlayer = p2
    }

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
        } else {
            document.getElementById('cpu-score').innerHTML = p2Score.toString();
            document.getElementById('state-text').innerHTML = 'PLAYER 2 WINS!'
            document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
            document.getElementById('states-message').style.columnGap = '24px'
            document.getElementById('win-icon').innerHTML = p2[0]
            document.getElementById('ttr').style.color = p2[1]
            document.getElementById('states').style.visibility = 'visible'   
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

    const action = (box) => {
        if(isValid(box) && !boardFull()) {
            box.classList.add(currentPlayer[2])
            if (checkWin(currentPlayer[2])) {
                updateScore()
                statePop()
                changePlayer()
                return
            }
            changePlayer();
            if (boardFull()) {
                tiedState()
            }
        }
    }

    boxes.forEach((box) => {
        box.addEventListener('click', () => action(box));
    });
});
