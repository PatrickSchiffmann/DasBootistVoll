function RiskCards(cards) {
	var cards_ 			= cards;
	var cards_in_game_ 	= 0;
	var card_ids_ 		= [];
	
	for(var iter in cards_){
		cards_in_game_ += cards_[iter].getNumber();
		for(var i=0; i < cards_[iter].getNumber(); i++)
		{
			card_ids_.push(cards_[iter].getId());
		}
	}

	this.getCard = function(id) {
		return cards_[id];
	}

	this.getNumber = function()
	{
		return cards_in_game_;
	}
	
	this.print = function () {
		for(var iter in cards_) {
			cards_[iter].print();
		}
	}
	
	this.getCardById = function (id) {
		return cards[id];
	}
	
	this.draw = function (){
		var r = Math.floor((Math.random()*cards_in_game_));
		return card_ids_[r]-1;
	}
}

module.exports = RiskCards;