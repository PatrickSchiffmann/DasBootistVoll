//*****************************************************************************
//******************************* P L A Y E R *********************************
//*****************************************************************************

const STARTING_MONEY = 1337;


const SALARY_NONEU = [[600, 700, 800, 900, 1000, 1200],
                      [  0,   5,   7,  10,   11,   12],
                      [  0,   6,   8,  10,   11,   12],
                      [  0,   7,   9,  10,   11,   13],
                      [  0,   8,   9,  10,   12,   14]];

const SALARY_EU_0 =  [[800, 900, 1000, 1200, 1500, 1700],
                      [  0,   1,    3,    6,    8,   10],
                      [  0,   3,    5,    7,    9,   11],
                      [  0,   4,    6,    8,   10,   12],
                      [  0,   4,    7,    9,   11,   12]];

const SALARY_EU_1 =  [[1200, 1500, 1700, 2000, 2200, 2500],
                      [   0,    1,    3,    6,    8,   10],
                      [   0,    3,    5,    7,    9,   11],
                      [   0,    4,    6,    8,   10,   12],
                      [   0,    4,    7,    9,   11,   12]];

const SALARY_EU_2 =  [[2000, 2200, 2500, 3000, 4000, 6000],
                      [   0,    1,    3,    6,    8,   11],
                      [   0,    3,    5,    7,    9,   12],
                      [   0,    4,    6,    8,   10,   13],
                      [   0,    4,    7,    9,   11,   13]];

var BOARD = require('./mBoard.js');

function Player(name, playerNr)
{
  var name_ = name;
  var charID_ = '';
  var money_ = STARTING_MONEY;
  var field_ = 1;
  var playerNr_ = playerNr;
  var ready_ = false;
  var ownedFields = [];
  var unique_id_ = generateUniqueID();

  this.buyField = function(nr) {
    ownedFields.push(nr);
  }

  this.getOwnedFields = function() {
    return ownedFields;
  }

  this.pay = function(payment) {
    money_ -= payment;
  }

  this.receive = function(payment) {
    money_ += payment;
  }

  // character
  var character_ = null;
  var charName_ = null;
  var sex_ = null;
  var education_level_ = null;
  var eu_citizen_ = null;
  var majority_ = null;
  var base_status_ = 0;
  var age_ = 0;
  var in_prison_ = 0;

  //Education
  //var education_level_ = 0;
  var language_ = 0;
  var hr_trainer_ = 0;
  var licence_ = 0;
  var it_ = 0;
  var mba_ = 0;

  //Legal
  //var eu_citizen_ = 0;
  var nostrification_ = 0;
  var residency_ = 0;

  //Zeugs
  var car_ = 0;
  var free_lawyers_ = 0;
  var free_car_repairs_ = 0;
  var free_jailbreaks_ = 0;

  //Für Aktionskarten
  var salary_change_absolute_ = [];
  var salary_change_relative_ = [];
  var status_change_ = 0; // wird von aktionskarten verändert, zur Zeit unwichtig


  //Getter
  this.getName = function() {return name_;}
  this.getCharID = function() {return charID_;}
  this.getCharacter = function() {return character_;}
  this.getMoney = function() {return money_;}
  this.getField = function() {return field_;}
  this.getPlayerNr = function() {return playerNr_;}
  this.isReady = function() {return ready_;}
  this.isInPrison = function() {return in_prison_;}
  this.getUniqueID = function() {return unique_id_;}

  this.getCharName = function() {return charName_;}
  this.getSex = function() {return sex_;}
  this.getMajority = function() {return majority_;}
  this.getBaseStatus = function() {return base_status_;}
  this.getAge = function() {return age_;}
  
  this.getEducationLevel = function() {return education_level_;}
  this.getLanguage = function() {return language_;}
  this.getHrTrainer = function() {return hr_trainer_;}
  this.getLicence = function() {return licence_;}
  this.getIt = function() {return it_;}
  this.getMba = function() {return mba_;}

  this.getEuCitizen = function() {return eu_citizen_;}
  this.getNostrification = function() {return nostrification_;}
  this.getResidency = function() {return residency_;}

  this.getCar = function() {return car_;}
  this.getFreeLawyers = function() {return free_lawyers_;}
  this.getFreeCarRepairs = function() {return free_car_repairs_;}
  this.getFreeJailbreaks = function() {return free_jailbreaks_;}

  this.getSalaryChangeAbsolute = function() {return salary_change_absolute_;}
  this.getSalaryChangeRelative = function() {return salary_change_relative_;}
  this.getStatusChange = function() {return status_change_;}

  //Setter
  this.setName = function(name) {name_ = name;}
  this.setCharID = function(id) {charID_ = id;}
  this.setCharacter = function(character) {character_ = character;}
  this.setMoney = function(money) {money_ = money;}
  this.setField = function(field) {field_ = field;}
  this.setPlayerNr = function(playerNr) {playerNr_ = playerNr;}
  this.setReady = function(ready) {ready_ = ready;}
  this.throwInPrison = function(turns) {in_prison_ = turns;}

  this.setCharName = function(charName) {charName_ = charName;}
  this.setSex = function(sex) {sex_ = sex;}
  this.setMajority = function(majority) {majority_ = majority;}
  this.setBaseStatus = function(status) {base_status_ = status;}
  this.setAge = function(age) {age_ = age;}
  
  this.setEducationLevel = function(education_level) {education_level_ = education_level;}
  this.setLanguage = function(language) {language_ = language;}
  this.setHrTrainer = function(hr_trainer) {hr_trainer_ = hr_trainer;}
  this.setLicence = function(licence) {licence_ = licence;}
  this.setIt = function(it) {it_ = it;}
  this.setMba = function(mba) {mba_ = mba;}

  this.setEuCitizen = function(eu_citizen) {eu_citizen_ = eu_citizen;}
  this.setNostrification = function(nostrification) {nostrification_ = nostrification;}
  this.setResidency = function(residency) {residency_ = residency;}

  this.setCar = function(car) {car_ = car;}
  this.setFreeLawyers = function(free_lawyers) {free_lawyers_ = free_lawyers;}
  this.setFreeCarRepairs = function(free_car_repairs) {free_car_repairs_ = free_car_repairs;}
  this.setFreeJailbreaks = function(free_jailbreaks) {free_jailbreaks_ = free_jailbreaks;}

  this.setSalaryChangeAbsolute = function(salary_change_absolute) {salary_change_absolute_ = salary_change_absolute;}
  this.setSalaryChangeRelative = function(salary_change_relative) {salary_change_relative_ = salary_change_relative;}
  this.setStatusChange = function(status_change) {status_change_ = status_change;}

  this.addSalaryChangeAbsolute = function(duration, value)
  {    
  }

  this.addSalaryChangeRelative = function(duration, value)
  {    
  }
 
  //Eigene Funktionen
  this.makeMove = function(diceResult) 
  {
    field_ += diceResult;
    if(field_ > 40)
    {
      field_ -= 40;
      money_ += this.getSalary();
    }
  }

  this.getStatus = function()
  {
    var status = base_status_;
    
    if( (licence_ == 1) && (car_ == 2))
      status += 1;

    if(licence_ == 1)
      status += 2;

    if(language_ == 1)
      status += 1;

    if(it_ == 1)
      status += 1;

    if(hr_trainer_ == 1)
      status += 1;

    if(mba_ == 1)
      status += 5;

    if(education_level_ >= 1) //min. Matura
      status += 2;

    if(education_level_ == 2) // Studium
      status += 1;

    return status + status_change_;
  }

  this.getMinority = function()
  {
    if(majority_ == true)
      return 0;
    else
      return 1;
  }

  this.getBaseSalary = function(status) //Funktioniert mMn. 100%
  {
    if(eu_citizen_ == 1)
    {
      if(nostrification_ == 1 && education_level_ == 2)
      {
        var salary_table = SALARY_EU_2;
      }
      else if (nostrification_ == 1 && education_level_ == 1)
      {
        var salary_table = SALARY_EU_1;
      }
      else
      {
        var salary_table = SALARY_EU_0;
      }
    }
    else
    {
      var salary_table = SALARY_NONEU;
    }

    var salaries = salary_table[0];
    var steps = salary_table[1 + this.getMinority() + 2 * sex_];
   
    var i=0;

    while( (i<5) && (base_status_ > steps[i]) )
      i++;

    return salaries[i];
  }

  this.getSalary = function()
  {
    var salary = this.getBaseSalary(this.getStatus());
    var factor = 1;
    var sum = 0;

    for(var iter in salary_change_relative_)
    {
      if(salary_change_relative_[iter][0] > 0)
      {
        salary_change_relative_[iter][0]--;
        factor += salary_change_relative_[iter][1];
      }
    }

    salary = salary * factor;

     for(var iter in salary_change_absolute_)
    {
      if(salary_change_absolute_[iter][0] > 0)
      {
        salary_change_absolute_[iter][0]--;
        sum = sum + salary_change_absolute_[iter][1];
      }
    }

    salary = salary + sum;

    return salary;
  }

  this.print = function() {
    console.log('     Playerinfo: ' + name_ + ' (' + money_ + ')');
    console.log('Bildung: ' + education_level_ + ' Sprachen: ' + language_);
    console.log('Führerschein: ' + licence_ + ' MR-Traienr ' + hr_trainer_);
    console.log('EU ' + eu_citizen_ + ' Aufenthalt ' + residency_ + ' Nostrifiziert ' + nostrification_);
  }
}

function generateUniqueID()
{
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < 10; i++)
  {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  console.log('id = ' + str);
  return str;
}

module.exports = Player;