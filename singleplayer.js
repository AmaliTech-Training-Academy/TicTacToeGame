window.addEventListener('DOMContentLoaded', () => {
    let changeTurn = true;
    const gameBoard = (() => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        let computer = JSON.parse(sessionStorage.getItem("computer"))
        
        let userScore = Number(document.getElementById('player-score').innerHTML);
        let tiesCount = Number(document.getElementById('ties-count').innerHTML);
        let cpuScore = Number(document.getElementById('cpu-score').innerHTML);
        let userHover = document.getElementsByClassName('box')
        let restartBtn = document.getElementById('restart-icon')
        let overlay = document.getElementById('overlay')

        const restartState = () => {
            document.getElementById('restart-ttr').innerHTML = 'RESTART GAME?'
            document.getElementById('restart-ttr').style.color = '#A8BFC9'
            document.getElementById('restart-states').style.visibility = 'visible'
            overlay.style.visibility = 'visible'
            
            let cancelBtn = document.getElementById('cancel')
            cancelBtn.addEventListener('click', function(){
                document.getElementById('restart-states').style.visibility = 'hidden' 
                overlay.style.visibility = 'hidden'
            })
        }
    
        restartBtn.addEventListener('click', restartState)

        const boxes = document.querySelectorAll(".box");
        let box = Array.from(boxes);

        const changeIcon = () => {
            const a = user
            user = computer
            computer = a
        }

        const hover = (item) => {
            if (user[2] == 'playerO') {
                item.style.backgroundImage = 'url(./starter-code/assets/icon-o-outline.svg)' 
            } else {
                item.style.backgroundImage = 'url(./starter-code/assets/icon-x-outline.svg)' 
            }
            item.style.backgroundRepeat = 'no-repeat'
            item.style.backgroundPosition = '50%'
        }

        for (let i = 0; i < userHover.length; i++){
            userHover[i].addEventListener('mouseenter', (user) => hover(userHover[i], user))
            userHover[i].addEventListener('mouseleave', () => {
                userHover[i].style.backgroundImage = ''
            } )
        }

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
        const clrScreen = () => box.forEach((item) => {
            try {
                item.classList.remove(user[2])
                item.classList.remove(computer[2])
                document.getElementById('states').style.visibility = 'hidden'
                overlay.style.visibility = 'hidden'
            } catch (error) {
                console.log(error)
            }
        })

        
        //ernest's code
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
                    let condition = box[element].classList.contains(mark);
                    return condition;
                })
            })
        }
    
        const boardFull = () => {
            return box.every((val) => 
            val.classList.contains(user[2]) || val.classList.contains(computer[2]))
        }

        //Start game
        const player = Players();
        
        //return play choice and computer choice
        function Players (){
            const machine = () => {            
                let play = Math.floor(Math.random() * box.length);
                while(box[play].classList.contains(user[2]) || box[play].classList.contains(computer[2])){
                  if (boardFull() && !checkWin(user[2]) && !checkWin(computer[2])) {
                    tiedState()
                    return
                  } else if (boardFull() && (checkWin(user[2]) || checkWin(computer[2]))) {
                    return
                  }
                  play = Math.floor(Math.random() * box.length);
                }
                box[play].classList.add(computer[2])
                if (checkWin(computer[2])){
                    cpuScore += 1
                    document.getElementById('cpu-score').innerHTML = cpuScore.toString();
                    document.getElementById('state-text').innerHTML = 'OH NO, YOU LOST...'
                    document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
                    document.getElementById('states-message').style.columnGap = '24px'
                    document.getElementById('win-icon').innerHTML = computer[0]
                    document.getElementById('ttr').style.color = computer[1]
                    document.getElementById('states').style.visibility = 'visible'
                    overlay.style.visibility = 'visible'
                }
              }
            return {machine}
        } 

        const cpuChoice = () => {
            setTimeout(() => {
                player.machine();   
            }, 800);
        }

        const userChoice = (tile) => {
            tile.classList.add(user[2])
        }

        const changeChoice = () => {

        }

        const checkUserWin = () => {
            if (checkWin(user[2])){
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
    
        const gamePlay1 = () => {       
            box.forEach((mark)=> {    
                let step = () => {
                    if(!mark.classList.contains(user[2]) && !mark.classList.contains(computer[2])) {   
                        userChoice(mark)                   
                    }
                    if (checkUserWin()) {
                        return
                    }
                    cpuChoice()
                }     
                mark.addEventListener("click", step);
            })                               
        }
        gamePlay1();

        // TODO- you need to click before CPU can play <-- change this
        const gamePlay2 = () => {  
            cpuChoice()     
            box.forEach((mark)=> {    
                let step = () => {
                    if(!mark.classList.contains(user[2]) && !mark.classList.contains(computer[2])) {   
                        userChoice(mark)                   
                    }
                    if (checkUserWin()) {
                        return
                    }
                    // cpuChoice()
                }     
                mark.addEventListener("click", step);
            })                               
        }
                
        // next round functionality
        const nextRound = document.getElementById('next-round')
        nextRound.addEventListener('click', () => {
            clrScreen()
            changeIcon()
            if (changeTurn) {
                gamePlay2()
                changeTurn = false
            } else {
                gamePlay1()
                changeTurn = true
            }
        })    
    });

    gameBoard();
});
  


