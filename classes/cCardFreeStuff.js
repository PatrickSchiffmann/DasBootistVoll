function CardFreeStuff(id, number, name, lawyer, jailbreak, car_repair, car_new, car_old)
{
	var id_ 	= id;
	var number_ = number;
	var name_ 	= name;
	
	var lawyer_ 	= lawyer;
	var jailbreak_ 	= jailbreak;
	var car_repair_ = car_repair;
	var car_old_ 	= car_old;
	var car_new_ 	= car_new;
  
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
  
	this.getLawyer = function()
	{
		return lawyer_;
	}
	
	this.getJailbreak = function()
	{
		return jailbreak_;
	}
	
	this.getCarRepair = function()
	{
		return car_repair_;
	}
	
	this.getCarNew = function()
	{
		return car_new_;
	}
	
	this.getCarOld = function()
	{
		return car_old_;
	}

	this.apply = function(player)
	{
		console.log('-------------------');
		console.log('apply CardFreeStuff:');
		console.log('lawyer_ from ' + player.getFreeLawyers() + ' to ' + lawyer_);
		player.setFreeLawyers(player.getFreeLawyers() + lawyer_);
		console.log('jailbreak_ from ' + player.getFreeJailbreaks() + ' to ' + jailbreak_);
		player.setFreeJailbreaks(player.getFreeJailbreaks() + jailbreak_);
		console.log('car_repair_ from ' + player.getFreeCarRepairs() + ' to ' + car_repair_);
		player.setFreeCarRepairs(player.getFreeCarRepairs() + car_repair_);

		process.stdout.write('car from ' + player.getCar() + ' to ');
		if(player.getCar == 0 && car_old_)
			player.setCar(1);
		if(player.getCar() < 2 && car_new_)
			player.setCar(2);
		console.log(player.getCar());
		console.log('-------------------');
	}
  
	this.print = function () {
		console.log(this.getName() + ' Effekt: Aw' + this.getFreeLawyers() + ' Gef ' + this.getFreeJailbreaks() + ' Auto: Neu ' +
					this.getFreeCarRepairs() + ' Neu' + this.getCarNew() + ' Alt' + this.getCarOld() + '. ' + this.getNumber() + ' Karten im Stapel');
	}
}

module.exports = CardFreeStuff;