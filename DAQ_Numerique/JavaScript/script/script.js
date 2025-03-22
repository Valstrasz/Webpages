////////////////////
// ENUM
const choiceEnum = {
    PAPER: Symbol("paper"),
    ROCK: Symbol("rock"),
    SCISSORS: Symbol("scissors")
}



////////////////////
// CLASS
class Choice {
    constructor(choice_name) {
        switch (choice_name) {
            case choiceEnum.PAPER:
                this.self = choiceEnum.PAPER;
                this.strong = [choiceEnum.ROCK];
                this.weak = [choiceEnum.SCISSORS];
                break;
            case choiceEnum.ROCK:
                this.self = choiceEnum.ROCK;
                this.strong = [choiceEnum.SCISSORS];
                this.weak = [choiceEnum.PAPER];
                break;
            case choiceEnum.SCISSORS:
                this.self = choiceEnum.SCISSORS;
                this.strong = [choiceEnum.PAPER];
                this.weak = [choiceEnum.ROCK];
                break;
            default:
                this.self = "";
                this.strong = [];
                this.weak = [];
        }
    }
}



////////////////////
// VARIABLES
var game_name_section = document.querySelector("#game_name_section");
var choices_grid = document.querySelector("#choices_grid");
var choices_grid_back = document.querySelector("#choices_grid_back");
var reset_btn = document.querySelector("#reset_btn");



////////////////////
// FUNCTIONS
// random integer between "min" and "max"
function clampRandInt(min, max) {
    let diffMinMax = max - min;
    let random_int = min + Math.round(Math.random()*diffMinMax);
    return random_int;
}


// reset function
function reset() {
    // revolving arrows animation
    choices_grid_back.classList.add("swirly");
}



////////////////////
// EVENTS
// revolving arrows animation ended
choices_grid_back.addEventListener("animationend", () => {
    choices_grid_back.classList.remove("swirly");
})

// reset_btn clicked
reset_btn.addEventListener("click", reset);



////////////////////
// UNUSED 
/*
game_name_section.addEventListener("mouseover", (e) => {
    if ( e.target.classList.contains("syllable") ) {
        // e.stopPropagation();
        // let char_lat = e.target.querySelector(".char_lat");
        // char_lat.setAttribute("visibility", "visible");
        console.log("OVER");
    }
});


game_name_section.addEventListener("mouseout", (e) => {
    if ( e.target.classList.contains("syllable") ) {
        // e.stopPropagation();
        // let char_lat = e.target.querySelector(".char_lat");
        // char_lat.setAttribute("visibility", "hidden");
        console.log("OUT");
    }
})
*/