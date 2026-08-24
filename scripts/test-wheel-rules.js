"use strict";

const assert = require("node:assert/strict");
const rules = require("../webapp/wheel-rules.js");

function spins(values) {
  let index = 0;
  return function spin() {
    assert.ok(index < values.length, "spin sequence exhausted");
    return values[index++];
  };
}

assert.equal(rules.bonusCash(5), 10000);
assert.equal(rules.bonusCash(15), 10000);
assert.equal(rules.bonusCash(100), 25000);
assert.equal(rules.bonusCash(95), 0);
assert.equal(rules.totalCashForDollar(40), 1000);
assert.equal(rules.totalCashForDollar(5), 11000);
assert.equal(rules.totalCashForDollar(15), 11000);
assert.equal(rules.totalCashForDollar(100), 26000);

const soloDollar = rules.resolveDollarBonus(0, "showdown", spins([40]));
assert.equal(soloDollar.won, true);
assert.equal(soloDollar.bonusCash, 0);

const greenFive = rules.resolveDollarBonus(0, "showdown", spins([5]));
assert.equal(greenFive.bonusCash, 10000);

const greenFifteen = rules.resolveDollarBonus(0, "showdown", spins([15]));
assert.equal(greenFifteen.bonusCash, 10000);

const jackpot = rules.resolveDollarBonus(0, "showdown", spins([100]));
assert.equal(jackpot.bonusCash, 25000);

const dollarSpinOffWin = rules.resolveDollarBonus(1, "showdown", spins([80, 60]));
assert.equal(dollarSpinOffWin.won, true);

const dollarSpinOffLossWithCash = rules.resolveDollarBonus(1, "showdown", spins([5, 20]));
assert.equal(dollarSpinOffLossWithCash.won, false);
assert.equal(dollarSpinOffLossWithCash.bonusCash, 10000);

const tiedBonusSpin = rules.resolveDollarBonus(1, "showdown", spins([15, 15, 90, 85]));
assert.equal(tiedBonusSpin.won, true);
assert.equal(tiedBonusSpin.bonusCash, 10000);
assert.equal(tiedBonusSpin.tieBreakRounds.length, 1);
assert.equal(tiedBonusSpin.tieBreakRounds[0].bonusesEligible, false);

const repeatedOrdinarySpinOff = rules.resolveSpinOff(1, true, spins([70, 70, 80, 75]));
assert.equal(repeatedOrdinarySpinOff.won, true);
assert.equal(repeatedOrdinarySpinOff.rounds.length, 2);
assert.equal(repeatedOrdinarySpinOff.dollar, null);

const spinOffDollar = rules.resolveSpinOff(1, true, spins([100, 80, 15]));
assert.equal(spinOffDollar.won, true);
assert.equal(spinOffDollar.dollar.source, "spin-off");
assert.equal(spinOffDollar.dollar.bonusCash, 10000);

const tiedDollarJackpot = rules.resolveSpinOff(1, true, spins([100, 100, 100, 100, 20, 20, 90, 80]));
assert.equal(tiedDollarJackpot.won, true);
assert.equal(tiedDollarJackpot.dollar.bonusCash, 25000);
assert.equal(tiedDollarJackpot.dollar.tieBreakRounds.length, 2);
assert.ok(tiedDollarJackpot.dollar.tieBreakRounds.every((round) => !round.bonusesEligible));

console.log("Big Wheel rule paths passed.");
