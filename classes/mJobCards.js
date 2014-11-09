var JobCard			= require('./cJobCard.js');
var JobCards 		= require('./cJobCards.js');

var job_cards = [
	new JobCard(1,  0,   0,  60),
	new JobCard(2,  0,   0,  100),
	new JobCard(3,  20,  0,  30),
	new JobCard(4,  50,  0,  30),
	new JobCard(5,  50,  0,  60),
	new JobCard(6,  100, 60, 100),
	new JobCard(7,  100, 0,  60),
	new JobCard(8,  100, 0,  60),
	new JobCard(9,  100, 30, 60),
	
	new JobCard(10,  100, 0,  100),
	new JobCard(11,  200, 60, 100),
	new JobCard(12,  200, 0,  30),
	new JobCard(13,  200, 30, 60),
	new JobCard(14,  250, 0,  100),
	new JobCard(15,  250, 60, 100),
	new JobCard(16,  500, 0,  60),
	new JobCard(17,  500, 0,  30),
	new JobCard(18,  500, 0,  30),
	
	new JobCard(19,  500,  0,    60),
	new JobCard(20,  500,  0,    60),
	new JobCard(21,  500,  0,   100),
	new JobCard(22,  500,  0,   100),
	new JobCard(23,  500,  0,   100),
	new JobCard(24,  750,  30,  160),
	new JobCard(25,  1000, 30,   60),
	new JobCard(26,  1000, 30,   60),
	new JobCard(27,  1000, 30,   60),
	
	new JobCard(28, 12000, 0,  60),
	new JobCard(29, 20,    0, 100),
	new JobCard(30, 100,   0, 100)
	
];

c = new JobCards(job_cards);
module.exports = c;