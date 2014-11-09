function JobCard(id, bonus, age_min, age_max)
{
	var id_ 	= id;
	var bonus_ = bonus;
	var age_min_ = age_min;
	var age_max_ = age_max;
	
	this.getId = function()
	{
		return id_;
	}
	this.getBonus = function()
	{
		return bonus_;
	}
	this.getAgeMin = function()
	{
		return age_min_;
	}
	this.getAgeMax = function()
	{
		return age_max_;
	}
	
	this.apply = function(player)
	{
		if(player.getAge() >= age_min_ && player.getAge() <= age_max_)
		{
			switch(id)
			{
				case 1:
					player.setMoney(player.getMoney() + bonus_);
					break;
				case 2:
					player.setMoney(player.getMoney() + bonus_);
					break;
				case 3:
					player.setMoney(player.getMoney() + bonus_);
					break;
				case 4:
					if(player.getEducationLevel() > 0)
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 5:
					player.setMoney(player.getMoney() + bonus_);
					break;
				case 6:
					if(player.getEducationLevel()>1 && (player.getIt() || player.getHrTrainer() || player.getLanguage()))
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 7:
					if(player.getIt() || player.getHrTrainer() || player.getLanguage())
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 8:
					if(player.getEducationLevel() > 0)
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 9:
					if(player.getEducationLevel()>1 && (player.getIt() || player.getHrTrainer() || player.getLanguage()))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 10:
					if(player.getEducationLevel()>0 && (player.getIt() || player.getHrTrainer() || player.getLanguage()))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 11:
					if(player.getLicence())
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 12:
					if(player.getIt())
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 13:
					if(player.getEducationLevel()>0 && (player.getIt() || player.getHrTrainer() || player.getLanguage()) || player.getLicence())
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 14:
					if(player.getLanguage())
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 15:
					if(player.getEducationLevel()>0 && (player.getIt() || player.getLanguage()))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 16:
					if(player.getIt() && player.getLanguage())
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 17:
					if(player.getEducationLevel()>0 && ((player.getIt() && player.getLanguage()) || (player.getCar()>1)))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 18:
					if(player.getEducationLevel()>1 && (player.getIt() && player.getLanguage()))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 19:
					if((player.getIt() && player.getLanguage()) || player.getCar() > 1)
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 20:
					if(player.getEducationLevel()>0 && ((player.getIt() && player.getLanguage()) || (player.getCar()>1 && player.getLicence())))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 21:
					if(player.getCar() > 0)
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 22:
					if((player.getIt() && player.getLanguage()) || (player.getLicence() && player.getCar > 1))
							player.setMoney(player.getMoney() + bonus_);
					break;
				case 23:
					if(player.getEducationLevel() > 0 && ((player.getIt() && player.getLanguage()) || player.getCar() > 1))
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 24:
					if(player.getCar() > 1)
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 25:
					if(player.getIt() && player.getLanguage() &&  (player.getCar()>1))
						player.setMoney(player.getMoney() + bonus_);	
					break;
				case 26:
					if(player.getEducationLevel() > 0 && player.getIt() && player.getLanguage() &&  (player.getCar()>1))
						player.setMoney(player.getMoney() + bonus_);	
					break;
				case 27:
					if(player.getEducationLevel()>1 && ((player.getIt() && player.getLanguage()) || (player.getCar()>1)))
						player.setMoney(player.getMoney() + bonus_);	
					break;
				case 28:
					if(player.getEducationLevel() > 1 && player.getIt() && player.getLanguage() && player.getCar() > 1 && player.getHrTrainer() && player.getMba())
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 29:
					if(player.getEducationLevel() > 0)
						player.setMoney(player.getMoney() + bonus_);
					break;
				case 30:
						player.setMoney(player.getMoney() + bonus_);
					break;
				default:
					console.log('JobCard Default');
					break;
			}
		}
	}
	this.print = function () {
  		console.log(this.getName());
	}
}

module.exports = JobCard;