const xbg = document.getElementById('x-img-id');
const obg = document.getElementById('o-img-id');
const xSelect = document.getElementById('x');
const oSelect = document.getElementById('o');

const OSVG = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>'
const XSVG = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>'

// Mark and color
const O_MARK = [OSVG, '#FFC860', 'playerO', './starter-code/assets/icon-o-grey.svg', "url('./starter-code/assets/icon-o-grey.svg')"];
const X_MARK = [XSVG, '#31C3BD', 'playerX', './starter-code/assets/icon-x-grey.svg', "url('./starter-code/assets/icon-x-grey.svg')"];

// Assign user and computer
let user = O_MARK
let computer = X_MARK

// clear before storage
sessionStorage.clear()
// store variable for us in other sessions
sessionStorage.setItem("user", JSON.stringify(O_MARK))
sessionStorage.setItem("computer", JSON.stringify(X_MARK))

// toggles
const toggleX = () => {
    xbg.style.backgroundColor = '#A8BFC9'
    xSelect.style.filter = 'invert(12%) sepia(12%) saturate(1823%) hue-rotate(157deg) brightness(96%) contrast(90%)'
    obg.style.backgroundColor = '#1A2A33'
    oSelect.style.filter = 'invert(79%) sepia(32%) saturate(145%) hue-rotate(153deg) brightness(90%) contrast(89%)'
    sessionStorage.setItem("user", JSON.stringify(X_MARK))
    sessionStorage.setItem("computer", JSON.stringify(O_MARK))
}

const toggleO = () => {
    obg.style.backgroundColor = '#A8BFC9'
    oSelect.style.filter = 'invert(12%) sepia(12%) saturate(1823%) hue-rotate(157deg) brightness(96%) contrast(90%)'
    xbg.style.backgroundColor = '#1A2A33'
    xSelect.style.filter = 'invert(79%) sepia(32%) saturate(145%) hue-rotate(153deg) brightness(90%) contrast(89%)'
    sessionStorage.setItem("user", JSON.stringify(O_MARK))
    sessionStorage.setItem("computer", JSON.stringify(X_MARK))
}


xbg.addEventListener('click', toggleX)
obg.addEventListener('click', toggleO) 
