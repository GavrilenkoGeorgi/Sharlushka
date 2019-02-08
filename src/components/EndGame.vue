<template>
  <v-container id="endGame">
<!-- Close button -->
    <closeBtn></closeBtn>
    <v-layout align-center justify-center row fill-height wrap>
<!-- Messages -->
      <v-flex xs12 class="user-name-game-end text-xs-center">
        <h1 >{{ message }}<br />
          <span>{{ userName }}{{ exclamation }}</span>
        </h1>
      </v-flex>
<!-- School message -->
      <v-flex xs12 class="message-school text-xs-center"
        v-if="!this.getCurrentGameState.schoolCompleted">
        <h3>{{ graduationMessage }}</h3>
        <h2>{{ schoolScoreMessage }} {{ getTotalScore }}</h2>
      </v-flex>
<!-- Game message -->
      <v-flex xs12 class="message-game text-xs-center"
        v-if="this.getCurrentGameState.schoolCompleted">
        <h2>{{ messageText }} {{ getTotalScore }}</h2>
      </v-flex>
<!-- Buttons -->
      <v-layout row align-center justify-space-around>
        <v-flex d-flex xs5 lg2 class="text-xs-center">
          <v-btn ripple
            large color="orange"
            @click="restartGame">
            <v-icon medium color="white">replay</v-icon>
          </v-btn>
        </v-flex>
        <v-flex d-flex xs5 lg2 class="text-xs-center">
          <v-btn ripple
            large color="purple darken-1"
            :to="'/settings'">
            <v-icon medium color="white">trending_up</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'
import closeBtn from '../components/CloseBtn'
import db from './firebaseInit'

export default {
  data () {
    return {
      message: 'Game over,',
      messageText: 'Your score is',
      graduationMessage: 'You can\'t even finish the school.',
      schoolScoreMessage: 'Your score is',
      userName: '',
      highestScore: null,
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      lastScores: [],
      schoolScores: []
    }
  },
  components: {
    closeBtn
  },
  computed: {
    ...mapGetters([
      'getTotalScore',
      'getSchoolScore',
      'getCurrentGameState',
      'getDefaultUserName',
      'getUserData'
    ])
  },
  mounted () {
    this.$nextTick(function () {
      console.log(`Game over`)
      // check user status
      if (this.getUserData.isAuthenticated) {
        this.userName = this.getUserData.name
      } else {
        this.userName = this.getDefaultUserName
      }
      if (this.getCurrentGameState.gameInProgress) {
        // collect them when mounted and game finished
        if (localStorage.getItem('highestScore') === null) { // check if localStorage set
          console.log(`No local storage score array yet exist, creating one`)
          this.lastScores = [] // initial values
          this.schoolScores = []
          this.highestScore = this.getTotalScore // first run
          localStorage.setItem('lastScoresArray', this.lastScores)
          localStorage.setItem('schoolScores', this.schoolScores)
          localStorage.setItem('highestScore', this.getTotalScore)
          // and
          this.addScoreToDatabase()
        } else {
          this.lastScores = localStorage.getItem('lastScoresArray')
          this.schoolScores = localStorage.getItem('schoolScores')
          this.highestScore = localStorage.getItem('highestScore')
          // just add it already
          this.addScoreToDatabase()
        }
        // set to default state so repeating visits
        // to this page won't fill our array with zeroes
        store.state.gameInProgress = false // mutation?
      } else {
        console.log(`Nothing to record, play the game.`)
      }
    })
  },
  methods: {
    restartGame () {
      console.log(`Restarting game`)
      store.commit('resetState')
      this.$router.push('/game')
    },
    // add anonymous score to local storage
    addScoreToDatabase () {
      console.log(`Adding score`)
      // one function?
      if (this.lastScores === '') {
        this.lastScores = [] // first run
      } else {
        this.lastScores = this.lastScores.split(',')
      }
      if (this.schoolScores === '') {
        this.schoolScores = []
      } else {
        this.schoolScores = this.schoolScores.split(',')
      }
      // check for new highest score
      if (this.getTotalScore > this.highestScore) {
        this.highestScore = this.getTotalScore
        localStorage.setItem('highestScore', this.getTotalScore)
      } else {
        console.log(`Your score is not so high: ${this.getTotalScore}`)
      }

      if (this.getCurrentGameState.schoolCompleted) {
        // record game result if school completed
        this.lastScores.push(this.getTotalScore)
        localStorage.setItem('lastScoresArray', this.lastScores)
        // and school result for stats
        this.schoolScores.push(this.getSchoolScore)
        localStorage.setItem('schoolScores', this.schoolScores)
      } else {
        // game ended in school,
        // so we have only school result to save
        this.schoolScores.push(this.getSchoolScore)
        localStorage.setItem('schoolScores', this.schoolScores)
      }
      // finally if user is registered
      if (this.getUserData.isAuthenticated) {
        this.syncScoreInFirebase()
      } else {
        console.log(`Anonymous! To save results please register.`)
      }
    },
    // if user exists add score to the account
    syncScoreInFirebase () {
      console.log(`Syncing score for uid ${this.getUserData.uid}`)
      let uid = this.getUserData.uid
      db.collection('users').where('uid', '==', uid)
        .get()
        .then(function (querySnapshot) {
          let docToUpdateId
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().uid === uid) {
              docToUpdateId = doc.id
            }
          })
          return docToUpdateId
        })
        .then((docToUpdateId) => {
          var docRef = db.collection('users').doc(docToUpdateId)
          let resultsArrayToUpdate = localStorage.getItem('lastScoresArray')
          // you really should check if it is actually higher
          let highestScoreToUpdate = localStorage.getItem('highestScore')
          let schoolScoresToUpdate = localStorage.getItem('schoolScores')
          var updateDocRef = docRef.update({
            resultsArray: resultsArrayToUpdate,
            schoolResultsArray: schoolScoresToUpdate,
            hiScore: highestScoreToUpdate
          })
          console.log('...updating user stats')
          return updateDocRef // ? true
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";

#endGame {
  height: 100%;
}
.user-name-game-end, .message-school, .message-game {
  font-family: $text-font;
}
.user-name-game-end {
  span {
    color: $color-chosen;
  }
}
.message-school {
  line-height: 1.5;
}

</style>
