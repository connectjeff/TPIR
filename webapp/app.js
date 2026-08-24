(function () {
  "use strict";

  const STORAGE_KEY = "tpirPracticeSession.v1";
  const MAX_ROW_ATTEMPTS = 6;

  const gates = [
    { key: "row", label: "Row", full: "Contestants Row" },
    { key: "prize", label: "Prize", full: "Prize round" },
    { key: "wheel", label: "Wheel", full: "Big Wheel" },
    { key: "showcase", label: "Show", full: "Showcase" }
  ];

  const officialGameVisuals = {
    anyNumber: {
      title: "Any Number",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0030_AnyNumber.jpg",
      page: "https://priceisright.com/game-page/?id=any-number",
      source: "Official TPIR game page"
    },
    backTo75: {
      title: "Back to 75",
      image: "https://priceisright.com/wp-content/uploads/2025/09/Back_to_75-Web_Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=back-to-75",
      source: "Official TPIR game page"
    },
    balanceGame: {
      title: "Balance Game",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0038_BalanceGame.jpg",
      page: "https://priceisright.com/game-page/?id=balance-game",
      source: "Official TPIR game page"
    },
    bargainGame: {
      title: "Bargain Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0022_BargainGame.jpg",
      page: "https://priceisright.com/game-page/?id=bargain-game",
      source: "Official TPIR game page"
    },
    bonkers: {
      title: "Bonkers",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0036_Bonkers.jpg",
      page: "https://priceisright.com/game-page/?id=bonkers",
      source: "Official TPIR game page"
    },
    bonusGame: {
      title: "Bonus Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Bonus_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=bonus-game",
      source: "Official TPIR game page"
    },
    bullseye: {
      title: "Bullseye",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Bullseye-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=bullseye",
      source: "Official TPIR game page"
    },
    cardGame: {
      title: "Card Game",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0034_CardGame_icon.jpg",
      page: "https://priceisright.com/game-page/?id=card-game",
      source: "Official TPIR game page"
    },
    checkGame: {
      title: "Check Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Check_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=check-game",
      source: "Official TPIR game page"
    },
    checkOut: {
      title: "Check-Out",
      image: "https://priceisright.com/wp-content/uploads/2013/08/games__0032_CheckOut.jpg",
      page: "https://priceisright.com/game-page/?id=check-out",
      source: "Official TPIR game page"
    },
    cliffHangers: {
      title: "Cliff Hangers",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_02.jpg",
      page: "https://priceisright.com/game-page/?id=cliff-hangers",
      source: "Official TPIR game page"
    },
    clockGame: {
      title: "Clock Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Clock_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=clock-game",
      source: "Official TPIR game page"
    },
    comingOrGoing: {
      title: "Coming or Going",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0019_ComingOrGoing.jpg",
      page: "https://priceisright.com/game-page/?id=coming-or-going",
      source: "Official TPIR game page"
    },
    coverUp: {
      title: "Cover Up",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0028_CoverUp.jpg",
      page: "https://priceisright.com/game-page/?id=cover-up",
      source: "Official TPIR game page"
    },
    dangerPrice: {
      title: "Danger Price",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0056_DangerPrice.jpg",
      page: "https://priceisright.com/game-page/?id=danger-price",
      source: "Official TPIR game page"
    },
    diceGame: {
      title: "Dice Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0026_DiceGame.jpg",
      page: "https://priceisright.com/game-page/?id=dice-game",
      source: "Official TPIR game page"
    },
    doTheMath: {
      title: "Do the Math",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0076_DoTheMath.jpg",
      page: "https://priceisright.com/game-page/?id=do-the-math",
      source: "Official TPIR game page"
    },
    doubleCross: {
      title: "Double Cross",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_08.jpg",
      page: "https://priceisright.com/game-page/?id=double-cross",
      source: "Official TPIR game page"
    },
    doublePrices: {
      title: "Double Prices",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0010_DoublePrices.jpg",
      page: "https://priceisright.com/game-page/?id=double-prices",
      source: "Official TPIR game page"
    },
    easyAs123: {
      title: "Easy as 1-2-3",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0057_EasyAs123.jpg",
      page: "https://priceisright.com/game-page/?id=easy-as-1-2-3",
      source: "Official TPIR game page"
    },
    fivePriceTags: {
      title: "Five Price Tags",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0073_5PriceTags.jpg",
      page: "https://priceisright.com/game-page/?id=five-price-tags",
      source: "Official TPIR game page"
    },
    flipFlop: {
      title: "Flip Flop",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0058_FlipFlop.jpg",
      page: "https://priceisright.com/game-page/?id=flip-flop",
      source: "Official TPIR game page"
    },
    freezeFrame: {
      title: "Freeze Frame",
      image: "https://priceisright.com/wp-content/uploads/2013/07/freeze_frame_site.jpg",
      page: "https://priceisright.com/game-page/?id=freeze-frame",
      source: "Official TPIR game page"
    },
    gasMoney: {
      title: "Gas Money",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0009_GasMoney.jpg",
      page: "https://priceisright.com/game-page/?id=gas-money",
      source: "Official TPIR game page"
    },
    goldenRoad: {
      title: "Golden Road",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0059_GoldenRoad.jpg",
      page: "https://priceisright.com/game-page/?id=golden-road",
      source: "Official TPIR game page"
    },
    grandGame: {
      title: "Grand Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Grand_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=grand-game",
      source: "Official TPIR game page"
    },
    gridlock: {
      title: "Gridlock",
      image: "https://priceisright.com/wp-content/uploads/2019/10/Gridlock-for-PIR.com_.jpg",
      page: "https://priceisright.com/game-page/?id=gridlock",
      source: "Official TPIR game page"
    },
    groceryGame: {
      title: "Grocery Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Grocery_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=grocery-game",
      source: "Official TPIR game page"
    },
    halfOff: {
      title: "Half Off",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Half_Off-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=half-off",
      source: "Official TPIR game page"
    },
    hiLo: {
      title: "Hi-Lo",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0027_HiLo.jpg",
      page: "https://priceisright.com/game-page/?id=hi-lo",
      source: "Official TPIR game page"
    },
    holeInOne: {
      title: "Hole in One",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0018_HOleInOne.jpg",
      page: "https://priceisright.com/game-page/?id=hole-in-one",
      source: "Official TPIR game page"
    },
    hotSeat: {
      title: "Hot Seat",
      image: "https://priceisright.com/wp-content/uploads/2016/09/Hot-Seat-for-PIR.com_.jpg",
      page: "https://priceisright.com/game-page/?id=hot-seat",
      source: "Official TPIR game page"
    },
    itsInTheBag: {
      title: "It's in the Bag",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Its_in_the_Bag-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=its-in-the-bag",
      source: "Official TPIR game page"
    },
    letEmRoll: {
      title: "Let 'em Roll",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0052_LetEmRoll.jpg",
      page: "https://priceisright.com/game-page/?id=let-em-roll",
      source: "Official TPIR game page"
    },
    lineEmUp: {
      title: "Line 'em Up",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0037_LineEMup.jpg",
      page: "https://priceisright.com/game-page/?id=line-em-up",
      source: "Official TPIR game page"
    },
    lionsShare: {
      title: "Lion's Share",
      image: "https://priceisright.com/wp-content/uploads/2025/09/The_Lions_Share-Web_Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=lions-share",
      source: "Official TPIR game page"
    },
    luckySeven: {
      title: "Lucky Seven",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_04.jpg",
      page: "https://priceisright.com/game-page/?id=lucky-seven",
      source: "Official TPIR game page"
    },
    magicNumber: {
      title: "Magic #",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_05.jpg",
      page: "https://priceisright.com/game-page/?id=magic",
      source: "Official TPIR game page"
    },
    makeYourMove: {
      title: "Make Your Move",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0043_MakeYourMove.jpg",
      page: "https://priceisright.com/game-page/?id=make-your-move",
      source: "Official TPIR game page"
    },
    masterKey: {
      title: "Master Key",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Master_Key-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=master-key",
      source: "Official TPIR game page"
    },
    moneyGame: {
      title: "Money Game",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0042_MoneyGame.jpg",
      page: "https://priceisright.com/game-page/?id=money-game",
      source: "Official TPIR game page"
    },
    moreOrLess: {
      title: "More or Less",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0023_MoreOrLess.jpg",
      page: "https://priceisright.com/game-page/?id=more-or-less",
      source: "Official TPIR game page"
    },
    mostExpensive: {
      title: "Most Expensive",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0011_MostExpensive.jpg",
      page: "https://priceisright.com/game-page/?id=most-expensive",
      source: "Official TPIR game page"
    },
    nowOrThen: {
      title: "Now or Then",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0068_NoworThen.jpg",
      page: "https://priceisright.com/game-page/?id=now-or-then",
      source: "Official TPIR game page"
    },
    oneAway: {
      title: "One Away",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0008_OneAway.jpg",
      page: "https://priceisright.com/game-page/?id=one-away",
      source: "Official TPIR game page"
    },
    oneRightPrice: {
      title: "One Right Price",
      image: "https://priceisright.com/wp-content/uploads/2013/07/One_Right_Price-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=one-right-price",
      source: "Official TPIR game page"
    },
    oneWrongPrice: {
      title: "One Wrong Price",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0074_OneWrongPrice.jpg",
      page: "https://priceisright.com/game-page/?id=one-wron-price",
      source: "Official TPIR game page"
    },
    passTheBuck: {
      title: "Pass the Buck",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0055_PasstheBuck.jpg",
      page: "https://priceisright.com/game-page/?id=pass-the-buck",
      source: "Official TPIR game page"
    },
    pathfinder: {
      title: "Pathfinder",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Pathfinder-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=pathfinder",
      source: "Official TPIR game page"
    },
    payTheRent: {
      title: "Pay the Rent",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_07.jpg",
      page: "https://priceisright.com/game-page/?id=pay-the-rent",
      source: "Official TPIR game page"
    },
    pickANumber: {
      title: "Pick-a-Number",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0054_PickaNumber.jpg",
      page: "https://priceisright.com/game-page/?id=pick-a-number",
      source: "Official TPIR game page"
    },
    pickAPair: {
      title: "Pick-a-Pair",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_09.jpg",
      page: "https://priceisright.com/game-page/?id=pick-a-pair",
      source: "Official TPIR game page"
    },
    plinko: {
      title: "Plinko",
      image: "https://priceisright.com/wp-content/uploads/2013/05/games_homepage_01.jpg",
      page: "https://priceisright.com/game-page/?id=plinko",
      source: "Official TPIR game page"
    },
    pocketChange: {
      title: "Pocket Change",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0012_PocketChange.jpg",
      page: "https://priceisright.com/game-page/?id=pocket-change",
      source: "Official TPIR game page"
    },
    punchABunch: {
      title: "Punch a Bunch",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Punch_a_Bunch-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=punch-a-bunch",
      source: "Official TPIR game page"
    },
    pushOver: {
      title: "Push Over",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Push_Over-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=pushover",
      source: "Official TPIR game page"
    },
    raceGame: {
      title: "Race Game",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0046_RaceGame.jpg",
      page: "https://priceisright.com/game-page/?id=race-game",
      source: "Official TPIR game page"
    },
    rangeGame: {
      title: "Range Game",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0061_RangeGame.jpg",
      page: "https://priceisright.com/game-page/?id=range-game",
      source: "Official TPIR game page"
    },
    ratRace: {
      title: "Rat Race",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0047_RatRace.jpg",
      page: "https://priceisright.com/game-page/?id=rat-race",
      source: "Official TPIR game page"
    },
    safeCrackers: {
      title: "Safe Crackers",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0025_SafeCrackers.jpg",
      page: "https://priceisright.com/game-page/?id=safecrackers",
      source: "Official TPIR game page"
    },
    secretX: {
      title: "Secret X",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0048_SecretX.jpg",
      page: "https://priceisright.com/game-page/?id=secret-x",
      source: "Official TPIR game page"
    },
    shellGame: {
      title: "Shell Game",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Shell_Game-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=shell-game",
      source: "Official TPIR game page"
    },
    shoppingSpree: {
      title: "Shopping Spree",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0063_ShoppingSpree.jpg",
      page: "https://priceisright.com/game-page/?id=shopping-spree",
      source: "Official TPIR game page"
    },
    sideBySide: {
      title: "Side by Side",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Side_by_Side-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=side-by-side",
      source: "Official TPIR game page"
    },
    spellingBee: {
      title: "Spelling Bee",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0013_SpellingBee.jpg",
      page: "https://priceisright.com/game-page/?id=spelling-bee",
      source: "Official TPIR game page"
    },
    squeezePlay: {
      title: "Squeeze Play",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Squeeze_Play-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=squeeze-play",
      source: "Official TPIR game page"
    },
    stackTheDeck: {
      title: "Stack the Deck",
      image: "https://priceisright.com/wp-content/uploads/2013/07/Stack_the_Deck-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=stack-the-deck",
      source: "Official TPIR game page"
    },
    swapMeet: {
      title: "Swap Meet",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0049_SwapMeet.jpg",
      page: "https://priceisright.com/game-page/?id=swap-meet",
      source: "Official TPIR game page"
    },
    switch: {
      title: "Switch",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0060_SwitchSwitch.jpg",
      page: "https://priceisright.com/game-page/?id=switch",
      source: "Official TPIR game page"
    },
    switcheroo: {
      title: "Switcheroo",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0045_Switcheroo.jpg",
      page: "https://priceisright.com/game-page/?id=switcheroo",
      source: "Official TPIR game page"
    },
    takeTwo: {
      title: "Take Two",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0066_TakeTwo.jpg",
      page: "https://priceisright.com/game-page/?id=to3ialhijts",
      source: "Official TPIR game page"
    },
    temptation: {
      title: "Temptation",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0065_Temptation.jpg",
      page: "https://priceisright.com/game-page/?id=temptation",
      source: "Official TPIR game page"
    },
    tenChances: {
      title: "Ten Chances",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0053_10Chances.jpg",
      page: "https://priceisright.com/game-page/?id=ten-chances",
      source: "Official TPIR game page"
    },
    thatsTooMuch: {
      title: "That's Too Much",
      image: "https://priceisright.com/wp-content/uploads/2013/08/games__0031_ThatsTooMuch.jpg",
      page: "https://priceisright.com/game-page/?id=thats-too-much",
      source: "Official TPIR game page"
    },
    threeStrikes: {
      title: "Three Strikes",
      image: "https://priceisright.com/wp-content/uploads/2013/07/3_Srikes-Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=three-strikes",
      source: "Official TPIR game page"
    },
    timeIsMoney: {
      title: "Time Is Money",
      image: "https://priceisright.com/wp-content/uploads/2014/09/games_template_timeismoney.jpg",
      page: "https://priceisright.com/game-page/?id=time-is-money",
      source: "Official TPIR game page"
    },
    toThePenny: {
      title: "To the Penny",
      image: "https://priceisright.com/wp-content/uploads/2025/09/To_the_Penny-Web_Rollover.jpg",
      page: "https://priceisright.com/game-page/?id=to-the-penny",
      source: "Official TPIR game page"
    },
    triplePlay: {
      title: "Triple Play",
      image: "https://priceisright.com/wp-content/uploads/2013/07/games__0015_TriplePlay.jpg",
      page: "https://priceisright.com/game-page/?id=triple-play",
      source: "Official TPIR game page"
    },
    twoForOne: {
      title: "Two For One",
      image: "https://priceisright.com/wp-content/uploads/2013/08/0050_2forthePriceof1.jpg",
      page: "https://priceisright.com/game-page/?id=two-for-one",
      source: "Official TPIR game page"
    },
    vendOPrice: {
      title: "Vend-O-Price",
      image: "https://priceisright.com/wp-content/uploads/2015/11/Vend-O-Price-Web-Graphic1.jpg",
      page: "https://priceisright.com/game-page/?id=vend-o-price",
      source: "Official TPIR game page"
    }
  };

  const pricingPracticeGames = [
    { key: "anyNumber", label: "Any Number", mode: "documented", activity: "Show a car, mid-prize, and piggy bank. Ask the user to choose digits one at a time after seeing a first car digit.", coach: "Uses car-price conventions and avoids wasting likely car digits on the piggy bank.", common: "Picking favorite numbers randomly." },
    { key: "backTo75", label: "Back to 75 (Back to 76)", mode: "documented", activity: "Give a retro-styled board with numbered choices and ask the user to choose a path/option set under the current displayed rules.", coach: "Verifies current rules first; reasons from revealed feedback.", common: "Assuming anniversary rules without checking the current page." },
    { key: "balanceGame", label: "Balance Game", mode: "documented", activity: "Give three money bags plus a base amount and a prize. Ask which bags make the actual retail price.", coach: "Estimates the prize first, then adds bags.", common: "Treating bags as abstract math without pricing the prize." },
    { key: "bargainGame", label: "Bargain Game", mode: "documented", activity: "Show two prizes with sale prices. Ask which has the larger markdown from actual retail price.", coach: "Estimates both actual retail prices and compares differences, not final prices.", common: "Choosing the cheaper sale price." },
    { key: "bonkers", label: "Bonkers", mode: "documented", activity: "Give a four-digit displayed price and a prize. User marks each digit higher/lower under time pressure.", coach: "Fast initial estimate and willingness to change all wrong positions.", common: "Moving one marker at a time without a price opinion." },
    { key: "bonusGame", label: "Bonus Game", mode: "documented", activity: "Give four small prizes with displayed prices. User calls higher/lower to reveal windows.", coach: "Wins as many windows as possible using small-prize knowledge.", common: "Thinking the bonus location is controllable." },
    { key: "bullseye", label: "Bullseye", mode: "documented", activity: "Give five grocery products. User chooses quantity of one item to hit target range.", coach: "Starts with unit-price arithmetic; pivots if outside range.", common: "Picking favorite product rather than a controllable unit price." },
    { key: "cardGame", label: "Card Game", mode: "documented", activity: "Give a car type and draw range. User stops after drawing cards toward a car bid.", coach: "Balances close bid with overbid risk.", common: "Ignoring the allowed range or overbidding late." },
    { key: "checkGame", label: "Check Game", mode: "documented", activity: "Give a prize and ask user to write a check so check plus prize falls in the target range.", coach: "Estimates prize, subtracts from target midpoint.", common: "Writing a check before estimating the prize." },
    { key: "checkOut", label: "Check-Out", mode: "documented", activity: "Give five grocery items. User estimates each and total must fall within tolerance.", coach: "Uses realistic grocery prices and package sizes.", common: "Overfocusing on one item and missing total error." },
    { key: "cliffHangers", label: "Cliff Hangers", mode: "documented", activity: "Give three small prizes. User estimates each to keep total miss under the climber limit.", coach: "Uses category anchors and avoids extreme guesses.", common: "Throwing out rounded guesses with no package/model context." },
    { key: "clockGame", label: "Clock Game", mode: "documented", activity: "Give two prizes. User uses higher/lower feedback to converge in seconds.", coach: "Binary-search style hundreds/tens/ones strategy.", common: "Counting slowly or guessing random numbers." },
    { key: "comingOrGoing", label: "Coming or Going", mode: "documented", activity: "Show a reversible price for a trip/prize. User chooses forward or backward.", coach: "Estimates whether the price scale fits the prize.", common: "Choosing the prettier number." },
    { key: "coverUp", label: "Cover Up", mode: "documented", activity: "Give columns of digits for a car. User builds a car price and updates after feedback.", coach: "Keeps confirmed digits and changes only unconfirmed positions.", common: "Changing known-correct digits." },
    { key: "dangerPrice", label: "Danger Price", mode: "documented", activity: "Show a danger price and four prizes. User picks the three prizes not matching it.", coach: "Estimates all four prizes before selecting.", common: "Picking the item they most want." },
    { key: "diceGame", label: "Dice Game", mode: "documented", activity: "User rolls digits for a car and calls exact/higher/lower for each.", coach: "Knows 1 must be higher and 6 must be lower if not exact.", common: "Calling lower on 1 or higher on 6." },
    { key: "doTheMath", label: "Do the Math", mode: "documented", activity: "Give two prizes and a dollar difference. User chooses add or subtract.", coach: "Estimates both prizes and compares difference.", common: "Treating the cash amount as a bonus only." },
    { key: "doubleCross", label: "Double Cross", mode: "documented", activity: "Give two crossing price paths. User slides to form two prize prices.", coach: "Checks both prices simultaneously.", common: "Making one plausible price while the other is impossible." },
    { key: "doublePrices", label: "Double Prices", mode: "documented", activity: "Give two possible prices for one prize. User chooses the actual retail price.", coach: "Anchors by category and feature level.", common: "Guessing solely by price ending." },
    { key: "easyAs123", label: "Easy as 1-2-3", mode: "documented", activity: "Show three prizes. User ranks low, middle, high.", coach: "Uses relative retail value.", common: "Assuming size equals price." },
    { key: "fivePriceTags", label: "Five Price Tags", mode: "documented", activity: "Give a car and four small-prize true/false decisions to earn picks. User chooses the car price tag.", coach: "Maximizes picks, then uses car trim anchors.", common: "Treating small prizes as unimportant." },
    { key: "flipFlop", label: "Flip Flop (Flip or Flop)", mode: "bespoke", activity: "Give four digits split into two pairs. User chooses flip, flop, both, or neither.", coach: "Estimates the prize and chooses plausible pair order.", common: "Automatically flipping both." },
    { key: "freezeFrame", label: "Freeze Frame", mode: "documented", activity: "Present rotating price pairs. User stops at the likely price.", coach: "Estimates before stopping.", common: "Waiting for a familiar-looking number." },
    { key: "gasMoney", label: "Gas Money", mode: "documented", activity: "Show five car prices. User identifies the actual car price while collecting cash from wrong prices.", coach: "Eliminates implausible prices by model/trim.", common: "Picking the car price too early without elimination." },
    { key: "goldenRoad", label: "Golden Road", mode: "documented", activity: "Start with a grocery item and missing digits for escalating prizes. User chooses digits.", coach: "Uses digit carry-forward and prize scale.", common: "Forgetting only displayed digits are available." },
    { key: "grandGame", label: "Grand Game", mode: "documented", activity: "Give target price and six groceries. User picks items below target.", coach: "Identifies package sizes and premium exceptions.", common: "Assuming all groceries are under target." },
    { key: "gridlock", label: "Gridlock", mode: "documented", activity: "Give first car digit and pairs of next digits. User chooses each pair.", coach: "Uses car price plausibility.", common: "Treating two-digit chunks independently of car class." },
    { key: "groceryGame", label: "Grocery Game", mode: "documented", activity: "Give five grocery items and a target total range. User buys quantities.", coach: "Uses multiplication and leaves room for error.", common: "Buying too many units of a high-price item." },
    { key: "halfOff", label: "Half Off (1/2 Off)", mode: "documented", activity: "Give small-prize pairs for box eliminations, then choose a cash box.", coach: "Earns eliminations through small-prize pricing.", common: "Treating the final box as fully strategic." },
    { key: "hiLo", label: "Hi-Lo", mode: "documented", activity: "Give six grocery items. User selects the three highest.", coach: "Identifies premium items and package sizes.", common: "Picking based on personal preference." },
    { key: "holeInOne", label: "Hole in One", mode: "documented", activity: "Give six grocery items. User ranks low to high for putting advantage.", coach: "Relative grocery ordering.", common: "Ignoring package size." },
    { key: "hotSeat", label: "Hot Seat", mode: "documented", activity: "Give five small prizes with displayed prices. User calls higher/lower quickly and decides when to stop.", coach: "Uses fast small-prize instincts and risk thresholds.", common: "Risking accumulated money on a pure guess." },
    { key: "itsInTheBag", label: "It's in the Bag", mode: "documented", activity: "Match grocery items to bag prices, then decide when to stop.", coach: "Price matching and cash-out discipline.", common: "Chasing top money after uncertain matches." },
    { key: "letEmRoll", label: "Let 'em Roll", mode: "documented", activity: "Price three grocery items higher/lower to earn rolls, then decide rerolls.", coach: "Earns rolls; keeps car symbols.", common: "Rerolling car symbols or missing obvious grocery order." },
    { key: "lineEmUp", label: "Line 'em Up", mode: "documented", activity: "Use three prize prices to choose middle digits of a car.", coach: "Tests car-price plausibility and uses feedback.", common: "Changing all digits after partial feedback." },
    { key: "lionsShare", label: "Lion's Share (The Lion's Share)", mode: "documented", activity: "Give product/prize clues and staged choices. User chooses under the current rules after verification.", coach: "Verifies current official rules and reasons from revealed values.", common: "Applying rules from a different new game or special." },
    { key: "luckySeven", label: "Lucky Seven (Lucky $even)", mode: "documented", activity: "Guess car digits while losing dollars equal to misses.", coach: "Uses midrange guesses and car-price conventions.", common: "Extreme digit guesses without evidence." },
    { key: "magicNumber", label: "Magic #", mode: "documented", activity: "Give two prizes. User sets a number between their actual retail prices.", coach: "Estimates both and places a safe middle number.", common: "Setting too close to one estimate." },
    { key: "makeYourMove", label: "Make Your Move", mode: "documented", activity: "Arrange digit blocks into prices for three prizes.", coach: "Uses digit length and prize category.", common: "Creating one good price and two impossible ones." },
    { key: "masterKey", label: "Master Key", mode: "documented", activity: "Price small prizes to earn keys, then assign keys to locks.", coach: "Earns keys; understands final key choice is uncertain.", common: "Treating key selection as predictable." },
    { key: "moneyGame", label: "Money Game", mode: "documented", activity: "Pick two-digit cards for front/back of car while avoiding cash decoys.", coach: "Uses current car price anchors and common endings.", common: "Picking all low cards because they look like cash." },
    { key: "moreOrLess", label: "More or Less", mode: "documented", activity: "Decide if each revealed price is more or less than actual, escalating to car.", coach: "Anchors each prize before answering.", common: "Rushing small prizes and losing before the car." },
    { key: "mostExpensive", label: "Most Expensive", mode: "bespoke", activity: "Show three prizes. User identifies the highest actual retail price.", coach: "Compares category and quality, not size.", common: "Assuming largest item is most expensive." },
    { key: "nowOrThen", label: "Now or Then", mode: "documented", activity: "Give groceries and an old date. User calls current price or historical price.", coach: "Uses product inflation and shelf-stable category knowledge.", common: "Treating every low price as \"then.\"" },
    { key: "oneAway", label: "One Away", mode: "bespoke", activity: "Adjust each wrong car digit up/down by one, then revise after honks.", coach: "Uses car-price plausibility and feedback count.", common: "Changing digits randomly after partial feedback." },
    { key: "oneRightPrice", label: "One Right Price (1 Right Price)", mode: "documented", activity: "Show one price and two prizes. User assigns price to correct prize.", coach: "Estimates both prizes.", common: "Matching by superficial similarity." },
    { key: "oneWrongPrice", label: "One Wrong Price", mode: "documented", activity: "Show three prizes with prices. User identifies the wrong one.", coach: "Finds the price farthest from plausible retail.", common: "Choosing the least liked prize." },
    { key: "passTheBuck", label: "Pass the Buck", mode: "documented", activity: "Price grocery pairs to earn board picks, then choose spaces.", coach: "Wins picks with grocery pricing; manages stop/continue if applicable.", common: "Assuming board placement is skill-based." },
    { key: "pathfinder", label: "Pathfinder", mode: "documented", activity: "Walk through a car price grid using small-prize chances after mistakes.", coach: "Uses car digit conventions and small-prize recovery.", common: "Stepping without considering adjacent plausibility." },
    { key: "payTheRent", label: "Pay the Rent", mode: "documented", activity: "Arrange six grocery items into increasing floor totals.", coach: "Tests sums, not simple low-to-high order.", common: "Sorting items by individual price." },
    { key: "pickANumber", label: "Pick-a-Number", mode: "documented", activity: "Fill one missing digit in a prize price from three choices.", coach: "Estimates full price and eliminates impossible digits.", common: "Picking favorite digit." },
    { key: "pickAPair", label: "Pick-a-Pair", mode: "documented", activity: "Pick two grocery items with the same price.", coach: "Recognizes common same-price package tiers.", common: "Pairing similar products instead of similar prices." },
    { key: "plinko", label: "Plinko", mode: "documented", activity: "Price small items to earn chips; then drop chips.", coach: "Earns chips with small-prize knowledge.", common: "Overstating control of chip drops." },
    { key: "pocketChange", label: "Pocket Change", mode: "documented", activity: "Build car price from digits, then draw envelopes to afford rising price.", coach: "Uses car-price conventions and avoids wrong digit cost.", common: "Ignoring the cost of wrong guesses." },
    { key: "punchABunch", label: "Punch a Bunch", mode: "documented", activity: "Higher/lower small prizes earn punches; user decides keep or continue.", coach: "Maximizes punches and uses expected-value thinking.", common: "Continuing after a high slip without considering odds." },
    { key: "pushOver", label: "Push Over", mode: "documented", activity: "Choose where to stop a block of digits to form prize price.", coach: "Estimates prize range before moving blocks.", common: "Stopping at the first familiar pattern." },
    { key: "raceGame", label: "Race Game", mode: "documented", activity: "Match four prices to four prizes under time pressure.", coach: "Starts with strongest matches, uses feedback efficiently.", common: "Rebuilding the whole board without learning from feedback." },
    { key: "rangeGame", label: "Range Game", mode: "documented", activity: "Stop a moving range over the actual retail price.", coach: "Estimates early and stops when centered.", common: "Waiting too long because the range feels narrow." },
    { key: "ratRace", label: "Rat Race", mode: "documented", activity: "Price small items within tolerances to earn rat picks.", coach: "Earns more picks through small-prize accuracy.", common: "Treating rat selection as the main skill." },
    { key: "safeCrackers", label: "Safe Crackers", mode: "documented", activity: "Use three digits to set a prize safe combination.", coach: "Prices the prize and permutes digits logically.", common: "Ignoring whether the price should be high or low." },
    { key: "secretX", label: "Secret X", mode: "documented", activity: "Earn Xs through small prizes and place them to complete a line.", coach: "Earns extra Xs and uses board geometry.", common: "Placing without planning possible lines." },
    { key: "shellGame", label: "Shell Game", mode: "documented", activity: "Higher/lower small prizes earn chips, then user marks shells.", coach: "Earns as many chips as possible.", common: "Believing shell location can be inferred." },
    { key: "shoppingSpree", label: "Shopping Spree", mode: "documented", activity: "Select prizes to reach a spending target.", coach: "Picks high-value prizes first.", common: "Choosing low-value favorites and missing target." },
    { key: "sideBySide", label: "Side by Side", mode: "documented", activity: "Choose the order of two two-digit blocks for a prize.", coach: "Estimates the prize scale.", common: "Picking the smoother-sounding number." },
    { key: "spellingBee", label: "Spelling Bee", mode: "documented", activity: "Price small prizes to earn cards; decide whether to take cash or continue.", coach: "Earns cards and weighs cash-out decision.", common: "Chasing C-A-R with too few cards and no risk plan." },
    { key: "squeezePlay", label: "Squeeze Play", mode: "documented", activity: "Remove one middle digit from a displayed price.", coach: "Estimates actual retail price and removes the implausible extra digit.", common: "Removing an endpoint digit, which is not the usual action." },
    { key: "stackTheDeck", label: "Stack the Deck", mode: "documented", activity: "Price grocery pairs to reveal car digits, then fill remaining digits.", coach: "Wins reveals and uses car conventions for blanks.", common: "Guessing car digits before earning help." },
    { key: "swapMeet", label: "Swap Meet", mode: "documented", activity: "Choose which prize has same price as a target prize.", coach: "Finds equivalent retail tier.", common: "Matching by product category only." },
    { key: "switch", label: "Switch", mode: "documented", activity: "Decide whether two displayed prices should be switched between two prizes.", coach: "Estimates both prizes.", common: "Always switching because the game name suggests it." },
    { key: "switcheroo", label: "Switcheroo", mode: "documented", activity: "Place five digits into car and small-prize prices under time.", coach: "Prioritizes car digit, then small-prize plausibility.", common: "Changing correct guesses after first feedback." },
    { key: "takeTwo", label: "Take Two", mode: "documented", activity: "Show four prizes and a target total. User picks the two prizes whose prices add to the target.", coach: "Estimates all four prizes and tests likely sums.", common: "Confusing this with Two For One." },
    { key: "temptation", label: "Temptation", mode: "documented", activity: "Use prize-price digits to build car price, then choose prizes or risk for car.", coach: "Builds plausible car price and makes a risk decision.", common: "Risking valuable prizes on a low-confidence car price." },
    { key: "tenChances", label: "Ten Chances", mode: "documented", activity: "Use digit sets to write prices for two prizes and a car within ten tries.", coach: "Applies price endings and avoids impossible combinations.", common: "Burning chances on permutations with bad endings." },
    { key: "thatsTooMuch", label: "That's Too Much", mode: "documented", activity: "Stop when displayed car price first exceeds the actual retail price.", coach: "Knows to stop just after the actual retail price is passed.", common: "Stopping at a price that merely seems affordable." },
    { key: "threeStrikes", label: "Three Strikes", mode: "documented", activity: "Draw digits/strikes from bag to place car price digits.", coach: "Uses known digits and positions carefully.", common: "Placing a digit in a position made impossible by car class." },
    { key: "timeIsMoney", label: "Time Is Money", mode: "documented", activity: "Arrange five grocery items into low/mid/high price shelves under time.", coach: "Fast category sorting and correction under feedback.", common: "Freezing after the first wrong arrangement." },
    { key: "toThePenny", label: "To the Penny", mode: "documented", activity: "Price groceries by choosing correct prices and managing pennies.", coach: "Uses grocery knowledge and saves pennies for uncertainty.", common: "Spending pennies early on confident items." },
    { key: "triplePlay", label: "Triple Play", mode: "documented", activity: "Choose correct car prices for three cars in increasing difficulty.", coach: "Estimates each car class and trim.", common: "Treating all cars as one price tier." },
    { key: "twoForOne", label: "Two For One (2 for the Price of 1)", mode: "documented", activity: "Show two prizes and a three-digit price with two choices for each digit. User chooses the free reveal position, then selects the other digits.", coach: "Chooses the most informative free digit and prices the three-digit prize.", common: "Confusing this with Take Two." },
    { key: "vendOPrice", label: "Vend-O-Price", mode: "documented", activity: "Choose which vending shelf total is highest based on unit price times quantity.", coach: "Multiplies price by visible quantity.", common: "Choosing the single most expensive item." }
  ];

  const richPricingGameKeys = new Set([
    "balanceGame",
    "bargainGame",
    "comingOrGoing",
    "dangerPrice",
    "doublePrices",
    "easyAs123",
    "freezeFrame",
    "hiLo",
    "oneRightPrice",
    "oneWrongPrice",
    "pickANumber",
    "plinko",
    "shoppingSpree",
    "sideBySide",
    "squeezePlay",
    "switch",
    "takeTwo",
    "thatsTooMuch",
    "vendOPrice"
  ]);

  const anchorVisuals = {
    "robot vacuum": { title: "Robot vacuum", image: "assets/anchors/row-specific/robot-vacuum.png" },
    espresso: { title: "Espresso setup", image: "assets/anchors/row-specific/espresso-machine.png" },
    cookware: { title: "Cookware set", image: "assets/anchors/row-specific/cookware.png" },
    "tv soundbar": { title: "TV and soundbar", image: "assets/anchors/row-specific/tv-soundbar.png" },
    gaming: { title: "Gaming console", image: "assets/anchors/row-specific/gaming-console.png" },
    "creator camera": { title: "Creator camera kit", image: "assets/anchors/row-specific/creator-camera.png" },
    "electric bike": { title: "Electric bike", image: "assets/anchors/row-specific/electric-bike.png" },
    paddleboard: { title: "Paddleboard gear", image: "assets/anchors/row-specific/paddleboard.png" },
    "home gym": { title: "Home gym", image: "assets/anchors/row-specific/home-gym.png" },
    nursery: { title: "Nursery furniture", image: "assets/anchors/row-specific/nursery.png" },
    "pet tech": { title: "Pet tech", image: "assets/anchors/row-specific/pet-tech.png" },
    "sewing studio": { title: "Sewing studio", image: "assets/anchors/row-specific/sewing-studio.png" },
    "pressure washer": { title: "Pressure washer", image: "assets/anchors/row-specific/pressure-washer.png" },
    "lawn mower": { title: "Lawn mower", image: "assets/anchors/row-specific/lawn-mower.png" },
    "patio heater": { title: "Patio heater", image: "assets/anchors/row-specific/patio-heater.png" },
    "pizza oven": { title: "Outdoor pizza oven", image: "assets/anchors/row-specific/pizza-oven.png" },
    "camping kit": { title: "Camping kit", image: "assets/anchors/row-specific/camping-kit.png" },
    "music studio": { title: "Music studio", image: "assets/anchors/row-specific/music-studio.png" },
    "telescope kit": { title: "Telescope kit", image: "assets/anchors/row-specific/telescope-kit.png" },
    "luggage set": { title: "Luggage set", image: "assets/anchors/row-specific/luggage-set.png" },
    "standing desk": { title: "Standing desk", image: "assets/anchors/row-specific/standing-desk.png" },
    "air care": { title: "Air care", image: "assets/anchors/row-specific/air-care.png" },
    "home sauna": { title: "Home sauna", image: "assets/anchors/row-specific/home-sauna.png" },
    "dining room": { title: "Dining room", image: "assets/anchors/row-specific/dining-room.png" },
    "designer handbag": { title: "Designer handbag", image: "assets/anchors/row-specific/designer-handbag.png" },
    luggage: { title: "Travel gear", image: "assets/anchors/luggage.png" },
    yard: { title: "Lawn and garden", image: "assets/anchors/yard.png" },
    maker: { title: "Maker studio", image: "assets/anchors/maker.png" },
    family: { title: "Home and family", image: "assets/anchors/family.png" },
    sports: { title: "Sports gear", image: "assets/anchors/sports.png" },
    astronomy: { title: "Astronomy gear", image: "assets/anchors/astronomy.png" },
    music: { title: "Music and audio", image: "assets/anchors/music.png" },
    tools: { title: "Tool package", image: "assets/anchors/tools.png" },
    wellness: { title: "Wellness package", image: "assets/anchors/wellness.png" },
    photo: { title: "Creator gear", image: "assets/anchors/photo.png" },
    creator: { title: "Creator gear", image: "assets/anchors/photo.png" },
    patio: { title: "Patio and garden", image: "assets/anchors/patio.png" },
    outdoor: { title: "Outdoor package", image: "assets/anchors/patio.png" },
    "home office": { title: "Home office", image: "assets/anchors/home-office.png" },
    pet: { title: "Home and family", image: "assets/anchors/family.png" },
    camping: { title: "Camping gear", image: "assets/anchors/camping.png" },
    dining: { title: "Outdoor dining", image: "assets/anchors/dining.png" },
    sewing: { title: "Sewing studio", image: "assets/anchors/sewing.png" },
    showcase: { title: "Showcase bundle", image: "assets/anchors/showcase.png" },
    car: { title: "Vehicle anchor", image: "assets/anchors/showcase.png" },
    trip: { title: "Travel package", image: "assets/anchors/showcase.png" },
    furniture: { title: "Room package", image: "assets/anchors/showcase.png" },
    bundle: { title: "Prize bundle", image: "assets/anchors/showcase.png" }
  };

  const rowItems = [
    { family: "robot vacuum", item: "self-emptying robot vacuum and mop with docking station, replacement pads, and cleaning solution", price: [850, 1500] },
    { family: "robot vacuum", item: "laser-mapping robot vacuum package with auto-empty base, spare filters, and mop module", price: [650, 1200] },
    { family: "espresso", item: "countertop espresso setup with burr grinder, milk frothing pitcher, tamper, knock box, and cup set", price: [900, 1800] },
    { family: "espresso", item: "automatic espresso machine with grinder, milk system, cleaning kit, and coffee subscription", price: [1100, 2400] },
    { family: "cookware", item: "premium stainless cookware package with pots, pans, chef knives, utensils, and cutting board", price: [850, 1700] },
    { family: "cookware", item: "enameled cast-iron cookware set with Dutch oven, skillet, braiser, roasting pan, and tools", price: [750, 1550] },
    { family: "tv soundbar", item: "65-inch smart television with Dolby Atmos soundbar, wireless subwoofer, wall mount, and streaming device", price: [1200, 2600] },
    { family: "tv soundbar", item: "55-inch OLED television package with soundbar, media console, universal remote, and installation credit", price: [1600, 3300] },
    { family: "gaming", item: "video game console bundle with two controllers, wireless headset, charging dock, and three new games", price: [650, 1050] },
    { family: "gaming", item: "portable gaming handheld package with dock, controller, carrying case, memory card, and game library", price: [550, 950] },
    { family: "creator camera", item: "mirrorless creator camera kit with lens, tripod, LED panels, microphone, memory cards, and gear bag", price: [1700, 3400] },
    { family: "creator camera", item: "action camera production bundle with gimbal, lights, wireless microphones, mounts, and editing monitor", price: [1300, 2600] },
    { family: "electric bike", item: "commuter electric bike with helmet, lock, cargo rack, lights, panniers, and service plan", price: [1500, 3200] },
    { family: "electric bike", item: "folding electric bike package with helmet, compact pump, lock, phone mount, and travel bag", price: [1000, 2400] },
    { family: "paddleboard", item: "inflatable paddleboard package with carbon paddle, pump, life vest, dry bag, and roof carrier", price: [700, 1500] },
    { family: "paddleboard", item: "two-person beach adventure setup with paddleboard, snorkel gear, cooler backpack, chairs, and umbrella", price: [850, 1700] },
    { family: "home gym", item: "connected treadmill package with adjustable dumbbells, workout mat, heart-rate monitor, and training membership", price: [1600, 3400] },
    { family: "home gym", item: "compact strength-training station with bench, adjustable weights, resistance system, flooring, and mirror", price: [1200, 2800] },
    { family: "nursery", item: "smart nursery furniture package with convertible crib, glider chair, dresser, video monitor, and sound machine", price: [1800, 3600] },
    { family: "nursery", item: "premium nursery setup with crib, organic mattress, changing table, rocker, baby monitor, and storage baskets", price: [1500, 3100] },
    { family: "pet tech", item: "premium pet-care package with automated feeder, camera, water fountain, self-cleaning litter box, and washable beds", price: [900, 1900] },
    { family: "pet tech", item: "connected pet monitoring bundle with smart feeder, treat camera, GPS collar, grooming kit, and pet stairs", price: [700, 1500] },
    { family: "sewing studio", item: "computerized sewing and quilting studio with machine, cutting table, fabric bundle, thread rack, and storage bins", price: [1300, 2900] },
    { family: "sewing studio", item: "embroidery machine package with hoops, stabilizers, thread collection, pattern software, and rolling work cart", price: [1600, 3400] },
    { family: "pressure washer", item: "electric pressure washer garage package with surface cleaner, hose reel, detailing kit, shop vacuum, and storage rack", price: [650, 1300] },
    { family: "pressure washer", item: "gas pressure washer setup with nozzles, foam cannon, driveway cleaner, gloves, and utility cart", price: [850, 1700] },
    { family: "lawn mower", item: "battery-powered lawn mower package with leaf blower, string trimmer, batteries, charger, and garden wagon", price: [1200, 2500] },
    { family: "lawn mower", item: "cordless yard-care system with self-propelled mower, hedge trimmer, edger, blower, and extra battery", price: [1400, 3000] },
    { family: "patio heater", item: "patio lounge package with two swivel chairs, fire table, tower heater, outdoor rug, and lanterns", price: [1500, 3200] },
    { family: "patio heater", item: "balcony comfort setup with patio heater, bistro chairs, side table, planter boxes, and weatherproof pillows", price: [750, 1650] },
    { family: "pizza oven", item: "outdoor pizza-night package with gas pizza oven, prep table, peel set, cookware, and serving boards", price: [1000, 2200] },
    { family: "pizza oven", item: "backyard cooking setup with wood-fired pizza oven, stand, fuel storage, dough tools, and ingredient cooler", price: [1300, 2900] },
    { family: "camping kit", item: "weekend camping package with four-person tent, sleeping bags, camp kitchen, chairs, lanterns, and cooler", price: [1100, 2400] },
    { family: "camping kit", item: "car-camping setup with rooftop-style tent, portable power station, cooler, cookware, sleeping pads, and camp lights", price: [1800, 3900] },
    { family: "music studio", item: "digital music studio with keyboard, studio monitors, audio interface, microphone, headphones, and software", price: [1200, 2600] },
    { family: "music studio", item: "digital piano package with bench, lesson subscription, headphones, monitor speakers, lamp, and sheet music library", price: [1100, 2400] },
    { family: "telescope kit", item: "portable astronomy kit with computerized telescope, eyepiece set, star tracker, filters, and padded travel case", price: [1200, 2800] },
    { family: "telescope kit", item: "backyard stargazing package with smart telescope, tripod, binoculars, star map, red flashlight, and storage case", price: [900, 2100] },
    { family: "luggage set", item: "set of four hardside suitcases with packing cubes, garment bags, travel scale, and compression organizers", price: [950, 1900] },
    { family: "luggage set", item: "premium travel bundle with spinner luggage set, weekender bag, toiletry cases, packing cubes, and luggage trackers", price: [1200, 2400] },
    { family: "standing desk", item: "standing desk office setup with ergonomic chair, dual monitors, monitor arms, task lamp, and cable system", price: [1700, 3500] },
    { family: "standing desk", item: "work-from-home package with electric standing desk, office chair, ultrawide monitor, webcam, and keyboard set", price: [1500, 3300] },
    { family: "air care", item: "whole-room air-care package with large air purifier, humidifier, dehumidifier, smart sensors, and replacement filters", price: [700, 1500] },
    { family: "air care", item: "home wellness air package with purifier, aromatherapy diffuser, humidifier, filter subscription, and sleep sound machine", price: [600, 1300] },
    { family: "home sauna", item: "infrared home sauna package with towel warmer, robes, aromatherapy set, bamboo bench, and bath accessories", price: [2200, 5000] },
    { family: "home sauna", item: "compact wellness spa setup with portable sauna, cold plunge tub, towel warmer, robes, and recovery accessories", price: [1600, 3600] },
    { family: "dining room", item: "designer dining room with table, six upholstered chairs, sideboard, dinnerware, flatware, and centerpiece set", price: [2400, 5200] },
    { family: "dining room", item: "breakfast nook package with round table, four chairs, storage cabinet, dinnerware, glassware, and pendant light", price: [1500, 3300] },
    { family: "designer handbag", item: "designer accessories package with leather tote, wallet, sunglasses, scarf, watch box, and jewelry case", price: [1200, 2800] },
    { family: "designer handbag", item: "premium handbag and travel accessories set with leather satchel, crossbody bag, wallet, scarf, and cosmetic case", price: [1400, 3200] }
  ];

  const showcaseBank = [
    {
      prizes: [
        "Trip for two to Lisbon, 6 nights, airfare included, with a private food tour",
        "Modular living room with sofa, tables, rug, lamps, and media console",
        "Premium home audio package with turntable, speakers, receiver, and record cabinet",
        "2026 compact crossover"
      ],
      actual: 41870,
      opponentPrizes: [
        "Trip for two to New Orleans, 5 nights, airfare included, with a jazz dinner cruise",
        "Kitchen appliance suite with refrigerator, range, dishwasher, and microwave",
        "Home espresso bar with grinder, machine, cart, cups, and coffee subscription",
        "2026 compact sedan"
      ],
      opponentBid: 34200,
      opponentActual: 37140
    },
    {
      prizes: [
        "Trip for two to Banff, 6 nights, airfare included, with a guided lake excursion",
        "Home sauna package with infrared sauna, towel warmer, robes, and aromatherapy set",
        "Pair of snowboards with boots, bindings, helmets, and outerwear",
        "2026 midsize SUV"
      ],
      actual: 48315,
      opponentPrizes: [
        "Trip for two to Miami, 5 nights, airfare included, with a private boat tour",
        "Designer bedroom with bed, mattress, nightstands, dresser, and bedding",
        "Smart home theater package with projector, screen, receiver, and speakers",
        "2026 compact crossover"
      ],
      opponentBid: 33600,
      opponentActual: 37920
    },
    {
      prizes: [
        "Trip for two to Tokyo, 6 nights, airfare included, with a guided food tour",
        "Designer dining room with table, chairs, sideboard, dinnerware, and lighting",
        "Premium camera package with mirrorless camera, lenses, tripod, and editing laptop",
        "2026 compact crossover"
      ],
      actual: 43870,
      opponentPrizes: [
        "Trip for two to Nashville, 5 nights, airfare included, with a music tour",
        "Outdoor kitchen island with grill, prep station, stools, and cookware",
        "Premium laptop and tablet package with accessories and software",
        "2026 midsize SUV"
      ],
      opponentBid: 41200,
      opponentActual: 44150
    },
    {
      prizes: [
        "Trip for two to Costa Rica, 7 nights, airfare included, with rainforest excursions",
        "Backyard retreat with pergola, seating, fire table, and weatherproof speakers",
        "Two electric bikes with helmets, locks, and cargo bags",
        "2026 compact SUV"
      ],
      actual: 44760,
      opponentPrizes: [
        "Trip for two to Montreal, 6 nights, airfare included, with a culinary tour",
        "Living room package with sofa, chairs, tables, rug, and lighting",
        "Electric piano with bench, headphones, lessons, and sheet music library",
        "2026 compact hatchback"
      ],
      opponentBid: 29950,
      opponentActual: 35425
    }
  ];

  const els = {
    play: document.getElementById("playSurface"),
    score: document.getElementById("scoreValue"),
    winnings: document.getElementById("winningsValue"),
    row: document.getElementById("rowValue"),
    gates: document.getElementById("gateTrack"),
    report: document.getElementById("reportPanel"),
    history: document.getElementById("historyPanel"),
    newGame: document.getElementById("newGame"),
    practiceRow: document.getElementById("practiceRow"),
    practiceWheel: document.getElementById("practiceWheel"),
    practiceShowcase: document.getElementById("practiceShowcase"),
    practiceGameSelect: document.getElementById("practiceGameSelect"),
    historyToggle: document.getElementById("historyToggle"),
    clearSession: document.getElementById("clearSession"),
    pullRefresh: document.getElementById("pullRefresh")
  };

  let session = loadSession();
  let game = session.activeGame || null;

  function loadSession() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.games)) {
        return saved;
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return { games: [], activeGame: null };
  }

  function saveSession() {
    session.activeGame = game && game.status === "active" ? game : null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  function money(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(wholeDollar(value));
  }

  function wholeDollar(value) {
    return Number.isFinite(Number(value)) ? Math.round(Number(value)) : 0;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function choice(list) {
    return list[randomInt(0, list.length - 1)];
  }

  function pricingGameByKey(key) {
    return pricingPracticeGames.find((practiceGame) => practiceGame.key === key) || pricingPracticeGames[0];
  }

  function numericInputValue(id) {
    const value = Number(document.getElementById(id).value);
    return wholeDollar(value);
  }

  function realisticRetailPrice(range) {
    const endings = [19, 29, 49, 79, 95, 99];
    const min = range[0];
    const max = range[1];
    const ending = choice(endings);
    const lowHundreds = Math.ceil((min - ending) / 100);
    const highHundreds = Math.floor((max - ending) / 100);
    if (highHundreds < lowHundreds) return randomInt(min, max);
    return randomInt(lowHundreds, highHundreds) * 100 + ending;
  }

  function formatCents(value) {
    return value === 100 ? "$1.00" : `${value} cents`;
  }

  function gateClass(status) {
    if (status === "passed") return "passed";
    if (status === "failed") return "failed";
    if (status === "active") return "active";
    return "pending";
  }

  function newGame() {
    if (game && game.current && (game.current.type === "wheelResult" || game.current.type === "rowResult")) {
      finishGame();
    }
    game = {
      id: `game-${Date.now()}`,
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "active",
      stage: "row",
      score: 5,
      accumulatedValue: 0,
      rowAttempts: 0,
      rowWins: 0,
      usedFamilies: [],
      wonPrizes: [],
      gates: { row: "active", prize: "pending", wheel: "pending", showcase: "pending" },
      events: [
        { title: "Come on Down", detail: "Intro skipped. Warmup credit awarded.", result: "passed" }
      ],
      current: null
    };
    startRowAttempt();
  }

  function newPracticeShell(kind) {
    game = {
      id: `practice-${Date.now()}`,
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "practice",
      practice: true,
      practiceKind: kind,
      stage: kind,
      score: 0,
      accumulatedValue: 0,
      rowAttempts: 0,
      rowWins: 0,
      usedFamilies: [],
      wonPrizes: [],
      gates: { row: "pending", prize: "pending", wheel: "pending", showcase: "pending" },
      events: [],
      current: null
    };
  }

  function startStandaloneRow() {
    newPracticeShell("row");
    game.gates.row = "active";
    startRowAttempt("Standalone practice. This attempt will not be scored or saved.");
  }

  function startStandaloneWheel() {
    newPracticeShell("wheel");
    game.gates.wheel = "active";
    startWheel();
  }

  function startStandaloneShowcase() {
    newPracticeShell("showcase");
    game.gates.showcase = "active";
    startShowcase();
  }

  function startStandalonePricingGame(gameType) {
    if (!gameType) return;
    newPracticeShell("prize");
    game.practiceGameType = gameType;
    game.gates.prize = "active";
    startPrizeRound(gameType);
    els.practiceGameSelect.value = "";
  }

  function finishGame() {
    if (game && game.practice) {
      game = null;
      saveSession();
      render();
      return;
    }
    const completedGame = game;
    completedGame.status = "complete";
    completedGame.completedAt = new Date().toISOString();
    session.games.unshift(completedGame);
    session.games = session.games.slice(0, 40);
    session.activeGame = null;
    game = null;
    saveSession();
  }

  function failGate(gateKey, detail) {
    game.gates[gateKey] = "failed";
    game.events.push({ title: gates.find((gate) => gate.key === gateKey).full, detail, result: "failed" });
    finishGame();
    render();
  }

  function passGate(gateKey) {
    game.gates[gateKey] = "passed";
  }

  function startRowAttempt(message) {
    const pool = rowItems.filter((item) => !game.usedFamilies.includes(item.family));
    const item = choice(pool.length ? pool : rowItems);
    game.usedFamilies.push(item.family);
    const actual = wholeDollar(realisticRetailPrice(item.price));
    const position = game.rowAttempts === 0 ? randomInt(1, 4) : randomInt(2, 4);
    const bids = buildRowBids(actual);
    game.current = {
      type: "row",
      item,
      actual,
      position,
      bids,
      message: message || ""
    };
    render();
  }

  function buildRowBids(actual) {
    const pattern = choice(["spread_low", "one_over", "all_high", "clustered", "wild_low"]);
    const clean = (bids) => bids.map((bid) => wholeDollar(Math.max(1, bid))).sort((a, b) => a - b);
    if (pattern === "all_high") {
      return clean([actual + randomInt(90, 260), actual + randomInt(280, 520), actual + randomInt(540, 820)]);
    }
    if (pattern === "one_over") {
      return clean([actual - randomInt(420, 720), actual - randomInt(120, 260), actual + randomInt(80, 240)]);
    }
    if (pattern === "clustered") {
      return clean([actual - randomInt(220, 300), actual - randomInt(120, 190), actual - randomInt(20, 85)]);
    }
    if (pattern === "wild_low") {
      return clean([randomInt(1, Math.max(50, actual - 900)), actual - randomInt(360, 520), actual - randomInt(80, 180)]);
    }
    return clean([actual - randomInt(650, 900), actual - randomInt(300, 480), actual - randomInt(30, 140)]);
  }

  function submitRowBid() {
    const bid = numericInputValue("bidInput");
    if (bid < 1) return;

    const current = game.current;
    const allBids = current.bids.slice();
    allBids.splice(current.position - 1, 0, bid);
    const valid = allBids
      .map((value, index) => ({ value, index }))
      .filter((entry) => entry.value <= current.actual)
      .sort((a, b) => b.value - a.value);

    if (!valid.length) {
      game.events.push({
        title: `Contestants Row attempt ${game.rowAttempts + 1}`,
        detail: `Everyone overbid on ${current.item.item}. Fresh item loaded.`,
        result: "rerun"
      });
      game.current = {
        type: "rowResult",
        rerun: true,
        eliminated: false,
        imageDescription: current.item.item,
        detail: `Everyone overbid. The actual retail price was ${money(current.actual)}, so all bids are cleared for a fresh item.`,
        item: current.item,
        actual: current.actual,
        allBids,
        userIndex: current.position - 1,
        userBid: bid,
        winnerIndex: null,
        winnerBid: null
      };
      render();
      return;
    }

    game.rowAttempts += 1;
    const winner = valid[0];
    const userWon = winner.index === current.position - 1;
    const bidSummary = allBids.map((value, index) => `C${index + 1}: ${money(value)}`).join(", ");

    if (userWon) {
      game.rowWins += 1;
      if (!game.practice) {
        game.score += 10;
        game.accumulatedValue += current.actual;
        game.wonPrizes.push(`${current.item.item} (${money(current.actual)})`);
      }
      passGate("row");
      if (!game.practice) game.gates.prize = "active";
      game.events.push({
        title: `Contestants Row attempt ${game.rowAttempts}`,
        detail: `Won ${current.item.item}. Actual retail price ${money(current.actual)}. Bids: ${bidSummary}. Join Drew on stage for the pricing game.`,
        result: "passed"
      });
      game.current = {
        type: "rowResult",
        won: true,
        eliminated: false,
        practiceComplete: game.practice,
        imageDescription: current.item.item,
        detail: `You won Contestants Row with ${money(bid)}. Actual retail price ${money(current.actual)}. Join Drew on stage for the pricing game.`,
        item: current.item,
        actual: current.actual,
        allBids,
        userIndex: current.position - 1,
        userBid: bid,
        winnerIndex: winner.index,
        winnerBid: winner.value
      };
      render();
      return;
    }

    const lossDetail = `Lost ${current.item.item}. Actual retail price ${money(current.actual)}. Bids: ${bidSummary}. Contestant ${winner.index + 1} won with ${money(winner.value)}.`;
    game.events.push({
      title: `Contestants Row attempt ${game.rowAttempts}`,
      detail: lossDetail,
      result: "failed"
    });

    if (game.rowAttempts >= MAX_ROW_ATTEMPTS) {
      game.gates.row = "failed";
      game.current = {
        type: "rowResult",
        eliminated: true,
        imageDescription: current.item.item,
        detail: `${lossDetail} You missed all six Contestants Row attempts.`,
        item: current.item,
        actual: current.actual,
        allBids,
        userIndex: current.position - 1,
        userBid: bid,
        winnerIndex: winner.index,
        winnerBid: winner.value
      };
      render();
      return;
    }

    game.current = {
      type: "rowResult",
      eliminated: false,
      imageDescription: current.item.item,
      detail: lossDetail,
      item: current.item,
      actual: current.actual,
      allBids,
      userIndex: current.position - 1,
      userBid: bid,
      winnerIndex: winner.index,
      winnerBid: winner.value
    };
    render();
  }

  function continueAfterRowResult() {
    if (!game || !game.current || game.current.type !== "rowResult") return;
    if (game.practice) {
      startStandaloneRow();
      return;
    }
    if (game.current.eliminated) {
      finishGame();
      render();
      return;
    }
    if (game.current.won) {
      startPrizeRound();
      return;
    }
    startRowAttempt(game.current.rerun ? "Everyone overbid. Fresh item." : "You stay in Contestants Row.");
  }

  function startPrizeRound(selectedGameType) {
    const gameType = selectedGameType || choice(pricingPracticeGames.map((practiceGame) => practiceGame.key));
    if (gameType === "anyNumber") {
      game.current = buildAnyNumberRound();
    } else if (gameType === "cliffHangers") {
      game.current = buildCliffHangersRound();
    } else if (gameType === "fivePriceTags") {
      game.current = buildFivePriceTagsRound();
    } else if (gameType === "flipFlop") {
      const options = [
        { shown: "6947", actual: 6974, prize: "trip for two to Charleston, 5 nights, airfare included" },
        { shown: "8796", actual: 8976, prize: "designer bedroom set with mattress and linens" },
        { shown: "5278", actual: 5728, prize: "outdoor kitchen island with grill and accessories" }
      ];
      game.current = { type: "prize", gameType, ...choice(options) };
    } else if (gameType === "mostExpensive") {
      const set = [
        { name: "home gym mirror with accessories", value: 2499 },
        { name: "patio dining set", value: 3180 },
        { name: "tablet and laptop bundle", value: 2746 }
      ];
      game.current = { type: "prize", gameType, prizes: set, prizeValue: set.reduce((sum, item) => sum + item.value, 0) };
    } else if (gameType === "oneAway") {
      game.current = {
        type: "prize",
        gameType,
        prize: "2026 compact hatchback",
        shown: "32764",
        actual: 23875,
        firstTry: true
      };
    } else if (gameType === "plinko") {
      game.current = buildPlinkoRound();
    } else if (richPricingGameKeys.has(gameType)) {
      game.current = buildRichPrizeRound(gameType);
    } else {
      game.current = buildDocumentedPrizeRound(gameType);
    }
    render();
  }

  function buildRichPrizeRound(gameType) {
    const meta = pricingGameByKey(gameType);
    const sample = richGameSample(gameType);
    return {
      type: "prize",
      gameType,
      rich: true,
      title: meta.label,
      prompt: sample.prompt,
      prize: sample.prize,
      board: sample.board,
      choices: sample.choices,
      actual: sample.actual,
      correctIndex: sample.correctIndex ?? 0,
      prizeValue: sample.prizeValue || sample.actual || randomInt(4500, 32000),
      explanation: sample.explanation
    };
  }

  function buildPlinkoRound() {
    return {
      type: "prize",
      gameType: "plinko",
      plinko: true,
      title: "Plinko",
      prize: "Plinko cash",
      freeChips: 1,
      answers: {},
      currentIndex: 0,
      phase: "pricing",
      chips: 1,
      chipsRemaining: 0,
      winnings: 0,
      dropHistory: [],
      items: [
        { name: "compact garment steamer", choices: [29, 92], actual: 29 },
        { name: "digital kitchen scale", choices: [48, 84], actual: 48 },
        { name: "wireless charging stand", choices: [65, 56], actual: 65 },
        { name: "mini waffle maker set", choices: [37, 73], actual: 37 }
      ]
    };
  }

  function buildAnyNumberRound() {
    return {
      type: "prize",
      gameType: "anyNumber",
      anyNumber: true,
      title: "Any Number",
      prize: "2026 compact sedan, kayak package, and piggy bank",
      car: { label: "2026 compact sedan", digits: "24531", revealed: [true, false, false, false, false], value: 24531 },
      smallPrize: { label: "kayak package", digits: "680", revealed: [false, false, false], value: 680 },
      piggyBank: { label: "Piggy bank", digits: "792", revealed: [false, false, false], value: 7.92 },
      called: [],
      lastReveal: "The first digit of the car is 2. Call one unused digit."
    };
  }

  function buildCliffHangersRound() {
    return {
      type: "prize",
      gameType: "cliffHangers",
      cliffHangers: true,
      title: "Cliff Hangers",
      prize: "infrared home sauna package with towel warmer, robes, and aromatherapy set",
      prizeValue: 4298,
      currentIndex: 0,
      steps: 0,
      phase: "pricing",
      history: [],
      items: [
        { name: "compact personal blender with travel cup", actual: 32 },
        { name: "ionic hair dryer with diffuser and concentrator", actual: 45 },
        { name: "instant-read digital kitchen thermometer", actual: 28 }
      ]
    };
  }

  function buildFivePriceTagsRound() {
    return {
      type: "prize",
      gameType: "fivePriceTags",
      fivePriceTags: true,
      title: "Five Price Tags",
      prize: "2026 compact SUV",
      actual: 31280,
      tags: [28450, 31280, 34990, 37650, 42100],
      currentIndex: 0,
      phase: "trueFalse",
      earnedPicks: 0,
      picksRemaining: 0,
      selectedTags: [],
      history: [],
      items: [
        { name: "rechargeable wine opener and foil cutter", shown: 55, actual: 48, anchor: "espresso" },
        { name: "compact countertop ice maker", shown: 119, actual: 119, anchor: "espresso" },
        { name: "heated electric lunch box with containers", shown: 28, actual: 35, anchor: "cookware" },
        { name: "handheld garment steamer with travel case", shown: 64, actual: 64, anchor: "air care" }
      ]
    };
  }

  function richGameSample(gameType) {
    const samples = {
      balanceGame: {
        prize: "trip for two to Santa Fe, 5 nights, airfare included",
        prompt: "Build the actual retail price by adding the right bags to the base amount.",
        board: [
          { label: "Base", value: "$3,000", sub: "Always included" },
          { label: "Bag A", value: "$547", sub: "Optional" },
          { label: "Bag B", value: "$1,000", sub: "Optional" },
          { label: "Bag C", value: "$2,000", sub: "Optional" }
        ],
        choices: ["Base + $1,000 + $2,000", "Base + $547", "Base + every bag"],
        actual: 6000,
        explanation: "The trip is a larger five-night airfare package, so the $6,000 build is the best fit."
      },
      bargainGame: {
        prize: "espresso setup and patio dining set",
        prompt: "Choose the prize with the bigger markdown from its actual retail price.",
        board: [
          { label: "Espresso setup", value: "$1,599", sub: "Sale price" },
          { label: "Patio dining set", value: "$2,498", sub: "Sale price" }
        ],
        choices: ["Patio dining set", "Espresso setup", "Choose the lower sale price"],
        actual: 3998,
        explanation: "The patio set has more room for a large markdown than the espresso setup."
      },
      comingOrGoing: {
        prize: "trip for two to Charleston, 5 nights, airfare included",
        prompt: "Choose whether the reversible price should read coming or going.",
        board: [
          { label: "Coming", value: "$6,742", sub: "Trip-scale price" },
          { label: "Going", value: "$2,476", sub: "Low for airfare and hotel" }
        ],
        choices: ["Coming: $6,742", "Going: $2,476"],
        actual: 6742,
        explanation: "A five-night trip with airfare is much more plausible around $6,700 than $2,500."
      },
      dangerPrice: {
        prize: "four-prize board",
        prompt: "Avoid the prize with the danger price. Pick the three safe prizes.",
        board: [
          { label: "Danger price", value: "$2,899", sub: "Do not choose matching prize" },
          { label: "Camera bundle", value: "?", sub: "Creator gear" },
          { label: "Luggage set", value: "?", sub: "Travel gear" },
          { label: "Patio heater set", value: "?", sub: "Outdoor gear" },
          { label: "Electric scooter", value: "?", sub: "Mobility gear" }
        ],
        choices: ["Camera, patio heaters, scooter", "Camera, luggage, patio heaters", "Luggage, patio heaters, scooter"],
        actual: 2899,
        explanation: "The luggage set is the danger-price item; the other three are the safe picks."
      },
      doublePrices: {
        prize: "premium sauna package",
        prompt: "Pick the actual retail price from the two displayed prices.",
        board: [
          { label: "Price A", value: "$8,149", sub: "Higher option" },
          { label: "Price B", value: "$5,392", sub: "Lower option" }
        ],
        choices: ["$8,149", "$5,392"],
        actual: 8149,
        explanation: "A premium sauna package is better anchored in the higher tier."
      },
      easyAs123: {
        prize: "tablet bundle, designer handbags, and home gym mirror",
        prompt: "Place blocks 1, 2, and 3 from least expensive to most expensive.",
        board: [
          { label: "Tablet bundle", value: "Prize A", sub: "Electronics" },
          { label: "Designer handbags", value: "Prize B", sub: "Fashion" },
          { label: "Home gym mirror", value: "Prize C", sub: "Fitness tech" }
        ],
        choices: ["Tablet, handbags, gym mirror", "Gym mirror, tablet, handbags", "Handbags, gym mirror, tablet"],
        actual: 7435,
        explanation: "The tablet bundle is lowest, handbags are mid-tier, and the connected gym mirror is highest."
      },
      freezeFrame: {
        prize: "outdoor pizza oven package",
        prompt: "Stop the frame on the most plausible four-digit price.",
        board: [
          { label: "Window", value: "$4,268", sub: "Frame option" },
          { label: "Window", value: "$6,891", sub: "Frame option" },
          { label: "Window", value: "$9,157", sub: "Frame option" }
        ],
        choices: ["$6,891", "$9,157", "$4,268"],
        actual: 6891,
        explanation: "The outdoor pizza oven package fits the middle-high price, not the luxury-trip tier."
      },
      hiLo: {
        prize: "kitchen appliance suite",
        prompt: "Choose the three grocery items with the highest prices.",
        board: [
          { label: "Olive oil", value: "High?", sub: "Premium bottle" },
          { label: "Cereal", value: "High?", sub: "Family box" },
          { label: "Batteries", value: "High?", sub: "Large pack" },
          { label: "Canned tomatoes", value: "High?", sub: "Pantry can" },
          { label: "Premium coffee", value: "High?", sub: "Whole bean bag" },
          { label: "Dish soap", value: "High?", sub: "Standard bottle" }
        ],
        choices: ["Olive oil, batteries, premium coffee", "Cereal, canned tomatoes, dish soap", "Cereal, olive oil, canned tomatoes"],
        actual: 7260,
        explanation: "Premium oil, batteries, and whole-bean coffee are the strongest high-price picks."
      },
      oneRightPrice: {
        prize: "electric bikes and bedroom set",
        prompt: "Assign the one displayed price to the prize it belongs to.",
        board: [
          { label: "One Right Price", value: "$3,498", sub: "Matches one prize" },
          { label: "Electric bikes", value: "?", sub: "Pair with accessories" },
          { label: "Bedroom set", value: "?", sub: "Furniture and mattress" }
        ],
        choices: ["Electric bikes", "Bedroom set"],
        actual: 3498,
        explanation: "A pair of electric bikes lands closer to $3,498 than a full bedroom setup."
      },
      oneWrongPrice: {
        prize: "three-prize setup",
        prompt: "Pick the displayed price that is wrong.",
        board: [
          { label: "Camera bundle", value: "$2,796", sub: "Shown price" },
          { label: "Grill island", value: "$3,450", sub: "Shown price" },
          { label: "Luggage set", value: "$2,899", sub: "Shown price" }
        ],
        choices: ["Luggage set $2,899", "Camera bundle $2,796", "Grill island $3,450"],
        actual: 1399,
        explanation: "The luggage set is the suspicious overprice compared with the other shown values."
      },
      pickANumber: {
        prize: "designer bedroom set",
        prompt: "Fill the missing digit in the displayed price.",
        board: [
          { label: "Price", value: "$7_49", sub: "Missing one digit" },
          { label: "Choices", value: "1 / 4 / 9", sub: "Pick one" }
        ],
        choices: ["4", "1", "9"],
        actual: 7449,
        explanation: "A designer bedroom package fits around $7,449 better than $7,149 or $7,949."
      },
      shoppingSpree: {
        prize: "shopping spree board",
        prompt: "Pick prizes to reach the spending target.",
        board: [
          { label: "Target", value: "$7,000", sub: "Reach or exceed" },
          { label: "Hot tub", value: "?", sub: "Large prize" },
          { label: "Laptop", value: "?", sub: "Medium prize" },
          { label: "Luggage", value: "?", sub: "Medium prize" },
          { label: "Grill", value: "?", sub: "Large prize" }
        ],
        choices: ["Hot tub, grill, laptop", "Laptop, luggage, grill", "Luggage, laptop, small accessories"],
        actual: 7000,
        explanation: "Start with the largest prizes; low-value favorites make the target harder."
      },
      sideBySide: {
        prize: "trip for two to Nashville",
        prompt: "Put the two blocks side by side in the right order.",
        board: [
          { label: "Block A", value: "74", sub: "First or second" },
          { label: "Block B", value: "58", sub: "First or second" }
        ],
        choices: ["$7,458", "$5,874"],
        actual: 7458,
        explanation: "A flight-and-hotel trip is more plausible at $7,458."
      },
      squeezePlay: {
        prize: "home theater package",
        prompt: "Remove one middle digit to make the actual retail price.",
        board: [
          { label: "Displayed", value: "$84,719", sub: "Remove 4, 7, or 1" }
        ],
        choices: ["Remove 4 to make $8,719", "Remove 7 to make $8,419", "Remove 1 to make $8,479"],
        actual: 8719,
        explanation: "Removing the 4 leaves a strong home-theater price: $8,719."
      },
      switch: {
        prize: "treadmill package and patio heater set",
        prompt: "Decide whether the two displayed prices should be switched.",
        board: [
          { label: "Treadmill package", value: "$2,149", sub: "Shown" },
          { label: "Patio heater set", value: "$3,598", sub: "Shown" }
        ],
        choices: ["Switch the prices", "Leave them"],
        actual: 5747,
        explanation: "The connected treadmill setup is more likely the higher price."
      },
      takeTwo: {
        prize: "four-prize board",
        prompt: "Pick the two prizes that add to the target total.",
        board: [
          { label: "Target", value: "$5,947", sub: "Two prizes must total this" },
          { label: "Kayak package", value: "?", sub: "Outdoor" },
          { label: "Laptop", value: "?", sub: "Electronics" },
          { label: "Grill", value: "?", sub: "Outdoor" },
          { label: "Luggage", value: "?", sub: "Travel" }
        ],
        choices: ["Laptop and grill", "Kayak and luggage", "Grill and luggage"],
        actual: 5947,
        explanation: "Laptop plus grill is the strongest target-total pairing."
      },
      thatsTooMuch: {
        prize: "2026 midsize SUV",
        prompt: "Stop at the first price that is more than the actual retail price.",
        board: [
          { label: "1", value: "$29,480", sub: "Too low" },
          { label: "2", value: "$31,620", sub: "Too low" },
          { label: "3", value: "$34,950", sub: "Too low" },
          { label: "4", value: "$37,110", sub: "First over" },
          { label: "5", value: "$40,280", sub: "Too late" }
        ],
        choices: ["Stop at $37,110", "Stop at $31,620", "Wait until $40,280"],
        actual: 35240,
        explanation: "$37,110 is the first displayed price above the SUV's actual retail price."
      },
      vendOPrice: {
        prize: "home office package",
        prompt: "Choose the vending shelf with the highest total.",
        board: [
          { label: "Shelf A", value: "6 x $3.49", sub: "$20.94 total" },
          { label: "Shelf B", value: "4 x $5.99", sub: "$23.96 total" },
          { label: "Shelf C", value: "3 x $8.99", sub: "$26.97 total" }
        ],
        choices: ["Shelf C", "Shelf B", "Shelf A"],
        actual: 2697,
        explanation: "Shelf C has fewer items, but its unit price makes the highest total."
      }
    };
    return samples[gameType] || documentedGameSample(gameType);
  }

  function buildDocumentedPrizeRound(gameType) {
    const meta = pricingGameByKey(gameType);
    const sample = documentedGameSample(gameType);
    const correctIndex = sample.correctIndex ?? 0;
    return {
      type: "prize",
      gameType,
      documented: true,
      title: meta.label,
      activity: meta.activity,
      coach: meta.coach,
      common: meta.common,
      prize: sample.prize,
      prompt: sample.prompt || meta.activity,
      visible: sample.visible,
      choices: sample.choices,
      actual: sample.actual,
      correctIndex,
      prizeValue: sample.prizeValue || sample.actual || randomInt(4200, 27500)
    };
  }

  function documentedGameSample(gameType) {
    const basePrize = choice([
      "2026 compact crossover",
      "trip for two to Vancouver, 6 nights, airfare included",
      "designer dining room with table, chairs, sideboard, and dinnerware",
      "home fitness studio with connected bike, weights, mat, and training screen",
      "outdoor kitchen island with grill, prep table, stools, and cookware"
    ]);
    const fallbackSamples = {
      backTo75: {
        prize: "retro cash board",
        prompt: "Choose the revealed retro-year option that best follows the current board clues.",
        visible: "Back to 76 board shows three doors: 1976 grocery prices, a 1976 cash card, and a current prize card. The clue says the laundry detergent was under $2 in 1976.",
        choices: ["Pick the detergent card under $2", "Pick the current prize card first", "Pick the highest cash card because it is largest"],
        actual: 1976
      },
      bonusGame: {
        prize: "bonus prize package",
        prompt: "Call each small prize higher or lower than its displayed price to control bonus windows.",
        visible: "Shown: hand mixer $42, electric toothbrush $89, humidifier $60, compact speaker $120. Bonus is hidden behind one window.",
        choices: ["Lower, higher, higher, lower", "Higher, higher, lower, higher", "Lower, lower, lower, lower"],
        actual: 2680
      },
      bullseye: {
        prize: "outdoor kitchen package",
        prompt: "Pick a grocery item and quantity that lands in the target range.",
        visible: "Target is $10-$12. Products: pasta sauce $3.49, granola $5.99, soup $2.29, coffee $8.99, crackers $4.49.",
        choices: ["Buy 3 pasta sauces", "Buy 2 coffees", "Buy 5 soups"],
        actual: 1047
      },
      cardGame: {
        prize: "2026 compact sedan",
        prompt: "Draw toward a car bid and stop while staying within the allowed range without going over.",
        visible: "Range card: $2,000. Current bid after draws is $23,400 for a compact sedan.",
        choices: ["Stop at $23,400", "Draw again aggressively", "Reset mentally and bid $30,000"],
        actual: 24875
      },
      checkGame: {
        prize: "designer bedroom set",
        prompt: "Write a check so the check plus prize value lands inside the target range.",
        visible: "Target total range is $8,000-$9,000. The bedroom set looks like a mid-high furniture package.",
        choices: ["Write the check for $2,000", "Write the check for $500", "Write the check for $4,500"],
        actual: 6850
      },
      checkOut: {
        prize: "trip for two to San Diego",
        prompt: "Estimate all five grocery prices; the total must be close enough to the actual total.",
        visible: "Items: cereal, olive oil, paper towels, salsa, ice cream. Your total estimate choices are below.",
        choices: ["$26.75 total", "$14.20 total", "$43.90 total"],
        actual: 2740
      },
      clockGame: {
        prize: "two small prizes",
        prompt: "Use higher/lower feedback to quickly zero in on two prices.",
        visible: "First prize is a coffee maker. Opening guess should get near the correct price quickly.",
        choices: ["Start around $600, then halve by feedback", "Guess $1, then count upward", "Guess random round hundreds"],
        actual: 649
      },
      coverUp: {
        prize: "2026 compact crossover",
        prompt: "Build a car price from columns, keeping any correct digits after feedback.",
        visible: "First digit is 2. Columns offer 3/4/5, then 1/6/8, then 2/5/9, then 0/4/7.",
        choices: ["Choose $24,650", "Choose $29,870", "Choose $21,207"],
        actual: 24650
      },
      diceGame: {
        prize: "2026 compact car",
        prompt: "For each rolled digit, call exact, higher, or lower for the car price digit.",
        visible: "First digit is 2. Rolls for the next digits are 1, 6, 3, and 4.",
        choices: ["Higher, lower, higher, higher", "Lower, higher, lower, lower", "Exact on every roll"],
        actual: 25385
      },
      doTheMath: {
        prize: "piano and home office package",
        prompt: "Decide whether the cash amount should be added to or subtracted from the first prize to equal the second.",
        visible: "Piano is shown with a $1,200 difference from the office package.",
        choices: ["Add $1,200", "Subtract $1,200", "Ignore the difference and pick the bigger-looking prize"],
        actual: 1200
      },
      doubleCross: {
        prize: "espresso setup and patio furniture",
        prompt: "Slide the cross so both prize prices are plausible at the same time.",
        visible: "Cross paths can make espresso/patio prices of $2,149/$3,760, $4,976/$1,320, or $1,498/$7,632.",
        choices: ["$2,149 and $3,760", "$4,976 and $1,320", "$1,498 and $7,632"],
        actual: 5909
      },
      gasMoney: {
        prize: "2026 midsize sedan",
        prompt: "Pick wrong car prices for cash while avoiding the actual car price until the end.",
        visible: "Car prices: $23,910, $25,485, $27,320, $29,870, $32,640.",
        choices: ["Save $27,320 as the likely car price", "Pick $27,320 first for cash", "Assume the highest price is always right"],
        actual: 27320
      },
      goldenRoad: {
        prize: "luxury trip progression",
        prompt: "Use a digit from the previous price to fill the next prize price.",
        visible: "Grocery item is 89 cents. Next prize price is $2,_50. Choose a digit from 8 or 9.",
        choices: ["Use 8", "Use 9", "Use a digit not shown"],
        actual: 2850
      },
      grandGame: {
        prize: "cash",
        prompt: "Pick groceries under the target price to climb the cash ladder.",
        visible: "Target price is $7.00. Items: rice, premium coffee, soup, batteries, pasta, olive oil.",
        choices: ["Rice, soup, pasta, then stop", "Coffee, batteries, olive oil", "Pick all premium items"],
        actual: 10000
      },
      gridlock: {
        prize: "2026 compact car",
        prompt: "Choose the correct two-digit chunks to complete the car price.",
        visible: "First digit is 2. Choose pairs: 31/46/58, then 20/75/94.",
        choices: ["46 then 75", "31 then 20", "58 then 94"],
        actual: 24675
      },
      groceryGame: {
        prize: "living room package",
        prompt: "Buy grocery quantities to land between the target totals without going over.",
        visible: "Target range is $20-$22. Soup $2.49, cereal $5.29, salsa $3.99, coffee $8.49, pasta $1.99.",
        choices: ["2 coffees and 1 salsa", "10 soups", "1 pasta only"],
        actual: 2097
      },
      halfOff: {
        prize: "cash",
        prompt: "Price small-prize pairs to eliminate boxes, then choose the cash box.",
        visible: "Pair one: mini chopper $40 or $80. Correct pricing eliminates half the boxes.",
        choices: ["Mini chopper is $40", "Mini chopper is $80", "Skip pricing and choose a random box"],
        actual: 10000
      },
      holeInOne: {
        prize: "2026 compact car",
        prompt: "Order grocery items from least to most expensive for a better putt.",
        visible: "Items: gum, pasta, cereal, batteries, olive oil, coffee.",
        choices: ["Gum, pasta, cereal, batteries, olive oil, coffee", "Coffee, olive oil, batteries, cereal, pasta, gum", "Alphabetical order"],
        actual: 24680
      },
      hotSeat: {
        prize: "cash",
        prompt: "Call higher/lower on small prizes and decide whether to risk accumulated money.",
        visible: "Current bank is $5,000. Next item is an electric kettle shown at $120.",
        choices: ["Call lower and continue", "Call higher and continue", "Stop immediately because all guesses are equal"],
        actual: 80
      },
      itsInTheBag: {
        prize: "cash",
        prompt: "Match grocery items to bag prices and decide whether to keep going.",
        visible: "Bag prices: $1.49, $3.99, $5.49, $8.99, $14.99. Items include gum, soup, cereal, coffee, and detergent.",
        choices: ["Gum, soup, cereal, coffee, detergent", "Detergent, coffee, cereal, soup, gum", "Put cereal in every uncertain bag"],
        actual: 16000
      },
      letEmRoll: {
        prize: "2026 compact car",
        prompt: "Use grocery higher/lower decisions to earn rolls, then keep car symbols.",
        visible: "Grocery row: pasta $2.49, sauce shown $3.99, cheese shown $6.49.",
        choices: ["Sauce higher than pasta, cheese higher than sauce", "Sauce lower, cheese lower", "Reroll car symbols"],
        actual: 24695
      },
      lineEmUp: {
        prize: "2026 compact car",
        prompt: "Use the three small-prize prices as possible middle digits for the car.",
        visible: "Car starts with 2 and ends with 5. Small-prize prices show digits 7, 4, and 8 as possible middle choices.",
        choices: ["$24,785", "$27,485", "$28,745"],
        actual: 24785
      },
      lionsShare: {
        prize: "cash",
        prompt: "Choose the product clue/value that leaves the strongest share under the current board rules.",
        visible: "The board offers grocery/product clues with values: $3.49, $5.99, $8.99, and $14.99.",
        choices: ["Start with the most certain grocery price", "Start with the flashiest product", "Ignore revealed values"],
        actual: 10000
      },
      makeYourMove: {
        prize: "three-prize board",
        prompt: "Assign digit blocks to the small, medium, and large prizes.",
        visible: "Digit strip: 52974983. Prizes are a juicer, luggage set, and trip.",
        choices: ["$52, $974, $9,833", "$529, $74, $983", "$5,297, $49, $83"],
        actual: 10859
      },
      masterKey: {
        prize: "car and two prizes",
        prompt: "Price small prizes to earn keys, then choose keys for the locks.",
        visible: "Small prize shows 3 and 8 as possible first/last digits for a popcorn maker.",
        choices: ["Price it at $83 to earn a key", "Price it at $38 to earn a key", "Skip the pricing decision"],
        actual: 83
      },
      moneyGame: {
        prize: "2026 compact car",
        prompt: "Pick two-digit cards for the front and back of the car while avoiding cash decoys.",
        visible: "Cards: 24, 18, 63, 75, 41, 90, 25, 52, 88. Car is a compact hatchback.",
        choices: ["Choose 24 and 75", "Choose 18 and 41", "Choose the lowest cards as cash"],
        actual: 24750
      },
      moreOrLess: {
        prize: "escalating prize path",
        prompt: "Decide whether each shown price is more or less than the actual retail price.",
        visible: "Connected treadmill shown at $1,200.",
        choices: ["More", "Less", "Do not use category pricing"],
        actual: 1799
      },
      nowOrThen: {
        prize: "kitchen package",
        prompt: "Choose whether each grocery price is today's price or the old date price.",
        visible: "Old date: January 2006. Peanut butter shown at $2.49.",
        choices: ["Then", "Now", "Treat every low price as now"],
        actual: 249
      },
      passTheBuck: {
        prize: "2026 compact car",
        prompt: "Price grocery pairs to earn picks, then choose from the board.",
        visible: "Grocery pair: cleaner $4.99 and crackers $3.49. One needs an extra dollar added.",
        choices: ["Add $1 to crackers", "Add $1 to cleaner", "Do not earn the pick"],
        actual: 24610
      },
      pathfinder: {
        prize: "2026 compact car",
        prompt: "Step through adjacent digits to build the car price, using small-prize chances after mistakes.",
        visible: "Center digit is 4 after first digit 2. Adjacent options are 1, 3, 6, and 8.",
        choices: ["Step to 6", "Step to 1", "Step to 8 because it is highest"],
        actual: 24635
      },
      payTheRent: {
        prize: "cash",
        prompt: "Arrange groceries into floor totals that increase as the rent board rises.",
        visible: "Items: gum, pasta, cereal, coffee, detergent, batteries.",
        choices: ["Low single item at mailbox, paired mid items, highest combo at attic", "Sort strictly low-to-high by individual item", "Put premium coffee alone at the top"],
        actual: 100000
      },
      pickAPair: {
        prize: "trip for two to Napa",
        prompt: "Pick two grocery items with the same price.",
        visible: "Items include salsa, pasta, soup, crackers, dressing, and rice.",
        choices: ["Salsa and dressing", "Soup and premium coffee", "Rice and batteries"],
        actual: 399
      },
      pocketChange: {
        prize: "2026 compact car",
        prompt: "Build the car price from available digits while wrong guesses raise the cost.",
        visible: "First digit is 2. Available digits: 3, 4, 5, 6, 8. Current car cost is 25 cents.",
        choices: ["Choose 4 as the second digit", "Choose 8 as the second digit", "Guess randomly because envelopes decide everything"],
        actual: 24635
      },
      punchABunch: {
        prize: "cash",
        prompt: "Earn punches from higher/lower small-prize calls, then decide whether to keep the slip.",
        visible: "You revealed $2,500 and have two punches left.",
        choices: ["Keep $2,500", "Throw it away automatically", "Ignore how many punches remain"],
        actual: 2500
      },
      pushOver: {
        prize: "outdoor pizza oven package",
        prompt: "Push blocks until the visible window forms the prize price.",
        visible: "Block strip: 9 2 6 8 5 0 4 1 7. Choose the four-digit window.",
        choices: ["$6,850", "$2,685", "$5,041"],
        actual: 6850
      },
      raceGame: {
        prize: "four-prize board",
        prompt: "Match four prices to four prizes and use feedback to improve.",
        visible: "Prizes: scooter, laptop, grill, luggage. Prices: $949, $1,598, $2,249, $3,120.",
        choices: ["Scooter $949, laptop $1,598, luggage $2,249, grill $3,120", "Grill $949, scooter $3,120, laptop $2,249, luggage $1,598", "Assign randomly and change all matches every time"],
        actual: 7916
      },
      rangeGame: {
        prize: "trip for two to Portland",
        prompt: "Stop the moving range when it covers the actual retail price.",
        visible: "Price scale runs $5,200-$6,800 and the range finder is approaching $6,150.",
        choices: ["Stop around $6,150", "Stop immediately at $5,200", "Wait until the top of the scale"],
        actual: 6180
      },
      ratRace: {
        prize: "car, scooter, and cash",
        prompt: "Price small items within tolerance to earn rat picks.",
        visible: "Small item is a sandwich maker. You need to be within $10.",
        choices: ["Bid $45", "Bid $95", "Bid $5"],
        actual: 49
      },
      safeCrackers: {
        prize: "designer handbag package",
        prompt: "Use the three displayed digits to set the safe combination for the prize price.",
        visible: "Digits are 0, 7, and 9 for a designer accessories package.",
        choices: ["$970", "$790", "$079"],
        actual: 970
      },
      secretX: {
        prize: "home office package",
        prompt: "Earn Xs from small-prize pricing and place them to complete a line.",
        visible: "You have one free X. Center square is hidden. Choose your first placement.",
        choices: ["Place X in a corner", "Place X randomly on an edge", "Ignore possible diagonal lines"],
        actual: 3600
      },
      shellGame: {
        prize: "trip for two to Austin",
        prompt: "Call small prizes higher/lower to earn chips, then mark shells.",
        visible: "Small prize: hair dryer shown at $55.",
        choices: ["Lower", "Higher", "Skip the chip"],
        actual: 39
      },
      spellingBee: {
        prize: "2026 compact car",
        prompt: "Price small prizes to earn cards, then decide whether to keep cash or go for C-A-R.",
        visible: "You have two cards and $2,000 cash offered.",
        choices: ["Take the $2,000", "Risk two cards for the car", "Assume two cards guarantees C-A-R"],
        actual: 2000
      },
      stackTheDeck: {
        prize: "2026 compact car",
        prompt: "Price grocery pairs to reveal car digits, then fill the remaining blanks.",
        visible: "Car pattern: $2_,_5_. Grocery pair can reveal one digit.",
        choices: ["Win the grocery pair before guessing", "Guess all car digits now", "Ignore revealed digit positions"],
        actual: 24756
      },
      swapMeet: {
        prize: "target prize and three choices",
        prompt: "Choose the prize with the same actual retail price as the target prize.",
        visible: "Target prize is a laptop package. Choices are electric scooter, luggage set, and espresso setup.",
        choices: ["Espresso setup", "Electric scooter", "Luggage set"],
        actual: 1499
      },
      switcheroo: {
        prize: "2026 compact car and small prizes",
        prompt: "Place digits into the car and small-prize prices under time pressure.",
        visible: "Digits: 1, 2, 3, 4, 5. Car price is $24,6_0 and small prizes need one missing digit each.",
        choices: ["Put 5 in the car price", "Put 1 in the car price", "Change every digit after one miss"],
        actual: 24650
      },
      temptation: {
        prize: "2026 compact car",
        prompt: "Use prize-price digits to build a car price, then decide whether to risk the gifts.",
        visible: "Gift prices reveal possible digits 2, 4, 7, 8, and 5. Current gifts total about $7,000.",
        choices: ["Keep the gifts if unsure", "Risk everything on $24,785", "Build an impossible luxury-car price"],
        actual: 24785
      },
      tenChances: {
        prize: "two prizes and a car",
        prompt: "Use the provided digits to write valid prices within ten chances.",
        visible: "First prize digits are 0, 5, 8. It is a small appliance.",
        choices: ["$80", "$58", "$508"],
        actual: 80
      },
      threeStrikes: {
        prize: "2026 luxury car",
        prompt: "Place drawn digits into the correct car-price positions while avoiding strikes.",
        visible: "Digits in bag: 3, 4, 5, 7, 8 plus strikes. First draw is 4.",
        choices: ["Put 4 in the ten-thousands position", "Put 4 in the ones position", "Place it randomly"],
        actual: 47583
      },
      timeIsMoney: {
        prize: "cash",
        prompt: "Sort groceries into low, middle, and high shelves as quickly as possible.",
        visible: "Items: gum, pasta, cereal, batteries, premium coffee.",
        choices: ["Low: gum/pasta; mid: cereal; high: batteries/coffee", "Low: coffee; high: gum", "Put everything in the middle"],
        actual: 20000
      },
      toThePenny: {
        prize: "cash",
        prompt: "Choose correct grocery prices while saving pennies for uncertainty.",
        visible: "First grocery is salsa. Price choices: $2.49, $3.99, $5.49.",
        choices: ["$3.99", "$2.49", "$5.49"],
        actual: 399
      },
      triplePlay: {
        prize: "three cars",
        prompt: "Choose the correct price for each car, with more options as the game progresses.",
        visible: "First car is a compact sedan. Choices: $22,480 or $26,990.",
        choices: ["$22,480", "$26,990", "Choose the higher price for every car"],
        actual: 22480
      },
      twoForOne: {
        prize: "two prizes",
        prompt: "Choose the free digit position, then set the remaining digits for the three-digit prize.",
        visible: "Small prize price has choices: first digit 4/7, second digit 2/9, third digit 0/5.",
        choices: ["Reveal the middle digit, then choose $425", "Reveal no digit and choose $790", "Choose digits by favorite numbers"],
        actual: 425
      }
    };
    const samples = {
      balanceGame: {
        prize: "trip for two to Santa Fe, 5 nights, airfare included",
        visible: "Base bag is $3,000. Money bags shown: $547, $1,000, $2,000. Choose bags to match the trip price.",
        choices: ["Add $1,000 and $2,000", "Add $547 only", "Add every bag"],
        actual: 6000
      },
      bargainGame: {
        prize: "espresso setup and patio dining set",
        visible: "Sale prices: espresso setup $1,599, patio dining set $2,498. Pick the prize with the larger markdown.",
        choices: ["Patio dining set", "Espresso setup", "Always pick the lower sale price"],
        actual: 3998
      },
      bonkers: {
        prize: "home arcade cabinet package",
        visible: "Displayed price is $5,286. Mark each digit higher or lower than the actual retail price.",
        choices: ["Lower, higher, lower, higher", "Higher, higher, higher, higher", "Lower, lower, lower, lower"],
        actual: 4759
      },
      comingOrGoing: {
        prize: "trip for two to Charleston, 5 nights, airfare included",
        visible: "The board can show $6,742 coming or $2,476 going.",
        choices: ["Coming: $6,742", "Going: $2,476", "Ignore the prize category"],
        actual: 6742
      },
      doublePrices: {
        prize: "premium sauna package",
        visible: "Possible prices: $8,149 or $5,392.",
        choices: ["$8,149", "$5,392", "Pick the lower price because it feels safer"],
        actual: 8149
      },
      easyAs123: {
        prize: "tablet bundle, designer handbags, and home gym mirror",
        visible: "Rank the prizes from least expensive to most expensive.",
        choices: ["Tablet bundle, handbags, gym mirror", "Gym mirror, tablet bundle, handbags", "Handbags, gym mirror, tablet bundle"],
        actual: 7435
      },
      freezeFrame: {
        prize: "outdoor pizza oven package",
        visible: "Visible price windows include 42, 68, 91, and 57. Stop on the most plausible four-digit price.",
        choices: ["$6,891", "$9,157", "$4,268"],
        actual: 6891
      },
      hiLo: {
        prize: "kitchen appliance suite",
        visible: "Groceries: olive oil, cereal, batteries, canned tomatoes, premium coffee, dish soap. Choose the three highest prices.",
        choices: ["Olive oil, batteries, premium coffee", "Cereal, canned tomatoes, dish soap", "Cereal, olive oil, canned tomatoes"],
        actual: 7260
      },
      luckySeven: {
        prize: "2026 compact crossover",
        visible: "First digit is 2. You have $7. Guess the second digit.",
        choices: ["4", "9", "0"],
        actual: 24685
      },
      magicNumber: {
        prize: "laptop package and patio set",
        visible: "Set a number between the actual retail prices of a laptop package and a patio set.",
        choices: ["$2,750", "$1,200", "$5,900"],
        actual: 2750
      },
      oneRightPrice: {
        prize: "electric bikes and bedroom set",
        visible: "One Right Price is $3,498. Assign it to the correct prize.",
        choices: ["Electric bikes", "Bedroom set", "Whichever prize is physically larger"],
        actual: 3498
      },
      oneWrongPrice: {
        prize: "three-prize setup",
        visible: "Shown prices: camera bundle $2,796, grill island $3,450, luggage set $2,899. Pick the wrong price.",
        choices: ["Luggage set $2,899", "Camera bundle $2,796", "Grill island $3,450"],
        actual: 1399
      },
      pickANumber: {
        prize: "designer bedroom set",
        visible: "Price shown: $7_49. Missing digit choices: 1, 4, 9.",
        choices: ["4", "1", "9"],
        actual: 7449
      },
      sideBySide: {
        prize: "trip for two to Nashville",
        visible: "Two blocks are 74 and 58. Choose the order.",
        choices: ["$7,458", "$5,874", "Choose by number sound"],
        actual: 7458
      },
      squeezePlay: {
        prize: "home theater package",
        visible: "Displayed price: $84,719. Remove one middle digit.",
        choices: ["Remove 4 to make $8,719", "Remove 7 to make $8,419", "Remove an endpoint"],
        actual: 8719
      },
      switch: {
        prize: "treadmill package and patio heater set",
        visible: "Displayed prices: treadmill $2,149, heaters $3,598. Decide whether to switch.",
        choices: ["Switch the prices", "Leave them", "Always switch because of the game name"],
        actual: 5747
      },
      takeTwo: {
        prize: "four-prize board",
        visible: "Target total is $5,947. Prizes: kayak package, laptop, grill, luggage.",
        choices: ["Laptop and grill", "Kayak and luggage", "Grill and luggage"],
        actual: 5947
      },
      thatsTooMuch: {
        prize: "2026 midsize SUV",
        visible: "Car prices climb: $29,480, $31,620, $34,950, $37,110, $40,280. Stop when the price first exceeds the actual retail price.",
        choices: ["Stop at $37,110", "Stop at $31,620", "Wait until $40,280"],
        actual: 35240
      },
      vendOPrice: {
        prize: "home office package",
        visible: "Shelf A: 6 soups at $3.49. Shelf B: 4 granolas at $5.99. Shelf C: 3 coffees at $8.99. Choose the highest shelf total.",
        choices: ["Shelf C", "Shelf B", "Shelf A"],
        actual: 2697
      }
    };
    return samples[gameType] || fallbackSamples[gameType] || {
      prize: basePrize,
      prompt: "Use the visible board and actual game rule to make the contestant decision.",
      visible: "A concrete game board is shown with prices, products, or digits relevant to this pricing game.",
      choices: ["Use the displayed prices and game rule", "Ignore the board", "Choose randomly"],
      actual: randomInt(6500, 36000),
      correctIndex: 0
    };
  }

  function submitPrizeChoice(value) {
    const current = game.current;
    let won = false;
    let detail = "";
    let prizeName = "";
    let prizeValue = 0;

    if (current.gameType === "flipFlop") {
      const selected = Number(value);
      won = selected === current.actual;
      prizeName = current.prize;
      prizeValue = current.actual;
      detail = `${won ? "Won" : "Lost"} Flip Flop. Actual retail price ${money(current.actual)}.`;
    } else if (current.gameType === "mostExpensive") {
      const selected = Number(value);
      const maxIndex = current.prizes.reduce((best, item, index, list) => item.value > list[best].value ? index : best, 0);
      won = selected === maxIndex;
      prizeName = "Most Expensive prize trio";
      prizeValue = current.prizeValue;
      detail = `${won ? "Won" : "Lost"} Most Expensive. Highest actual retail price: ${current.prizes[maxIndex].name} at ${money(current.prizes[maxIndex].value)}.`;
    } else if (current.rich) {
      const selected = Number(value);
      won = selected === current.correctIndex;
      prizeName = current.prize;
      prizeValue = current.prizeValue;
      detail = `${won ? "Won" : "Lost"} ${current.title}. Practice actual retail price/value: ${money(current.actual)}. Best move: ${current.choices[current.correctIndex]}. ${current.explanation}`;
    } else if (current.documented) {
      const selected = Number(value);
      won = selected === current.correctIndex;
      prizeName = current.prize;
      prizeValue = current.prizeValue;
      detail = `${won ? "Won" : "Lost"} ${current.title}. Practice actual retail price/value: ${money(current.actual)}. Strong move: ${current.choices[current.correctIndex]}. Coaching focus: ${current.coach} Common trap: ${current.common}`;
    } else if (current.gameType === "oneAway") {
      const guess = String(value).replace(/\D/g, "");
      if (current.firstTry && guess !== String(current.actual)) {
        const horns = countMatchingDigits(guess, String(current.actual));
        current.firstTry = false;
        current.lastGuess = guess;
        current.horns = horns;
        render();
        return;
      }
      won = guess === String(current.actual);
      prizeName = current.prize;
      prizeValue = current.actual;
      detail = `${won ? "Won" : "Lost"} One Away. Actual car price ${money(current.actual)}.`;
    }

    completePrizeRound(won, detail, prizeName, prizeValue);
  }

  function completePrizeRound(won, detail, prizeName, prizeValue) {
    if (won && !game.practice) {
      game.score += 10;
      game.accumulatedValue += prizeValue;
      game.wonPrizes.push(`${prizeName} (${money(prizeValue)})`);
      passGate("prize");
    } else if (won) {
      passGate("prize");
    } else {
      game.gates.prize = "failed";
    }

    game.events.push({ title: "Prize round", detail, result: won ? "passed" : "failed" });
    if (!game.practice) game.gates.wheel = "active";
    game.current = {
      type: "prizeResult",
      won,
      detail,
      prizeName,
      prizeValue,
      imageDescription: prizeName || detail
    };
    render();
  }

  function submitAnyNumberDigit(value) {
    const current = game.current;
    const digit = String(value);
    if (!current || !current.anyNumber || current.called.includes(digit)) return;

    const targets = [
      { key: "car", name: current.car.label, start: 1 },
      { key: "smallPrize", name: current.smallPrize.label, start: 0 },
      { key: "piggyBank", name: current.piggyBank.label, start: 0 }
    ];
    let placed = null;
    targets.some((target) => {
      const board = current[target.key];
      for (let index = target.start; index < board.digits.length; index += 1) {
        if (board.digits[index] === digit) {
          board.revealed[index] = true;
          placed = target;
          return true;
        }
      }
      return false;
    });
    if (!placed) return;

    current.called.push(digit);
    current.lastReveal = `${digit} belongs in the ${placed.name}.`;
    const completed = targets.find((target) => current[target.key].revealed.every(Boolean));
    if (!completed) {
      render();
      return;
    }

    const won = completed.key === "car";
    const detail = `${won ? "Won" : "Lost"} Any Number. ${completed.name} filled first. ` +
      `Car actual retail price ${money(current.car.value)}; kayak package actual retail price ${money(current.smallPrize.value)}; ` +
      `piggy bank actual value $${current.piggyBank.value.toFixed(2)}.`;
    completePrizeRound(won, detail, won ? current.car.label : completed.name, won ? current.car.value : 0);
  }

  function submitCliffHangersPrice(value) {
    const current = game.current;
    if (!current || !current.cliffHangers || current.phase !== "pricing") return;
    const item = current.items[current.currentIndex];
    const guess = wholeDollar(value);
    if (guess < 1) return;
    const miss = Math.abs(guess - item.actual);
    current.steps += miss;
    current.history.push({ name: item.name, guess, actual: item.actual, miss });
    current.lastReveal = { name: item.name, guess, actual: item.actual, miss };
    current.phase = "reveal";
    render();
  }

  function continueCliffHangers() {
    const current = game.current;
    if (!current || !current.cliffHangers || current.phase !== "reveal") return;
    if (current.steps > 25) {
      const detail = `Lost Cliff Hangers after item ${current.currentIndex + 1}. The latest miss moved the climber to ${current.steps} steps, past the 25-step limit. ` +
        cliffHangersPriceSummary(current);
      completePrizeRound(false, detail, current.prize, 0);
      return;
    }
    if (current.currentIndex === current.items.length - 1) {
      const detail = `Won Cliff Hangers with ${current.steps} total climber steps, within the 25-step limit. ${cliffHangersPriceSummary(current)}`;
      completePrizeRound(true, detail, current.prize, current.prizeValue);
      return;
    }
    current.currentIndex += 1;
    current.phase = "pricing";
    current.lastReveal = null;
    render();
  }

  function cliffHangersPriceSummary(current) {
    return current.history.map((entry) => `${entry.name}: guessed ${money(entry.guess)}, actual retail price ${money(entry.actual)}, ${entry.miss} step${entry.miss === 1 ? "" : "s"}`).join("; ");
  }

  function submitFivePriceTagsTrueFalse(value) {
    const current = game.current;
    if (!current || !current.fivePriceTags || current.phase !== "trueFalse") return;
    const item = current.items[current.currentIndex];
    const statementIsTrue = item.shown === item.actual;
    const answer = value === "true";
    const correct = answer === statementIsTrue;
    if (correct) current.earnedPicks += 1;
    current.lastReveal = { ...item, answer, correct, statementIsTrue };
    current.history.push(current.lastReveal);
    current.phase = "trueFalseReveal";
    render();
  }

  function continueFivePriceTags() {
    const current = game.current;
    if (!current || !current.fivePriceTags) return;
    if (current.phase === "trueFalseReveal") {
      if (current.currentIndex < current.items.length - 1) {
        current.currentIndex += 1;
        current.phase = "trueFalse";
        current.lastReveal = null;
        render();
        return;
      }
      if (current.earnedPicks === 0) {
        finishFivePriceTags(false);
        return;
      }
      current.picksRemaining = current.earnedPicks;
      current.phase = "tags";
      current.lastReveal = null;
      render();
      return;
    }
    if (current.phase !== "tagReveal") return;
    if (current.lastTag.correct) {
      finishFivePriceTags(true);
      return;
    }
    if (current.picksRemaining === 0) {
      finishFivePriceTags(false);
      return;
    }
    current.phase = "tags";
    current.lastTag = null;
    render();
  }

  function selectFivePriceTag(value) {
    const current = game.current;
    const selected = wholeDollar(value);
    if (!current || !current.fivePriceTags || current.phase !== "tags" || current.selectedTags.includes(selected)) return;
    current.selectedTags.push(selected);
    current.picksRemaining -= 1;
    current.lastTag = { selected, correct: selected === current.actual };
    current.phase = "tagReveal";
    render();
  }

  function finishFivePriceTags(won) {
    const current = game.current;
    const smallPrizeSummary = current.history.map((entry) =>
      `${entry.name}: shown ${money(entry.shown)}, actual retail price ${money(entry.actual)}, ${entry.correct ? "correct" : "incorrect"}`
    ).join("; ");
    const tagSummary = current.selectedTags.length
      ? `Price tags selected: ${current.selectedTags.map(money).join(", ")}.`
      : "No car-price picks were earned.";
    const detail = `${won ? "Won" : "Lost"} Five Price Tags. Earned ${current.earnedPicks} car-price pick${current.earnedPicks === 1 ? "" : "s"}. ${tagSummary} Car actual retail price ${money(current.actual)}. ${smallPrizeSummary}.`;
    completePrizeRound(won, detail, current.prize, won ? current.actual : 0);
  }

  function submitPlinkoChoice(itemIndex, value) {
    const current = game.current;
    if (!current || !current.plinko || current.phase !== "pricing" || itemIndex !== current.currentIndex) return;
    const item = current.items[itemIndex];
    const selected = wholeDollar(value);
    current.answers[itemIndex] = selected;
    current.lastReveal = { item: item.name, selected, actual: item.actual, correct: selected === item.actual };
    if (selected === item.actual) current.chips += 1;
    current.phase = "priceReveal";
    render();
  }

  function continuePlinko() {
    const current = game.current;
    if (!current || !current.plinko) return;
    if (current.phase === "priceReveal") {
      if (current.currentIndex < current.items.length - 1) {
        current.currentIndex += 1;
        current.phase = "pricing";
        current.lastReveal = null;
      } else {
        current.chipsRemaining = current.chips;
        current.phase = "dropping";
      }
      render();
      return;
    }
    if (current.phase !== "dropReveal") return;
    if (current.chipsRemaining > 0) {
      current.phase = "dropping";
      render();
      return;
    }
    const won = current.winnings > 0;
    const priceReveal = current.items.map((item) => `${item.name}: actual retail price ${money(item.actual)}`).join("; ");
    const dropReveal = current.dropHistory.map((drop, index) => `chip ${index + 1} from slot ${drop.start + 1} landed in ${money(drop.amount)}`).join("; ");
    const detail = `${won ? "Won" : "Lost"} Plinko. Earned ${current.chips - current.freeChips} chips plus one free chip. ${dropReveal}. Total cash ${money(current.winnings)}. ${priceReveal}.`;
    completePrizeRound(won, detail, "Plinko cash", current.winnings);
  }

  function dropPlinkoChip(value) {
    const current = game.current;
    if (!current || !current.plinko || current.phase !== "dropping" || current.chipsRemaining < 1) return;
    const start = Math.max(0, Math.min(8, Number(value)));
    const landing = plinkoLanding(start);
    const boardValues = [100, 500, 1000, 0, 10000, 0, 1000, 500, 100];
    const amount = boardValues[landing];
    current.dropHistory.push({ start, landing, amount });
    current.winnings += amount;
    current.chipsRemaining -= 1;
    current.lastDrop = { start, landing, amount };
    current.phase = "dropReveal";
    render();
  }

  function plinkoLanding(start) {
    let position = start * 2;
    for (let bounce = 0; bounce < 12; bounce += 1) position += Math.random() < 0.5 ? -1 : 1;
    return Math.max(0, Math.min(8, Math.round(position / 2)));
  }

  function countMatchingDigits(a, b) {
    return a.split("").filter((digit, index) => digit === b[index]).length;
  }

  function startWheel() {
    const order = randomInt(1, 3);
    const earlier = [];
    for (let i = 1; i < order; i += 1) {
      earlier.push(autoWheelTotal());
    }
    const firstSpin = wheelSpin();
    game.current = {
      type: "wheel",
      order,
      earlier,
      later: 3 - order,
      firstSpin,
      userTotal: firstSpin,
      log: []
    };
    const leader = Math.max(0, ...earlier);
    if (leader > firstSpin) {
      const second = wheelSpin();
      game.current.secondSpin = second;
      game.current.userTotal = firstSpin + second;
      game.current.log.push(`You were behind ${formatCents(leader)}, so the second spin was forced.`);
      resolveWheelAfterUser();
      return;
    }
    render();
  }

  function wheelSpin() {
    return randomInt(1, 20) * 5;
  }

  function autoWheelTotal(target) {
    const first = wheelSpin();
    if (first >= 80 && (!target || first > target)) return first;
    const second = wheelSpin();
    const total = first + second;
    return total > 100 ? 0 : total;
  }

  function wheelDecision(decision) {
    const current = game.current;
    if (decision === "spin") {
      current.secondSpin = wheelSpin();
      current.userTotal = current.firstSpin + current.secondSpin;
    }
    resolveWheelAfterUser();
  }

  function resolveWheelAfterUser() {
    const current = game.current;
    if (current.userTotal > 100) {
      game.gates.wheel = "failed";
      showWheelResult(false, wheelResultDetail(current, 0, true), current);
      render();
      return;
    }

    const laterTotals = [];
    for (let i = 0; i < current.later; i += 1) {
      laterTotals.push(autoWheelTotal(current.userTotal));
    }
    current.laterTotals = laterTotals;
    const bestOpponent = Math.max(0, ...current.earlier, ...laterTotals);
    const won = current.userTotal > bestOpponent || resolveSpinOff(current.userTotal, bestOpponent);

    if (won) {
      if (!game.practice) game.score += 10;
      passGate("wheel");
      if (!game.practice) game.gates.showcase = "active";
      game.events.push({
        title: "Big Wheel",
        detail: `Advanced with ${formatCents(current.userTotal)}. Opponent best was ${formatCents(bestOpponent)}.`,
        result: "passed"
      });
      showWheelResult(true, `You advanced with ${formatCents(current.userTotal)}. Opponent best was ${formatCents(bestOpponent)}.`, current);
      render();
      return;
    }

    game.gates.wheel = "failed";
    showWheelResult(false, wheelResultDetail(current, bestOpponent, false), current);
    render();
  }

  function wheelResultDetail(current, bestOpponent, bust) {
    const secondPart = current.secondSpin === undefined ? "stayed after one spin" : `spun ${formatCents(current.firstSpin)} + ${formatCents(current.secondSpin)} = ${formatCents(current.userTotal)}`;
    if (bust) {
      return `You ${secondPart}, which is over $1.00.`;
    }
    const leaderText = `the highest opponent total was ${formatCents(bestOpponent)}`;
    if (current.secondSpin !== undefined && current.userTotal < bestOpponent) {
      return `You ${secondPart}, which was less than ${leaderText}.`;
    }
    return `You finished with ${formatCents(current.userTotal)}, but ${leaderText}.`;
  }

  function showWheelResult(won, detail, wheelState) {
    game.current = {
      type: "wheelResult",
      won,
      detail,
      wheelState
    };
    game.events.push({
      title: "Big Wheel",
      detail,
      result: won ? "passed" : "failed"
    });
  }

  function finishPendingWheelLoss() {
    if (!game || !game.current || game.current.type !== "wheelResult") return;
    if (game.practice) {
      startStandaloneWheel();
      return;
    }
    if (game.current.won) {
      startShowcase();
      return;
    }
    finishGame();
    render();
  }

  function resolveSpinOff(userTotal, opponentTotal) {
    if (userTotal !== opponentTotal) return false;
    const userSpin = wheelSpin();
    const opponentSpin = wheelSpin();
    game.current.spinOff = { userSpin, opponentSpin };
    return userSpin >= opponentSpin;
  }

  function startShowcase() {
    const scenario = choice(showcaseBank);
    game.current = {
      type: "showcase",
      ...scenario,
      actual: wholeDollar(scenario.actual),
      opponentBid: wholeDollar(scenario.opponentBid),
      opponentActual: wholeDollar(scenario.opponentActual)
    };
    render();
  }

  function submitShowcaseBid() {
    const bid = wholeDollar(numericInputValue("showcaseBid"));
    if (bid < 1) return;
    const current = game.current;
    const opponentPrizes = current.opponentPrizes || ["opponent showcase details not stored"];
    const userOver = bid > current.actual;
    const opponentOver = current.opponentBid > current.opponentActual;
    const userDiff = userOver ? Infinity : current.actual - bid;
    const opponentDiff = opponentOver ? Infinity : current.opponentActual - current.opponentBid;
    const won = userDiff < opponentDiff;

    if (won) {
      if (!game.practice) {
        game.score += 15;
        game.accumulatedValue += current.actual;
        game.wonPrizes.push(`Showcase (${money(current.actual)})`);
      }
      passGate("showcase");
    } else {
      if (!game.practice) game.score += userOver ? 0 : 5;
      game.gates.showcase = "failed";
    }

    game.events.push({
      title: "Final Showcase",
      detail: `${won ? "Won" : "Lost"} with bid ${money(bid)}. Your actual retail price ${money(current.actual)}. Opponent bid ${money(current.opponentBid)} on ${opponentPrizes.join("; ")}. Opponent actual retail price ${money(current.opponentActual)}.`,
      result: won ? "passed" : "failed"
    });
    game.current = {
      type: "showcaseResult",
      won,
      detail: `${won ? "Won" : "Lost"} with bid ${money(bid)}. Your actual retail price ${money(current.actual)}. Opponent bid ${money(current.opponentBid)} on ${opponentPrizes.join("; ")}. Opponent actual retail price ${money(current.opponentActual)}.`,
      prizes: current.prizes,
      opponentPrizes
    };
    render();
  }

  function render() {
    renderStatus();
    renderPlay();
    renderReport();
    renderHistory();
    saveSession();
  }

  function renderStatus() {
    const source = game || session.games[0] || null;
    els.score.textContent = source ? source.score : "0";
    els.winnings.textContent = money(source ? source.accumulatedValue : 0);
    els.row.textContent = source ? `${source.rowAttempts}/${MAX_ROW_ATTEMPTS}` : `0/${MAX_ROW_ATTEMPTS}`;
    const activeStage = source ? source.stage : "";
    els.gates.innerHTML = gates.map((gate) => {
      const status = source ? source.gates[gate.key] : "pending";
      const active = game && game.current && !game.current.type.endsWith("Result") && gate.key === stageToGate(game.current.type);
      const klass = active ? "active" : gateClass(status);
      const mark = status === "passed" ? "OK" : status === "failed" ? "NO" : gate.label.slice(0, 2).toUpperCase();
      return `<div class="gate ${klass}" title="${gate.full}"><span class="mark">${mark}</span><span>${gate.label}</span></div>`;
    }).join("");
  }

  function stageToGate(type) {
    if (type === "row") return "row";
    if (type === "prize") return "prize";
    if (type === "prizeResult") return "prize";
    if (type === "wheel") return "wheel";
    if (type === "wheelResult") return "wheel";
    if (type === "showcase") return "showcase";
    if (type === "showcaseResult") return "showcase";
    return "";
  }

  function renderPlay() {
    if (!game) {
      const latest = session.games[0];
      els.play.innerHTML = `
        <h2>${latest ? "Game complete" : "Ready to play"}</h2>
        <p class="muted">${latest ? "Review the result below or start a fresh pipeline." : "Run the full pipeline from Contestants Row through the final Showcase."}</p>
        <button class="primary" type="button" data-action="new">Start New Game</button>
      `;
      return;
    }

    const current = game.current;
    if (current.type === "row") renderRow(current);
    if (current.type === "rowResult") renderRowResult(current);
    if (current.type === "prize") renderPrize(current);
    if (current.type === "prizeResult") renderPrizeResult(current);
    if (current.type === "wheel") renderWheel(current);
    if (current.type === "wheelResult") renderWheelResult(current);
    if (current.type === "showcase") renderShowcase(current);
    if (current.type === "showcaseResult") renderShowcaseResult(current);
  }

  function visualCard(type, asset) {
    if (type === "row") return rowPracticeVisualCard();

    if (asset && asset.image) {
      return `
        <figure class="visual-card">
          <img src="${asset.image}" alt="${asset.title} official game visual" loading="lazy">
          <figcaption>
            ${asset.title} visual from
            <a href="${asset.page}" target="_blank" rel="noopener noreferrer">${asset.source}</a>
          </figcaption>
        </figure>
      `;
    }

    const stageMap = {
      row: {
        title: "Contestants Row",
        className: "row-visual",
        lines: ["Bid", "Closest", "No over"]
      },
      showcase: {
        title: "Final Showcase",
        className: "showcase-visual",
        lines: ["Trip", "Room", "Ride"]
      }
    };
    const stage = stageMap[type];
    if (!stage) return "";

    return `
      <figure class="visual-card stage-art ${stage.className}">
        <div class="stage-art-box" aria-hidden="true">
          ${stage.lines.map((line) => `<span>${line}</span>`).join("")}
        </div>
        <figcaption>${stage.title}</figcaption>
      </figure>
    `;
  }

  function rowPracticeVisualCard() {
    return `
      <figure class="visual-card row-bid-card">
        <div class="row-bid-visual" aria-label="Contestants Row bid position guide">
          <div class="row-bid-tile low">
            <span class="bid-dot"></span>
            <strong>Low</strong>
            <small>Safe but far</small>
          </div>
          <div class="row-bid-tile low">
            <span class="bid-dot"></span>
            <strong>Closer</strong>
            <small>Still under</small>
          </div>
          <div class="row-bid-tile target">
            <span class="bid-dot"></span>
            <strong>Want</strong>
            <small>Closest under</small>
          </div>
          <div class="row-bid-tile over">
            <span class="bid-dot"></span>
            <strong>Over</strong>
            <small>Cannot win</small>
          </div>
        </div>
        <figcaption>Contestants Row guide: be closest to the actual retail price without going over.</figcaption>
      </figure>
    `;
  }

  function wheelPracticeVisualCard(current) {
    const spinnerRows = [0, 1, 2].map((index) => {
      const score = index < current.earlier.length ? current.earlier[index] : index === current.order - 1 ? current.userTotal : null;
      const isUser = index === current.order - 1;
      const over = score !== null && score > 100;
      const label = score === null ? "Waiting" : over ? "Over" : formatCents(score);
      const className = over ? "over" : isUser ? "user" : score === null ? "waiting" : "set";
      return `
        <div class="wheel-spinner ${className}">
          <span>Spinner ${index + 1}${isUser ? " (you)" : ""}</span>
          <strong>${label}</strong>
          <div class="wheel-meter"><i style="width: ${score === null ? 0 : Math.min(score, 100)}%"></i></div>
        </div>
      `;
    }).join("");

    return `
      <figure class="visual-card wheel-score-card">
        <div class="wheel-score-visual">
          <div class="dollar-cap">$1.00</div>
          ${spinnerRows}
        </div>
        <figcaption>Big Wheel guide: highest total at or below $1.00 advances. Over $1.00 is out.</figcaption>
      </figure>
    `;
  }

  function generatedVisualCard(title, description, kind) {
    return `
      <figure class="visual-card generated-card">
        <img src="${generateDescriptionImage(description, kind)}" alt="Generated image for ${escapeAttr(title)}" loading="lazy">
        <figcaption>${escapeHtml(title)} generated from: ${escapeHtml(description)}</figcaption>
      </figure>
    `;
  }

  function anchorImageCard(anchor, fallbackDescription) {
    const key = anchorVisuals[anchor] ? anchor : detectVisualCategory(fallbackDescription || "", anchor || "bundle");
    const asset = anchorVisuals[key] || anchorVisuals.bundle;
    return `
      <figure class="visual-card anchor-card">
        <img src="${asset.image}" alt="${escapeAttr(fallbackDescription || asset.title)}" loading="lazy">
        <figcaption>${escapeHtml(fallbackDescription || asset.title)}</figcaption>
      </figure>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function generateDescriptionImage(description, kind) {
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 540;
    const ctx = canvas.getContext("2d");
    const seed = hashString(`${kind}:${description}`);
    const palette = palettes[seed % palettes.length];
    const category = detectVisualCategory(description, kind);

    drawGeneratedBackground(ctx, palette, seed);
    drawCategoryScene(ctx, category, palette, seed);
    drawGeneratedCaption(ctx, description, category, palette);

    return canvas.toDataURL("image/png");
  }

  const palettes = [
    { bg: "#f8efe3", a: "#c71931", b: "#1768ac", c: "#f4c542", d: "#1f7a52", ink: "#161616" },
    { bg: "#edf5f4", a: "#1768ac", b: "#c45a1c", c: "#f4c542", d: "#217a48", ink: "#161616" },
    { bg: "#f6f0f7", a: "#8d3f7a", b: "#1768ac", c: "#efb445", d: "#2a7668", ink: "#161616" },
    { bg: "#f2f4e9", a: "#217a48", b: "#ba2f3d", c: "#efc84a", d: "#315f9e", ink: "#161616" }
  ];

  function hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash >>> 0);
  }

  function detectVisualCategory(description, kind) {
    const text = `${kind} ${description}`.toLowerCase();
    if (/robot vacuum|self-empty|auto-empty|mop dock/.test(text)) return "robot vacuum";
    if (/espresso|burr grinder|coffee subscription|knock box/.test(text)) return "espresso";
    if (/cookware|dutch oven|cast-iron|chef knives|roasting pan|blender|waffle maker|kitchen scale|thermometer/.test(text)) return "cookware";
    if (/hair dryer|garment steamer|toothbrush|humidifier/.test(text)) return "wellness";
    if (/oled|television|soundbar|subwoofer|streaming device|home theater|projector/.test(text)) return "tv soundbar";
    if (/gaming|console|controller|headset|handheld/.test(text)) return "gaming";
    if (/mirrorless|action camera|creator|gimbal|microphone|tripod|led panel/.test(text)) return "creator camera";
    if (/electric bike|e-bike|bike|pannier|helmet/.test(text)) return "electric bike";
    if (/paddleboard|snorkel|beach/.test(text)) return "paddleboard";
    if (/treadmill|dumbbell|strength|workout|fitness|home gym/.test(text)) return "home gym";
    if (/crib|nursery|glider|changing table|baby monitor/.test(text)) return "nursery";
    if (/pet|feeder|litter|gps collar|grooming/.test(text)) return "pet tech";
    if (/sewing|quilting|embroidery|fabric|thread/.test(text)) return "sewing studio";
    if (/pressure washer|foam cannon|surface cleaner|shop vacuum/.test(text)) return "pressure washer";
    if (/lawn mower|leaf blower|string trimmer|hedge trimmer|edger/.test(text)) return "lawn mower";
    if (/patio heater|fire table|balcony|lantern/.test(text)) return "patio heater";
    if (/pizza oven|pizza-night|wood-fired|dough/.test(text)) return "pizza oven";
    if (/camp|tent|cooler|sleeping|portable power/.test(text)) return "camping kit";
    if (/keyboard|digital piano|studio monitor|audio interface/.test(text)) return "music studio";
    if (/telescope|astronomy|stargazing|star tracker|binocular/.test(text)) return "telescope kit";
    if (/luggage|suitcase|duffel|weekender|packing cube/.test(text)) return "luggage set";
    if (/standing desk|office chair|monitor arm|webcam|work-from-home/.test(text)) return "standing desk";
    if (/air purifier|humidifier|dehumidifier|air-care|diffuser/.test(text)) return "air care";
    if (/sauna|towel warmer|spa|cold plunge/.test(text)) return "home sauna";
    if (/dining room|breakfast nook|dinnerware|flatware|sideboard/.test(text)) return "dining room";
    if (/handbag|satchel|crossbody|wallet|sunglasses|scarf/.test(text)) return "designer handbag";
    if (/suv|crossover|sedan|hatchback|vehicle|car/.test(text)) return "car";
    if (/trip|nights|airfare|cruise|resort|tokyo|lisbon|banff|costa|charleston/.test(text)) return "trip";
    if (/luggage|suitcase|duffel/.test(text)) return "luggage";
    if (/lawn|garden|patio|outdoor|grill|pizza|pergola/.test(text)) return "outdoor";
    if (/piano|music|turntable|audio|speaker|headphones/.test(text)) return "music";
    if (/camera|creator|gimbal|microphone|laptop|tablet|monitor/.test(text)) return "creator";
    if (/crib|nursery|pet|feeder|litter|bed/.test(text)) return "family";
    if (/tool|garage|drill|socket|work light/.test(text)) return "tools";
    if (/sauna|massage|wellness|yoga|recovery/.test(text)) return "wellness";
    if (/telescope|astronomy|star/.test(text)) return "astronomy";
    if (/camp|tent|cooler|sleeping/.test(text)) return "camping";
    if (/sewing|quilting|fabric/.test(text)) return "sewing";
    if (/furniture|sofa|chair|dining|bedroom|table|room/.test(text)) return "furniture";
    if (/pickleball|snowboard|bike|sports|gym/.test(text)) return "sports";
    return "bundle";
  }

  function drawGeneratedBackground(ctx, palette, seed) {
    const gradient = ctx.createLinearGradient(0, 0, 960, 540);
    gradient.addColorStop(0, palette.bg);
    gradient.addColorStop(0.55, "#ffffff");
    gradient.addColorStop(1, palette.bg);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 960, 540);

    ctx.fillStyle = palette.c;
    ctx.globalAlpha = 0.24;
    ctx.beginPath();
    ctx.arc(790, 80, 210 + (seed % 35), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.b;
    ctx.beginPath();
    ctx.arc(120, 400, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(62, 64, 836, 360);
    ctx.strokeStyle = "#ded7c9";
    ctx.lineWidth = 4;
    roundedRect(ctx, 62, 64, 836, 360, 24);
    ctx.stroke();
  }

  function drawCategoryScene(ctx, category, palette, seed) {
    const x = 120;
    const y = 118;
    if (category === "car") drawCar(ctx, x + 80, y + 120, palette);
    else if (category === "trip") drawTrip(ctx, x + 40, y + 40, palette);
    else if (category === "luggage") drawLuggage(ctx, x + 120, y + 58, palette);
    else if (category === "outdoor") drawOutdoor(ctx, x + 50, y + 80, palette);
    else if (category === "music") drawMusic(ctx, x + 90, y + 54, palette);
    else if (category === "creator") drawCreator(ctx, x + 100, y + 74, palette);
    else if (category === "family") drawFamily(ctx, x + 100, y + 56, palette);
    else if (category === "tools") drawTools(ctx, x + 110, y + 70, palette);
    else if (category === "wellness") drawWellness(ctx, x + 110, y + 54, palette);
    else if (category === "astronomy") drawAstronomy(ctx, x + 100, y + 42, palette);
    else if (category === "camping") drawCamping(ctx, x + 80, y + 72, palette);
    else if (category === "sewing") drawSewing(ctx, x + 110, y + 70, palette);
    else if (category === "sports") drawSports(ctx, x + 92, y + 70, palette);
    else if (category === "furniture") drawFurniture(ctx, x + 80, y + 88, palette);
    else drawBundle(ctx, x + 90, y + 70, palette, seed);
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function drawCar(ctx, x, y, p) {
    ctx.fillStyle = p.a;
    roundedRect(ctx, x, y + 58, 520, 112, 30);
    ctx.fill();
    ctx.fillStyle = p.b;
    roundedRect(ctx, x + 110, y, 260, 90, 24);
    ctx.fill();
    ctx.fillStyle = "#dff2ff";
    roundedRect(ctx, x + 150, y + 20, 78, 52, 10);
    ctx.fill();
    roundedRect(ctx, x + 250, y + 20, 78, 52, 10);
    ctx.fill();
    drawWheel(ctx, x + 120, y + 170, p.ink);
    drawWheel(ctx, x + 405, y + 170, p.ink);
  }

  function drawWheel(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTrip(ctx, x, y, p) {
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(x + 610, y + 30, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.b;
    ctx.beginPath();
    ctx.moveTo(x + 20, y + 250);
    ctx.lineTo(x + 230, y + 80);
    ctx.lineTo(x + 420, y + 250);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = p.d;
    ctx.beginPath();
    ctx.moveTo(x + 310, y + 250);
    ctx.lineTo(x + 500, y + 110);
    ctx.lineTo(x + 700, y + 250);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = p.a;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(x + 90, y + 58);
    ctx.quadraticCurveTo(x + 280, y - 20, x + 470, y + 58);
    ctx.stroke();
    ctx.fillStyle = p.a;
    ctx.fillRect(x + 438, y + 38, 95, 32);
  }

  function drawLuggage(ctx, x, y, p) {
    [0, 150, 305].forEach((offset, index) => {
      ctx.strokeStyle = p.ink;
      ctx.lineWidth = 8;
      ctx.strokeRect(x + offset + 42, y - 36, 50, 42);
      ctx.fillStyle = [p.a, p.b, p.d][index];
      roundedRect(ctx, x + offset, y, 125, 210, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + offset + 28, y + 42, 68, 10);
      ctx.fillRect(x + offset + 28, y + 92, 68, 10);
    });
  }

  function drawOutdoor(ctx, x, y, p) {
    ctx.fillStyle = p.d;
    ctx.fillRect(x, y + 190, 690, 38);
    ctx.fillStyle = p.a;
    roundedRect(ctx, x + 80, y + 90, 220, 120, 20);
    ctx.fill();
    ctx.fillStyle = p.ink;
    ctx.fillRect(x + 130, y + 54, 120, 38);
    ctx.fillStyle = p.b;
    ctx.fillRect(x + 390, y + 84, 170, 126);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(x + 520, y + 56, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMusic(ctx, x, y, p) {
    ctx.fillStyle = p.ink;
    roundedRect(ctx, x + 60, y + 76, 440, 118, 12);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 18; i += 1) ctx.fillRect(x + 86 + i * 21, y + 112, 15, 72);
    ctx.fillStyle = p.a;
    ctx.beginPath();
    ctx.arc(x + 590, y + 98, 62, 0, Math.PI * 2);
    ctx.arc(x + 590, y + 98, 24, 0, Math.PI * 2);
    ctx.fill("evenodd");
  }

  function drawCreator(ctx, x, y, p) {
    ctx.fillStyle = p.ink;
    roundedRect(ctx, x + 130, y + 58, 280, 170, 24);
    ctx.fill();
    ctx.fillStyle = p.b;
    ctx.beginPath();
    ctx.arc(x + 270, y + 143, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + 270, y + 143, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.c;
    ctx.fillRect(x + 470, y + 86, 150, 104);
  }

  function drawFamily(ctx, x, y, p) {
    ctx.strokeStyle = p.b;
    ctx.lineWidth = 12;
    ctx.strokeRect(x + 85, y + 28, 300, 190);
    ctx.fillStyle = p.c;
    ctx.fillRect(x + 105, y + 130, 260, 28);
    ctx.fillStyle = p.a;
    roundedRect(ctx, x + 450, y + 64, 150, 160, 22);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + 525, y + 124, 42, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTools(ctx, x, y, p) {
    ctx.fillStyle = p.a;
    roundedRect(ctx, x + 60, y + 78, 260, 160, 18);
    ctx.fill();
    ctx.fillStyle = p.ink;
    ctx.fillRect(x + 60, y + 122, 260, 14);
    ctx.strokeStyle = p.b;
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.moveTo(x + 420, y + 62);
    ctx.lineTo(x + 580, y + 222);
    ctx.stroke();
    ctx.fillStyle = p.c;
    ctx.fillRect(x + 375, y + 42, 110, 56);
  }

  function drawWellness(ctx, x, y, p) {
    ctx.fillStyle = p.d;
    roundedRect(ctx, x + 120, y + 36, 250, 210, 32);
    ctx.fill();
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(x + 510, y + 120, 85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(x + 510, y + 120, 44, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawAstronomy(ctx, x, y, p) {
    ctx.fillStyle = p.ink;
    ctx.fillRect(x + 285, y + 176, 20, 88);
    ctx.strokeStyle = p.b;
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.moveTo(x + 210, y + 110);
    ctx.lineTo(x + 430, y + 50);
    ctx.stroke();
    ctx.fillStyle = p.a;
    roundedRect(ctx, x + 190, y + 78, 260, 64, 32);
    ctx.fill();
    ctx.fillStyle = p.c;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.arc(x + 510 + i * 28, y + 42 + (i % 2) * 58, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCamping(ctx, x, y, p) {
    ctx.fillStyle = p.d;
    ctx.fillRect(x + 20, y + 220, 650, 28);
    ctx.fillStyle = p.a;
    ctx.beginPath();
    ctx.moveTo(x + 110, y + 220);
    ctx.lineTo(x + 260, y + 54);
    ctx.lineTo(x + 420, y + 220);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.moveTo(x + 260, y + 220);
    ctx.lineTo(x + 260, y + 88);
    ctx.lineTo(x + 350, y + 220);
    ctx.closePath();
    ctx.fill();
  }

  function drawSewing(ctx, x, y, p) {
    ctx.fillStyle = p.b;
    roundedRect(ctx, x + 95, y + 80, 320, 120, 20);
    ctx.fill();
    ctx.fillStyle = p.ink;
    ctx.fillRect(x + 185, y + 200, 30, 58);
    ctx.fillRect(x + 330, y + 200, 30, 58);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(x + 535, y + 130, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x + 484, y + 130);
    ctx.lineTo(x + 586, y + 130);
    ctx.stroke();
  }

  function drawSports(ctx, x, y, p) {
    ctx.strokeStyle = p.a;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.ellipse(x + 210, y + 95, 55, 96, -0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x + 382, y + 95, 55, 96, 0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = p.ink;
    ctx.beginPath();
    ctx.moveTo(x + 245, y + 170);
    ctx.lineTo(x + 310, y + 244);
    ctx.moveTo(x + 350, y + 170);
    ctx.lineTo(x + 285, y + 244);
    ctx.stroke();
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(x + 520, y + 148, 34, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFurniture(ctx, x, y, p) {
    ctx.fillStyle = p.b;
    roundedRect(ctx, x + 85, y + 110, 420, 120, 28);
    ctx.fill();
    ctx.fillStyle = p.a;
    roundedRect(ctx, x + 115, y + 52, 170, 90, 18);
    ctx.fill();
    roundedRect(ctx, x + 310, y + 52, 170, 90, 18);
    ctx.fill();
    ctx.fillStyle = p.ink;
    ctx.fillRect(x + 135, y + 230, 24, 42);
    ctx.fillRect(x + 432, y + 230, 24, 42);
  }

  function drawBundle(ctx, x, y, p, seed) {
    const colors = [p.a, p.b, p.c, p.d];
    for (let i = 0; i < 4; i += 1) {
      ctx.fillStyle = colors[(i + seed) % colors.length];
      roundedRect(ctx, x + i * 112, y + (i % 2) * 36, 96, 132, 16);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + i * 112 + 20, y + (i % 2) * 36 + 38, 56, 10);
      ctx.fillRect(x + i * 112 + 20, y + (i % 2) * 36 + 70, 56, 10);
    }
  }

  function drawGeneratedCaption(ctx, description, category, palette) {
    ctx.fillStyle = palette.ink;
    ctx.font = "900 34px system-ui, sans-serif";
    ctx.fillText(categoryLabel(category), 94, 462);
    ctx.font = "600 22px system-ui, sans-serif";
    ctx.fillStyle = "#4d4b47";
    wrapCanvasText(ctx, description, 94, 498, 760, 28, 2);
  }

  function categoryLabel(category) {
    return {
      car: "Vehicle anchor",
      trip: "Travel package",
      luggage: "Travel gear",
      outdoor: "Outdoor package",
      music: "Music and audio",
      creator: "Creator gear",
      family: "Home and family",
      tools: "Tool package",
      wellness: "Wellness package",
      astronomy: "Astronomy gear",
      camping: "Camping package",
      sewing: "Maker studio",
      sports: "Sports gear",
      furniture: "Room package",
      bundle: "Prize bundle"
    }[category] || "Prize bundle";
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = String(text).split(/\s+/);
    let line = "";
    let lines = 0;
    for (let i = 0; i < words.length; i += 1) {
      const test = `${line}${words[i]} `;
      if (ctx.measureText(test).width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, y + lines * lineHeight);
        line = `${words[i]} `;
        lines += 1;
        if (lines >= maxLines) return;
      } else {
        line = test;
      }
    }
    if (line && lines < maxLines) ctx.fillText(line.trim(), x, y + lines * lineHeight);
  }

  function renderRow(current) {
    const before = current.bids.slice(0, current.position - 1);
    els.play.innerHTML = `
      <div class="stage-meta">
        <span class="pill">Contestants Row</span>
        <span class="pill">Attempt ${game.rowAttempts + 1} of ${MAX_ROW_ATTEMPTS}</span>
        <span class="pill">Bidding ${ordinal(current.position)}</span>
      </div>
      <h2>Item up for bids</h2>
      <div class="row-top-layout">
        ${anchorImageCard(current.item.family, current.item.item)}
        ${visualCard("row")}
      </div>
      ${current.message ? `<p class="outcome">${current.message}</p>` : ""}
      ${rowBidSlots(current, before)}
    `;
  }

  function rowBidSlots(current, before) {
    const slots = [0, 1, 2, 3].map((index) => {
      if (index < before.length) {
        return `
          <div class="row-slot filled">
            <span>C${index + 1}</span>
            <strong>${money(before[index])}</strong>
          </div>
        `;
      }
      if (index === current.position - 1) {
        return `
          <label class="row-slot current">
            <span>● You</span>
            <input id="bidInput" type="number" inputmode="numeric" min="1" step="1" aria-label="Your bid" autofocus>
          </label>
        `;
      }
      return `
        <div class="row-slot waiting">
          <span>C${index + 1}</span>
          <strong>Waiting</strong>
        </div>
      `;
    }).join("");

    return `
      <div class="row-slots" aria-label="Contestants Row bidding order">
        ${slots}
      </div>
      <button class="primary continue-button" type="button" data-action="rowBid">Submit Bid</button>
    `;
  }

  function renderRowResult(current) {
    els.play.innerHTML = `
      <div class="stage-meta">
        <span class="pill">Contestants Row result</span>
        <span class="pill">${current.won ? "You won" : current.eliminated ? "Out of chances" : current.rerun ? "Rebid" : "Still alive"}</span>
      </div>
      ${anchorImageCard(current.item ? current.item.family : "bundle", current.imageDescription)}
      <div class="outcome ${current.won ? "win" : current.rerun ? "" : "loss"}">
        <h2>${current.won ? "Contestants Row win" : current.eliminated ? "Contestants Row elimination" : current.rerun ? "Everybody overbid" : "Contestants Row miss"}</h2>
        <div class="actual-price">
          <span class="label">Actual retail price</span>
          <strong>${money(current.actual)}</strong>
        </div>
        ${rowResultBidGrid(current)}
        ${current.won ? `<p class="compact-note">Join Drew on stage for the pricing game.</p>` : ""}
        ${current.userIndex === undefined && current.userBid === undefined ? `<p class="muted compact-note">Older saved result: your bid was not tracked on this card. New result cards mark it with a gold You badge.</p>` : ""}
      </div>
      <button class="primary continue-button" type="button" data-action="continueRow">
        ${game && game.practice ? "Practice Again" : current.won ? "Join Drew on Stage" : current.eliminated ? "Save Result" : "Continue"}
      </button>
    `;
  }

  function rowResultBidGrid(current) {
    if (!current.allBids) return `<p>${escapeHtml(current.detail)}</p>`;
    return `
      <div class="result-bids">
        ${current.allBids.map((bid, index) => {
          const winner = current.winnerIndex === index;
          const user = current.userIndex === index || (current.userIndex === undefined && current.userBid === bid);
          const className = winner ? "winner" : "loser";
          const label = winner ? "Winner" : "Lost";
          return `
            <div class="result-bid ${className}${user ? " is-user" : ""}">
              ${user ? `<b class="you-ribbon" aria-label="Your bid">● You</b>` : ""}
              <span>C${index + 1}</span>
              <strong>${money(bid)}</strong>
              <small>${label}</small>
            </div>
          `;
        }).join("")}
      </div>
      ${current.winnerIndex === null ? `<p class="muted compact-note">All bids were over. Fresh item next.</p>` : `<p class="muted compact-note">Contestant ${current.winnerIndex + 1} wins with ${money(current.winnerBid)}.</p>`}
    `;
  }

  function pricingLayout(visuals, simulator) {
    return `
      <div class="pricing-layout">
        <div class="pricing-visuals">${visuals}</div>
        <div class="pricing-simulator">${simulator}</div>
      </div>
    `;
  }

  function anyNumberPriceRow(board, kind) {
    const prefix = kind === "car" ? "$" : kind === "small" ? "$" : "$";
    const slots = board.digits.split("").map((digit, index) => {
      const divider = kind === "piggy" && index === 1 ? `<span class="decimal">.</span>` : "";
      return `${divider}<span class="number-slot ${board.revealed[index] ? "revealed" : ""}">${board.revealed[index] ? digit : "?"}</span>`;
    }).join("");
    return `
      <div class="any-number-row ${kind}">
        <span>${escapeHtml(board.label)}</span>
        <strong><b>${prefix}</b>${slots}</strong>
      </div>
    `;
  }

  function ordinal(value) {
    return ["first", "second", "third", "fourth"][value - 1] || `${value}`;
  }

  function renderPrize(current) {
    if (current.documented && current.choices && current.choices.some((choiceText) => /strategic move|prettiest number|favorite-looking prize/i.test(choiceText))) {
      game.current = buildDocumentedPrizeRound(current.gameType);
      render();
      return;
    }

    if (current.anyNumber) {
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Any Number</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.anyNumber)}${anchorImageCard("car", current.prize)}`,
          `<h2>Any Number</h2>
          <p class="muted">Call one unused digit. It is revealed wherever it belongs. The first complete price wins that prize and ends the game.</p>
          <div class="any-number-board">
            ${anyNumberPriceRow(current.car, "car")}
            ${anyNumberPriceRow(current.smallPrize, "small")}
            ${anyNumberPriceRow(current.piggyBank, "piggy")}
          </div>
          <p class="step-feedback">${escapeHtml(current.lastReveal)}</p>
          <div class="digit-grid" aria-label="Unused digits">
            ${Array.from({ length: 10 }, (_, digit) => `<button type="button" data-action="anyNumberDigit" data-value="${digit}" ${current.called.includes(String(digit)) ? "disabled" : ""}>${digit}</button>`).join("")}
          </div>`
        )}
      `;
      return;
    }

    if (current.cliffHangers) {
      const item = current.items[current.currentIndex];
      const remaining = Math.max(0, 25 - current.steps);
      const reveal = current.lastReveal;
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Cliff Hangers</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.cliffHangers)}${anchorImageCard("home sauna", current.prize)}`,
          `<h2>Cliff Hangers</h2>
          <p class="muted">Price each small prize separately. Every dollar you miss moves the climber one step; going past 25 loses the game.</p>
          <div class="cliff-meter" aria-label="Climber at ${current.steps} of 25 steps">
            <div><span>Start</span><strong>${current.steps} / 25 steps</strong><span>Top</span></div>
            <div class="cliff-track"><i style="width:${Math.min(100, current.steps / 25 * 100)}%"></i></div>
            <small>${remaining} safe step${remaining === 1 ? "" : "s"} remain</small>
          </div>
          <div class="round-progress">Small prize ${current.currentIndex + 1} of ${current.items.length}</div>
          ${anchorImageCard(detectVisualCategory(item.name, "small prize"), item.name)}
          ${current.phase === "pricing" ? `
            <h3>What is its actual retail price?</h3>
            <div class="form-line">
              <label>
                <span class="label">Your whole-dollar bid</span>
                <input id="cliffPriceInput" type="number" inputmode="numeric" min="1" max="999" step="1" autofocus>
              </label>
              <button class="primary" type="button" data-action="cliffPriceInput">Submit Price</button>
            </div>
          ` : `
            <div class="outcome ${current.steps > 25 ? "loss" : reveal.miss === 0 ? "win" : ""}">
              <h3>${reveal.miss === 0 ? "Exact price" : `${reveal.miss} climber step${reveal.miss === 1 ? "" : "s"}`}</h3>
              <p>You chose ${money(reveal.guess)}. Actual retail price ${money(reveal.actual)}.</p>
            </div>
            <button class="primary continue-button" type="button" data-action="continueCliff">${current.steps > 25 || current.currentIndex === current.items.length - 1 ? "See Game Result" : "Next Small Prize"}</button>
          `}`
        )}
      `;
      return;
    }

    if (current.fivePriceTags) {
      const item = current.items[current.currentIndex];
      const inTagPhase = current.phase === "tags" || current.phase === "tagReveal";
      const reveal = current.lastReveal;
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Five Price Tags</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.fivePriceTags)}${anchorImageCard("car", current.prize)}`,
          `<h2>Five Price Tags</h2>
          <p class="muted">Make four separate True or False decisions. Each correct answer earns one chance to pick the car's actual price.</p>
          <div class="strategy-board">
            <span class="label">Car-price picks earned</span>
            <p><strong>${current.earnedPicks}</strong>${inTagPhase ? ` earned; <strong>${current.picksRemaining}</strong> remaining` : ` after ${current.history.length} of ${current.items.length} products`}.</p>
          </div>
          ${current.phase === "trueFalse" ? `
            <div class="round-progress">Small prize ${current.currentIndex + 1} of ${current.items.length}</div>
            ${anchorImageCard(item.anchor, item.name)}
            <div class="shown-price-card">
              <span class="label">Price shown</span>
              <strong>${money(item.shown)}</strong>
            </div>
            <h3>Is this price true or false?</h3>
            <div class="truth-grid">
              <button type="button" class="true" data-action="fivePriceTruth" data-value="true">True</button>
              <button type="button" class="false" data-action="fivePriceTruth" data-value="false">False</button>
            </div>
          ` : ""}
          ${current.phase === "trueFalseReveal" ? `
            ${anchorImageCard(reveal.anchor, reveal.name)}
            <div class="outcome ${reveal.correct ? "win" : "loss"}">
              <h3>${reveal.correct ? "Price-tag pick earned" : "No pick earned"}</h3>
              <p>You said ${reveal.answer ? "True" : "False"}. Price shown ${money(reveal.shown)}; actual retail price ${money(reveal.actual)}.</p>
            </div>
            <button class="primary continue-button" type="button" data-action="continueFivePriceTags">${current.currentIndex === current.items.length - 1 ? current.earnedPicks ? "Choose Car Price Tags" : "See Game Result" : "Next Small Prize"}</button>
          ` : ""}
          ${current.phase === "tags" ? `
            <div class="round-progress">Choose one price tag</div>
            <h3>Which is the actual retail price of the ${escapeHtml(current.prize)}?</h3>
            <div class="price-tag-grid">
              ${current.tags.map((tag) => `<button type="button" data-action="fivePriceTag" data-value="${tag}" ${current.selectedTags.includes(tag) ? "disabled" : ""}>${current.selectedTags.includes(tag) ? "Not it" : money(tag)}</button>`).join("")}
            </div>
          ` : ""}
          ${current.phase === "tagReveal" ? `
            <div class="outcome ${current.lastTag.correct ? "win" : "loss"}">
              <h3>${current.lastTag.correct ? "That is the car price" : "That tag is not the car price"}</h3>
              <p>You selected ${money(current.lastTag.selected)}.${current.lastTag.correct ? ` Actual retail price ${money(current.actual)}.` : ` ${current.picksRemaining} pick${current.picksRemaining === 1 ? "" : "s"} remain.`}</p>
            </div>
            <button class="primary continue-button" type="button" data-action="continueFivePriceTags">${current.lastTag.correct || current.picksRemaining === 0 ? "See Game Result" : "Choose Another Tag"}</button>
          ` : ""}`
        )}
      `;
      return;
    }

    if (current.plinko) {
      const item = current.items[current.currentIndex];
      const priced = Object.keys(current.answers).length;
      const priceReveal = current.phase === "priceReveal" ? current.lastReveal : null;
      const dropping = current.phase === "dropping" || current.phase === "dropReveal";
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Plinko</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.plinko)}${anchorImageCard(dropping ? "bundle" : detectVisualCategory(item.name, "small prize"), dropping ? "Plinko board" : item.name)}`,
          `<h2>Plinko</h2>
          <p class="muted">Price four small items one at a time to earn chips, then choose where to drop every chip.</p>
          <div class="strategy-board">
            <span class="label">Chips</span>
            <p>${current.chips} earned. ${priced}/${current.items.length} small items priced.${dropping ? ` ${current.chipsRemaining} chip${current.chipsRemaining === 1 ? "" : "s"} left to drop. Winnings ${money(current.winnings)}.` : ""}</p>
          </div>
          ${current.phase === "pricing" ? `
            <div class="round-progress">Small item ${current.currentIndex + 1} of ${current.items.length}</div>
            <h3>${escapeHtml(item.name)}</h3>
            <div class="mini-price-grid">
              ${item.choices.map((price) => `<button type="button" data-action="plinkoPrice" data-index="${current.currentIndex}" data-value="${price}">${money(price)}</button>`).join("")}
            </div>
          ` : ""}
          ${priceReveal ? `
            <div class="outcome ${priceReveal.correct ? "win" : "loss"}">
              <h3>${priceReveal.correct ? "Chip earned" : "No chip"}</h3>
              <p>You chose ${money(priceReveal.selected)}. Actual retail price ${money(priceReveal.actual)}.</p>
            </div>
            <button class="primary continue-button" type="button" data-action="continuePlinko">${current.currentIndex === current.items.length - 1 ? "Go to Plinko Board" : "Next Small Item"}</button>
          ` : ""}
          ${current.phase === "dropping" ? `
            <h3>Choose a drop slot for chip ${current.dropHistory.length + 1}</h3>
            <div class="plinko-slots">
              ${Array.from({ length: 9 }, (_, index) => `<button type="button" data-action="plinkoDrop" data-value="${index}">${index + 1}</button>`).join("")}
            </div>
            <div class="plinko-values" aria-label="Plinko cash slots">${[100, 500, 1000, 0, 10000, 0, 1000, 500, 100].map((amount) => `<span>${money(amount)}</span>`).join("")}</div>
          ` : ""}
          ${current.phase === "dropReveal" ? `
            <div class="outcome ${current.lastDrop.amount > 0 ? "win" : "loss"}">
              <h3>Chip landed in ${money(current.lastDrop.amount)}</h3>
              <p>Dropped from slot ${current.lastDrop.start + 1}; landed in cash slot ${current.lastDrop.landing + 1}. Running total ${money(current.winnings)}.</p>
            </div>
            <button class="primary continue-button" type="button" data-action="continuePlinko">${current.chipsRemaining > 0 ? "Drop Next Chip" : "See Game Result"}</button>
          ` : ""}`
        )}
      `;
      return;
    }

    if (current.rich) {
      const visual = officialGameVisuals[current.gameType] || officialGameVisuals.flipFlop;
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">${escapeHtml(current.title)}</span></div>
        ${pricingLayout(
          `${visualCard("prize", visual)}${anchorImageCard(detectVisualCategory(current.prize, current.gameType), current.prize)}`,
          `<h2>${escapeHtml(current.title)}</h2>
          <p class="muted">${escapeHtml(current.prompt)}</p>
          <div class="rich-board" aria-label="${escapeAttr(current.title)} board">
            ${current.board.map((tile) => `
              <div class="rich-tile">
                <span>${escapeHtml(tile.label)}</span>
                <strong>${escapeHtml(tile.value)}</strong>
                <small>${escapeHtml(tile.sub || "")}</small>
              </div>
            `).join("")}
          </div>
          <div class="choice-grid">
            ${current.choices.map((option, index) => `<button type="button" data-action="prizeChoice" data-value="${index}">${escapeHtml(option)}</button>`).join("")}
          </div>`
        )}
      `;
      return;
    }

    if (current.documented) {
      const visual = officialGameVisuals[current.gameType] || officialGameVisuals.flipFlop;
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">${escapeHtml(current.title)}</span></div>
        ${pricingLayout(
          `${visualCard("prize", visual)}${anchorImageCard(detectVisualCategory(current.prize, current.gameType), current.prize)}`,
          `<h2>${escapeHtml(current.title)}</h2>
          <p class="muted">${escapeHtml(current.prompt || current.activity)}</p>
          <div class="strategy-board">
            <span class="label">Visible board</span>
            <p>${escapeHtml(current.visible)}</p>
          </div>
          <div class="choice-grid">
            ${current.choices.map((option, index) => `<button type="button" data-action="prizeChoice" data-value="${index}">${escapeHtml(option)}</button>`).join("")}
          </div>`
        )}
      `;
      return;
    }

    if (current.gameType === "flipFlop") {
      const shown = current.shown;
      const first = shown.slice(0, 2);
      const second = shown.slice(2);
      const options = [
        { label: `Leave ${money(Number(shown))}`, value: Number(shown) },
        { label: `Flip ${money(Number(first.split("").reverse().join("") + second))}`, value: Number(first.split("").reverse().join("") + second) },
        { label: `Flop ${money(Number(first + second.split("").reverse().join("")))}`, value: Number(first + second.split("").reverse().join("")) },
        { label: `Flip and flop ${money(Number(first.split("").reverse().join("") + second.split("").reverse().join("")))}`, value: Number(first.split("").reverse().join("") + second.split("").reverse().join("")) }
      ];
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Flip Flop</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.flipFlop)}${anchorImageCard(detectVisualCategory(current.prize, current.gameType), current.prize)}`,
          `<h2>${current.prize}</h2>
          <p>Board price shown: <strong>${money(Number(shown))}</strong></p>
          <div class="choice-grid">
            ${options.map((option) => `<button type="button" data-action="prizeChoice" data-value="${option.value}">${option.label}</button>`).join("")}
          </div>`
        )}
      `;
      return;
    }

    if (current.gameType === "mostExpensive") {
      els.play.innerHTML = `
        <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">Most Expensive</span></div>
        ${pricingLayout(
          `${visualCard("prize", officialGameVisuals.mostExpensive)}${anchorImageCard(detectVisualCategory(current.prizes.map((prize) => prize.name).join("; "), current.gameType), current.prizes.map((prize) => prize.name).join("; "))}`,
          `<h2>Which prize has the highest actual retail price?</h2>
          <div class="choice-grid">
            ${current.prizes.map((prize, index) => `<button type="button" data-action="prizeChoice" data-value="${index}">${prize.name}</button>`).join("")}
          </div>`
        )}
      `;
      return;
    }

    const retry = !current.firstTry;
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Prize round</span><span class="pill">One Away</span></div>
      ${pricingLayout(
        `${visualCard("prize", officialGameVisuals.oneAway)}${anchorImageCard(detectVisualCategory(current.prize, current.gameType), current.prize)}`,
        `<h2>${current.prize}</h2>
        <p>Wrong price shown: <strong>${money(Number(current.shown))}</strong></p>
        ${retry ? `<p class="outcome">Sound board: ${current.horns} digits right. One change left from ${current.lastGuess}.</p>` : `<p>Each digit is one away from the correct digit.</p>`}
        <div class="form-line">
          <label>
            <span class="label">Your price</span>
            <input id="oneAwayInput" type="number" inputmode="numeric" min="10000" max="99999" step="1" autofocus>
          </label>
          <button class="primary" type="button" data-action="oneAway">Submit Price</button>
        </div>`
      )}
    `;
  }

  function renderWheel(current) {
    const leader = Math.max(0, ...current.earlier);
    const canChoose = leader <= current.firstSpin;
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Big Wheel</span><span class="pill">${ordinal(current.order)} spinner</span></div>
      ${wheelPracticeVisualCard(current)}
      <h2>Your first spin: ${formatCents(current.firstSpin)}</h2>
      <p>Earlier live scores: ${current.earlier.length ? current.earlier.map(formatCents).join(", ") : "none"}.</p>
      <p>Later contestants remaining: ${current.later}</p>
      ${canChoose ? `
        <p class="outcome">You are not behind an earlier live score. This is a real choice.</p>
        <div class="choice-grid">
          <button type="button" data-action="wheel" data-value="stay">Stay</button>
          <button type="button" data-action="wheel" data-value="spin">Spin Again</button>
        </div>
      ` : ""}
    `;
  }

  function renderWheelResult(current) {
    const buttonText = game && game.practice ? "Practice Again" : current.won ? "Continue to Showcase" : "Save Result";
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Big Wheel result</span></div>
      ${current.wheelState ? wheelPracticeVisualCard(current.wheelState) : ""}
      <div class="outcome ${current.won ? "win" : "loss"}">
        <h2>${current.won ? "You advanced" : "Big Wheel elimination"}</h2>
        <p>${escapeHtml(current.detail)}</p>
      </div>
      <button class="primary continue-button" type="button" data-action="finishWheelLoss">${buttonText}</button>
    `;
  }

  function renderPrizeResult(current) {
    const isPractice = game && game.practice;
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Prize round result</span></div>
      ${anchorImageCard(detectVisualCategory(current.imageDescription, "prize-result"), current.imageDescription)}
      <div class="outcome ${current.won ? "win" : "loss"}">
        <h2>${current.won ? "Pricing game win" : "Pricing game loss"}</h2>
        <p>${escapeHtml(current.detail)}</p>
      </div>
      <button class="primary continue-button" type="button" data-action="${isPractice ? "repeatPracticeGame" : "continueWheel"}">${isPractice ? "Practice Again" : "Continue to Big Wheel"}</button>
    `;
  }

  function renderShowcase(current) {
    const opponentPrizes = current.opponentPrizes || ["Opponent showcase details were not stored for this older scenario."];
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Final Showcase</span></div>
      ${visualCard("showcase")}
      ${anchorImageCard("showcase", current.prizes.join("; "))}
      <div class="showcase-compare">
        <section class="showcase-side you">
          <h2>Your showcase</h2>
          <ul class="prompt-list">
            ${current.prizes.map((prize) => `<li>${prize}</li>`).join("")}
          </ul>
        </section>
        <section class="showcase-side opponent">
          <h2>Opponent showcase</h2>
          <p class="opponent-bid">Opponent bid: <strong>${money(current.opponentBid)}</strong></p>
          <ul class="prompt-list">
            ${opponentPrizes.map((prize) => `<li>${prize}</li>`).join("")}
          </ul>
        </section>
      </div>
      <div class="form-line">
        <label>
          <span class="label">Your showcase bid</span>
          <input id="showcaseBid" type="number" inputmode="numeric" min="1" step="1" autofocus>
        </label>
        <button class="primary" type="button" data-action="showcaseBid">Submit Bid</button>
      </div>
    `;
  }

  function renderShowcaseResult(current) {
    const isPractice = game && game.practice;
    els.play.innerHTML = `
      <div class="stage-meta"><span class="pill">Showcase result</span></div>
      ${anchorImageCard("showcase", current.prizes.join("; "))}
      ${current.opponentPrizes ? `
        <div class="showcase-compare compact">
          <section class="showcase-side you">
            <h2>Your showcase</h2>
            <ul class="prompt-list">
              ${current.prizes.map((prize) => `<li>${prize}</li>`).join("")}
            </ul>
          </section>
          <section class="showcase-side opponent">
            <h2>Opponent showcase</h2>
            <ul class="prompt-list">
              ${current.opponentPrizes.map((prize) => `<li>${prize}</li>`).join("")}
            </ul>
          </section>
        </div>
      ` : ""}
      <div class="outcome ${current.won ? "win" : "loss"}">
        <h2>${current.won ? "Congratulations, showcase winner" : "Showcase loss"}</h2>
        <p>${escapeHtml(current.detail)}</p>
        ${current.won ? `<p class="compact-note">Drew's reminder: "Help control the pet population. Have your pets spayed or neutered."</p>` : ""}
      </div>
      <button class="primary continue-button" type="button" data-action="${isPractice ? "repeatShowcase" : "finishShowcaseResult"}">${isPractice ? "Practice Again" : "Save Result"}</button>
    `;
  }

  function renderReport() {
    const values = session.games.map((entry) => entry.accumulatedValue);
    const completed = session.games.length;
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 0;
    const avg = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    const showcaseWins = session.games.filter((entry) => entry.gates.showcase === "passed").length;
    els.report.innerHTML = `
      <h2>Session Report</h2>
      <div class="report-grid">
        <div class="metric"><span class="label">Games</span><strong>${completed}</strong></div>
        <div class="metric"><span class="label">Showcase wins</span><strong>${showcaseWins}</strong></div>
        <div class="metric"><span class="label">Min win size</span><strong>${money(min)}</strong></div>
        <div class="metric"><span class="label">Max win size</span><strong>${money(max)}</strong></div>
        <div class="metric"><span class="label">Average</span><strong>${money(avg)}</strong></div>
        <div class="metric"><span class="label">Active game</span><strong>${game ? "Yes" : "No"}</strong></div>
      </div>
    `;
  }

  function renderHistory() {
    if (!session.games.length) {
      els.history.innerHTML = "<h2>History</h2><p class=\"muted\">Completed games will appear here.</p>";
      return;
    }
    els.history.innerHTML = `
      <h2>History</h2>
      <div class="history-list">
        ${session.games.map((entry, index) => `
          <article class="history-row">
            <div>
              <strong>Game ${session.games.length - index}</strong>
              <div class="muted">${money(entry.accumulatedValue)} won, score ${entry.score}</div>
              <div class="mini-gates">
                ${gates.map((gate) => `<span class="mini-gate ${gateClass(entry.gates[gate.key])}" title="${gate.full}">${gate.label.slice(0, 2).toUpperCase()}</span>`).join("")}
              </div>
            </div>
            <button class="text-button" type="button" data-action="details" data-value="${index}">Review</button>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderDetails(index) {
    const entry = session.games[index];
    if (!entry) return;
    els.history.classList.remove("hidden");
    els.history.innerHTML = `
      <h2>Game Review</h2>
      <p class="muted">${money(entry.accumulatedValue)} won, score ${entry.score}</p>
      <div class="event-list">
        ${entry.events.map((event) => `
          <div class="event-row">
            <span><strong>${event.title}</strong><br><span class="muted">${event.detail}</span></span>
            <span class="mini-gate ${gateClass(event.result)}">${event.result === "passed" ? "OK" : event.result === "failed" ? "NO" : "RE"}</span>
          </div>
        `).join("")}
      </div>
      <button class="text-button" type="button" data-action="backHistory">Back to History</button>
    `;
  }

  function hydratePracticeGameSelect() {
    els.practiceGameSelect.innerHTML = `
      <option value="">Practice Game</option>
      ${pricingPracticeGames.map((practiceGame) => `<option value="${practiceGame.key}">${practiceGame.label}</option>`).join("")}
    `;
  }

  function setupPullToRefresh() {
    if (!els.pullRefresh || !("ontouchstart" in window)) return;
    const threshold = 82;
    let startY = 0;
    let pulling = false;
    let distance = 0;

    const reset = () => {
      pulling = false;
      distance = 0;
      els.pullRefresh.classList.remove("visible", "ready");
      els.pullRefresh.style.transform = "translate(-50%, -64px)";
      els.pullRefresh.textContent = "Pull to refresh";
    };

    document.addEventListener("touchstart", (event) => {
      if (window.scrollY > 0 || event.touches.length !== 1) return;
      startY = event.touches[0].clientY;
      pulling = true;
      distance = 0;
    }, { passive: true });

    document.addEventListener("touchmove", (event) => {
      if (!pulling || window.scrollY > 0 || event.touches.length !== 1) return;
      distance = Math.max(0, event.touches[0].clientY - startY);
      if (distance < 12) return;
      const offset = Math.min(distance * 0.45, 78);
      els.pullRefresh.classList.add("visible");
      els.pullRefresh.classList.toggle("ready", distance >= threshold);
      els.pullRefresh.textContent = distance >= threshold ? "Release to refresh" : "Pull to refresh";
      els.pullRefresh.style.transform = `translate(-50%, ${offset - 64}px)`;
    }, { passive: true });

    document.addEventListener("touchend", () => {
      if (!pulling) return;
      if (distance >= threshold && window.scrollY === 0) {
        els.pullRefresh.textContent = "Refreshing";
        els.pullRefresh.classList.add("visible", "ready");
        window.location.reload();
        return;
      }
      reset();
    }, { passive: true });

    document.addEventListener("touchcancel", reset, { passive: true });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "new") newGame();
    if (action === "rowBid") submitRowBid();
    if (action === "continueRow") continueAfterRowResult();
    if (action === "prizeChoice") submitPrizeChoice(target.dataset.value);
    if (action === "anyNumberDigit") submitAnyNumberDigit(target.dataset.value);
    if (action === "cliffPriceInput") submitCliffHangersPrice(document.getElementById("cliffPriceInput").value);
    if (action === "continueCliff") continueCliffHangers();
    if (action === "fivePriceTruth") submitFivePriceTagsTrueFalse(target.dataset.value);
    if (action === "continueFivePriceTags") continueFivePriceTags();
    if (action === "fivePriceTag") selectFivePriceTag(target.dataset.value);
    if (action === "plinkoPrice") submitPlinkoChoice(Number(target.dataset.index), target.dataset.value);
    if (action === "continuePlinko") continuePlinko();
    if (action === "plinkoDrop") dropPlinkoChip(target.dataset.value);
    if (action === "oneAway") submitPrizeChoice(document.getElementById("oneAwayInput").value);
    if (action === "continueWheel") startWheel();
    if (action === "finishWheelLoss") finishPendingWheelLoss();
    if (action === "repeatPracticeGame") startStandalonePricingGame(game && game.practiceGameType);
    if (action === "repeatShowcase") startStandaloneShowcase();
    if (action === "finishShowcaseResult") {
      finishGame();
      render();
    }
    if (action === "wheel") wheelDecision(target.dataset.value);
    if (action === "showcaseBid") submitShowcaseBid();
    if (action === "details") renderDetails(Number(target.dataset.value));
    if (action === "backHistory") renderHistory();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (document.getElementById("bidInput")) submitRowBid();
    if (document.getElementById("cliffPriceInput")) submitCliffHangersPrice(document.getElementById("cliffPriceInput").value);
    if (document.getElementById("oneAwayInput")) submitPrizeChoice(document.getElementById("oneAwayInput").value);
    if (document.getElementById("showcaseBid")) submitShowcaseBid();
  });

  els.newGame.addEventListener("click", newGame);
  els.practiceRow.addEventListener("click", startStandaloneRow);
  els.practiceWheel.addEventListener("click", startStandaloneWheel);
  els.practiceShowcase.addEventListener("click", startStandaloneShowcase);
  els.practiceGameSelect.addEventListener("change", (event) => startStandalonePricingGame(event.target.value));
  els.historyToggle.addEventListener("click", () => els.history.classList.toggle("hidden"));
  els.clearSession.addEventListener("click", () => {
    if (!window.confirm("Clear this browser session history?")) return;
    session = { games: [], activeGame: null };
    game = null;
    localStorage.removeItem(STORAGE_KEY);
    render();
  });

  hydratePracticeGameSelect();
  setupPullToRefresh();
  render();
}());
