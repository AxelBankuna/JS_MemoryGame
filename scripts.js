(function loadCards() {
    var nums = [0,1,2,3,4,5,6,7,8,9,10,11],
        ranNums = [],
        i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }

    let section = document.createElement("section");
    section.classList.add("memory-game");

    let cards = ["img/U_black.png", "img/U_black.png", "img/M.jpeg", "img/M.jpeg", "img/U_orange.jpeg",
        "img/U_orange.jpeg", "img/Z.jpg", "img/Z.jpg", "img/I.jpeg", "img/I.jpeg", "img/umuzi.png", "img/umuzi.png"];
    //cards.forEach(card => {
        //let randompos = Math.floor(Math.random() * 12) -1;
    console.log("WE're about to go in...");
    for (let index = 0; index < cards.length; index++) {
        let h = document.createElement('div');
        h.classList.add("memory-card");
        h.dataset.card = cards[ranNums[index]];

        let fimg = document.createElement("img");
        fimg.classList.add("front");
        fimg.src = cards[ranNums[index]];
        h.appendChild(fimg);

        let bimg = document.createElement("img");
        bimg.classList.add("back");
        bimg.src = "img/umuzi_logo.png";
        h.appendChild(bimg);

        section.appendChild(h);
    }
        //console.log(h);

        //console.log(cards[randompos]);
    //});
    document.body.appendChild(section);
    console.log(cards);
})();

const cards = document.querySelectorAll('.memory-card');

let lock = false;
let flipped = false;
let first, second;

function flipCard() {
    if (lock)
        return;

    this.classList.toggle('flip');

    if (!flipped){
        flipped = true;
        first = this;
    } else {
        if (this === first)
            return;

        flipped = false;
        second = this;

        console.log(first.dataset.card + " vs " + second.dataset.card);
        if (first.dataset.card === second.dataset.card){
            console.log("They're a match!!!");
            first.removeEventListener('click', flipCard);
            second.removeEventListener('click', flipCard);
        }else {
            lock = true;
            setTimeout(() =>{
            first.classList.remove('flip');
            second.classList.remove('flip');

            [flipped, lock] = [false, false];
            [first, second] = [null, null];

        }, 1000);
        }
    }
}

// (function shuffle() {
//     cards.forEach(card => {
//         let randompos = Math.floor(Math.random() * 12);
//         card.style.order = randompos;
//         console.log(randompos);
//     })
// })();

cards.forEach(card => card.addEventListener('click', flipCard));