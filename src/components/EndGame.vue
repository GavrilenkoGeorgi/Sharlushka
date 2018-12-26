<template>
  <v-container fill-height id="endGame">
    <v-layout align-space-around column>
      <v-spacer></v-spacer>
<!-- Close icon -->
      <closeBtn></closeBtn>
<!-- Message -->
      <v-flex d-flex class="user-name text-xs-center">
        <h1>{{ message }}<br />
          <span>{{ userName }}{{ exclamation }}</span>
        </h1>
      </v-flex>
      <v-flex class="message-school text-xs-center"
        v-if="!this.getCurrentGameState.schoolCompleted">
        <h3>{{ graduationMessage }}</h3>
        <h2>{{ schoolScoreMessage }} {{ getTotalScore }}</h2>
      </v-flex>
      <v-flex class="message-game text-xs-center"
        v-if="this.getCurrentGameState.schoolCompleted">
        <h2>{{ messageText }} {{ getTotalScore }}</h2>
      </v-flex>
<!-- Button -->
      <v-layout row align-center justify-space-around>
        <v-flex xs5 d-flex class="text-xs-center">
          <v-btn ripple
            large color="orange"
            @click="restartGame">
            <v-icon medium color="white">replay</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs5 d-flex class="text-xs-center">
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
      highestScore: '',
      hiscoreGreeting: 'Your highest score is',
      exclamation: '!', // some over-engeneering
      lastScores: '',
      schoolScores: ''
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
        console.log()
      } else {
        this.userName = this.getDefaultUserName
      }

      if (this.getCurrentGameState.gameInProgress) {
        this.lastScores = localStorage.getItem('lastScoresArray')
        this.schoolScores = localStorage.getItem('schoolScores')
        if (!this.lastScores) { // remove this
          console.log(`No local storage score array yet, creating one`)
          // let lastTwelveScores = [333, 125, 256, 368, -12, 234, 623, 546, 345, 324, 34, 342]
          // this.lastScores = [this.getTotalScore]
          this.lastScores = []
          localStorage.setItem('lastScoresArray', this.lastScores)
          // localStorage.setItem('schoolScores', this.getSchoolScore)
          this.addScoreToDatabase()
        } else {
          // console.log(`local storage score array exists`)
          this.addScoreToDatabase()
        }
        // set to default state
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
    addScoreToDatabase () {
      console.log(`Adding score`)
      if (typeof this.lastScores === 'string') {
        this.lastScores = this.lastScores.split(',')
      }
      if (typeof this.schoolScores === 'string') {
        this.schoolScores = this.schoolScores.split(',')
      } else {
        this.schoolScores = [this.getSchoolScore]
      }
      /*
      if (this.lastScoresArray.length <= 11) {
        this.lastScoresArray.push(this.getTotalScore)
      } else if (this.lastScoresArray.length >= 12) {
        // console.log(`Slicing`)
        this.lastScoresArray = this.lastScoresArray.slice(1)
        this.lastScoresArray.push(this.getTotalScore)
      }
      */
      // check if school is completed
      this.lastScores.push(this.getTotalScore)
      this.schoolScores.push(this.getSchoolScore)
      // ! add check if game is completed
      localStorage.setItem('lastScoresArray', this.lastScores)
      localStorage.setItem('schoolScores', this.schoolScores)
      // if user is Anonymous there is no database,
      // only localStorage, so
      if (this.getUserData.isAuthenticated) {
        this.syncScoreInFirebase()
      } else {
        console.log(`Anonymous! To save results please register.`)
      }
    },
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
              // store.state.commit('setUser', payload)
              // console.log(doc.data().name)
              // userName = doc.data().name
              docToUpdateId = doc.id
            }
            // store.state.user.name = doc.data().email // make it a mutation
            // store.state.user.isAuthenticated = true
            // store.state.user.uid = currentUser.uid
            // console.log(`This user name is ${payload.name}`)
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
          // return true
          console.log('...updating user stats')
          return updateDocRef // ?
          // this.userName = userName
          // this.$store.commit('setUserName', userName)
          // console.log(`Setting user name ${userName}`)
          // console.log(`Updating scores array in fb ${updateDocRef}`)
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

.user-name, .message-school, .message-game {
  font-family: $text-font;
}
.user-name {
  span {
    color: $color-chosen;
  }
}
.message-school {
  line-height: 1.5;
}
</style>
