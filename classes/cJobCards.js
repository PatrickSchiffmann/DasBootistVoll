function JobCards(cards) {
	var cards_ 			= cards;
	
	this.print = function () {
		for(var iter in cards_) {
			cards_[iter].print();
		}
	}
	
	this.getCardById = function (id) {
		return cards[id];
	}
	
	this.draw = function (){
		var r = Math.floor((Math.random()*cards_.length));
		return r;
	}
}

module.exports = JobCards;