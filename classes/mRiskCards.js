var CardMoney 			= require('./cCardMoney.js');
var CardTraining 		= require('./cCardTraining.js');
var CardFreeStuff 		= require('./cCardFreeStuff.js');
var CardSalaryLevel		= require('./cCardSalaryLevel.js');
var CardPlayerProp 		= require('./cCardPlayerProp.js');
var CardSalaryChange	= require('./cCardSalaryChange.js');
var CardLocation		= require('./cCardLocation.js');
var CardAbsurd			= require('./cCardAbsurd.js');
var RiskCards 		= require('./cRiskCards.js');

var riskCards = [
	new CardMoney(1, 2, "Jahresausgleich", 500),
	new CardMoney(2, 1, "Tante", 250),
	new CardMoney(3, 1, "Geldkoffer", 350),
	new CardMoney(4, 2, "Wirtschaftslage", 600),
	new CardMoney(5, 1, "Heizkosten", 1000),
	new CardMoney(6, 1, "Kredite", -1000),
	new CardMoney(7, 1, "Anwaltskosten", -750),
	new CardMoney(8, 1, "Brand", -1500),
	new CardMoney(9, 1, "Unfall#1", -750),
	new CardMoney(10, 1, "Diebstahl", -250),
	new CardMoney(11, 1, "Unfall#2", -500),
	
	new CardTraining(12, 2, "EDV", 0, 0, 0, 1, 100),
	new CardTraining(13, 1, "Matura", 1, 0, 0, 0, 100),
	new CardTraining(14, 1, "Führerschein", 0, 1, 0, 0, 100),
	new CardTraining(15, 3, "Sprachkurs", 0, 0, 1, 0, 100),
	new CardTraining(16, 1, "EDV Wertlos", 0, 0, 0, -1, 100),
	new CardTraining(17, 1, "EDV<35", 1, 0, 0, 1, 35),
	
	new CardFreeStuff(18, 3, "Gefängnis frei", 0, 1, 0, 0, 0),
	new CardFreeStuff(19, 2, "Autoreparatur", 0, 0, 1, 0, 0),
	new CardFreeStuff(20, 2, "Anwalt", 1, 0, 0, 0, 0),
	new CardFreeStuff(21, 1, "Neues Auto", 0, 0, 0, 1, 0),
	
	new CardSalaryLevel(22, 1, "Beförderung", 1, -9000, 0, 0),
	new CardSalaryLevel(23, 1, "Sex. Belästigung", -9000, -9000, 0, 0),
	new CardSalaryLevel(24, 1, "Mobbing", 0, 0, -9000, 0),
	new CardSalaryLevel(25, 1, "Vorg. Künd.", 0, 0, -9000, 0),
	new CardSalaryLevel(26, 1, "Rationalisierung", -9000, -9000, 0, 50),
	
	new CardPlayerProp(27, 2, "Einbürgerung", 1, 0, 0),
	new CardPlayerProp(28, 3, "Nostrifizierung", 0, 1, 0),
	new CardPlayerProp(29, 1, "Aufenthaltsgenehmigung", 0, 0, 1),
	
	new CardSalaryChange(30, 2, "Schwangerschaft", 5, -350, -0.5, 0, 0),
	new CardSalaryChange(31, 1, "Krankheit", 1, 0, 0, 0, -0.5),
	
	new CardLocation(32, 1, "Gefängnis", 1),
	new CardLocation(33, 2, "Ausbildungsfeld", 2),
	
	new CardAbsurd(34, 1, "Gerichtsverhandlung", 1),
	new CardAbsurd(35, 1, "Steuerfahndung", 2)
];

c = new RiskCards(riskCards);
module.exports = c;