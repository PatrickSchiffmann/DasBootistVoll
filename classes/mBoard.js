
// field types
const START = 0;
const IMMO = 1;
const RISK = 2;
const JOB = 3;
const FELONY = 4;
const TRAINING = 5;
const JAIL = 6;

// ghettos
const REDLIGHT = 0;
const OLD_TOWN = 1;
const INNER_CITY = 2;
const FIN_DISTRICT = 3;
const HOTSPOT = 4;
const UNI = 5;
const INDUSTRY = 6;
const MANSIONS = 7;

var Field 			= require('./cField.js');
var ImmoField 		= require('./cImmoField.js');

var PRICEMODELS = require('./mPriceModel.js');

var board = [
	new Field(START),
	new ImmoField(IMMO, "Bahnhofstraße",            REDLIGHT,      PRICEMODELS[6]),
	new Field(RISK),
	new Field(JOB),
	new ImmoField(IMMO, "Kirchengasse",             OLD_TOWN,      PRICEMODELS[7]),
	new ImmoField(IMMO, "Turmstraße",               OLD_TOWN,      PRICEMODELS[8]),
	new ImmoField(IMMO, "Färbergasse",              OLD_TOWN,      PRICEMODELS[9]),
	new Field(RISK),
	new Field(JOB),
	new ImmoField(IMMO, "Bürgergasse",              INNER_CITY,    PRICEMODELS[10]),
	new Field(FELONY),
	new ImmoField(IMMO, "Rathausplatz",             INNER_CITY,    PRICEMODELS[8]),
	new Field(RISK),
	new Field(JOB),
	new ImmoField(IMMO, "Schmiedgasse",             FIN_DISTRICT,  PRICEMODELS[10]),
	new ImmoField(IMMO, "Börsenplatz",              FIN_DISTRICT,  PRICEMODELS[9]),
	new ImmoField(IMMO, "Handelskai",               FIN_DISTRICT,  PRICEMODELS[6]),
	new Field(RISK),
	new Field(JOB),
	new ImmoField(IMMO, "Speicherstraße",           HOTSPOT,       PRICEMODELS[6]),
	new Field(TRAINING),
	new ImmoField(IMMO, "Mühlgasse",                HOTSPOT,       PRICEMODELS[4]),
	new Field(JOB),
	new Field(RISK),
	new ImmoField(IMMO, "Berta v. Suttner Straße",  UNI,           PRICEMODELS[8]),
	new ImmoField(IMMO, "Universitätsplatz",        UNI,           PRICEMODELS[6]),
	new ImmoField(IMMO, "Feldstraße",               INDUSTRY,      PRICEMODELS[2]),
	new Field(JOB),
	new Field(RISK),
	new ImmoField(IMMO, "Kasernengasse",            INDUSTRY,      PRICEMODELS[0]),
	new Field(JAIL),
	new ImmoField(IMMO, "Lagergasse",               INDUSTRY,      PRICEMODELS[5]),
	new Field(JOB),
	new Field(RISK),
	new ImmoField(IMMO, "Schlossallee",             MANSIONS,      PRICEMODELS[9]),
	new ImmoField(IMMO, "Am Rehgrund",              MANSIONS,      PRICEMODELS[11]),
	new ImmoField(IMMO, "Schillerstraße",           MANSIONS,      PRICEMODELS[9]),
	new Field(RISK),
	new ImmoField(IMMO, "Am Damm",                  REDLIGHT,      PRICEMODELS[3]),
	new ImmoField(IMMO, "Brauhaußstraße",           REDLIGHT,      PRICEMODELS[1])
];

module.exports = board;