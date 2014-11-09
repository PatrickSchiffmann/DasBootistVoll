//*****************************************************************************
//******************************** F I E L D **********************************
//*****************************************************************************

// field types
const START = 0;
const IMMO = 1;
const RISK = 2;
const JOB = 3;
const FELONY = 4;
const TRAINING = 5;
const JAIL = 6;

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

function Field(type)
{
  var type_ = type;

  this.getType = function() {
      return type_;
  }

  this.printInfo = function() {
    return fieldType(type_);
  }
}

module.exports = Field;