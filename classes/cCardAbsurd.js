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

	this.apply = function()
	{
		console.log('-------------------');
		console.log('apply CardAbsurd:');
		console.log('**** implement ****');
		console.log('Gerichtsverhandlung && Steuerfahndung');
		console.log('-------------------');
	}

	this.print = function () {
  
		console.log(this.getName() + ' Absurd_id: ' + this.getAbsurdId() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardAbsurd;