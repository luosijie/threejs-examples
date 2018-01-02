var game = new Game(showMask)
game.init()

var mask = document.querySelector('.mask')
var restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', restart) 

function restart () {
	mask.style.display = 'none'
	game.restart()
}
function showMask(){
	mask.style.display = 'flex'
}