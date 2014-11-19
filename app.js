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
const HI = 1;
const AVG = 3;

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

io.set('log level', 1);

app.use("/", express.static(__dirname + '/static'))
app.use("/media", express.static(__dirname + '/media'))

var Game = require('./classes/cGame.js');
var Player = require('./classes/cPlayer.js');
var Character = require('./classes/cCharacter.js');
var Dice = require('./classes/cDice.js');

var BOARD = require('./classes/mBoard.js');

var myGame = new Game();
myGame.initialise();
var myDice = new Dice();

io.sockets.on('connection', function(socket) {

    socket.on('disconnect', function() {
		if(socket.name === undefined)
			console.log("Error while disconnecting")
		else
		{
		    console.log('player left: ' + socket.name + ' room ' + (socket.room + 1));
			var roomID = socket.room;
			var playerName = socket.name;
			if (myGame.getRooms()[roomID].getPlayers())
				for (var iter in myGame.getRooms()[roomID].getPlayers()) {
					if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === playerName) {
						var p = myGame.getRooms()[roomID].getPlayers()[iter];
						io.sockets.in(socket.roomID).emit('delete figure', p.getField(), p.getPlayerNr());
						myGame.removePlayer(myGame.getRooms()[roomID].getPlayers()[iter], roomID);
					}
				}

			console.log('player left: playernumber = ' + myGame.getRooms()[roomID].getNrPlayers());
			io.sockets.in(socket.roomID).emit('update playernumber', myGame.getRooms()[roomID].getNrPlayers());

			var currRoom = myGame.getRooms()[roomID];
			var playerlist = new Array();
			for (var i = 0; i < currRoom.getNrPlayers(); i++) {
				playerlist[i] = [currRoom.getPlayers()[i].getName(),
					currRoom.getPlayers()[i].getCharID(),
					currRoom.getPlayers()[i].getPlayerNr()
				];
			}
			io.sockets.in(socket.room).emit('update playerlist', JSON.stringify(playerlist));
		}
    });

    socket.on('join room', function(room, name) {
        // socket sachen schmeißen und in den room[roomid] speichern
        myGame.getRooms()[room].setNrPlayers(myGame.getRooms()[room].getNrPlayers() + 1);
		//console.log('new room playernumber = ' + myGame.getRooms()[room].getNrPlayers());
        var playerNr = myGame.getRooms()[room].generatePlayerNr();
        
		//console.log('playerNr = ' + playerNr);
        socket.emit('update playernumber', myGame.getRooms()[room].getNrPlayers());
        socket.name = name;
        socket.room = room;

        // TODO: check if name already exists !!!
        var newPlayer = new Player(name, playerNr);
        socket.playerNr = playerNr;
        myGame.addPlayer(newPlayer, room);

        // show all current players including yourself
        for (var iter in myGame.getRooms()[room].getPlayers()) {
            var playerNr = myGame.getRooms()[room].getPlayers()[iter].getPlayerNr() - 1;
            var playerFieldNr = myGame.getRooms()[room].getPlayers()[iter].getField();
            io.sockets.in(socket.room).emit('show figures', playerNr, playerFieldNr);
        }

        socket.join(socket.room);
        var j = room + 1;
        console.log('Player ' + name + ' joined room ' + j + ' with playerNr ' + playerNr);
        io.sockets.in(socket.room).emit('update playernumber', myGame.getRooms()[room].getNrPlayers());
        myGame.printPlayers();
    });

  socket.on('is ready', function(name, room)
  {
    socket.ready = true;
    var r = myGame.getRooms()[room];
    var p = r.findPlayerByName(name);
    p.setReady(true);
    console.log('[' + room + '] : ' + name + ' is ready');

    //Pseudo Uids, ändern auf GUIDs!
    socket.emit('unique id', p.getUniqueID());
    socket.uid = p.getUniqueID();

    if (r.getNrPlayers() < 2) {
      console.log('only one player - can\'t play alone');
      return;
    }

    // check if everbody ready
    for (var iter in r.getPlayers()) {
      if (!r.getPlayers()[iter].isReady()) {
        console.log('[' + room + '] : room not ready');
        return;
      }
    }

    console.log('[' + room + '] : everbody ready!');
    io.sockets.in(socket.room).emit('start game', 'Alle Spieler bereit. Spiel beginnt.');
    io.sockets.in(socket.room).emit('active player', r.getCurrentPlayer().getUniqueID());
    console.log("Active Player: " + r.getCurrentPlayerIndex() + " with ID: " + r.getCurrentPlayer().getUniqueID());

    //io.sockets.in(socket.room).emit('start countdown');
    //io.sockets.in(socket.room).emit('show dices');
    return;
  });

    socket.on('leave game', function(playerName, roomID) {
        console.log('remove Player ' + playerName + ' from room ' + roomID);
        if (myGame.getRooms()[roomID].getPlayers())
            for (var iter in myGame.getRooms()[roomID].getPlayers()) {
                if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === playerName) {
                    var p = myGame.getRooms()[roomID].getPlayers()[iter];
                    io.sockets.in(socket.roomID).emit('delete figure', p.getField(), p.getPlayerNr());
                    myGame.removePlayer(myGame.getRooms()[roomID].getPlayers()[iter], roomID);
                }
            }
        console.log('player left: playernumber = ' + myGame.getRooms()[roomID].getNrPlayers());
        io.sockets.in(socket.roomID).emit('update playernumber', myGame.getRooms()[roomID].getNrPlayers());
        for (var iter in myGame.getRooms()[roomID].getPlayers()) {
            var playerNr = myGame.getRooms()[roomID].getPlayers()[iter].getPlayerNr() - 1;
            var playerFieldNr = myGame.getRooms()[roomID].getPlayers()[iter].getField();
            io.sockets.in(socket.room).emit('show figures', playerNr, playerFieldNr);
        }
    });

    socket.on('get name', function() {
        socket.emit('receive name', socket.name);
    });

    socket.on('get rooms', function() {
        socket.emit('room list', myGame.getRooms());
    });

    socket.on('update info', function(name, roomID) {
        //name, charakter name, statuspkts, income, money
        var currentPlayer;
        for (var iter in myGame.getRooms()[roomID].getPlayers()) {
            if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === name) {
                currentPlayer = myGame.getRooms()[roomID].getPlayers()[iter];
            }
        }
        //console.log("found: currentPlayer is " + currentPlayer.getName());
        socket.emit('receive charactername', currentPlayer.getCharacter().getName());
        socket.emit('receive statuspkts', currentPlayer.getStatus());
        socket.emit('receive income', currentPlayer.getSalary());
        socket.emit('receive moneysack', currentPlayer.getMoney());
    });

    socket.on('get characters', function() {
        var characters = myGame.getCharacters();
        var charNames = [];

        // create rooms
        for (var iter in characters)
            charNames.push(characters[iter].getName());

        socket.emit('receive characters', charNames);
    });

    socket.on('show fieldinfo', function(fieldNr) {
        // fieldRent, 1house, 2house, 3house, 4house, hotel, kaufpreis, hauspreis, hotelpreis
        var priceModel = myGame.getBoard()[fieldNr - 1].getPriceModel();
        socket.emit('receive fieldinfo',
            myGame.getBoard()[fieldNr - 1].getName(), myGame.getBoard()[fieldNr - 1].getGhettoName(), priceModel.getRent(),
            priceModel.getHouse1Rent(), priceModel.getHouse2Rent(),
            priceModel.getHouse3Rent(), priceModel.getHouse4Rent(),
            priceModel.getHotelRent(), priceModel.getPrice(),
            priceModel.getPriceHouse(), priceModel.getPriceHotel());
    });

  socket.on('throw dices', function(name, roomID)
  {
    var roll1 = myDice.roll();
    var roll2 = myDice.roll();
    var oldField = 0;
    var newField = 0;
    //console.log("dice1 : " + roll1 + "\tdice2: "+ roll2);
    var currentBoard = myGame.getRooms()[roomID].getBoard();
    for (var iter in myGame.getRooms()[roomID].getPlayers())
    {
      oldField = myGame.getRooms()[roomID].getPlayers()[iter].getField();

      if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === name)
      {
        myGame.getRooms()[roomID].getPlayers()[iter].makeMove(roll1 + roll2);
        var currentField = myGame.getRooms()[roomID].getPlayers()[iter].getField();
        console.log(name + " moves to field " + currentField + " [" + roll1 + "+" + roll2 + "]");
        if (currentBoard[currentField - 1].getType() == RISK)
        {
          console.log("apply risk card");
          card_id = myGame.getRooms()[roomID].getRiskCards().draw();
          socket.emit('receive riskcard', card_id);
          myGame.getRooms()[roomID].getRiskCards().getCardById(card_id).apply(myGame.getRooms()[roomID].getPlayers()[iter]);
        }
        else if (currentBoard[currentField - 1].getType() == JOB)
        {
          console.log("apply job card");
          card_id = myGame.getRooms()[roomID].getJobCards().draw();
          socket.emit('receive jobcard', card_id);
          myGame.getRooms()[roomID].getJobCards().getCardById(card_id).apply(myGame.getRooms()[roomID].getPlayers()[iter]);
        }
        else if (currentBoard[currentField - 1].getType() == FELONY)
        {
          console.log(myGame.getRooms()[roomID].getPlayers()[iter].getName() + " thrown in prison");
          socket.emit('throw in prison');
          myGame.getRooms()[roomID].getPlayers()[iter].setField(31);
          myGame.getRooms()[roomID].getPlayers()[iter].throwInPrison(3);
        }
        else if (currentBoard[currentField - 1].getType() == IMMO)
        {
          console.log("immo field");
          var player = myGame.getRooms()[roomID].getPlayers()[iter];

          // field not owned -- works like a charm!
          if (currentBoard[currentField - 1].getOwner() == null)
          {
            console.log("field " + currentBoard[currentField - 1].getName() + "available to buy");
            // check if enough money
            var immoPrice = currentBoard[currentField - 1].getPriceModel().getPrice();
            if (player.getMoney() >= immoPrice)
            {
              // if enough --> buy?
              console.log('\tbuy field ' + currentBoard[currentField - 1].getName() + '?');
              socket.emit('buy field?', currentField);
            }
            else
            {
              // else --> message not enough money
              console.log('\t' + currentBoard[currentField - 1].getName() + ' too expensive for ' + name);
              socket.emit('field too expensive');
            }
            //---set player as owner for debugging reasons
            //console.log(myGame.getRooms()[roomID].getPlayers()[iter].getOwnedFields());
            /*currentBoard[currentField-1].setOwner(player);
             player.buyField(currentField-1);
             player.pay(immoPrice);
             console.log(myGame.getRooms()[roomID].getPlayers()[iter].getOwnedFields());*/
            //----
          }
          // field owned by yourself - buy house?
          else if (currentBoard[currentField - 1].getOwner().getName() == name)
          {
            console.log('YOU da owner!!! [' + name + ']');
            // if enough money --> buy?
            // TODO: hotel needs to be considered!!!
            var housePrice = currentBoard[currentField - 1].getPriceModel().getPriceHouse();
            if (player.getMoney() >= housePrice)
            {
              console.log('\tbuy house on ' + currentBoard[currentField - 1].getName() + '?');
              socket.emit('buy house?', currentField);
            }
            else
            {
              // else --> message not enough money
              console.log('\thouse too expensive for ' + name);
              socket.emit('house too expensive');
            }
            //---- buy house for debugging reasons
            /*currentBoard[currentField-1].buyHouse();
             player.pay(housePrice);*/
            //----
          }
          // field owned by somebody else - pay rent!
          else
          {
            console.log('field owned by ' + currentBoard[currentField - 1].getOwner().getName() + ' - pay rent!');
            var rent = currentBoard[currentField - 1].getRent();

            player.pay(rent);
            currentBoard[currentField - 1].getOwner().receive(rent);

            console.log('\t' + player.getName() + ' payed ' + currentBoard[currentField - 1].getOwner().getName() + ' ' + rent);
            socket.emit('pay rent!', rent);
          }
          console.log('--------');
        }
        else
          console.log('--------');
      }

      //socket.emit('show figures', iter, myGame.getRooms()[roomID].getPlayers()[iter].getField());
      io.sockets.in(socket.roomID).emit('show figures', myGame.getRooms()[roomID].getPlayers()[iter].getPlayerNr() - 1, myGame.getRooms()[roomID].getPlayers()[iter].getField());
    }
    socket.emit('dice results', roll1, roll2);
    //socket.emit('dice results', roll1, roll2, myGame.getRooms()[roomID].getPlayers()[iter].getField());


    var r = myGame.getRooms()[roomID];
    r.nextPlayer();

    while(r.getCurrentPlayer().isInPrison() != 0)
    {
      var rounds = r.getCurrentPlayer().isInPrison();
      console.log('player ' + r.getCurrentPlayerIndex() + ' in prison for ' + rounds-1 + ' turns');
      r.getCurrentPlayer().throwInPrison(rounds-1);
      r.nextPlayer();
    }

    io.sockets.in(socket.roomID).emit('active player', r.getCurrentPlayer().getUniqueID());
    console.log("Active Player: " + r.getCurrentPlayerIndex() + " with ID: " + r.getCurrentPlayer().getUniqueID());
  });

    socket.on('choose character', function(playerName, charID, roomID) {
        socket.charID = charID;
        var myChar = myGame.getCharacters()[charID];
        for (var iter in myGame.getRooms()[roomID].getPlayers()) {
            if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === playerName) {
                myGame.getRooms()[roomID].getPlayers()[iter].setCharID(charID);
                myGame.getRooms()[roomID].getPlayers()[iter].setCharacter(myChar);
                myGame.getRooms()[roomID].getPlayers()[iter].setCharName(myChar.getName());
                myGame.getRooms()[roomID].getPlayers()[iter].setSex(myChar.getSex());
                myGame.getRooms()[roomID].getPlayers()[iter].setEuCitizen(myChar.isEU()); // setzt du nostrifikation auch für EU bürger? wichtig!
                myGame.getRooms()[roomID].getPlayers()[iter].setMajority(myChar.isMajority());
                myGame.getRooms()[roomID].getPlayers()[iter].setBaseStatus(myChar.getStatus());
                myGame.getRooms()[roomID].getPlayers()[iter].setAge(myChar.getAge());
            }
        }
        //myGame.printCharacters();
        /*var roll1 = myDice.roll();
        var roll2 = myDice.roll();
        socket.emit('dice results', roll1, roll2);*/
        socket.emit('room list', myGame.getRooms());
    });

    socket.on('update playerlist', function(room) {
        var playerlist = new Array();

        /*
        for( var i = 0; i < io.sockets.clients(socket.room).length; i++) {
            playerlist[i] = [io.sockets.clients(socket.room)[i].name, io.sockets.clients(socket.room)[i].charID, io.sockets.clients(socket.room)[i].playerNr];
        }
        */
        var currRoom = myGame.getRooms()[room];

        for (var i = 0; i < currRoom.getNrPlayers(); i++) {
            playerlist[i] = [currRoom.getPlayers()[i].getName(),
                currRoom.getPlayers()[i].getCharID(),
                currRoom.getPlayers()[i].getPlayerNr()
            ];
        }
        io.sockets.in(socket.room).emit('update playerlist', JSON.stringify(playerlist));
    });

    socket.on('send message', function(data, room) {
        if (data == '') {
            return;
        }
		
		io.sockets.in(socket.room).emit('new chat message', JSON.stringify({
			'name': socket.name,
            'msg': data
        }));
    });

    socket.on('buy field!', function(name, roomID, currentField) {
        var currentBoard = myGame.getRooms()[roomID].getBoard();
        for (var iter in myGame.getRooms()[roomID].getPlayers()) {
            if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === name) {
                var player = myGame.getRooms()[roomID].getPlayers()[iter];
                var immoPrice = currentBoard[currentField - 1].getPriceModel().getPrice();
                currentBoard[currentField - 1].setOwner(player);
                player.buyField(currentField - 1);
                player.pay(immoPrice);
                console.log(myGame.getRooms()[roomID].getPlayers()[iter].getOwnedFields());
				//Gibts einen Fieldstatus oder ähnliches? int 0..4, 0 = grundstück, 1..3 häuser, 4 hotel?
				io.sockets.in(socket.room).emit('field owner', currentField, socket.uid);
            }
        }
    });

    socket.on('buy house!', function(name, roomID, currentField) {
        var currentBoard = myGame.getRooms()[roomID].getBoard();
        for (var iter in myGame.getRooms()[roomID].getPlayers()) {
            if (myGame.getRooms()[roomID].getPlayers()[iter].getName() === name)
            {
                var player = myGame.getRooms()[roomID].getPlayers()[iter];
                var housePrice = currentBoard[currentField - 1].getPriceModel().getPriceHouse();
                currentBoard[currentField - 1].buyHouse();
                player.pay(housePrice);
            }
        }
    });
});