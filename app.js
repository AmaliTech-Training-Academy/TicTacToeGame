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


//PSEUDOCODE
// 1. Convert board to array
// 2. Check if winning combo applies to 'x' or to 'o'
//      a. if none apply .... TIED STATE
//      b. Else if 'x', check who is 'x' and same for 'o' and declare winner



// convert board to array
const board = document.querySelectorAll('.box');
const boardArr = Array.from(board);

//sample arrangement on board
boardArr.forEach((element, index) => {
	if(index % 2 == 0) {
		element.classList.add('1')
	} 
})

// check win for 'x'
const checkWinX = () => {
	return WIN_COMBOS.some((combo) => {
		return combo.every((element) => {
			let condition = boardArr[element].classList.contains('x');
			return condition;
		})
	})
}

console.log(boardArr);
console.log(checkWinX());
// console.log(WIN_COMBOS);