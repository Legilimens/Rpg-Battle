const readlineSync = require('readline-sync');
const { difficultyLevel, monsterSkills, playerSkills } = require('./types');
const Character = require('./character');

const game = () => {

  console.clear();

  console.group('Выберите ваш уровень игры: ');
    // + для преобразования строки в число
    const chooseLvl = +readlineSync.keyIn(`
      [${difficultyLevel.easy.id}] - ${difficultyLevel.easy.title}, u vas budet ${difficultyLevel.easy.maxHealth} hp
      [${difficultyLevel.normal.id}] - ${difficultyLevel.normal.title}, u vas budet ${difficultyLevel.normal.maxHealth} hp
      [${difficultyLevel.hard.id}] - ${difficultyLevel.hard.title}, u vas budet ${difficultyLevel.hard.maxHealth} hp
      [${difficultyLevel.extreme.id}] - ${difficultyLevel.extreme.title}, u vas budet ${difficultyLevel.extreme.maxHealth} hp
    : `, {limit: '$<1-4>'});
  console.groupEnd();

  const selectedLvl = Object.values(difficultyLevel).find((el) => el.id === chooseLvl);

  const Monster = new Character("Лютый", 10, monsterSkills);
  const Player = new Character("Евстафий", selectedLvl.maxHealth, playerSkills);

  console.group();
    console.log(`\nОкей, ${Player.name}, ты выбрал режим "${selectedLvl.title}" и у тебя есть ${Player.health}hp!`);
    console.log(`Против тебя сражается монстр по кличке ${Monster.name}, у которого ${Monster.health}hp. Приготовься, он атакует!`);
  console.groupEnd();
  console.log('__________________________________________________________________________________________________________________');

  while (Monster.isAlive() && Player.isAlive()) {
    // рандомный скилл монстра
    Monster.randomAtack();
    Monster.sayMoveInfo();

    console.log('Чем ответишь? Выбирай!');
    console.group();
      const availibleMoves = Player.getSkillWithoutCooldown();
      availibleMoves.map((skill, key) => 
        console.log(`[${++key}]: ${skill.name} (${skill.physicalDmg}ФУ, ${skill.magicDmg}МУ, ${skill.physicArmorPercents}ФЗ, ${skill.magicArmorPercents}МЗ)`)
      );
    console.groupEnd();
    const chooseSkill = +readlineSync.keyIn(': ', {limit: `$<1-${availibleMoves.length}>`});

    // выбранный скилл игрока
    Player.atack(availibleMoves[chooseSkill-1].name);
    Player.sayMoveInfo();

    // считаем, кто сколько кому снес
    Player.setSelfDamage(Monster.selectedSkill.skill.physicalDmg, Monster.selectedSkill.skill.magicDmg);
    Monster.setSelfDamage(Player.selectedSkill.skill.physicalDmg, Player.selectedSkill.skill.magicDmg);
    
    if (Player.health > 0 && Monster.health > 0){
      // сообщаем текущие показатели если оба героя живы
      console.group();
        Monster.sayHealth();
        Player.sayHealth();
      console.groupEnd();
    }
    console.log('__________________________________________________________________________________________________________________');
  }

  console.group('Бадабум!');
    if(Monster.health <= 0 && Player.health <= 0) {
      // произошла ничьи, герои трагически погибли на последнем издыхании
      console.log('Ничья! Это была эпичная битва, но оба герои пали смертью храбрых, поверзив друг друга на последнем вздохе');
    } else {
      const winner = Monster.health > Player.health ? Monster: Player;
      console.log(`${winner.name} победитель! Сражался как лев, оставив в запасе лишь ${winner.health}hp!`);
    }
  console.groupEnd();

  const playAgain = +readlineSync.keyIn(`\nPlay again?
    [1] - Yes
    [2] - No
  : `, {limit: '$<1-2>'});

  playAgain === 1 && game();
}

module.exports = game;