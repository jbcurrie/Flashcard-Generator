//export this module along with the functions
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

ClozeCard.prototype.checkInfo = function(cb) {
    var truthy = true;
    this.temp = this.full.trim();
    this.tempCloze = this.cloze.trim();
    this.result = this.temp.match(this.tempCloze);

    if (this.result === null || this.tempCloze.length < 1) {
        console.log("---------------" + "\n"+ `*****ERROR: your cloze statement, ${this.tempCloze} is not included in the full text*****` + "\n" + "---------------");
        truthy = false;
        cb(truthy);
    } else {
        this.writeInfo();
        truthy = true;
        cb(truthy);
    }
}

ClozeCard.prototype.writeInfo = function() {
    //print the flash card info to "the log file
    ClozeCards.push(new ClozeCard(this.cloze,this.full,this.partial))
     fs.writeFile("cloze.json", JSON.stringify(ClozeCards));
}

ClozeCard.readInfo = function (cb) {
    if (ClozeCards.length > 0) { 
        fs.readFile("cloze.json","utf8", function(err,data) {
            if(err){
                console.log(err);
            } else {
                var temp = JSON.parse(data);

                if (count < temp.length) {
                    
                    var partialDisp = `Partial: ${temp[count].partial}` + "\n"
                    var fullDisp = "\n" + `Full: ${temp[count].full}` + "\n"
                    if (bool ===false) {
                        console.log(partialDisp)
                        cb()
                        return bool = true;
                    };
                    if (bool === true) {
                        console.log(fullDisp)
                        count++
                        cb()
                        return bool = false;
                    };
                } else {
                    console.log("-----------------------" + "\n" + "you read all cards, returning to main menu!" + "\n" + "-----------------------")
                        count = 0;
                        admin.mainTree();
                }
            }
        })
    } else {
        console.log("-----------------------" + "\n" +"*****you haven't written any cards yet! returning to main menu.*****" + "\n" + "-----------------------");
        admin.mainTree();
    }
}

module.exports = ClozeCard;
