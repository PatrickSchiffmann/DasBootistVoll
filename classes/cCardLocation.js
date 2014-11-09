function CardLocation(id, number, name, location)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var location_ = location;
  
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
  
	this.getLocation = function()
	{
		return location_;
	}

	this.apply = function()
	{
		console.log('-------------------');
		console.log('apply CardLocation:');
		console.log('**** implement ****');
		console.log('-------------------');
	}

	this.print = function () {
  		console.log(this.getName() + ' Location: ' + this.getLocation() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}
module.exports = CardLocation;