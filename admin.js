//this file will tell the interface what to do with teh basic card and cloze card modules

//if basic card, log function, recall function

// if cloze card, log function, recall function

//then i'll export these functions as a module into another file that has the inquirer prompt, where we'll present the options for the program
    //basic card with associated log and recall functions
    //cloze card with associate log and recall functions
    //another module for the program

//may just make this file the interface and admin functionality (and add all associated functions for each type of card, to the card constructors)

//or should we have one constructor to log, another to recall, no matter the type of card? 

// https://quizlet.com/5310015/javascript-flash-cards/
// https://quizlet.com/98407397/css-flash-cards/

var inquirer = require('inquirer');
//require the constructor functions
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var ques = 0;
//
function cardSelection() {
    if (ques < 10) {
        inquirer.prompt([
        {
            type: "list",
            name: "chooseCard",
            message: "Choose the card type",
            choices:["basic card","cloze card"],   
        }
    ]).then(function (selection) {
        if (selection.chooseCard === "basic card") {
                inquirer.prompt([
                    {
                    type: "input",
                    name: "front",
                    message: "What displays on the front of your card?"
                    },
                    {
                    type: "input",
                    name: "back",
                    message: "What displays on the back of your card?"
                    }
            ]).then(function (card) {
                if (card.front !== null) {
                    var front = card.front
                }
                if (card.back !== null) {
                    var back = card.back
                }
                debugger;
                var createCard = new BasicCard(front,back);
                createCard.writeInfo(front,back);
                ques++;
                cardSelection();
            })
        };
        if (selection.chooseCard === "cloze card") {
            inquirer.prompt([
                {
                    type:"input",
                    name:"full",
                    message:"what is the full text of your cloze card?"
                },
                {
                    type:"input",
                    name:"cloze",
                    message:"what is the cloze text to be removed?"
                }
            ]).then(function(card) {
                if (card.full !== null) {
                    var full = card.full;
                }
                if (card.cloze !== null) {
                    var cloze = card.cloze;
                }
                debugger;
                var createCard = new ClozeCard(cloze,full);
                createCard.checkInfo(); 
                ques++;
                cardSelection();
            })
        }

        //if choice ====basic card, create a basic card, prompt to save, then write to file, else don't write to file, run prompt again
    });

    }
    
}

cardSelection();