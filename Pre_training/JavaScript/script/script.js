////////////////////
// ENUMS
const outcomeEnum = {
    WIN: "WIN",
    LOSS: "LOSS",
    DRAW: "DRAW"
};


const choiceEnum = {
    PAPER: "paper",
    ROCK: "rock",
    SCISSORS: "scissors"
}


const playerNameEnum = {
    CPU: "computer", 
    PLAYER: "player"
    // add new players below
}



////////////////////
// CLASSES
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


    versus(opponent_choice) {
        let outcome = outcomeEnum.DRAW;

        if (this.strong.includes(opponent_choice)) {
            outcome = outcomeEnum.WIN;
        }
        else if (this.weak.includes(opponent_choice)) {
            outcome = outcomeEnum.LOSS;
        }

        return outcome;
    }
}



////////////////////
// VARIABLES
let game_name_section = document.querySelector("#game_name_section");

let choices_grid = document.querySelector("#choices_grid");
let choices_grid_back = document.querySelector("#choices_grid_back");

let choice_element_array = document.querySelectorAll(".choice");
let choice_elem_dict = populateChoiceElemDict(choice_element_array);

const scores_disp = {
    WIN: document.querySelector("#win .count"),
    LOSS: document.querySelector("#loss .count"),
    DRAW: document.querySelector("#draw .count")
};

let round_disp = document.querySelector("#round .count");
let round_count = 0;

let step_disp = document.querySelector("#step");

let btn_next = document.querySelector("#btn_next");
let btn_reset = document.querySelector("#btn_reset");

let has_player_selected = false;

const scores_value = {
    WIN: 0,
    LOSS: 0,
    DRAW: 0
};



////////////////////
// FUNCTIONS
// populate "choice_elem_dict"
function populateChoiceElemDict(choice_element_array) {
    let choice_elem_dict = {};

    choice_element_array.forEach( (elem) => {
        let elem_id = elem.dataset.choice;
        choice_elem_dict[elem_id.toUpperCase()] = elem;
    } );

    return choice_elem_dict;
}


// random integer between "min" and "max"
function clampRandInt(min, max) {
    // let diffMinMax = max - min;
    // let random_int = min + Math.round(Math.random()*diffMinMax);
    // return random_int;

    let diffMinMax = max - min;
    let random_int = min + Math.floor(Math.random() * (diffMinMax + 1));
    return random_int;
}


// random choice among items of an array
function randomChoice(choices_available) {
    let choicesNumber = Object.keys(choices_available).length;
    let randomChoice = clampRandInt(0, choicesNumber-1);

    return Object.values(choices_available)[randomChoice]; 
}


// style selected ".choice::after" text
function setSelectedClass(elem, selector) {
    elem.classList.add("selected", `selection_${selector}`);

    if (selector === playerNameEnum.PLAYER) {
        has_player_selected = true;
    }
}


// remove the classes related to selection on a ".choice" element
function resetSelectionClassSingleElem(elem) {
    let selection_player_array = Object.values(playerNameEnum).map( (player) => {
        return `selection_${player}`;
    } );
    let class_to_remove = ["selected", ...selection_player_array];

    elem.classList.remove(...class_to_remove);
}


// remove the classes related to selection on a ".choice" element
function resetSelectionClassEveryElem(elem_array) {
    elem_array.forEach( (choice) => {
        resetSelectionClassSingleElem(choice);
    } );

    has_player_selected = false;
}


// style selected ".choice" background, according to the outcome of the round


// style step text, according to the outcome of the round
function setStepOutcomeClass(outcome) {
    switch (outcome) {
        case (outcomeEnum.WIN):
            step_disp.classList.add("round_win");
            break;
        case (outcomeEnum.LOSS):
            step_disp.classList.add("round_loss");
            break;
        case (outcomeEnum.DRAW):
            step_disp.classList.add("round_draw");
            break;
        default:
            break;
    }
}


// get score specific outcome from its display
function getScoreOutcome(outcome) {
    let score_outcome = parseint(scores_disp[outcome].innerText);
    scores_value[outcome] = score_outcome;
    return score_outcome;
}


// set score specific outcome to its internal count
function setScoreOutcome(outcome, value) {
    scores_value[outcome] = value;
}


// update scores displays
function updateScoresDisp() {
    Object.keys(scores_disp).forEach( (key) => {
        scores_disp[key].innerText = scores_value[key];
    });
}


// define consequences of an outcome
function consequenceOutcome(outcome) {
    setStepOutcomeClass(outcome);
    setScoreOutcome(outcome, ++scores_value[outcome]);
    updateScoresDisp();
}


// update round display
function updateRoundDisp() {
    round_disp.innerText = round_count;
}


// set round number
function setRound(round) {
    round_count = round;
    updateRoundDisp();
}


// reset the scores to 0
function resetScores() {
    // reset round display
    setRound(1);
    updateRoundDisp();

    // reset score display
    Object.keys(scores_value).forEach( (key) => {
        setScoreOutcome(key, 0);
    } );
    updateScoresDisp();
}


// reset the state of the game
function resetGame() {
    // revolving arrows animation (removed later thanks to an "animationend" eventListener)
    choices_grid_back.classList.add("swirly");

    step_disp.classList = "";
    resetSelectionClassEveryElem(choice_element_array);
    resetScores();
}


// course of the initial round
function roundInitial() {
    resetGame();
}


// move on to the next round
function roundNext() {
    if (has_player_selected) {
        setRound(++round_count);

        step_disp.classList = "";
        resetSelectionClassEveryElem(choice_element_array);
    }
}


// course of a round
function roundCourse(player_target) {
    let player_choice = new Choice(player_target.dataset.choice);
    let cpu_choice = randomChoice(choiceEnum);

    setSelectedClass(player_target, playerNameEnum.PLAYER);
    setSelectedClass(choice_elem_dict[cpu_choice.toUpperCase()], playerNameEnum.CPU);
    
    let outcome = player_choice.versus(cpu_choice);

    // console.log(`player_choice = ${player_choice}`);
    // console.log(`cpu_choice = ${cpu_choice}`);
    // console.log(`outcome = ${outcome}`);
    // console.log(``);

    consequenceOutcome(outcome);
}



////////////////////
// EVENTS
// callback when a "choice" fires a "clicked" event
choice_element_array.forEach( (choice) => {
    choice.addEventListener("click", (event) => {
        if (!has_player_selected) {
            event.stopPropagation();

            roundCourse(event.target);
        }
    });
})


// revolving arrows animation ended
choices_grid_back.addEventListener("animationend", () => {
    choices_grid_back.classList.remove("swirly");
})


// callback when "btn_next" fires a "clicked" event
btn_next.addEventListener("click", roundNext);


// callback when "btn_reset" fires a "clicked" event
btn_reset.addEventListener("click", resetGame);



////////////////////
// CALLS
roundInitial();



////////////////////
// UNUSED
/*
// add ".selected" to ".choice" elements when they are clicked
choice_element_array.forEach( (choice) => {
    choice.addEventListener("click", (event) => {
        event.stopPropagation();
        setSelectedClass(event.target, playerNameEnum.PLAYER);
    });
} );


// compare win / loss / draw
function compareScores() {
    if (score_win) {

    }
}


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