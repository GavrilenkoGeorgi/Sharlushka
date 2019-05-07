# :game_die: Sharlushka

## PWA dice game

  This is a PWA demo, a simple game resembling [Yahtzee](https://en.wikipedia.org/wiki/Yahtzee). You can play as Anonymous or register with email to get access to the leaderboard. User stats are gathered during each game and can be viewed on user stats page. Tools used: Vue, Vuex, Firestore, Vuetify, SCSS, WebPack 4, Babel, ESLint and Chartist.js for displaying charts. User data is stored in localStorage, so the app works without internet connection, saving results as soon as it is restored. You can add it to your home screen on devices running Android, iOS and Windows.

### :wrench: Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run test:unit
```

### :book: Some game concepts

#### Tech
  User can play in Anonymous mode, in which results will be saved to localStorage, but not in the Firestore database, so if user clears cache, all results will be lost. So just don't clear it. :stuck_out_tongue: To save results -- register with email, name is optional. App uses service worker, so you can play while offline, to save final game score, wait for the connection to restore.

#### Game itself
From the 1967 Yahtzee rulebook:
> Each turn consists of a maximum of three rolls — the first roll to be made with all five dice. If the player elects to roll a second and third time, he may pick up and use any number of dice, providing a score is taken on the last roll. It is the skillful use of these two optional rolls of the dice that can turn an unlucky first or second roll into a high scoring turn.

So basically, in Sharluska you have thirty three turns, each turn consists of three rolls, or if you're lucky and got "poker" on the first roll, you can save current combination result immediately, so the remaining rolls are optional. But you have to complete all turns rolling the dice and saving results for each combination. If you're not so lucky, eventually you will have to write a zero to the empty combination, so that you can continue playing, but you should remember, more zeroes -- less score. School is different, you have to save all school results, even with minus, to complete it.

### :pencil: Known issues
- User name doesn't update immetiately after login in navigation drawer.
- If you play as a registered user, then logout and play, gathering new set of stats as Anonymous, on the next login, user "Dice values favorites" will be overwritten with the ones that you have gathered playing as Anonymous.
- If you played as Anonymous and then logged in into existing account, user dice favs are overwritten on login with current localStorage values.