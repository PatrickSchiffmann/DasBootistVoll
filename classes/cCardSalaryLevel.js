function CardSalaryLevel(id, number, name, male, female, minority, min_age)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var male_ 		= male;
	var female_ 	= female;
	var minority_ 	= minority;
	var min_age_ 	= min_age;
  
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
  
	this.getMale = function()
	{
		return male_;
	}
	
	this.getFemale = function()
	{
		return female_;
	}
	
	this.getMinority = function()
	{
		return minority_;
	}
	
	this.getMinAge = function()
	{
		return min_age_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardSalaryLevel:');
		if(player.getAge() <= min_age_)
		{
			if(player.getSex() == 0)
			{
				console.log('m: salaryLevel (' + male_ + ') from ' + player.getStatusChange() + ' to ' + (player.getStatusChange() + male_));
				player.setStatusChange(player.getStatusChange() + male_);
			}
			if(player.getSex() == 1)
			{
				console.log('f: salaryLevel (' + female_ + ') from ' + player.getStatusChange() + ' to ' + (player.getStatusChange() + female_));
				player.setStatusChange(player.getStatusChange() + female_);
			}
			if(player.getMinority() == 1)
			{
				console.log('min: salaryLevel (' + minority_ + ') from ' + player.getStatusChange() + ' to ' + (player.getStatusChange() + minority_));
				player.setStatusChange(player.getStatusChange() + minority_);
			}
		}
		else
			console.log('player too old!');
		console.log('-------------------');
		
		if(player.getStatusChange() < 0)
			player.setStatusChange(0); // Reset
	}
  
	this.print = function () {
		console.log(this.getName() + ' Effekt( min' + this.getMinAge() + '): M: ' + this.getMale() + ' F: ' + this.getFemale() + ' Min ' +
					this.getMinority() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardSalaryLevel;