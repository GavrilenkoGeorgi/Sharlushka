<template>
  <v-layout
    v-if="showModal"
    class="modal-mask"
  >
    <v-flex class="modal-wrapper">
      <v-layout
        column
        class="modal-container"
      >
        <v-flex>
          Here's you error message, punk:
          <span class="red--text">
            {{ errorMessage }}
          </span>
        </v-flex>
        <v-flex>
          <v-btn
            class="elevation-2"
            flat
            @click="showModal = !showModal"
          >
            Close
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: `Message`,
  data () {
    return {
      showModal: false,
      errorMessage: undefined
    }
  },
  computed: {
    ...mapState([
      `error`
    ])
  },
  watch: {
    error (error) {
      this.errorMessage = error
      this.showModal = !this.showModal
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`Alert mounted.`)
    })
  }
}
</script>

<style lang="sass" scoped>

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  display: table
  transition: opacity .3s ease

.modal-wrapper
  display: table-cell
  vertical-align: middle

.modal-container
  border: 1px solid red
  width: 300px
  margin: 0px auto
  padding: 1em
  background-color: #fff
  border-radius: .3em
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
  transition: all .3s ease
  font-family: Helvetica, Arial, sans-serif

.modal-header h3
  margin-top: 0
  color: #42b983

.modal-body
  margin: 20px 0

.modal-default-button
  float: right

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>
