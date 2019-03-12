export default () => {
  return {
    user: {
      isAuthenticated: false
    },
    debug: false,
    error: `No error`, // ?
    processing: false,
    defaultUserName: `Anonymous`,
    newTurn: true,
    diceBoxHidden: true, // turn 1, no rolls, dicebox invisible till the first roll
    diceRollInProgress: false, // not needed?
    schoolScoreTotal: 0, // total school score
    gameTotal: 0, // total game score
    schoolCompleted: true, // check if school is completed
    currentGameTurn: 32, // game turns counter
    turnCompleted: false,
    gameOver: false,
    maxGameTurns: 33,
    rollCount: 3, // roll counter for the current turn
    gameCheck: false, // to check if there are any combinations left to record
    // zeroCheck: false,
    // gameEnded: false,
    maxPossibleScore: 879,
    combinationArray: [],
    scoreArray: [{
      value: ``, // school combinations
      final: false,
      id: `ones`,
      icon: `diceOnes`
    },
    {
      value: ``,
      final: false,
      id: `twos`,
      icon: `diceTwos`
    },
    {
      value: ``,
      final: false,
      id: `threes`,
      icon: `diceThrees`
    },
    {
      value: ``,
      final: false,
      id: `fours`,
      icon: `diceFours`
    },
    {
      value: ``,
      final: false,
      id: `fives`,
      icon: `diceFives`
    },
    {
      value: ``,
      final: false,
      id: `sixes`,
      icon: `diceSixes` // 5
    },
    { // game combinations
      value: ``,
      displayValues: [],
      final: false,
      id: `pair`,
      fullName: `Pair` // 6
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `twoPairs`,
      fullName: `Two Pairs` // 7
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `threeOfAKind`,
      fullName: `Three O.A.K` // 8
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `full`,
      fullName: `Full` // 9
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `quads`,
      fullName: `Quads` // 10
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `poker`,
      fullName: `Poker` // 11
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `small`,
      fullName: `Small` // 12
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `large`,
      fullName: `Large` // 13
    },
    {
      value: ``,
      displayValues: [],
      final: false,
      id: `chance`,
      fullName: `Chance` // 14
    }],
    diceArray: [{ // dice Array
      value: `#`,
      chosen: false,
      id: `first`,
      currentIcon: `diceOnes`
    },
    {
      value: `#`,
      chosen: false,
      id: `second`,
      currentIcon: `diceTwos`
    },
    {
      value: `#`,
      chosen: false,
      id: `third`,
      currentIcon: `diceThrees`
    },
    {
      value: `#`,
      chosen: false,
      id: `fourth`,
      currentIcon: `diceFours`
    },
    {
      value: `#`,
      chosen: false,
      id: `fifth`,
      currentIcon: `diceFives`
    }]
  }
}
