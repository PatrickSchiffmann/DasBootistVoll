// sexes
const MALE = 0;
const FEMALE = 1;

// education
const NONE = 0;
const POOR = 1;
const HIGH = 2;

// majority
const MAJORITY = true;
const MINORITY = false;

var Character = require('./cCharacter.js');

var characters = [
      new Character("Besjana Pashku",         FEMALE, NONE, false,  MAJORITY, 1, 17),
      new Character("Maria Kolaric",          FEMALE, NONE, true,   MAJORITY, 3, 78),
      new Character("Weeda Ammad",            FEMALE, NONE, false,  MAJORITY, 2, 27),
      new Character("Yuna Blaha",             FEMALE, NONE, false,  MINORITY, 3, 31),
      new Character("Mirela Vacarescu",       FEMALE, NONE, false,  MINORITY, 2, 21),
      new Character("Tabita Tshisekedi",      FEMALE, NONE, false,  MINORITY, 2, 27),
      new Character("Benito Medici",          MALE,   NONE, false,  MAJORITY, 3, 35),
      new Character("Piotr Iwanowitsch",      MALE,   NONE, false,  MAJORITY, 1, 56),
      new Character("Serkan Gökdal",          MALE,   NONE, false,  MINORITY, 3, 20),
      new Character("Josefine Strohmaier",    FEMALE, POOR, true,   MAJORITY, 4, 48),
      new Character("Ayse Yildirim",          FEMALE, NONE, true,   MINORITY, 2, 32),
      new Character("Dirk Brauer",            MALE,   POOR, true,   MINORITY, 3, 37),
      new Character("Peter Strutz",           MALE,   NONE, false,  MINORITY, 2, 22),
      new Character("Andrzej Kowalski",       MALE,   NONE, false,  MINORITY, 3, 57),
      new Character("Mura Pheic",             MALE,   NONE, false,  MINORITY, 2, 36),
      new Character("Francis Makiadii",       MALE,   NONE, false,  MINORITY, 1, 27),
      new Character("Joao Ferro da Silva",    MALE,   NONE, true,   MINORITY, 3, 39),
      new Character("Evgenija Brcina",        FEMALE, POOR, false,  MAJORITY, 2, 22),
      new Character("Julija Racheva",         FEMALE, POOR, false,  MAJORITY, 4, 26),
      new Character("Binayak Sen",            FEMALE, POOR, false,  MAJORITY, 3, 28),
      new Character("Susanne Friedrich",      FEMALE, POOR, true,   MINORITY, 3, 40),
      new Character("Mile Stanovski",         FEMALE, POOR, false,  MINORITY, 3, 18),
      new Character("Abdullah Bugajew",       MALE,   POOR, false,  MAJORITY, 2, 34),
      new Character("Leopold Haselgruber",    MALE,   POOR, true,   MAJORITY, 3, 37),
      new Character("Yuen Chou",              MALE,   POOR, false,  MINORITY, 3, 29),
      new Character("György Köves",           MALE,   POOR, true,   MINORITY, 4, 19),
      new Character("Branko Jovanovic",       MALE,   POOR, false,  MINORITY, 2, 62),
      new Character("Marianne Strobl",        FEMALE, HIGH, true,   MAJORITY, 5, 27),
      new Character("Desdemona Stephanidis",  FEMALE, HIGH, true,   MAJORITY, 5, 22),
      new Character("Verena Trauer",          FEMALE, HIGH, true,   MAJORITY, 4, 29),
      new Character("Hwang Woo-Suk",          MALE,   HIGH, false,  MINORITY, 6, 56),
      new Character("Timna Mendel",           FEMALE, HIGH, false,  MINORITY, 6, 34),
      new Character("Ante Baric",             MALE,   HIGH, true,   MAJORITY, 4, 54),
      new Character("Hans Reiter",            MALE,   HIGH, true,   MAJORITY, 7, 66),
      new Character("Wajeha al-Huwaider",     FEMALE, HIGH, false,  MINORITY, 5, 45),
      new Character("Dorian Gray",            MALE,   HIGH, true,   MINORITY, 5, 24)
      ];
    
module.exports = characters;