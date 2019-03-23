import getters from '@/store/getters'
import defaultState from '@/store/defaultState'

test(`"progressBarState" returns 0 up to 100 percent`, () => {
  const state = {
    rollCount: 3
  }
  expect(getters.progressBarState(state)).toBeGreaterThanOrEqual(0)
  expect(getters.progressBarState(state)).toBeLessThan(100)
})

test(`"mainButtonIsRolling" returns true of false`, () => {
  const state = {
    newTurn: false,
    rollCount: 1
  }
  if (!state.newTurn && state.rollCount <=2 && state.rollCount != 0) {
    expect(getters.mainButtonIsRolling(state)).toBeTruthy()
  } else {
    expect(getters.mainButtonIsRolling(state)).toBeFalsy()
  }
})

test(`"getCurrentGameState" returns an object`, () => {
  expect(typeof getters.getCurrentGameState(defaultState)).toBe(`object`)
})

test(`game state has default values set`, () => {
  // current values
  const currentStateValues = defaultState()
  // default values
  let stateDefaults = {
    defaultUserName: `Anonymous`,
    user: {
      isAuthenticated: false,
      lastResultSaved: false // current result saved
    },
    error: false,
    currentGameTurn: 1, // game turns counter
    rollCount: 3, // roll counter for the current turn
    maxGameTurns: 33, // 6 turns for school, 27 for the game
    maxPossibleScore: 879, // from all combinations with highest values set to final
    newTurn: true, // 1st turn in game is new turn
    schoolCompleted: false, // check if school is completed
    gameOver: false,
    zeroCheck: false, // to check if zero was saving during turn
    schoolScoreTotal: 0, // total school score
    gameTotal: 0, // total game score
    debug: false, // Vue Devtools will do
    combinationArray: [],
    scoreArray: [{
      value: ``, // school combinations store module?
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
  expect(currentStateValues).toEqual(stateDefaults)
})
