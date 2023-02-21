<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
    <q-page>
    <keep-alive>
    <router-view />
    </keep-alive>
    </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  // components: { DrawerLeft },
  created () {
  },
  data () {
    return {
      audioTimeStamp: 0,
      swipeHandlerFooter: true,
      swipeHandlerHeader: false,
      audioplayericon: 'play_arrow',
      playing: false,
      trackLength: 250,
      trackFinished: false,
      latitude: '15°N',
      longitude: '30°S',
      altitude: '',
      name: this.$route.name
    }
  },
  methods: {
    swipeDownFooter (evt) {
      console.log(this.swipeHandlerFooter)
      if (this.swipeHandlerFooter) this.swipeHandlerFooter = !this.swipeHandlerFooter
      console.log('Down')
    },
    swipeUpFooter (evt) {
      console.log(this.swipeHandlerFooter)
      if (!this.swipeHandlerFooter) this.swipeHandlerFooter = !this.swipeHandlerFooter
      console.log('Up')
    },
    swipeDownHeader (evt) {
      console.log(this.swipeHandlerHeader)
      if (!this.swipeHandlerHeader) this.swipeHandlerHeader = !this.swipeHandlerHeader
      console.log('Down')
    },
    swipeUpHeader (evt) {
      console.log(this.swipeHandlerHeader)
      if (this.swipeHandlerHeader) this.swipeHandlerHeader = !this.swipeHandlerHeader
      console.log('Up')
    },
    pausePlay (playing) {
      console.log(playing)
      if (!playing) {
        this.audioplayericon = 'pause'
        this.playing = true
        this.timer = setInterval(() => {
          if (this.audioTimeStamp >= this.trackLength) return this.reset()
          this.audioTimeStamp++
        }, 1000)
      }
      if (playing) {
        this.audioplayericon = 'play_arrow'
        this.playing = false
        clearInterval(this.timer)
      }
    },
    reset () {
      clearInterval(this.timer)
      this.pausePlay(this.playing)
      this.audioTimeStamp = 0
    }
  }
}
</script>

<style lang="scss">

</style>
