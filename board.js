window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerType = document.querySelector('.box');

    

    let board = [ '', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const isValid = (box) => {
        if (box.innerHTML === 'X' || box.innerHTML === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerType.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerType.innerText = currentPlayer;
        playerType.classList.add(`player${currentPlayer}`);
    }

    const action = (box, index) => {
        if(isValid(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            changePlayer();
        }
    }

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => action(box, index));
    });


});