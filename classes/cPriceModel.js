//*****************************************************************************
//************************** P R I C E M O D E L S ****************************
//*****************************************************************************

function PriceModel(price, rent, h1, h2, h3, h4, hotel, priceHouse, priceHotel)
{
  var price_ = price;
  var rent_ = rent;
  var house1_ = h1;
  var house2_ = h2;
  var house3_ = h3;
  var house4_ = h4;
  var hotel_ = hotel;
  var priceHouse_ = priceHouse;
  var priceHotel_ = priceHotel;
  var houseCount_ = 0;
  var HotelCount_ = 0;

  this.getPrice = function() {
      return price_;
  }

  this.getRent = function() {
      return rent_;
  }

  this.getHouse1Rent = function() {
      return house1_;
  }

  this.getHouse2Rent = function() {
      return house2_;
  }

  this.getHouse3Rent = function() {
      return house3_;
  }

  this.getHouse4Rent = function() {
      return house4_;
  }

  this.getHotelRent = function() {
      return hotel_;
  }

  this.getPriceHouse = function() {
      return priceHouse_;
  }

  this.getPriceHotel = function() {
      return priceHotel_;
  }
}

module.exports = PriceModel;