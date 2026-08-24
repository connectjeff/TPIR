(function (root, factory) {
  const rules = factory();
  if (typeof module === "object" && module.exports) module.exports = rules;
  if (root) root.ShowcaseReadyWheelRules = rules;
}(typeof window === "undefined" ? null : window, function () {
  "use strict";

  const DOLLAR_BONUS = 1000;
  const GREEN_BONUS = 10000;
  const DOLLAR_JACKPOT = 25000;

  function bonusCash(spin) {
    if (spin === 100) return DOLLAR_JACKPOT;
    if (spin === 5 || spin === 15) return GREEN_BONUS;
    return 0;
  }

  function totalCashForDollar(bonusSpin) {
    return DOLLAR_BONUS + bonusCash(bonusSpin);
  }

  function resolveDollarBonus(opponentCount, source, spin) {
    const userSpin = spin();
    const opponentSpins = Array.from({ length: opponentCount }, spin);
    const opponentBest = Math.max(0, ...opponentSpins);
    let won = opponentCount === 0 || userSpin > opponentBest;
    let tieBreakRounds = [];

    if (opponentCount > 0 && userSpin === opponentBest) {
      const tiedOpponents = opponentSpins.filter((value) => value === userSpin).length;
      const tieBreak = resolveSpinOff(tiedOpponents, false, spin);
      won = tieBreak.won;
      tieBreakRounds = tieBreak.rounds;
    }

    return {
      source,
      opponentCount,
      userSpin,
      opponentSpins,
      bonusCash: bonusCash(userSpin),
      won,
      tieBreakRounds
    };
  }

  function resolveSpinOff(opponentCount, bonusesEligible, spin) {
    const rounds = [];
    let tiedOpponents = opponentCount;

    while (true) {
      const userSpin = spin();
      const opponentSpins = Array.from({ length: tiedOpponents }, spin);
      const opponentBest = Math.max(0, ...opponentSpins);
      rounds.push({ userSpin, opponentSpins, bonusesEligible });

      if (bonusesEligible && userSpin === 100) {
        const dollarTies = opponentSpins.filter((value) => value === 100).length;
        const dollar = resolveDollarBonus(dollarTies, "spin-off", spin);
        return { won: dollar.won, rounds, dollar };
      }
      if (userSpin > opponentBest) return { won: true, rounds, dollar: null };
      if (userSpin < opponentBest) return { won: false, rounds, dollar: null };

      tiedOpponents = opponentSpins.filter((value) => value === userSpin).length;
    }
  }

  return {
    DOLLAR_BONUS,
    GREEN_BONUS,
    DOLLAR_JACKPOT,
    bonusCash,
    totalCashForDollar,
    resolveDollarBonus,
    resolveSpinOff
  };
}));
