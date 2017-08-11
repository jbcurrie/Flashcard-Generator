//we'll export this module along with the functions
var fs = require("fs");
var admin = require("./admin.js")

var ClozeCards = [];
var count = 0;
var bool = false;


var ClozeCard = function(cloze,full) {
    this.cloze = cloze
    this.full = full
    this.partial = full.replace(cloze,'____')
}

ClozeCard.prototype.checkInfo = function() {
    this.temp = this.full.trim();
    this.tempCloze = this.cloze.trim();
    this.result = this.temp.match(this.tempCloze);

    if (this.result === null) {
        return console.log("---------------" + "\n"+ `*****ERROR: your cloze statement, ${this.tempCloze} is not included in the full text*****` + "\n" + "---------------");
    } else {
        this.writeInfo();
    }
}

ClozeCard.prototype.writeInfo = function() {
    //print the flash card info to "the log file
    ClozeCards.push(new ClozeCard(this.cloze,this.full,this.partial))
     fs.writeFile("cloze.json", JSON.stringify(ClozeCards));
}

ClozeCard.readInfo = function () {
    debugger;
    if (ClozeCards.length > 0) { 
        fs.readFile("cloze.json","utf8", function(err,data) {
            if(err){
                console.log(err);
            } else {
                //set a value equal to the length of the dataset
                //for length of the dataset, return one card, increment the count and wait for user input to display the next card
                var temp = JSON.parse(data);

                if (count < temp.length) {
                    debugger;
                    var partialDisp = `Partial: ${temp[count].partial}`
                    var fullDisp = `Full: ${temp[count].full}`
                    if (bool ===false) {
                        console.log(partialDisp)
                        return bool = true;
                    };
                    if (bool === true) {
                        console.log(fullDisp)
                        count++
                        return bool = false;
                    };
                } else {
                    console.log("-----------------------" + "\n" + "you read all cards, returning to main menu!" + "\n" + "-----------------------")
                    setTimeout(function () {
                        count = 0;
                        return admin.mainTree();
                    },1000)
                }
            }
        })
    } else {
        console.log("-----------------------" + "\n" +"*****you haven't written any cards yet! returning to main menu.*****" + "\n" + "-----------------------");
        return admin.mainTree();
    }
}

module.exports = ClozeCard;
