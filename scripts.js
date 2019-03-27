(function loadCards()
{
    let nums = [0,1,2,3,4,5,6,7,8,9,10,11],
        ranNums = [],
        i = nums.length,
        j = 0;

    /*
    the array nums will be shuffled and saved into
    array ranNums in their random order.
    The values of ranNums will be used as the index
    for the array of cards to randomly sort them
    when they are shuffled.
    * */

    /*******   ranNums   *******/
    while (i--) 
    {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }

    /*
    Creaate an HTML section and add the class
    memory-game to section.
    * */

    /*******   section   *******/
    let section = document.createElement("section");
    section.classList.add("memory-game");


    /*
    store the filenames of all the images that will
    be used in the game in an array.
    **/

    let cards = ["img/U_black.png", "img/U_black.png", "img/M.jpeg", "img/M.jpeg", "img/U_orange.jpeg",
        "img/U_orange.jpeg", "img/Z.jpg", "img/Z.jpg", "img/I.jpeg", "img/I.jpeg", "img/umuzi.png", "img/umuzi.png"];
    //cards.forEach(card => {
        //let randompos = Math.floor(Math.random() * 12) -1;
    console.log("WE're about to go in...");


    /*
    for-loop to load and shuffle cards.
    **/

    for (let index = 0; index < cards.length; index++) 
    {
        /** create a div then add to the div; a class named memory-card as well as a dataset of the card's filename **/
        let cardDiv = document.createElement('div');
        cardDiv.classList.add("memory-card");
        cardDiv.dataset.card = cards[ranNums[index]];

        /** create an image tag then add to the tag a class named front and the source of the image **/
        let frontImage = document.createElement("img");
        frontImage.classList.add("front");
        frontImage.src = cards[ranNums[index]];
        /** make the image tag as a child of the div **/
        cardDiv.appendChild(frontImage);

        /** create an image tag then add to the tag a class named back and the source of the image **/
        let backImage = document.createElement("img");
        backImage.classList.add("back");
        backImage.src = "img/umuzi_logo.png";
        /** make the image tag as a child of the div **/
        cardDiv.appendChild(backImage);

        /** make the memory-card div a child of the memory-game div **/
        section.appendChild(cardDiv);
    }
    
    /** once all cards have been loaded, add div memory-game a child of section **/
    document.body.appendChild(section);
    console.log(cards);
})();

/** get all elements in the documents with a class name of memory-card and store in cards variable **/
const cards = document.querySelectorAll('.memory-card');


/*
-lock variable to lock the board during wait period between turns as well as to prevent clicking a card twice in a turn.
-flipped variable checks if a turn has already begun.
-first & second to store the value of 'this' on each turn.
**/

let lock = false;
let flipped = false;
let first, second;

function flipCard() 
{
    /** exit function if more than two cards are clicked in a turn **/

    if (lock)
        return;

    /** add the flip class to the div of the card that's been clicked. **/

    this.classList.toggle('flip');

    /** if current card is first card; add the card's div to 'this' **/

    if (!flipped)
    {
        flipped = true;
        first = this;

    } else { /** exit function if a card is clicked more than once in a turn **/
        if (this === first)
            return;

        /** if current card is second card, reset flipped variable and set second to 'this' **/
        flipped = false;
        second = this;

        /** if cards match in a turn, remove eventListener from those cards **/

        console.log(first.dataset.card + " vs " + second.dataset.card);
        if (first.dataset.card === second.dataset.card)
        {
            console.log("They're a match!!!");
            first.removeEventListener('click', flipCard);
            second.removeEventListener('click', flipCard);
        }else {/** if cards are not a match in a turn, remove the flip class from them. **/
            lock = true;
            setTimeout(() =>{
            first.classList.remove('flip');
            second.classList.remove('flip');

            /** reset our tracking variables at the end of the turn **/
            [flipped, lock] = [false, false];
            [first, second] = [null, null];

        }, 900);
        }
    }
}

/** attach a click event to all divs we stored in cards variable and run flipcard function on that div if it's clicked on **/
cards.forEach(card => card.addEventListener('click', flipCard));