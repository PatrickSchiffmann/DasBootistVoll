//*****************************************************************************
//********************************* D I C E ***********************************
//*****************************************************************************

function Dice() {
  this.roll = function() {
    return Math.floor((Math.random()*6)+1);
  }

  this.testDice = function(times) {
    var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(var i = 0; i < 100; i++)
    {
      var result = this.roll();
      rolls[result-1]++;
    }
    console.log("======> Dice result: " + rolls);
  }
}

module.exports = Dice;