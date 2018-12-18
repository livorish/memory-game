/*jslint es6:true*/

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
	if (lockBoard) return;
  if (this === firstCard) return;
	//console.log('we\'ve just gone that statment 1', hasFlippedCard);
	this.classList.add('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	//console.log('we\'ve just gone that statment 1', hasFlippedCard);
	//hasFlippedCard = false;
	secondCard = this;
 	//console.log('we\'ve just gone that statment 2', hasFlippedCard);
	checkForMatch();
}

function checkForMatch(){
	let isMatch =  firstCard.dataset.framework === secondCard.dataset.framework ?
	disabledCards(): unflipCards();
}

function disabledCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	//console.log('we are in unflipCards', lockBoard, hasFlippedCard);
	setTimeout(()=>{
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
		//lockBoard = false;
		//console.log('get off!', lockBoard, hasFlippedCard);
	}, 2000)
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

(function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

cards.forEach(card => card.addEventListener('click', flipCard));
