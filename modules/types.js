const difficultyLevel = Object.freeze({
  easy: { id: 1, title: 'easy', maxHealth: 15 },
  normal: { id: 2, title: 'normal', maxHealth: 10 },
  hard: { id: 3, title: 'hard', maxHealth: 8 },
  extreme: { id: 4, title: 'extreme', maxHealth: 6 },
});

const monsterSkills = [
  {
    "name": "Удар когтистой лапой",
    "physicalDmg": 3,           // физический урон
    "magicDmg": 0,              // магический урон
    "physicArmorPercents": 20,  // физическая броня
    "magicArmorPercents": 20,   // магическая броня
    "cooldown": 0               // ходов на восстановление
  },
  {
    "name": "Огненное дыхание",
    "physicalDmg": 0,
    "magicDmg": 4,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3
  },
  {
    "name": "Удар хвостом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 50,
    "magicArmorPercents": 0,
    "cooldown": 2
  },
];

const playerSkills = [
  {
    "name": "Удар боевым кадилом",
    "physicalDmg": 2,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 50,
    "cooldown": 0
  },
  {
    "name": "Вертушка левой пяткой",
    "physicalDmg": 4,
    "magicDmg": 0,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 4
  },
  {
    "name": "Каноничный фаербол",
    "physicalDmg": 0,
    "magicDmg": 5,
    "physicArmorPercents": 0,
    "magicArmorPercents": 0,
    "cooldown": 3
  },
  {
    "name": "Магический блок",
    "physicalDmg": 0,
    "magicDmg": 0,
    "physicArmorPercents": 100,
    "magicArmorPercents": 100,
    "cooldown": 4
  },
];

const battleCries = [
  'Кия!',
  'Кииииииия!',
  'Арррр...',
  'Ррррр!',
  'Кудааааах!!!',
  'Буууууум!', 
  'Ну всё, хана тебе...', 
  'Ах ты редиска!',
  'Ну всё, ты огребаешь!',
  'Стапэ пацанчик, суда иди...',
  'Опаааа, ну это ты зря...',
  'Спасибо, мама, что воспитала хулигана!',
  'Моргалы выкалю!',
];

module.exports = {
  difficultyLevel,
  playerSkills,
  monsterSkills,
  battleCries
}