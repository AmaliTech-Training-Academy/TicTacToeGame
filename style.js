window.addEventListener('DOMContentLoaded', () => {
    const gameBoard = (() =>{        
        const sectors = document.querySelectorAll(".box");
        const Osvg = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>'
        const Xsvg = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>'
       
        let box = Array.from(sectors);
        
        const winner = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
    
        let choice= Xsvg

        //Start game
        const player = Players(choice);

        function Players (humanPlayer){
            const machine = () => {            
                let play = Math.floor(Math.random() * box.length);
                while(box[play].innerHTML !== ""){
                  play = Math.floor(Math.random() * box.length);
                }
                box[play].innerHTML= Osvg
                console.log(play);        
              }
            return{humanPlayer, machine}
        }
        
    
        const gamePlay = () =>{
            const boardFull = () => box.every((val) => val.textContent != "");
            const gameOver = () => box.forEach((spot) =>{
                if(spot != choice){
                         spot.classList.add("gameover");
                           }
             })
            const move = () =>{   
                         
                box.forEach((mark)=>{    
                    let step = ()=>{
                        if(mark.innerHTML === ""){                        
                        choice = choice === Xsvg?Osvg:Xsvg;
                        mark.innerHTML = player.humanPlayer;
                        player.machine();
                        }                                                                     
                    }
                    mark.addEventListener("click",step);
                })                
            }
             
            const highLight = (combo) => {
                    combo.forEach((idx) => box[idx].classList.add("highlight"))
            }          
           
            
            move();                        
        }    
        return {gamePlay};       
    })();
    gameBoard.gamePlay();

  });