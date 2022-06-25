//Gideon ============Solo vs CPU
window.addEventListener('DOMContentLoaded', () => {
    const gameBoard = (() => {        
        const boxes = document.querySelectorAll(".box");
        // const Osvg = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>'
        // const Xsvg = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>'
       
        let box = Array.from(boxes);
        
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
            val.classList.contains('playerX') || val.classList.contains('playerO'))
        }
        console.log(boardFull())

        //Start game
        const player = Players();
        
        //return play choice and computer choice
        function Players (){
            const machine = () => {            
                let play = Math.floor(Math.random() * box.length);
                console.log(`first play value ${play}`)
                //problem here... loops forever at last point
                while(box[play].classList.contains('playerX') || box[play].classList.contains('playerO')){
                  if (boardFull()) {
                    return
                  }
                  play = Math.floor(Math.random() * box.length);
                  console.log(`second play value ${play}`)

                }
                box[play].classList.add('playerO')
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
                        if(!mark.classList.contains('playerX') && !mark.classList.contains('playerO')) {                         
                            mark.classList.add('playerX')
                            if (checkWin('playerX')){
                                window.location.replace("./index.html")
                            }
                            setTimeout(() => {
                                player.machine();   
                            }, 800);
                            if (checkWin('playerO')){
                                window.location.replace("./index.html")
                            }
                        }                                                                     
                    }
                    mark.addEventListener("click", step);
                })                
            }
             
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
  


