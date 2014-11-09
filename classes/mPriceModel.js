
var PriceModel = require('./cPriceModel.js');

var priceModels = [
  new PriceModel(100, 5,  30,  90,  260,  380,  550,  50,  50),
  new PriceModel(120, 5,  40,  100, 300,  450,  600,  50,  50),
  new PriceModel(140, 10, 50,  150, 450,  600,  730,  100, 100),
  new PriceModel(180, 15, 70,  210, 500,  700,  750,  100, 100),
  new PriceModel(200, 15, 80,  230, 550,  710,  900,  110, 110),
  new PriceModel(210, 20, 90,  250, 600,  730,  930,  120, 150),
  new PriceModel(220, 20, 100, 300, 600,  750,  950,  160, 160),
  new PriceModel(240, 25, 100, 320, 680,  850,  1000, 140, 130),
  new PriceModel(250, 25, 110, 330, 700,  900,  1050, 150, 140),
  new PriceModel(300, 30, 150, 450, 850,  1050, 1200, 200, 200),
  new PriceModel(350, 40, 170, 500, 1000, 1300, 1600, 220, 220),
  new PriceModel(380, 50, 200, 600, 1300, 1600, 1950, 220, 220)
];
    
module.exports = priceModels;