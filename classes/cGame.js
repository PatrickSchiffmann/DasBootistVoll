//*****************************************************************************
//********************************* G A M E ***********************************
//*****************************************************************************

// sexes
const MALE = 0;
const FEMALE = 1;

// education
const NONE = 0;
const POOR = 1;
const HIGH = 2;

// majority
const MAJORITY = true;
const MINORITY = false;

// field types
const START = 0;
const IMMO = 1;
const RISK = 2;
const JOB = 3;
const FELONY = 4;
const TRAINING = 5;
const JAIL = 6;

// ghettos
const REDLIGHT = 0;
const OLD_TOWN = 1;
const INNER_CITY = 2;
const FIN_DISTRICT = 3;
const HOTSPOT = 4;
const UNI = 5;
const INDUSTRY = 6;
const MANSIONS = 7;

var Room = require("./cRoom.js");
var Character = require("./cCharacter.js");
var PriceModel = require("./cPriceModel.js");
var Field = require("./cField.js");
var ImmoField = require("./cImmoField.js");
var Player = require("./cPlayer.js");

var CHARS = require('./mCharacter.js');
var PRICEMODELS = require('./mPriceModel.js');
var BOARD = require('./mBoard.js');
var JOBCARDS = require('./mJobCards.js');
var RISKCARDS = require('./mRiskCards.js');

function Game()
{
  var rooms_ = [];
  var allPlayers_ = [];
  var characters_ = null;
  var priceModels_ = null;
  var startingBoard_ = null;

  this.setCharacters = function(characters)
  {
    characters_ = characters;
  }

  this.setPriceModels = function(models)
  {
    priceModels_ = models;
  }

  this.setBoard = function(board)
  {
    startingBoard_ = board;
  }

  this.getBoard = function()
  {
    return startingBoard_;
  }

  this.getCharacters = function()
  {
    return characters_;
  }

  this.getPlayers = function()
  {
    return allPlayers_;
  }

  this.getRooms = function()
  {
    return rooms_;
  }

  this.getRoomByID = function(id)
  {
    return rooms_[id];
  }

  this.addPlayer = function(player, room)
  {
    allPlayers_.push(player);
    rooms_[room].addPlayer(player);
  }

  this.removePlayer = function(player, roomID)
  {
    var index = allPlayers_.indexOf(player);
    if(index > -1)
    {
      allPlayers_.splice(index, 1);
    }
    rooms_[roomID].removePlayer(player);
  }

  this.printPlayers = function()
  {
    console.log("\nAll players: ");
    for(var iter in allPlayers_)
      console.log("\t" + allPlayers_[iter].getName());
  }

  this.printRooms = function()
  {
    console.log("\nAll rooms: ");
    for(var i = 0; i < rooms_.length; i++)
    {
      //console.log(rooms_[i].getPlayers().length);
      if(rooms_[i].getPlayers().length > 0)
      {
        var j = i + 1;
        console.log("Room " + j + " :");
        for(var iter in rooms_[i].getPlayers())
        {
          var tmp = rooms_[i].getPlayers();
          console.log("\t" + tmp[iter].getName());
        }
      }
    }
  }

  this.printCharacters = function()
  {
    console.log("All characters: ");
    for(var i = 0; i < rooms_.length; i++)
    {
      if(rooms_[i].getPlayers().length > 0)
      {
        var j = i + 1;
        console.log("Room " + j + " :");
        for(var iter in rooms_[i].getPlayers())
        {
          var tmp = rooms_[i].getPlayers();
          console.log("\t" + tmp[iter].getName() + "[" + tmp[iter].getField() + "] is playing : " + tmp[iter].getCharacter().getName());
        }
      }
    }
  }

  this.initialise = function()
  {
    // create rooms
    for(var i = 0; i < 16; i++)
    {
      var tmp = new Room(i);
      tmp.setRiskCards(RISKCARDS);
      tmp.setJobCards(JOBCARDS);
      tmp.setBoard(BOARD);
      rooms_.push(tmp);
    }

    this.setCharacters(CHARS);

    /*for(var iter in characters_)
     console.log(characters_[iter].getName());*/

    console.log("Characters loaded: \t" + characters_.length);

    this.setPriceModels(PRICEMODELS);
    this.setBoard(BOARD);

    console.log("Board initialised.\t" + startingBoard_.length)
    /*for(var iter in startingBoard_)
     console.log(startingBoard_[iter].printInfo());*/
  }
}

module.exports = Game;