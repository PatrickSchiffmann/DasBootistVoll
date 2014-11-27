//*****************************************************************************
//**************************** I M M O F I E L D ******************************
//*****************************************************************************

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

function fieldType(int)
{
  switch(int)
  {
    case START:
      return "Start";
      break;

    case IMMO:
      return "Immobilie";
      break;

    case RISK:
      return "Risiko";
      break;

    case JOB:
      return "Job";
      break;

    case FELONY:
      return "Verbrechen";
      break;

    case TRAINING:
      return "Fortbildung";
      break;

    case JAIL:
      return "Gefängnis";
      break;

    default:
      return "Fehler!"
      break;
  }
}

function ghettoName(int)
{
  switch(int)
  {
    case REDLIGHT:
      return "Rotlichtviertel";
      break;

    case OLD_TOWN:
      return "Altstadt";
      break;

    case INNER_CITY:
      return "Innenstadt";
      break;

    case FIN_DISTRICT:
      return "Bankenviertel";
      break;

    case HOTSPOT:
      return "Szeneviertel";
      break;

    case UNI:
      return "Univiertel";
      break;

    case INDUSTRY:
      return "Industrieviertel";
      break;

    case MANSIONS:
      return "Villenviertel";
      break;

    default:
      return "Fehler!"
      break;
  }
}

function ImmoField(type, name, ghetto, priceModel)
{
  var type_ = type;
  var name_ = name;
  var ghetto_ = ghetto;
  var priceModel_ = priceModel;
  var currentRent_ = priceModel.getRent();
  var owner_ = null;
  // 5 houses equal 1 hotel
  var houses_ = 0;

  this.getType = function()
  {
    return type_;
  }

  this.getName = function()
  {
    return name_;
  }

  this.getGhetto = function()
  {
    return ghetto_;
  }

  this.getGhettoName = function()
  {
    return ghettoName(ghetto_);
  }

  this.getPriceModel = function()
  {
    return priceModel_;
  }

  this.getOwner = function()
  {
    return owner_;
  }

  this.printInfo = function()
  {
    return fieldType(type_) + "\t" + name_ + "\t\t" + ghettoName(ghetto_) + "\t" + priceModel_.getPrice() + ", " + currentRent_;
  }

  this.calcRent = function(houses)
  {
    switch(houses)
    {
      case 1:
        return priceModel_.getHouse1Rent();
        break;
      case 2:
        return priceModel_.getHouse2Rent();
        break;
      case 3:
        return priceModel_.getHouse3Rent();
        break;
      case 4:
        return priceModel_.getHouse4Rent();
        break;
      case 5:
        return priceModel_.getHotelRent();
        break;
    }
  }

  this.setOwner = function(owner)
  {
    owner_ = owner;
  }

  this.buyHouse = function()
  {
    houses_ += 1;
    currentRent_ = this.calcRent(this.houses_);
  }

  this.getRent = function()
  {
    return currentRent_;
  }

  this.getHouses = function()
  {
    return houses_;
  }
}

module.exports = ImmoField;