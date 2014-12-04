var characters = null;
var popup_zustand = false;
var uniqueId = null;
var pNr = null;

function soundOn()
{
  $('#soundBackground').trigger('play');
  $('#optionsSoundOff').show();
  $('#optionsSoundOn').hide();
}

function soundOff()
{
  $('#soundBackground').trigger('pause');
  $('#optionsSoundOn').show();
  $('#optionsSoundOff').hide();
}

function showOptions()
{
  alert("To-Do");
}

var curr_tab = 1;

function tab(tab_index)
{
  if(curr_tab != tab_index)
  {
    $('#reiterPlayer').removeClass('active');
    $('#reiterStreet').removeClass('active');
    $('#reiterStatus').removeClass('active');

    if(tab_index == 1)
    {
      $('#tabPlayer').show();
      $('#tabStreet').hide();
      $('#tabStatus').hide();
      $('#reiterPlayer').toggleClass('active');
      curr_tab = 1;
    }
    else if(tab_index == 2)
    {
      $('#tabPlayer').hide();
      $('#tabStreet').show();
      $('#tabStatus').hide();
      $('#reiterStreet').toggleClass('active');
      curr_tab = 2;
    }
    else if(tab_index == 3)
    {
	    socket.emit("request status");
      $('#tabPlayer').hide();
      $('#tabStreet').hide();
      $('#tabStatus').show();
      $('#reiterStatus').toggleClass('active');
      curr_tab = 3;
    }
    else
      console.log('Failure calling tab()');
  }
}

function getHHMM()
{
  date = new Date();
  h = date.getHours();
  m = date.getMinutes();

  return ((h < 10) ? ('0') : ('')) + h + ':' + ((m < 10) ? ('0') : ('')) + m;
}

function getRollString(int)
{
  switch(int)
  {
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

    default:
      break;
  }
}

function jobPopup(text)
{
  if(popup_zustand == false)
  {
    $("#popup").css("background", "url('media/job.png')");
    $("#popup-text").text(text);
    $("#popup-button-ok-img").attr("src", "media/button-job-ok.png");
    //$("#popup-button-cancel-img").attr("src", "media/button-job-cancel.png");
    $("#popup").fadeIn("normal");
    $("#hintergrund").css("opacity", "0.7").fadeIn("normal");
    popup_zustand = true;
  }
}

function riskPopup(text)
{
  if(popup_zustand == false)
  {
    $("#popup").css("background", "url('media/risk.png')");
    $("#popup-content").css("margin-left", "64px");
    $("#popup-buttons").css("margin-left", "64px");
    $("#popup-text").text(text);
    $("#popup-button-ok-img").attr("src", "media/button-risk-ok.png");
    //$("#popup-button-cancel-img").attr("src", "media/button-risk-cancel.png");
    $("#popup").fadeIn("normal");
    $("#hintergrund").css("opacity", "0.7").fadeIn("normal");
    popup_zustand = true;
  }
}

function closePopup()
{
  if(popup_zustand == true)
  {
    $("#popup").fadeOut("normal");
    $("#hintergrund").fadeOut("normal");
    popup_zustand = false;
  }
}


jQuery(function($)
{
  var langfile = 0;
  $.getJSON("ger.json", function(json)
  {
    langfile = json;
  });

  $('#dice1').toggleClass(getRollString(Math.floor((Math.random() * 6) + 1)));
  $('#dice2').toggleClass(getRollString(Math.floor((Math.random() * 6) + 1)));

  var socket = io.connect();

  $('#chatinput').keypress(function(e)
  {
    if(e.keyCode != 13) //wenn nicht Enter gedrückt wurde aus der funktion gehen
      return;

    var message = $('#chatinput').val();

    socket.emit('send message', message);
    $('#chatinput').val('');
  });

  socket.on('receive name', function(data)
  {
    $('#name').text(data);
  });
  
  socket.on('receive status', function(data)
  {
	data = jQuery.parseJSON(data)
	var key;
	for (key in data) {
	  $('#statustab-' + key).text(data[key]);
	}
  });


  socket.on('receive playerinfo', function(data)
  {
    var info = jQuery.parseJSON(data);
    $('#characterPic').html('<img id="avatar-self" src="./media/characters/' + info['charID'] + '.jpg" alt="Foreign Avatar"/>');
    $('#name').text(info['name']);
    $('#characterName').text(info['charName']);
    $('#statuspkts').text(info['status']);
    $('#income').text(info['income']);
    $('#moneysack').text(info['moneysack']);
  });

  socket.on('receive foreign playerinfo', function(data)
  {
    var info = jQuery.parseJSON(data);
    $('#characterPic').html('<img id="avatar-self" src="./media/characters/' + info['charID'] + '.jpg" alt="Foreign Avatar"/>');
    $('#name').text(info['name']);
    $('#characterName').text(info['charName']);
    $('#statuspkts').text(info['status']);
    $('#income').text(info['income']);
    $('#moneysack').text(info['moneysack']);
  });

  socket.on('receive riskcard', function(data)
  {
    riskPopup(langfile.actioncards[data].title + ': ' + langfile.actioncards[data].desc);
  });

  socket.on('receive jobcard', function(data)
  {
    jobPopup(langfile.jobcards[data].desc);
  });

  socket.on('dice results', function(dice1, dice2)
  {
    $('#dice1').toggleClass(getRollString(dice1));
    $('#dice2').toggleClass(getRollString(dice2));
    socket.emit('update playerinfo', uniqueId, getRoomNumber());
  });

  socket.on('show figures', function(playerNr, currentField)
  {
    $("#figure-" + (playerNr + 1)).remove();
    $("#field" + currentField).append('<img id="figure-' + (playerNr + 1) + '" src="media/player/p' + (playerNr + 1) + '.png" />');
  });

  socket.on('receive fieldinfo', function(data)
  {
    var infos = jQuery.parseJSON(data);

    $('#fieldName').text(infos['name']);
    $('#fieldViertel').text(infos['ghetto']);
    $('#fieldRent').text(infos['rent']);
    $('#field1House').text(infos['house1']);
    $('#field2House').text(infos['house2']);
    $('#field3House').text(infos['house3']);
    $('#field4House').text(infos['house4']);
    $('#fieldHotel').text(infos['hotel']);
    $('#fieldPrice').text(infos['price']);
    $('#fieldHousePrice').text(infos['priceHouse']);
    $('#fieldHotelPrice').text(infos['priceHotel']);
    $('#fieldOwner').text(infos['owner']);
  });

  socket.on('delete figure', function(fieldNr, playerNr)
  {
    $("#figure-" + (playerNr + 1)).remove();
  });


  socket.on('receive characters', function(data)
  {
    console.log(data);

    $('#chooseCharacterLeft').append('<ul class="characterList" >');
    for(var i = 0; i < 18; i++)
      $('#chooseCharacterLeft').append('<li onclick="selectCharacter(' + i + ')">' + data[i] + '</li>');
    $('#chooseCharacterLeft').append('</ul>');

    $('#chooseCharacterRight').append('<ul class="characterList" >');
    for(var i = 18; i < 36; i++)
      $('#chooseCharacterRight').append('<li onclick="selectCharacter(' + i + ')">' + data[i] + '</li>');
    $('#chooseCharacterRight').append('</ul>');
  });

  socket.on('update playerlist', function(data)
  {
    // data[i][0] = name, [1] = charID, [2] = playerNr
    data = jQuery.parseJSON(data);

    for(var i = 1; i <= 8; i++)
    {
      $('#charPic' + i).css('src', '');
      $('.playerListName' + i).text('');
      $('.listedPlayer' + i).css('visibility', 'hidden');
    }

    for(var i = 1; i <= data.length; i++)
    {
      var j = i - 1;
      $('#charPic' + data[j][2]).attr('src', './media/characters/' + (data[j][1] + 1) + '.jpg');
      $('.playerListName' + data[j][2]).text(data[j][0]);
      $('.listedPlayer' + data[j][2]).css('visibility', 'visible');
    }

    $('#playernumber').text(data.length);
  });

  socket.on('new chat message', function(data)
  {
    data = jQuery.parseJSON(data);
    $('#chat').append('<small class="left">&nbsp;&nbsp;' + data.name + '(' + getHHMM() + ')</small> ' + data.msg + '<br/>');
    $('#chat').scrollTop($('#chat')[0].scrollHeight); //chatfenster nach unten scrollen
  });

  socket.on('update playernumber', function(playerCount)
  {
    console.log('somesing has come: ' + playerCount);
    var text = "";
    text = text + playerCount;
    $('#playernumber').text(text);
  });

  socket.on('show dices', function()
  {
    $('#dices').show();
  });

  socket.on('start countdown', function()
  {
    $('#countdown').show();
  });

  socket.on('unique id', function(uid)
  {
    console.log('set uniqueID: ' + uid);
    uniqueId = uid;
  });

  socket.on('active player', function(playerNr, uid)
  {
    console.log('active player: ' + uid + ' [' + playerNr + ']');

    if(uniqueId == uid)
    {
      $('#button-dices').prop('disabled', false).focus();
      // TODO: your-turn-popup
      //alert('Du bist dran!');
    }
    else
    {
      $('#button-dices').prop('disabled', true); //Disable
    }

    for(var i = 1; i <= 8; i++)
    {
      if(i == playerNr)
      {
        $('#charPic' + (i)).removeClass('playerlistPicGray');
      }
      else
      {
        $('#charPic' + (i)).addClass('playerlistPicGray');
      }
    }
  });

  socket.on('buy field?', function(currentField)
  {
    console.log('buy ' + currentField);
    if(confirm('Feld kaufen? [' + currentField + ']'))
    {
      console.log('Feld gekauft.');
      socket.emit('buy field!', uniqueId, getRoomNumber(), currentField);
    }
    else
      console.log('Kauf abgelehnt.');
  });

  socket.on('buy house?', function(currentField)
  {
    if(confirm('Haus kaufen? [' + currentField + ']'))
    {
      console.log('Haus gekauft.');
      socket.emit('buy house!', uniqueId, getRoomNumber(), currentField);
    }
    else
      console.log('Kauf abgelehnt.');
  });

  socket.on('pay rent!', function(data)
  {
    alert('Miete zahlen: ' + data);
  });

  socket.on('field owner', function(fieldNr, pNr)
  {
    //Fieldstatus als dritten Parameter hinzufügen, fehlt noch serverseitig
    if(fieldNr < 12)
    {
      cssclass = 'img-owner-top';
    }
    else if(fieldNr < 21)
    {
      cssclass = 'img-owner-right';
    }
    else if(fieldNr < 30)
    {
      cssclass = 'img-owner-right';
    }
    else
    {
      cssclass = 'img-owner-left';
    }

    $("#fieldowner" + (fieldNr)).append('<img id="owner-' + (fieldNr) + '" class="' + cssclass + '" src="media/houses/' + pNr + '-0.png" />');
  });

  socket.on('popup', function(text)
  {
    alert(text);
  });

  socket.on('private popup', function(uid, msg)
  {
    if(uniqueId != uid)
    {
      return;
    }
    alert(msg);
  });
});

var socket = io.connect();

function joinRoom(room)
{
  getCharacters();
  var name = '';
  while(name == '')
  {
    name = prompt("Wie heißt du?");
  }
  socket.emit('join room', room, name);
  $('#room').text(room + 1);

  socket.emit('get name');
  $('#chooseRoom').toggleClass('hidden');
  $('#chooseCharacter').show();
  $('#chatinput').attr('placeholder', 'Tippen zum Chatten. Absenden mit Enter.').prop('disabled', false);
}

function getCharacters()
{
  socket.emit('get characters');
}

function getPlayerName()
{
  return $('#name').text();
}

function getRoomNumber()
{
  return $('#room').text() - 1;
}

function selectCharacter(charID)
{
  socket.emit('choose character', uniqueId, getRoomNumber(), charID);
  $('#characterPic').html('<img id="avatar-self" src="./media/characters/' + (charID + 1) + '.jpg" alt="Your Avatar"/>');
  $('#chooseCharacter').toggleClass('hidden');
  $('#controlwrap').show();
  $('#ready').show();
  socket.emit('update playerinfo', uniqueId, getRoomNumber());
  socket.emit('update playerlist', getRoomNumber());
  $('#playerlist').show();
  $('#readyButton').focus();
}

function isReady()
{
  //socket.emit('is ready', getPlayerName(), getRoomNumber());
  socket.emit('is ready', uniqueId, getRoomNumber());
  $('#ready').hide();
  $('#dices').show();
}

function throwDices()
{
  socket.emit('update playerinfo', uniqueId, getRoomNumber());
  $('#dice1').attr('class', 'die');
  $('#dice2').attr('class', 'die');
  socket.emit('throw dices', uniqueId, getRoomNumber());
  $('#button-dices').prop('disabled', false);
}

function getFieldInfo(fieldNr)
{
  socket.emit('show fieldinfo', fieldNr);
  $('#fieldNr').text(fieldNr);
  tab(2);
}

function showPlayerInfo(pNr)
{
  socket.emit('show foreign playerinfo', getRoomNumber(), pNr);
}

function leaveGame()
{
  socket.emit('leave game', getPlayerName(), getRoomNumber());
  console.log('disconnect ' + getPlayerName() + ' from room ' + getRoomNumber());
  window.location.reload();
}

/*****************/
/*** COUNTDOWN ***/
/*****************/

var max_time = 20;
var cinterval;

function countdown_timer()
{
  // decrease timer
  max_time--;
  document.getElementById('countdown').innerHTML = max_time;
  if(max_time == 0)
  {
    clearInterval(cinterval);
  }
}
// 1,000 means 1 second.
cinterval = setInterval('countdown_timer()', 1250);