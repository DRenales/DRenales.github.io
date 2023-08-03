/* CONSTANT GLOBAL VARIABLES */
const types = ["C", "D", "H", "S"];
const natural = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
const face = ["J", "Q", "K"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/* VARIABLES */
let runningCount1 = 0;
let runningCount2 = 0;



/* PAGE CREATION/FILLING FUNCTIONS */
const currentPage = window.location.pathname.split("blackjack-")[1];

window.onload = currentPage == "main.html"     ? loadMain
              : currentPage == "strategy.html" ? loadStrategy
              :                                  loadPractice;

function loadMain() {
    setCardImages();
}

function loadStrategy() {
    //Test automated text filling at later time.
}

function loadPractice() {
    //Test automated text filling at later time.
}

/* END OF PAGE CREATION */

/* FUNCTIONS FOR THE MAIN PAGE */
function setCardImages() {
    natSuit   = types[Math.floor(Math.random() * types.length)];
    faceSuit  = types[Math.floor(Math.random() * types.length)];
    aceSuit   = types[Math.floor(Math.random() * types.length)];

    natValue  = natural[Math.floor(Math.random() * natural.length)];
    faceValue = face[Math.floor(Math.random() * face.length)];
    aceValue  = "A";

    natImg  = "../../images/Cards/" + natValue + "-" + natSuit + ".png";
    faceImg = "../../images/Cards/" + faceValue + "-" + faceSuit + ".png";
    aceImg  = "../../images/Cards/" + aceValue + "-" + aceSuit + ".png";

    document.getElementById("card-image-natural").src = natImg;
    document.getElementById("card-image-face").src = faceImg;
    document.getElementById("card-image-ace").src = aceImg;

    //console.log(natImg);
    //console.log(faceImg);
    //console.log(aceImg);
    //console.log(currentPage);
}

/* FUNCTIONS FOR THE STRATEGY PAGE */

/* FUNCTIONS FOR THE PRACTICE PAGE */

function initPractice() {
    event.preventDefault();

    runningCount1 = 0;
    runningCount2 = 0;

    buildDeck();
    shuffleDeck();
    loadDealer();
    loadPlayers();

    console.log(runningCount1);
    console.log(runningCount2);
}

function buildDeck() {
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    
    console.log(deck);
}

function loadDealer() {
    let card = deck.pop();

    document.getElementById("dealer").innerHTML = 
        "<h1>DEALERS HAND</h1><br>" +
        "<img src=\"../../images/Cards/BACK.png\">" +
        "<img src=\"../../images/Cards/" + card +".png\">";

    runningCount1 += calculateRunning(card.split("-")[0])[0];
    runningCount2 += calculateRunning(card.split("-")[0])[1];    
}

function loadPlayers() {

    let hands = Math.floor((Math.random() * 7) + 1);
    console.log("There are: " + hands + " in play.");
    document.getElementById("players").innerHTML = "<h1>CARDS ON THE TABLE</h1><br>";

    for(let i = 0; i < hands; i++) {
        let card1 = deck.pop();
        let card2 = deck.pop();
        document.getElementById("players").innerHTML += 
        "<img src=\"../../images/Cards/" + card1 +".png\">" +
        "<img src=\"../../images/Cards/" + card2 +".png\">";

        runningCount1 += calculateRunning(card1.split("-")[0])[0];
        runningCount2 += calculateRunning(card2.split("-")[0])[1];
    }
}

function calculateRunning(card) {
    switch(card) {
        case '2': case '3': case '4': case '5': case '6':  return [1,-1];
        case 'A': case 'J': case 'Q': case 'K': case "10": return [-1,1];
        case '7': case '8': case '9':                      return [0,0];
        default:                                           return [0,0]; 
    }
}

function checkCount(form) {
    event.preventDefault();

    let guess = form.RC.value;

         if(guess.trim() == "")                               { alert("No value input!"); }
    else if(guess == runningCount1 || guess == runningCount2) { alert("Correct!"); initPractice(); } 
    else if(guess != runningCount1 && guess != runningCount2) { alert("That is not the true deck value! Try Again!"); }
    else if(isNaN(guess))                                     { alert("Invalid Input"); }
}

/* FUNCTIONS SHARED ACROSS ALL PAGES */

function buildOLists() {    

}

function buildULists() {
    
}