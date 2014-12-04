// sexes
const FEMALE = 0;
const MALE = 1;

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

const LOW = 1;
const HI = 2;
const AVG = 3;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

io.set('log level', 1);

app.use("/", express.static(__dirname + '/static'));
app.use("/media", express.static(__dirname + '/media'));

var Game = require('./classes/cGame.js');
var Player = require('./classes/cPlayer.js');
var Dice = require('./classes/cDice.js');

var myGame = new Game();
myGame.initialise();
var myDice = new Dice();


//Replaces HTML special chars in user input by their escape strings
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

io.sockets.on('connection', function(socket)
{
  socket.on('disconnect', function()
  {
    if(socket.name === undefined)
    {
      console.log("Leaving player never defined");
      return;
    }

    var roomID = socket.room;
    var current_room = myGame.getRoomByID(roomID);
    var playerName = socket.name;
    var playerUID = socket.uid;
    var leaving_player = current_room.findPlayerByUID(playerUID);
    var currentIsLeaving = false;

    console.log('player left: ' + playerName + '[' + playerUID + '] room ' + (roomID + 1));

    if(leaving_player == current_room.getCurrentPlayer())
    {
      currentIsLeaving = true;
    }

    io.sockets.in(socket.room).emit('delete figure', leaving_player.getField(), leaving_player.getPlayerNr());
    myGame.removePlayer(leaving_player, roomID);
    io.sockets.in(socket.room).emit('update playernumber', myGame.getRoomByID(roomID).getNrPlayers());

    if(current_room.getNrPlayers() == 0)
    {
      return;
    }

    try
    {
      current_room.getCurrentPlayer().getName();
    }
    catch(e)
    {
      console.log('last player left - undefined currentPlayerIndex!');
      current_room.nextPlayer();
    }

    var playerlist = [];
    for(var i = 1; i <= current_room.getNrPlayers(); i++)
    {
      var j = i - 1;
      var player = current_room.getPlayers()[j];
      playerlist[j] = [player.getName(), player.getCharID(), player.getPlayerNr()];
    }
    io.sockets.in(socket.room).emit('update playerlist', JSON.stringify(playerlist));

    if(currentIsLeaving)
    {
      var current_player = current_room.getCurrentPlayer();
      console.log("Active Player: " + current_player.getPlayerNr() + " with ID: " + current_player.getUniqueID());
      io.sockets.in(socket.room).emit('active player', current_player.getPlayerNr(), current_player.getUniqueID());
    }
  });

  socket.on('join room', function(roomID, name)
  {
    var current_room = myGame.getRoomByID(roomID);
    var playerNr = current_room.generatePlayerNr();
    socket.emit('update playernumber', current_room.getNrPlayers());

    socket.name = name;
    socket.room = roomID;
    socket.playerNr = playerNr;

    var newPlayer = new Player(name, playerNr);
    myGame.addPlayer(newPlayer, roomID);

    socket.emit('unique id', newPlayer.getUniqueID());
    socket.uid = newPlayer.getUniqueID();

    // show all current players including yourself
    for(var iter in current_room.getPlayers())
    {
      var player = current_room.getPlayers()[iter];
      var pNr = player.getPlayerNr() - 1;
      io.sockets.in(socket.room).emit('show figures', pNr, player.getField());
    }

    socket.join(socket.room);
    var j = roomID + 1;
    console.log('Player ' + name + ' joined roomID ' + j + ' with playerNr ' + playerNr);
    io.sockets.in(socket.room).emit('update playernumber', current_room.getNrPlayers());
    myGame.printPlayers();
  });

  socket.on('is ready', function(uid, room)
  {
    var current_room = myGame.getRoomByID(room);
    var player = current_room.findPlayerByUID(uid);
    player.setReady(true);
    socket.ready = true;
    console.log('[' + room + '] : ' + player.getName() + ' is ready');

    if(current_room.getNrPlayers() < 2)
    {
      console.log('only one player - can\'t play alone');
      return;
    }

    // check if everybody ready
    for(var iter in current_room.getPlayers())
    {
      if(!current_room.getPlayers()[iter].isReady())
      {
        console.log('[' + room + '] : room not ready');
        return;
      }
    }

    console.log('[' + room + '] : everbody ready!');
    var curr_player = current_room.getCurrentPlayer();
    io.sockets.in(socket.room).emit('active player', current_room.getCurrentPlayerIndex(), curr_player.getUniqueID());
    console.log("Active Player: " + current_room.getCurrentPlayerIndex() + " with ID: " + curr_player.getUniqueID());
  });

  socket.on('leave game', function(playerName, roomID)
  {
    console.log('-------- NOT IMPLEMENTED --------');
    console.log('on "leave game": ' + playerName + ' from room ' + roomID);
    console.log('---------------------------------');
  });

  socket.on('get name', function()
  {
    socket.emit('receive name', socket.name);
  });

  socket.on('update playerinfo', function(uid, roomID)
  {
    var currentPlayer = myGame.getRoomByID(roomID).findPlayerByUID(uid);
    var info = {};

    info['charID'] = currentPlayer.getCharID() + 1;
    info['name'] = currentPlayer.getName();
    info['charName'] = currentPlayer.getCharacter().getName();
    info['status'] = currentPlayer.getStatus();
    info['income'] = currentPlayer.getSalary();
    info['moneysack'] = currentPlayer.getMoney();

    socket.emit('receive playerinfo', JSON.stringify(info));
  });

  socket.on('show foreign playerinfo', function(roomID, pNr)
  {
    var info = {};
    var current_room = myGame.getRoomByID(roomID);
    var f_player = current_room.findPlayerByPlayerNr(pNr);

    info['charID'] = f_player.getCharID() + 1;
    info['name'] = f_player.getName();
    info['charName'] = f_player.getCharacter().getName();
    info['status'] = f_player.getStatus();
    info['income'] = f_player.getSalary();
    info['moneysack'] = f_player.getMoney();

    socket.emit('receive foreign playerinfo', JSON.stringify(info));
  });

  socket.on('get characters', function()
  {
    var characters = myGame.getCharacters();
    var charNames = [];

    for(var iter in characters)
    {
      charNames.push(characters[iter].getName());
    }

    socket.emit('receive characters', charNames);
  });

  socket.on('show fieldinfo', function(fieldNr)
  {
    var infos = {};
    var field = myGame.getBoard()[fieldNr - 1];
    var priceModel = field.getPriceModel();

    infos['name'] = field.getName();
    infos['ghetto'] = field.getGhettoName();
    infos['rent'] = priceModel.getRent();
    infos['house1'] = priceModel.getHouse1Rent();
    infos['house2'] = priceModel.getHouse2Rent();
    infos['house3'] = priceModel.getHouse3Rent();
    infos['house4'] = priceModel.getHouse4Rent();
    infos['hotel'] = priceModel.getHotelRent();
    infos['price'] = priceModel.getPrice();
    infos['priceHouse'] = priceModel.getPriceHouse();
    infos['priceHotel'] = priceModel.getPriceHotel();
    if(field.getOwner() == null)
    {
      infos['owner'] = 'frei';
    }
    else
    {
      infos['owner'] = field.getOwner().getName();
    }

    socket.emit('receive fieldinfo', JSON.stringify(infos));
  });

  socket.on('throw dices', function(uid, roomID)
  {
    var current_room = myGame.getRoomByID(roomID);
    var currentBoard = current_room.getBoard();
    var player = current_room.findPlayerByUID(uid);

    var roll1 = myDice.roll();
    var roll2 = myDice.roll();

    player.makeMove(roll1 + roll2);
    var currentFieldNr = player.getField();
    console.log(player.getName() + ' moves to currField ' + currentFieldNr + ' [' + roll1 + '+' + roll2 + ']');

    var currField = currentBoard[currentFieldNr - 1];
    var fieldType = currField.getType();

    if(fieldType == RISK)
    {
      console.log('apply risk card');
      var card_id = current_room.getRiskCards().draw();
      socket.emit('receive riskcard', card_id);
      current_room.getRiskCards().getCardById(card_id).apply(player);
    }
    else if(fieldType == JOB)
    {
      console.log('apply job card');
      var card_id = current_room.getJobCards().draw();
      socket.emit('receive jobcard', card_id);
      current_room.getJobCards().getCardById(card_id).apply(player);
    }
    else if(fieldType == FELONY)
    {
      socket.emit('popup', 'Du musst ins Gefängis!');
      player.setField(31);
      player.throwInPrison(3);
    }
    else if(fieldType == IMMO)
    {
      console.log('immo currField');
      var owner = currField.getOwner();

      // currField not owned -- works like a charm!
      if(owner == null)
      {
        console.log('field ' + currField.getName() + 'available to buy');
        var immoPrice = currField.getPriceModel().getPrice();
        if(player.getMoney() >= immoPrice)
        {
          console.log('\tbuy field ' + currField.getName() + ' ?');
          socket.emit('buy field?', currentFieldNr);
        }
        else
        {
          console.log('\t' + currField.getName() + ' too expensive for ' + player.getName());
          socket.emit('field too expensive');
        }
      }
      // currField owned by yourself - buy house?
      else if(owner.getUniqueID() == uid)
      {
        console.log('YOU da owner!!! [' + player.getName() + ']');
        var housePrice = currField.getPriceModel().getPriceHouse();
        if(player.getMoney() >= housePrice)
        {
          console.log('\tbuy house on ' + currField.getName() + ' ?');
          socket.emit('buy house?', currentFieldNr);
        }
        else
        {
          console.log('\thouse too expensive for ' + player.getName());
          socket.emit('house too expensive');
        }
      }
      // currField owned by somebody else - pay rent!
      else
      {
        console.log('field owned by ' + owner.getName() + ' -> pay rent!');
        var rent = currField.getRent();

        player.pay(rent);
        owner.receive(rent);

        console.log('\t' + player.getName() + ' payed ' + owner.getName() + ' ' + rent);
        socket.emit('pay rent!', rent);
      }
    }
    console.log('----------------------------');

    io.sockets.in(socket.room).emit('show figures', player.getPlayerNr() - 1, player.getField());
    socket.emit('dice results', roll1, roll2);

    current_room.nextPlayer();
    while(current_room.getCurrentPlayer().isInPrison() != 0)
    {
      var p = current_room.getCurrentPlayer();
      var rounds = p.isInPrison();
      p.throwInPrison(rounds - 1);
      var msg;
      if(p.isInPrison() > 0)
      {
        msg = 'Du bist noch ' + p.isInPrison() + ' Runde(n) im Gefängis.';
      }
      if(p.isInPrison() == 0)
      {
        msg = 'Du kannst wieder aus dem Gefängis und bist beim nächsten Mal wieder dran!';
      }
      io.sockets.in(socket.room).emit('private popup', p.getUniqueID(), msg);
      current_room.nextPlayer();
    }

    var current_player = current_room.getCurrentPlayer();
    io.sockets.in(socket.room).emit('active player', current_player.getPlayerNr(), current_player.getUniqueID());
    console.log("Active Player: " + current_player.getPlayerNr() + " with ID: " + current_player.getUniqueID());
  });

  socket.on('choose character', function(uid, roomID, charID)
  {
    socket.charID = charID;
    var myChar = myGame.getCharacters()[charID];
    var player = myGame.getRoomByID(roomID).findPlayerByUID(uid);

    player.setCharID(charID);
    player.setCharacter(myChar);
    player.setCharName(myChar.getName());
    player.setSex(myChar.getSex());
    player.setEuCitizen(myChar.isEU()); // setzt du nostrifikation auch für EU bürger? wichtig!
    player.setMajority(myChar.isMajority());
    player.setBaseStatus(myChar.getStatus());
    player.setAge(myChar.getAge());
  });

  socket.on('update playerlist', function(room)
  {
    var playerlist = [];
    var current_room = myGame.getRoomByID(room);

    for(var i = 1; i <= current_room.getNrPlayers(); i++)
    {
      var j = i - 1;
      var player = current_room.getPlayers()[j];
      playerlist[j] = [player.getName(), player.getCharID(), player.getPlayerNr()];
    }
    io.sockets.in(socket.room).emit('update playerlist', JSON.stringify(playerlist));
  });

  socket.on('send message', function(data)
  {
    if(data == '')
    {
      return;
    }
	
    var chat = {};
    chat['name'] = socket.name;
    chat['msg'] = escapeHtml(data);

    io.sockets.in(socket.room).emit('new chat message', JSON.stringify(chat));
  });

  socket.on('buy field!', function(uid, roomID, currentField)
  {
    var current_room = myGame.getRoomByID(roomID);
    var board = current_room.getBoard();
    var player = current_room.findPlayerByUID(uid);

    var immoPrice = board[currentField - 1].getPriceModel().getPrice();
    board[currentField - 1].setOwner(player);
    player.buyField(currentField - 1);
    player.pay(immoPrice);

    console.log(player.getOwnedFields());
    io.sockets.in(socket.room).emit('field owner', currentField, player.getPlayerNr());
  });

  socket.on('buy house!', function(uid, roomID, currentField)
  {
    var current_room = myGame.getRoomByID(roomID);
    var board = current_room.getBoard();
    var player = current_room.findPlayerByUID(uid);

    var housePrice = board[currentField - 1].getPriceModel().getPriceHouse();
    board[currentField - 1].buyHouse();
    console.log('player ' + player.getName() + ' buys house [' + board[currentField - 1].getHouses() + '] on ' + currentField)
    player.pay(housePrice);
  });
  
  socket.on('request status', function()
  {
	//Prevent crash if user is not yet in room
	if(socket.room == null || socket.uid == null)
		return 0;
		
	var current_room = myGame.getRoomByID(socket.room);
	var player = current_room.findPlayerByUID(socket.uid)
	
	var info = {};

    info['sex'] = player.getSex();
	info['majority'] = player.getMajority();
	info['age'] = player.getAge();
	info['education'] = player.getEducationLevel();
	
	info['language'] = player.getLanguage();
	info['HrTrainer'] = player.getHrTrainer();
	info['Licence'] = player.getLicence();
	info['It'] = player.getIt();
	info['Mba'] = player.getMba();
	
	info['EuCitizen'] = player.getEuCitizen();
	info['Nostrification'] = player.getNostrification();
	info['Residency'] = player.getResidency();
	
	info['Car'] = player.getCar();
	info['FreeLawyers'] = player.getFreeLawyers();
	info['FreeCarRepairs'] = player.getFreeCarRepairs();
	info['FreeJailbreaks'] = player.getFreeJailbreaks();

    socket.emit('receive status', JSON.stringify(info));
  });
});