// https://quizlet.com/5310015/javascript-flash-cards/
// https://quizlet.com/98407397/css-flCSS text-transform propertyash-cards/

var inquirer = require('inquirer');
//require the constructor functions
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var ques = 0;

module.exports.mainTree = function() {
    //inquirer runs to show options for the user, read or write
    inquirer.prompt([
        {
            type:"list",
            name:"choice",
            message:"What would you like to do?",
            choices:["Read my cards","Write Cards"]
        }
    ]).then(function(result){
        if(result.choice === "Read my cards") {
            return cardReader();
        } else if (result.choice === "Write Cards") {
            return cardSelection();
        }
    })
}

function cardSelection() {
    if (ques < 100) {
        console.log("-------------------" + "\n" + `You've written ${ques} cards. Ready to write more?` + "\n" + "-------------------")
        inquirer.prompt([
            {
                type: "list",
                name: "chooseCard",
                message: "Choose the card type",
                choices:["basic card","cloze card","done writing cards"]   
            }
        ]).then(function(selection) {
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
                    var createCard = new ClozeCard(cloze,full);
                    createCard.checkInfo(); 
                    ques++;
                    cardSelection();
                })
            }
            if(selection.chooseCard === "done writing cards") {
                module.exports.mainTree();
            }
        });
    }
}

function cardReader() {
    inquirer.prompt([
        {
        type: "list",
        name: "card",
        message: "\n" + "Which flashcard style would you like to review?",
        choices:["basic card","cloze card","main menu"]   
        }
    ]).then(function(read) { 
        if (read.card === "basic card") {
            var run
            BasicCard.readInfo();
                setTimeout(function () {    
                    inquirer.prompt([
                        {
                            type:"input",
                            name:"answer",
                            message:"Enter your answer:"
                        }
                    ]).then(function(response) {
                        if (response.answer) { 
                            BasicCard.readInfo()
                            setTimeout(function () {
                                return cardReader();
                            },1000);
                        }
                    });
                },1000);
                
        }
        if (read.card === "cloze card") { 
            ClozeCard.readInfo();
            setTimeout(function () {
                inquirer.prompt([
                    {
                        type:"input",
                        name:"answer",
                        message:"Enter your answer:"
                    }
                ]).then(function(response) {
                    if (response.answer) {
                        ClozeCard.readInfo();
                        setTimeout(function () {
                            return cardReader();
                        },1000);
                    }
                })
            },1000);
        };
        if (read.card === "main menu") {
            module.exports.mainTree();
        }
    })
}

module.exports.mainTree();