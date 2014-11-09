function CardTraining(id, number, name, matura, licence, language, it, max_age)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var matura_ 	= matura;
	var licence_ 	= licence;
	var language_ 	= language;
	var it_ 		= it;
	var max_age_ 	= max_age;
  
	this.getName = function()
	{
		return name_;
	}
  
	this.getNumber = function()
	{
		return number_;
	}
  
	this.getId = function()
	{
		return id_;
	}
  
	this.getMatura = function()
	{
		return matura_;
	}
	
	this.getLicence = function()
	{
		return licence_;
	}
	
	this.getLanguage = function()
	{
		return language_;
	}
	
	this.getIt = function()
	{
		return it_;
	}
	
	this.getMaxAge = function()
	{
		return max_age_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardTraining:');
		if (player.getAge() <= max_age_) {
			if (matura_ == 1 && player.getEducationLevel() < 1) {
				player.setEducationLevel(1);
			}
			else if(matura_ == -1) {
				player.setEducationLevel(0);
			}

			if(licence_ == 1) {
				player.setLicence(1);
			}
			else if(licence_ == -1) {
				player.setLicence(0);
			}

			if(language_ == 1) {
				player.setLanguage(1);
			}
			else if(language_ == -1) {
				player.setLanguage(0);
			}

			if(it_ == 1) {
				player.setIt(1);
			}
			else if(it_ == -1) {
				player.setIt(0);
			}
		}
		console.log('-------------------');	
	}

  
	this.print = function () {
		console.log(this.getName() + ' Effekt( max' + this.getMaxAge() + '): ' + this.getMatura() + ' FS ' + this.getLicence() + ' Lang ' +
					this.getLanguage() + ' IT' + this.getIt() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardTraining;