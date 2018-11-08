<template>
  <v-container fluid id="prices">
    <v-layout d-flex justify-center fill-height>
      <v-flex xs12 sm10 md8 lg7>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(serviceItem, index) in getPrices.serviceItems" :key="index">
            <div slot="header" class="price-header">{{ serviceItem.header }}</div>
            <v-card v-for="(priceItem, index) in serviceItem.services" :key="index">
              <v-card-text class="price-descr pa-2 pl-3"><span class="hover">{{ priceItem.serviceDescr }}</span>
              <v-spacer />
              <span class="price-value">{{ priceItem.price }}</span>
              <div class="price-icon-container">
                <svg>
                  <use xlink:href="#icon-uah"></use>
                </svg>
              </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    <v-container>
<!-- icon defs -->
      <svg class="svg-icon-defs-only" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
        <symbol id="icon-uah" class="dice-container" viewBox="0 0 196 312">
          <path d="M 76.62382,290.36239 C 65.998114,288.08376 57.436655,284.47496 48.413902,278.47143 C 28.947769,265.51911 19.183494,248.50916 17.432518,224.5 C 16.549379,212.3905 18.840458,201.74369 25.663508,186.25 C 26.078551,185.30752 24.219497,185 18.106989,185 L 10,185 L 10,177 L 10,169 L 24.291792,169 L 38.583584,169 L 43.041792,164.42572 C 45.493806,161.90987 51.725967,156.62237 56.891038,152.67572 L 66.282076,145.5 L 38.141038,145.23443 L 10,144.96885 L 10,137.48443 L 10,130 L 50.483714,130 L 90.967429,130 L 102.23371,122.39763 C 124.75753,107.19879 133.43381,98.431567 138.03134,86.224766 C 140.88303,78.653306 140.50991,63.992083 137.28312,56.82433 C 127.91376,36.011933 97.932811,29.71459 74.26142,43.586949 C 58.890526,52.594893 43.067011,74.791166 36.967231,95.90099 L 34.626984,104 L 30.313492,104 C 26.882242,104 25.994539,103.64207 25.973301,102.25 C 25.958617,101.2875 27.626308,82.3875 29.679281,60.25 L 33.411958,20 L 37.455979,20.04099 C 41.284815,20.079799 41.617493,20.333062 43.708076,24.800617 C 46.583263,30.944866 50.601301,33.412104 56.193671,32.467279 C 58.454779,32.085268 65.748701,29.993937 72.402388,27.819878 C 79.056074,25.645819 88.1,23.000111 92.5,21.940528 C 127.81314,13.436613 162.56342,34.207203 170.56449,68.600449 C 172.6415,77.528655 172.6063,94.522675 170.49427,102.5 C 168.61319,109.60501 165.01448,117.73807 160.94223,124.08755 C 159.324,126.6107 158,128.9732 158,129.33755 C 158,129.7019 161.375,130 165.5,130 L 173,130 L 173,137.5 L 173,145 L 157.38994,145 L 141.77987,145 L 124.23141,156.75 L 106.68294,168.5 L 139.84147,168.76348 L 173,169.02696 L 173,177.01348 L 173,185 L 127.25,184.99943 L 81.5,184.99887 L 72.987111,193.74943 C 59.617362,207.49246 54.220095,220.48227 55.271469,236.38635 C 56.096668,248.86909 58.900957,255.0004 67.945952,264.0979 C 77.201766,273.40745 83.092418,276.05114 96.168834,276.76418 C 128.1208,278.50647 157.62226,254.49103 172.04222,215 L 174.78081,207.5 L 178.8904,207.1925 C 181.64079,206.98671 183,207.29149 183,208.11402 C 183,209.90711 173.01328,287.08057 172.42857,289.80588 C 171.99422,291.83037 171.42635,292.07444 167.77515,291.80588 C 163.94058,291.52384 163.54991,291.22721 162.76273,288 C 161.52521,282.9265 157.82249,280 152.64084,280 C 150.30464,280 140.40948,282.23094 130.6516,284.95764 C 120.89373,287.68434 110.37261,290.38434 107.27135,290.95764 C 99.441365,292.40509 84.82558,292.12121 76.62382,290.36239 z "/>
        </symbol>
      </svg>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import IconSvg from './IconSvg.vue'
import Debug from './Debug'

export default {
  name: 'Prices',
  props: {
    msg: 'Prices here.'
  },
  components: {
    Debug,
    IconSvg
  },
  computed: {
    ...mapGetters([
      'getPrices'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/colours.scss";

.price-header {
  color: $alt-color-primary-darker;
  font-size: 1.6em;
  font-weight: 700;
  transition: color 500ms;
}
.price-header:hover {
  color: $color-link-hover;
  text-decoration: underline;
}
.price-descr {
  display: flex;
  font-size: 1.5em;
  color: $alt-color-primary-darker;
  transition: background-color 600ms;
}
.price-descr:hover {
  background-color: $alt-color-primary-light;
}
.price-value {
  color: $alt-color-primary-darkest;
  font-weight: 500;
  // border: 1px solid red;
}

// nokia iphone
@media screen and (-webkit-min-device-pixel-ratio: 1.88) and (max-width: 415px) {
  #prices {
    .price-header {
      font-size: 1.1em;
      // color: blueviolet;
    }
    .price-descr {
      font-size: .8em;
      // color: blueviolet;
    }
  }
}
</style>
