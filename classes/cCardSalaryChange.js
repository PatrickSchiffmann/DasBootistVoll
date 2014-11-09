function CardSalaryChange(id, number, name, duration, male_a, female_p, euro_p, non_euro_p)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var duration_ 	= duration;
	var male_a_ 	= male_a;	//a .. absolut
	var female_p_ 	= female_p;	//p .. percentage
	var euro_p_ 	= euro_p;
	var non_euro_p_ = non_euro_p;
  
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
  
	this.getDuration = function()
	{
		return duration_;
	}
	
	this.getMaleAbsolute = function()
	{
		return male_a_;
	}
	
	this.getFemalePercentage = function()
	{
		return female_r_;
	}
	
	this.getEuroPercentage = function()
	{
		return euro_p_;
	}
	
	this.getNonEuroPercentage = function()
	{
		return non_euro_p_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardSalaryChange:');

		if(player.getSex() == 0)
		{
			console.log('m: salaryAbsolute = ' + male_a_ + ' (' + duration + ')');
			player.addSalaryChangeAbsolute(duration, male_a_);
		}
		else
		{
			console.log('w: salaryPercentage = ' + female_p_ + ' (' + duration + ')');
			player.addSalaryChangeRelative(duration, female_p_);
		}
		
		if(player.getEuCitizen() == 1)
		{
			console.log('eu: salaryPercentage = ' + euro_p_);
			player.addSalaryChangeRelative(duration, euro_p_);
		}

		else
		{
			console.log('not eu: salaryPercentage = ' + euro_p_);
			player.addSalaryChangeRelative(duration, non_euro_p_);
		}
		console.log('-------------------');
	}
  
	this.print = function () {
		console.log(this.getName() + ' Duration: ' + this.getDuration() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardSalaryChange;