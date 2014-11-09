function CardMoney(id, number, name, bonus)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	var bonus_ 	= bonus;
  
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
  
	this.getBonus = function()
	{
		return bonus_;
	}
	
	this.apply = function(player) 
	{
		console.log('-------------------');
		console.log('apply CardMoney:');
		console.log('money (' + bonus_ + ') from ' + player.getMoney() + ' to ' + (player.getMoney() + bonus_));
		player.setMoney(player.getMoney() + this.getBonus());
		console.log('-------------------');			
	}
  
	this.print = function () {
		console.log(name_ + ' Effekt: ' + bonus_ + '. ' + number_ + ' Karten im Stapel');
	}
}

module.exports = CardMoney;