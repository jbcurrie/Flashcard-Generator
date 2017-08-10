//we'll export this module along with the functions
var fs = require("fs");
var ClozeCards = [];

var ClozeCard = function(cloze,full) {
    this.cloze = cloze
    this.full = full
    this.partial = full.replace(cloze,'____')
}
//splice the full array at index positions of the cloze
//the resulting array is turned into a string called the partial, with __ replacing the cloze text
// for the length of the full statement
ClozeCard.prototype.checkInfo = function() {
    this.temp = this.full.trim();
    // this.tempArr = this.full.split(" ");
    this.tempCloze = this.cloze.trim();
    // this.tempClozeArr = this.cloze.split(" ");
    // console.log(this.tempArr);
    // console.log(this.tempClozeArr);
    // for (var i=0; i < this.tempArr.length; i++) {
    //     if (!this.tempArr.includes(this.tempClozeArr[i])) {
    //         return console.log('cloze not included!')
    //     } else {
    //         console.log(this.tempClozeArr[i]);
    //         example.printInfo();
    //     }
    // }
    this.result = this.temp.match(this.tempCloze);
    if (this.result === null) {
        return console.log('error: your cloze is not included in the full text');
        //run the prompt for a card again
    } else {
        this.writeInfo();
        // console.log(this.result);
    }
    // this.printInfo();
    //if the text of cloze is not in the text of full, then err
    //a string has a length, each character is logged with a unique value
        //to check to see if a subset of array values are in an array, use
}
ClozeCard.prototype.writeInfo = function() {
    //print the flash card info to "the log file
    ClozeCards.push(new ClozeCard(this.cloze,this.full,this.partial))
     fs.appendFile("cards.json", JSON.stringify(ClozeCards));
    // console.log(new ClozeCard(this.cloze,this.full,this.partial))
}

module.exports = ClozeCard;
// var example = new ClozeCard(process.argv[2],process.argv[3]);

// example.checkInfo()
//partial is the part of the text of the full statement that remains when cloze is removed from that statement
    //___ had a little lamb
    //I went to the ___ to buy pampers
    //Every dog has his ___

    //each instance above is the partial. and we need the program to correctly display a full statement that shows the combination
    //i could ask them to identify the full, partial and cloze, and log all three (easiest)
// 2. **Cloze-Deleted** flashcards, which present _partial_ text 
// (_"... was the first president of the United States."_), 
// and the full text when the user requests it (_"George Washington was the first president of the United States."_)

    // A flash card built this way has three parts:

    // 1. The **full text**. This is the entire sentence users need to remember: 
    //  _"George Washington was the first president of the United States."_

    // 2. The **cloze deletion**. This is the text we've chosen to remove: 
    // _"George Washington"_.

    // 3. The **partial text**. This is what we get if we remove the **cloze deletion** from the **full text**: 
    // _"... was the first president of the United States._

//   * This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
//     `module.exports = ClozeCard;`

//   * The constructor should accept two arguments: `text` and `cloze`.

//   * The constructed object should have a `cloze` property that contains _only_ the cloze-deleted portion of the text.

//   * The constructed object should have a `partial` property that contains _only_ the partial text.

//   * The constructed object should have a `fullText` property that contains _only_ the full text.

//   * The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.

//  * Use prototypes to attach these methods, wherever possible.


// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial); "

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText): "

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze = new ClozeCard("This doesn't work", "oops");