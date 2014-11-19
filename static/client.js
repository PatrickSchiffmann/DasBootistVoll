var characters = null;
var popup_zustand = false;
var uniqueId = null;

function soundOn() {
    $('#soundBackground').trigger('play');
    $('#optionsSoundOff').show();
    $('#optionsSoundOn').hide();
}

function soundOff() {
    $('#soundBackground').trigger('pause');
    $('#optionsSoundOn').show();
    $('#optionsSoundOff').hide();
}

function showOptions() {
    alert("To-Do");
}

var curr_tab = 1;

function tab(tab_index) {
    if (curr_tab != tab_index) {
        $('#reiterPlayer').toggleClass('active')
        $('#reiterStreet').toggleClass('active')

        if (tab_index == 1) {
            $('#tabPlayer').show();
            $('#tabStreet').hide();
            curr_tab = 1;
        } else if (tab_index == 2) {
            $('#tabPlayer').hide();
            $('#tabStreet').show();
            curr_tab = 2;
        } else
			console.log('Failure calling tab()');
    }
}

function getHHMM() {
    date = new Date();
    h = date.getHours();
    m = date.getMinutes();

    return ((h < 10) ? ('0') : ('')) + h + ':' + ((m < 10) ? ('0') : ('')) + m;
}

function getRollString(int) {
    switch (int) {
        case 1:
            return 'one';
            break;

        case 2:
            return 'two';
            break;

        case 3:
            return 'three';
            break;

        case 4:
            return 'four';
            break;

        case 5:
            return 'five';
            break;

        case 6:
            return 'six';
            break;
    }
}

function jobPopup(text) {
    if (popup_zustand == false) {
        $("#popup").css("background", "url('media/job.png')");
        $("#popup-text").text(text);
        $("#popup-button-ok-img").attr("src", "media/button-job-ok.png");
        $("#popup-button-cancel-img").attr("src", "media/button-job-cancel.png");
        $("#popup").fadeIn("normal");
        $("#hintergrund").css("opacity", "0.7");
        $("#hintergrund").fadeIn("normal");
        popup_zustand = true;
    }
}

function riskPopup(text) {
    if (popup_zustand == false) {
        $("#popup").css("background", "url('media/risk.png')");
        $("#popup-content").css("margin-left", "64px");
        $("#popup-buttons").css("margin-left", "64px");
        $("#popup-text").text(text);
        $("#popup-button-ok-img").attr("src", "media/button-risk-ok.png");
        $("#popup-button-cancel-img").attr("src", "media/button-risk-cancel.png");
        $("#popup").fadeIn("normal");
        $("#hintergrund").css("opacity", "0.7");
        $("#hintergrund").fadeIn("normal");
        popup_zustand = true;
    }
}

function closePopup() {
    if (popup_zustand == true) {
        $("#popup").fadeOut("normal");
        $("#hintergrund").fadeOut("normal");
        popup_zustand = false;
    }
}


jQuery(function($) {

    var langfile = 0;
    $.getJSON("ger.json", function(json) {
        langfile = json;
    });

    $('#dice1').toggleClass(getRollString(Math.floor((Math.random() * 6) + 1)));
    $('#dice2').toggleClass(getRollString(Math.floor((Math.random() * 6) + 1)));

    var socket = io.connect();

    $('#chatinput').keypress(function(e) {
        if (e.keyCode != 13) //wenn nicht Enter gedrückt wurde aus der funktion gehen
            return;

        socket.emit('send message', $('#chatinput').val());
        $('#chatinput').val('');
    });

    socket.on('receive name', function(data) {
        $('#name').text(data);
    });

    socket.on('receive charactername', function(data) {
        $('#characterName').text(data);
    });

    socket.on('receive statuspkts', function(data) {
        $('#statuspkts').text(data);
    });

    socket.on('receive income', function(data) {
        $('#income').text(data);
    });

    socket.on('receive moneysack', function(data) {
        $('#moneysack').text(data);
    });

    socket.on('receive riskcard', function(data) {
        riskPopup(langfile.actioncards[data].title + ': ' + langfile.actioncards[data].desc);
        //alert(langfile.actioncards[data].title + ': ' + langfile.actioncards[data].desc);
    });

    socket.on('receive jobcard', function(data) {
        jobPopup(langfile.jobcards[data].desc);
        //alert(langfile.jobcards[data].desc);
    });

    socket.on('dice results', function(dice1, dice2) {
        $('#dice1').toggleClass(getRollString(dice1));
        $('#dice2').toggleClass(getRollString(dice2));
        socket.emit('update info', getPlayerName(), getRoomNumber());
    });

    socket.on('show figures', function(playerNr, currentField) {

        $("#figure-" + (playerNr + 1)).remove();
        $("#field" + currentField).append('<img id="figure-' + (playerNr + 1) + '" src="media/player/p' + (playerNr + 1) + '.png" />');
    });

    socket.on('receive fieldinfo', function(name, ghetto, rent, house1, house2,
        house3, house4, hotel, price, priceHouse, priceHotel) {
        $('#fieldName').text(name);
        $('#fieldViertel').text(ghetto);
        $('#fieldRent').text(rent);
        $('#field1House').text(house1);
        $('#field2House').text(house2);
        $('#field3House').text(house3);
        $('#field4House').text(house4);
        $('#fieldHotel').text(hotel);
        $('#fieldPrice').text(price);
        $('#fieldHousePrice').text(priceHouse);
        $('#fieldHotelPrice').text(priceHotel);

    });

    socket.on('delete figure', function(fieldNr, playerNr) {
        $("#figure-" + (playerNr + 1)).remove();
    });


    socket.on('receive characters', function(data) {
        console.log(data);

        $('#chooseCharacterLeft').append('<ul class="characterList" >');
        for (var i = 0; i < 18; i++)
            $('#chooseCharacterLeft').append('<li onclick="selectCharacter(' + i + ')">' + data[i] + '</li>');
        $('#chooseCharacterLeft').append('</ul>');

        $('#chooseCharacterRight').append('<ul class="characterList" >');
        for (var i = 18; i < 36; i++)
            $('#chooseCharacterRight').append('<li onclick="selectCharacter(' + i + ')">' + data[i] + '</li>');
        $('#chooseCharacterRight').append('</ul>');
    });

    socket.on('update playerlist', function(data) {
        data = jQuery.parseJSON(data);

        // data[i][0] = name, [1] = charID, [2] = playerNr

        for (var i = 0; i < data.length; i++) {
            $('#charPic' + (i + 1)).css('src', '');
            $('.playerListName' + (i + 1)).text('');
            $('.listedPlayer' + (i + 1)).css('visibility', 'hidden');
            //$('#playerlist').append('<div class="listedPlayer' + (data[i][2]) + '"> <img class="playerlistPic" src="./media/characters/' + (data[i][1]+1) + '.jpg"/><br /><div>' + data[i][0] + '</div><br /></div>');
        }

        //$('#playerlist').text('');
        for (var i = 0; i < data.length; i++) {
            $('#charPic' + data[i][2]).attr('src', './media/characters/' + (data[i][1] + 1) + '.jpg');
            $('.playerListName' + data[i][2]).text(data[i][0]);
            $('.listedPlayer' + data[i][2]).css('visibility', 'visible');
            //$('#playerlist').append('<div class="listedPlayer' + (data[i][2]) + '"> <img class="playerlistPic" src="./media/characters/' + (data[i][1]+1) + '.jpg"/><br /><div>' + data[i][0] + '</div><br /></div>');
        }
        $('#playernumber').text(data.length);
    });

    socket.on('new chat message', function(data) {
        data = jQuery.parseJSON(data);
        $('#chat').append('<small class="left">&nbsp;&nbsp;' + data.name + '(' + getHHMM() + ')</small> ' + data.msg + '<br/>');
        $('#chat').scrollTop($('#chat')[0].scrollHeight); //chatfenster nach unten scrollen
    });

    socket.on('update playernumber', function(playerCount) {
        console.log('somesing has come: ' + playerCount);
        var text = "";
        text = text + playerCount;
        $('#playernumber').text(text);
    });

    socket.on('show dices', function() {
        $('#dices').show();
    });

    socket.on('start countdown', function() {
        $('#countdown').show();
    });
	
	socket.on('start game', function() {
        
    });
	
	socket.on('unique id', function(uid) {
        uniqueId = uid;
	});
	
	socket.on('active player', function(id) {
		//Würfel Button de(ak)tivieren
		if(uniqueId == id)
    {
      $('#button-dices').removeAttr('disabled');
    } //Enable
		else
    {
      $('#button-dices').attr('disabled', 'disabled'); //Disable
    }

		//Playerlist alle Player grau, aktiver normal
		for (var i = 1; i <= 8; i++)
    {
			if(i == id)
      {
        $('#charPic' + (i)).removeClass('playerlistPicGray');
      }
      else
      {
        $('#charPic' + (i)).addClass('playerlistPicGray');
      }
    }
    });
	    

    socket.on('buy field?', function(currentField) {
        if (confirm('Feld kaufen? [' + currentField + ']')) {
            console.log('Feld gekauft.');
            socket.emit('buy field!', getPlayerName(), getRoomNumber(), currentField);
        } else
            console.log('Kauf abgelehnt.');
    });

    socket.on('buy house?', function(currentField) {
        if (confirm('Haus kaufen? [' + currentField + ']')) {
            console.log('Haus gekauft.');
            socket.emit('buy house', getPlayerName(), getRoomNumber(), currentField);
        } else
            console.log('Kauf abgelehnt.');
    });

    socket.on('pay rent!', function(data) {
        alert('Miete zahlen: ' + data);
    });
	
    socket.on('field owner', function(fieldNr, playerUid) {
      //Fieldstatus als dritten Parameter hinzufügen, fehlt noch serverseitig
      if(fieldNr < 12) {
        cssclass = "img-owner-top";
      } else if (fieldNr < 21) {
        cssclass = "img-owner-right";
      } else if (fieldNr < 30) {
        cssclass = "img-owner-right";
      } else {
        cssclass = "img-owner-left";
      }

       $("#fieldowner" + (fieldNr)).append('<img id="owner-' + (fieldNr) + '" src="media/houses/' + playerUid + '-0.png" />');
    });

    socket.on('throw in prison', function() {
      alert('Du musst ins Gefängnis!');
    });

		//Was tut des Event?
    socket.on('disconnected', function() {
        console.log('delete player');
        socket.emit('leave game', getPlayerName(), getRoomNumber());
    });

});

var socket = io.connect();

function joinRoom(room) {
    getCharacters();
    var name = prompt("Wie heißt du?");
    socket.emit('join room', room, name);
    $('#room').text(room + 1);
    socket.emit('get name');
    $('#chooseRoom').toggleClass('hidden');
    $('#chooseCharacter').show();
    //socket.emit('update playerlist');
}

function getCharacters() {
    socket.emit('get characters');
}

function getPlayerName() {
    return $('#name').text();
}

function getRoomNumber() {
    return $('#room').text() - 1;
}

function selectCharacter(charID) {
    socket.emit('choose character', getPlayerName(), charID, getRoomNumber());
    $('#characterPic').html('<img id="avatar-self" src="./media/characters/' + (charID + 1) + '.jpg" alt="Your Avatar"/>');
    $('#chooseCharacter').toggleClass('hidden');
    $('#controlwrap').show();
    // $('#dices').show();
    $('#ready').show();
    socket.emit('update info', getPlayerName(), getRoomNumber());
    // socket.emit('send message', "/ready", getRoomNumber());
    socket.emit('update playerlist', getRoomNumber());
    $('#playerlist').show();
}

function isReady() {
    socket.emit('is ready', getPlayerName(), getRoomNumber());
    $('#ready').hide();
    $('#dices').show();
}

function throwDices() {
    $('#dice1').attr('class', 'die');
    $('#dice2').attr('class', 'die');
    socket.emit('throw dices', getPlayerName(), getRoomNumber());
}

function getFieldInfo(fieldNr) {
    socket.emit('show fieldinfo', fieldNr);
    $('#fieldNr').text(fieldNr);
    tab(2);
}

function leaveGame() {
    socket.emit('leave game', getPlayerName(), getRoomNumber());
    console.log('disconnect ' + getPlayerName() + ' from room ' + getRoomNumber());
    window.location.reload();
}

/*****************/
/*** COUNTDOWN ***/
/*****************/

var max_time = 20;
var cinterval;

function countdown_timer() {
        // decrease timer
        max_time--;
        document.getElementById('countdown').innerHTML = max_time;
        if (max_time == 0) {
            clearInterval(cinterval);
        }
    }
    // 1,000 means 1 second.
cinterval = setInterval('countdown_timer()', 1250);