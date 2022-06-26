//Gideon ============Solo vs CPU
// import { user, userClass, computer, computerClass } from './index.js'

window.addEventListener('DOMContentLoaded', () => {
    const gameBoard = (() => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        let userClass = sessionStorage.getItem("userClass")
        let computer = JSON.parse(sessionStorage.getItem("computer"))
        let computerClass = sessionStorage.getItem("computerClass")
        //score tracking
        // let userScoreUnit = document.getElementById
        let userScore = Number(document.getElementById('player-score').innerHTML);
        let tiesCount = Number(document.getElementById('ties-count').innerHTML);
        let cpuScore = Number(document.getElementById('cpu-score').innerHTML);

    
        const boxes = document.querySelectorAll(".box");
        let box = Array.from(boxes);
        


        //TODO 
        // turn and turn-icon update
        // restart game


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
        const clrScreen = () => box.forEach((item) => {
            try {
                item.classList.remove(userClass)
                item.classList.remove(computerClass)
                document.getElementById('states').style.visibility = 'hidden'
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
            val.classList.contains(userClass) || val.classList.contains(computerClass))
        }
        // console.log(boardFull())

        //Start game
        const player = Players();
        
        //return play choice and computer choice
        function Players (){
            const machine = () => {            
                let play = Math.floor(Math.random() * box.length);
                // console.log(`first play value ${play}`)
                //problem here... loops forever at last point
                while(box[play].classList.contains(userClass) || box[play].classList.contains(computerClass)){
                  if (boardFull() && !checkWin(userClass) && !checkWin(computerClass)) {
                    tiedState()
                    return
                  } else if (boardFull() && (checkWin(userClass) || checkWin(computerClass))) {
                    return
                  }
                  play = Math.floor(Math.random() * box.length);
                //   console.log(`second play value ${play}`)

                }
                box[play].classList.add(computerClass)
                if (checkWin(computerClass)){
                    cpuScore += 1
                    document.getElementById('cpu-score').innerHTML = cpuScore.toString();
                    document.getElementById('state-text').innerHTML = 'OH NO, YOU LOST...'
                    document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
                    document.getElementById('states-message').style.columnGap = '24px'
                    document.getElementById('win-icon').innerHTML = computer[0]
                    document.getElementById('ttr').style.color = computer[1]
                    document.getElementById('states').style.visibility = 'visible'
                }
                // console.log(play);  
  
              }
            // console.log(`Human player is ${humanPlayer}, and machine is ${machine}`)
            return {machine}
        } 
    
        const gamePlay = () => {
                // const gameOver = () => box.forEach((spot) =>{
            //     if(spot != choice){
            //              spot.classList.add("gameover");
            //                }
            //  })
            const move = () => {        
                box.forEach((mark)=> {    
                    let step = () => {
                        if(!mark.classList.contains(userClass) && !mark.classList.contains(computerClass)) {                         
                            mark.classList.add(userClass)
                            if (checkWin(userClass)){
                                userScore += 1
                                document.getElementById('player-score').innerHTML = userScore.toString();
                                document.getElementById('state-text').innerHTML = 'YOU WON!'
                                document.getElementById('ttr').innerHTML = 'TAKES THIS ROUND'
                                document.getElementById('states-message').style.columnGap = '24px'
                                document.getElementById('win-icon').innerHTML = user[0]
                                document.getElementById('ttr').style.color = user[1]
                                document.getElementById('states').style.visibility = 'visible'

                            }
                            const cpuChoice = () => {
                                setTimeout(() => {
                                    player.machine();   
                                }, 800);
                            }
                            cpuChoice();
                            
                        }                                                                     
                    }
                    mark.addEventListener("click", step);
                })                
            }
            // next round functionality
            const nextRound = document.getElementById('next-round')
            nextRound.addEventListener('click', clrScreen)
             
            // const highLight = (combo) => {
            //         combo.forEach((idx) => box[idx].classList.add("highlight"))
            // }          
            move();                    
        }
        gamePlay();

        // return {gamePlay};       
    });

    gameBoard();
});
  


