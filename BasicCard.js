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

BasicCard.prototype.writeInfo = function (front,back,cb) {
    var truthy = false;
    if (this.front.length < 1 || this.back.length <1 ) {
        console.log("---------------" + "\n"+ `*****ERROR: your cards don't have any text*****` + "\n" + "---------------");
        truthy = false;
        cb(truthy);
    } else {
        BasicCards.push(new BasicCard(this.front,this.back))
        fs.writeFile("basic.json", JSON.stringify(BasicCards));
        truthy = true;
        cb(truthy);
    }
}

BasicCard.readInfo = function (cb) {

    if (BasicCards.length > 0) { 
        fs.readFile("basic.json","utf8", function(err,data) {
            if(err){
                console.log(err);
            }
            var temp = JSON.parse(data);
            if (count < temp.length) {
                var frontDisp = `Front: ${temp[count].front}` + "\n"
                var backDisp = `Back: ${temp[count].back}` + "\n"
                if (bool === false) {
                    console.log(frontDisp)
                    cb()
                    return bool = true;
                };
                if (bool === true) {
                    console.log(backDisp)
                    count++
                    cb()
                    return bool = false;
                };
            } else {
                console.log("-----------------------" + "\n" + "you read all cards, returning to main menu!" + "\n" + "-----------------------")
                count = 0;
                admin.mainTree();
            }
        })
    } else {
        console.log("-----------------------" + "\n" +"*****you haven't written any cards yet! returning to main menu.*****" + "\n" + "-----------------------");
        admin.mainTree();
    }
}

module.exports = BasicCard;