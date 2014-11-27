function CardLocation(id, number, name, location)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var location_ = location;
  
	this.getName = function()
	{
		return name_;
	};
  
	this.getNumber = function()
	{
		return number_;
	};
  
	this.getId = function()
	{
		return id_;
	};
  
	this.getLocation = function()
	{
		return location_;
	};

  this.getField = function()
  {
    if(location_ == 1)
    {
      return 31;
    }
    if(location_ == 2)
    {
      return 21;
    }
  };

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardLocation:');
    console.log('set playerfield_ to ' + this.getField());
    player.setField(31);
    player.throwInPrison(2);
		console.log('-------------------');
	};

	this.print = function ()
  {
  		console.log(this.getName() + ' Location: ' + this.getLocation() + '. ' + this.getNumber() + ' Karten im Stapel');
	};
}

module.exports = CardLocation;