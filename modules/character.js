const { battleCries } = require('./types');

class Character {
  constructor(name, maxHealth, moves) {
    this.name = name;
    this.health = maxHealth;
    this.selectedSkill = {};
    this.moves = moves;
    this.cooldownMoves = [];
  }

  setSelfDamage(physicalDmg, magicDmg) {
    const pDmg = physicalDmg - physicalDmg / 100 * this.selectedSkill.skill.physicArmorPercents;
    const mDmg = magicDmg - magicDmg / 100 * this.selectedSkill.skill.magicArmorPercents;
    this.health = (this.health - (pDmg + mDmg)).toFixed(2);
  }

  isAlive() {
    return this.health > 0;
  }

  sayHealth() {
    console.log(`Уровень здоровья у ${this.name} ${this.health}hp`);
  }

  sayMoveInfo() {
    console.group();
      console.log(`
        ${this.name}:
        ${this.selectedSkill.battleCries} Использую "${this.selectedSkill.skill.name}"!
        Это причинит ${this.selectedSkill.skill.physicalDmg} физического урона и ${this.selectedSkill.skill.magicDmg} магического.
        А также я смогу отразить ${this.selectedSkill.skill.physicArmorPercents}% твоего физического урона и ${this.selectedSkill.skill.magicArmorPercents}% магического!
      `);
    console.groupEnd();
  }

  // получаем скиллы которые не в кд
  getSkillWithoutCooldown() {
    return this.moves.filter((x) => !this.cooldownMoves.filter((y) => y.name === x.name).length);
  }

  // уменьшаем кд скиллов на один ход, если таковые есть
  reduceCooldown() {
    this.cooldownMoves = this.cooldownMoves.reduce((acc, el) => (el.cooldown > 1 && (el.cooldown--, acc.push(el)), acc), []);
  }

  /**
   * атака определенным скиллом
   * @param {String} usesSkill Наименование атакующего скилла
   */
  atack(usesSkill) {
    this.selectedSkill = {
      skill: this.moves.find((el) => el.name === usesSkill),
      battleCries: battleCries[Math.floor(Math.random() * battleCries.length)],
    };
    // уменьшаем кд скиллов на один ход, если таковые есть
    this.reduceCooldown();
    // если кд скилла больше нуля - пушим в массив скиллов кулдауна
    this.selectedSkill.skill.cooldown > 0 
    && this.cooldownMoves.push({name: this.selectedSkill.skill.name, cooldown: this.selectedSkill.skill.cooldown});
    return this.selectedSkill;
  }

  // рандомная атака
  randomAtack() {
    // скиллы, которые не в кд
    const availibleMoves = this.getSkillWithoutCooldown();
    // получаем рандомную атаку из доступных, а также рандомный клич
    this.selectedSkill = {
      skill: availibleMoves[Math.floor(Math.random() * availibleMoves.length)],
      battleCries: battleCries[Math.floor(Math.random() * battleCries.length)],
    };
    // уменьшаем кд скиллов на один ход, если таковые есть
    this.reduceCooldown();
    // если кд скилла больше нуля - пушим в массив скиллов кулдауна
    this.selectedSkill.skill.cooldown > 0 
    && this.cooldownMoves.push({name: this.selectedSkill.skill.name, cooldown: this.selectedSkill.skill.cooldown});
    return this.selectedSkill;
  }

}

module.exports = Character;
