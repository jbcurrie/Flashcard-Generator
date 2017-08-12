//define the basic card constructor
var fs = require("fs");
var EventEmitter = require('events');
var admin = require("./admin.js")

var BasicCards = [];
var count = 0;
var bool = false;

var BasicCard = function(front,back) {
    this.front = front;
    this.back = back;
}

BasicCard.prototype.writeInfo = function (front,back) {
    BasicCards.push(new BasicCard(this.front,this.back))
     fs.writeFile("basic.json", JSON.stringify(BasicCards));
}

BasicCard.readInfo = function () {
    // exports.error.bool = false;
    var truthy = true;
    if (BasicCards.length > 0) { 
        fs.readFile("basic.json","utf8", function(err,data) {
            if(err){
                console.log(err);
            }
            var temp = JSON.parse(data);
            //set a value equal to the length of the dataset
            //for length of the dataset, return one card, increment the count and wait for user input to display the next card
            if (count < temp.length) {
                var frontDisp = "\n" + `Front: ${temp[count].front}`
                var backDisp = "\n" + `Back: ${temp[count].back}`
                if (bool ===false) {
                    console.log(frontDisp)
                    return bool = true;
                };
                if (bool === true) {
                    console.log(backDisp)
                    count++
                    return bool = false;
                };
            } else {
                console.log("-----------------------" + "\n" + "you read all cards, returning to main menu!" + "\n" + "-----------------------")
                setTimeout(function () {
                    count = 0;
                    admin.mainTree();
                },1000) 
            }
        })
        return truthy = true;
    } else {
        
        console.log("-----------------------" + "\n" +"*****you haven't written any cards yet! returning to main menu.*****" + "\n" + "-----------------------");
        return truthy = false;
        // admin.mainTree();
    }
}

module.exports = BasicCard;