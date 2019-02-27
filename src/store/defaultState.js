export default function() {
  return {
    user: {
      isAuthenticated: false,
      uid: null,
      name: ``,
    },
    debug: false,
    error: `No error`,
    processing: false,
    defaultUserName: `Anonymous`,
    newTurn: true,
    diceRollInProgress: false, // not needed?
    schoolScoreTotal: 0, // total school score
    gameTotal: 0, // total game score
    schoolCompleted: false, // check if school is completed
    currentGameTurn: 1, // game turns counter
    gameInProgress: false,
    maxGameTurns: 33,
    rollCount: 3, // roll counter for the current turn
    gameCheck: false, // to check if there are any combinations left to record
    // zeroCheck: false,
    turnCompleted: false,
    gameEnded: false,
    maxPossibleScore: 879,
    combinationArray: [],
    scoreArray: [{
      value: ``, // school combinations
      final: false,
      id: `ones`,
      icon: `diceOnes`,
    },
    {
      value: ``,
      final: false,
      id: `twos`,
      icon: `diceTwos`,
    },
    {
      value: ``,
      final: false,
      id: `threes`,
      icon: `diceThrees`,
    },
    {
      value: ``,
      final: false,
      id: `fours`,
      icon: `diceFours`,
    },
    {
      value: ``,
      final: false,
      id: `fives`,
      icon: `diceFives`,
    },
    {
      value: ``,
      final: false,
      id: `sixes`,
      icon: `diceSixes`, // 5
    },
    { // game combinations
      value: ``,
      displayValues: [],
      final: false,
      id: `pair`,
      fullName: `Pair`, // 6
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `twoPairs`,
      fullName: `Two Pairs`, // 7
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `threeOfAKind`,
      fullName: `Three O.A.K`, // 8
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `full`,
      fullName: `Full`, // 9
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `quads`,
      fullName: `Quads`, // 10
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `poker`,
      fullName: `Poker`, // 11
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `small`,
      fullName: `Small`, // 12
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `large`,
      fullName: `Large`, // 13
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `chance`,
      fullName: `Chance`, // 14
    }],
    diceArray: [{ // dice Array
      value: `#`,
      chosen: false,
      id: `first`,
      currentIcon: ``,
    },
    {
      value: `#`,
      chosen: false,
      id: `second`,
      currentIcon: ``,
    },
    {
      value: `#`,
      chosen: false,
      id: `third`,
      currentIcon: ``,
    },
    {
      value: `#`,
      chosen: false,
      id: `fourth`,
      currentIcon: ``,
    },
    {
      value: `#`,
      chosen: false,
      id: `fifth`,
      currentIcon: ``,
    }],
  }
}
