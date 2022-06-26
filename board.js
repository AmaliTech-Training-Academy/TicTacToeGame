window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));

    //playerType is returning only first box
    const playerType = document.querySelectorAll('.box');
    let turnImage = "./starter-code/assets/images/XX.png"
    // console.log(playerType);

    document.getElementById("turn-icon-img").src = "./starter-code/assets/images/OO.png";


    //tracking choices
    let board = [ '', '', '', '', '', '', '', '', ''];

    //set current player based on selected starting icon
    let currentPlayer = 'X';
    let isGameActive = true;

    // this function must check the class not the innerHTML
    const isValid = (box) => {
        if (box.classList.contains('playerX') || box.classList.contains('playerO') === 'O'){
            return false;
        }
        return true;
    };

    //update tracking board with choices
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const updateTurn = () => {
        turnImage = turnImage === './starter-code/assets/images/XX.png' ? './starter-code/assets/images/OO.png' : './starter-code/assets/images/XX.png'
        return turnImage;
    }

    const changePlayer = () => {
        // this.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerType.innerText = currentPlayer;
        document.getElementById("turn-icon").src = updateTurn();
        // playerType.classList.add(`player${currentPlayer}`);
        console.log(document.getElementById("turn-icon").src)
    }

    const action = (box, index) => {
        if(isValid(box) && isGameActive) {
            // box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            changePlayer();
        }
    }

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => action(box, index));
    });


});