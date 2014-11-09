function CardPlayerProp(id, number, name, citizenship, nostrification, legal_status)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var citizenship_ 	= citizenship;
	var nostrification_ = nostrification;
	var legal_status_ 	= legal_status;
  
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
  
	this.getCitizenship = function()
	{
		return citizenship_;
	}
	
	this.getNostrification = function()
	{
		return nostrification_;
	}
	
	this.getLegalStatus = function()
	{
		return legal_status_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardPlayerProp:');
		console.log('set citizenship_ to ' + citizenship_);
		player.setEuCitizen(citizenship_);
		console.log('set nostrification_ to ' + nostrification_);
		player.setNostrification(nostrification_);
		console.log('set legal_status_ to ' + legal_status_);
		player.setResidency(legal_status_);
		console.log('-------------------');
	}
  
	this.print = function () {
		console.log(this.getName() + ' Effekt: Einbürgern ' + this.getCitizenship() + ' Nostrifizieren: ' + this.getNostrification() + 
					' Aufenthalt: ' + this.getResidency() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardPlayerProp;