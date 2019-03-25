<template>
  <v-dialog
    v-model="gameOverDialog"
    width="20em"
  >
    <v-card class="dialog">
      <v-card-text class="text-xs-center default-text-color">
        <h2 class="highlighted">
          {{ userName }}!
        </h2>
        <p
          v-if="isGameEnded && schoolFinished"
          class="ma-0"
        >
          Your score is:
          <span class="highlighted">{{ getTotalScore }}.</span>
        </p>
        <p
          v-else
          class="ma-0"
        >
          You can't even finish the school, your score is
          <span class="highlighted">{{ getSchoolScore }}.</span>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-layout
          justify-center
        >
          <v-btn
            flat
            outline
            class="button"
            color="purple darken-2"
            :to="'/endgame'"
          >
            <saveIcon class="default-icon-color button-icon-margin" />
            Save
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import saveIcon from '../assets/icons/baseline-save-24px.svg'

export default {
  name: `GameOverDialog`,
  components: {
    saveIcon
  },
  data: () => ({
    userName: ``,
    dialog: false
  }),
  computed: {
    ...mapGetters([
      `isGameEnded`,
      `getSchoolScore`,
      `getTotalScore`,
      `schoolFinished`
    ]),
    gameOverDialog: {
      get () {
        return this.isGameEnded
      },
      set () {
        return false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.userName = localStorage.getItem(`userName`)
    })
  }
}
</script>
