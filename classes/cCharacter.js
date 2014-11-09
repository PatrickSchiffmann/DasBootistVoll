//*****************************************************************************
//**************************** C H A R A C T E R ******************************
//*****************************************************************************

function Character(name, sex, education, eu, majority, status, age)
{
  var name_ = name;
  var sex_ = sex;
  var education_ = education;
  var eu_ = eu;
  var majority_ = majority;
  var status_ = status;
  var age_ = age;

  this.getName = function() {
      return name_;
  }

  this.getSex = function() {
      return sex_;
  }

  this.getEducation = function() {
    return education_;
  }
  
  this.isEU = function() {
      return eu_;
  }

  this.isMajority = function() {
      return majority_;
  }

  this.getStatus = function() {
      return status_;
  }
  
  this.getAge = function()
  {
	return age_;
  }
}

module.exports = Character;