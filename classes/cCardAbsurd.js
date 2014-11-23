function CardAbsurd(id, number, name, absurd_id)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var absurd_id_ = absurd_id;
  
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
  
	this.getAbsurdId = function()
	{
		return absurd_id_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardAbsurd:');

    if(absurd_id_ == 1)
    {
      console.log('Gerichtsverhandlung');
      if(player.getMoney() >= 1000)
      {
        player.pay(1000);
      }
      else
      {
        player.setField(31);
        player.throwInPrison(2);
      }
    }

		console.log('**** implement ****');
		console.log('Gerichtsverhandlung && Steuerfahndung');
		console.log('-------------------');
	}

	this.print = function () {
  
		console.log(this.getName() + ' Absurd_id: ' + this.getAbsurdId() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardAbsurd;