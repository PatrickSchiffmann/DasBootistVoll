//*****************************************************************************
//********************************* R O O M ***********************************
//*****************************************************************************

function Room(id)
{
  var id_ = id;
  var playing_ = [];
  var riskCards_ = null;
  var jobCards_ = null;
  var nrPlayers_ = 0;
  var colors_ = [null, null, null, null, null, null];
  var closed_ = false;
  var currentPlayerIndex_ = 1;
  var board_ = null;
  var activePlayer_ = [];

  this.addPlayer = function(player)
  {
    playing_.push(player);
  }

  this.removePlayer = function(player)
  {
    nrPlayers_ = nrPlayers_ - 1;
    console.log("after removal : " + nrPlayers_ + ' players');
    colors_[player.getPlayerNr() - 1] = null;
    var index = playing_.indexOf(player);
    if(index > -1)
    {
      playing_.splice(index, 1);
    }
  }

  this.generatePlayerNr = function()
  {
    for(var i = 0; colors_.length; i++)
    {
      if(colors_[i] === null)
      {
        colors_[i] = 'X';
        return i + 1;
      }
    }
  }

  this.isReady = function()
  {
    if(nrPlayers_ > 1)
      return true;
    else
      return false;
  }

  this.findPlayerByName = function(name)
  {
    for(var iter in playing_)
    {
      if(playing_[iter].getName() === name)
      {
        return playing_[iter];
      }
    }
  }

  this.findPlayerByUID = function(uid)
  {
    for(var iter in playing_)
    {
      if(playing_[iter].getUniqueID() === uid)
      {
        return playing_[iter];
      }
    }
  }

  this.nextPlayer = function()
  {
    currentPlayerIndex_ = currentPlayerIndex_ + 1;
    if(currentPlayerIndex_ > playing_.length)
      currentPlayerIndex_ = 1;
  }

  this.setRiskCards = function(cards)
  {
    riskCards_ = cards;
  }

  this.setJobCards = function(cards)
  {
    jobCards_ = cards;
  }

  this.setNrPlayers = function(nr)
  {
    nrPlayers_ = nr;
  }

  this.setClosed = function(bool)
  {
    closed_ = bool;
  }

  this.setBoard = function(board)
  {
    board_ = board;
  }

  this.setCurrentPlayerIndex = function(index)
  {
    currentPlayerIndex_ = index;
  }

  this.getID = function()
  {
    return id_;
  }

  this.getPlayers = function()
  {
    return playing_;
  }

  this.getRiskCards = function()
  {
    return riskCards_;
  }

  this.getJobCards = function()
  {
    return jobCards_;
  }

  this.getNrPlayers = function()
  {
    return playing_.length;
  }

  this.getBoard = function()
  {
    return board_;
  }

  this.isClosed = function()
  {
    return closed_;
  }

  this.getCurrentPlayerIndex = function()
  {
    return currentPlayerIndex_;
  }

  this.getCurrentPlayer = function()
  {
    return playing_[currentPlayerIndex_ - 1];
  }
}

module.exports = Room;