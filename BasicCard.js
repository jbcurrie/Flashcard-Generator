//define the basic card constructor
var fs = require("fs");
var BasicCards = [];

var BasicCard = function(front,back) {
    this.front = front;
    this.back = back;
}
//instead, we'll export this constructor to the js file that manipulates it based on user input and app logic
BasicCard.prototype.writeInfo = function (front,back) {
    // console.log(new BasicCard(this.front,this.back));
    // console.log(example.front)
    BasicCards.push(new BasicCard(this.front,this.back))
     fs.appendFile("cards.json", JSON.stringify(BasicCards));
}

// var example = new BasicCard(process.argv[2],process.argv[3]);

// example.printInfo();
// 1. **Basic** flashcards, which have a front
//  (_"Who was the first president of the United States?"_), and a back (_"George Washington"_).

//   * This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
//     `module.exports = BasicCard;`

//   * The constructor should accept two arguments: `front` and `back`.

//   * The constructed object should have a `front` property that contains the text on the front of the card.

//   * The constructed object should have a `back` property that contains the text on the back of the card.

// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

//variables needed for constructor function
    //front
    //back
//what basic card needs to do
    //take in arguments for basic constructor
    //command prompt line new BasicCard("front","back");
        //recall the information via console.log(flashCard.front, flashCard.back);
    //for the front end: 
        //log them to a file that can be referenced
        //recall them when selected from a list of options (for the front end)
            //inquirer prompt - select basic card generator to generate cards
            //inquirer promt - select basic card quiz to display card cards sequentially 
            //end game and prompt if they want to play again
module.exports = BasicCard;