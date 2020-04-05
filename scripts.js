const cards = document.querySelectorAll('.cards');


let hasFlippledCard = false;
let firstCard, secondCard;

let cardNumbers = new Map();
let nums = {}

//LOCK THE BOARD UNTIL CARDS UNFLIP IF THERE IS NO MATCH
let lockBoard = false;

function checkMatch() {


    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();



    } else {

        unflipCards();
    }


}

function flipCard() {


    //THIS AVOIDS DISABLING A CARD WHEN IT IS CLICKED TWICE
    if (this === firstCard) return;


    this.classList.toggle('flip');
    if (!hasFlippledCard) {

        //first click
        hasFlippledCard = true;
        //Element that has fired the event  
        firstCard = this;




    } else {
        hasFlippledCard = false;
        secondCard = this;


        checkMatch();

    }

}

function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    cardNumbers.set(firstCard.style.order, true);
    cardNumbers.set(secondCard.style.order, true);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()

    }, 500);

}

function resetBoard(cardResetNum) {
    hasFlippledCard = false;
    lockBoard = false;


    [firstCard, secondCard] = [null, null];

}

//THIS MAKES THE CARDS RANDOM WHEN THE FILE STARTS, IT IS CALLED "Immediately Invoked Function Expression"
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 100);
        card.style.order = randomPos;



    });
})();

function resetCards() {

    cards.forEach(card => {

        if (cardNumbers.has(card.style.order) || cardNumbers.has(card.style.order) === true) {



            card.classList.remove('flip');
            card.addEventListener('click', flipCard);



            

        }

        setTimeout(() => {
            suffleInGame();

        }, 500);

    });



}

cards.forEach(card => card.addEventListener('click', flipCard));

//TODO THE RESET BUTTON

//MAKE THE CARDS USABLE AFTER RESET, ATM YOU CANNOT CLICK THEM AGAIN


function suffleInGame() {


    cards.forEach(card => {


        let randomPos = Math.floor(Math.random() * 100);
        card.style.order = randomPos;

    });
}