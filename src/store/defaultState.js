export default function () {
  return {
    debug: false,
    defaultUserName: 'Anonymous',
    newTurn: true,
    diceRolled: true,
    schoolScoreTotal: 0, // total school score
    gameTotal: 0, // total game score
    schoolCompleted: false, // check if school is completed
    currentGameTurn: 1, // game turns counter
    maxGameTurns: 33,
    rollCount: 3, // roll counter for the current turn
    gameCheck: false, // to check if there are any combinations left to record
    // zeroCheck: false,
    turnCompleted: false,
    gameEnded: false,
    combinationArray: [],
    scoreArray: [{
      value: '', // school combinations
      final: false,
      id: 'ones',
      icon: 'diceOnes'
    },
    {
      value: '',
      final: false,
      id: 'twos',
      icon: 'diceTwos'
    },
    {
      value: '',
      final: false,
      id: 'threes',
      icon: 'diceThrees'
    },
    {
      value: '',
      final: false,
      id: 'fours',
      icon: 'diceFours'
    },
    {
      value: '',
      final: false,
      id: 'fives',
      icon: 'diceFives'
    },
    {
      value: '',
      final: false,
      id: 'sixes', // 5
      icon: 'diceSixes'
    },
    { // game combinations
      value: '',
      displayValues: [],
      final: false,
      id: 'pair', // 6
      fullName: 'Pair'
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'twoPairs', // 7
      fullName: 'Two Pairs'
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'threeOfAKind', // 8
      fullName: 'Three O.A.K'
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'full', // 9
      fullName: 'Full'
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'quads',
      fullName: 'Quads' // 10
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'poker',
      fullName: 'Poker' // 11
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'small',
      fullName: 'Small' // 12
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'large',
      fullName: 'Large' // 13
    },
    {
      value: '',
      displayValues: [],
      final: false,
      id: 'chance',
      fullName: 'Chance' // 14
    }],
    diceArray: [{ // dice Array
      value: '#',
      chosen: false,
      id: 'first',
      currentIcon: 'sixes'
    },
    {
      value: '#',
      chosen: false,
      id: 'second',
      currentIcon: 'sixes'
    },
    {
      value: '#',
      chosen: false,
      id: 'third',
      currentIcon: 'sixes'
    },
    {
      value: '#',
      chosen: false,
      id: 'fourth',
      currentIcon: 'sixes'
    },
    {
      value: '#',
      chosen: false,
      id: 'fifth',
      currentIcon: 'sixes'
    }]
  }
}
