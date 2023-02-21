<template>
    <q-page-container style="padding:0">
    <q-page >
    <router-view />
    <template v-if="!startingScreen">
    <q-header
    class='topmenu'
        v-touch-swipe.down="swipeDownHeader"
        v-touch-swipe.up="swipeUpHeader"
    >
      <transition-group
      name="component-fade"
      mode="in-out"
      >
       <q-toolbar key="animation">
        <q-expansion-item
          class="menubar"
          expand-icon="menu"
          expand-icon-toggle
          expand-icon-class="text-red"
          v-touch-swipe.up="swipeUpHeader"
          v-touch-swipe.down="swipeDownHeader"
          v-model="swipeHandlerHeader"
          :duration="700"
          align-items="center"
          default-opened
          toggle
        >
        <template v-slot:header>
          <q-item-section>
            <q-icon name="img:icons/track.svg" style="font-size:70px"></q-icon>
          </q-item-section>
        </template>
          <div class="navigation-button q-p-md q-pt-none q-mb-md">
            <q-card  v-touch-swipe.up="swipeUpHeader" v-touch-swipe.down="swipeDownHeader" flat square class="bg-primary">
              <q-card-section align="left" class="text-secondary q-pt-none">
                <q-btn flat round dense icon="home" size="xl" align="left" />
                <q-btn flat round dense icon="navigation" size="xl" v-on:click="toPosition(PoI.markers.Viktoriatempel)"/>
              </q-card-section>
            </q-card>
          </div>
        </q-expansion-item>
      </q-toolbar>
      </transition-group>
    </q-header>

    <q-dialog v-model="alert">
      <q-card>
      <q-card-section>
      <div class="text-h6">Kein GPS aktiviert</div>
      </q-card-section>
      <q-card-section>
      Für die Nutzung von TRACKS wird ein GPS-Signal benötigt.
      Bitte aktivieren Sie GPS auf Ihrem Gerät und klicken Sie dann auf "OK".
      </q-card-section>
      <q-card-actions>
      <q-btn flat label="OK" color="secondary" v-on:click="afterAlert" v-close-popup />
      </q-card-actions>
      </q-card>
    </q-dialog>
        <transition-group
      name="component-fade"
      mode="in-out"
      >
        <q-drawer
        key="animation"
        v-model="drawer"
        :width="250"
        side="right"
        :breakpoint="250"
        behavior="desktop"
        content-class="drawerLeft bg-warning"
      >
          <q-list padding>
            <q-item>
              <q-item-section>
                <q-item-label overline lines="1" class="tourname">{{tourName}}</q-item-label>
                <q-item-label caption class="region">{{regionName}}</q-item-label>
                 <q-icon v-on:click="drawer = !drawer" style="position: absolute; right: 5px; width: 10%" name="close"></q-icon>
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section>
                <q-img class="infoimg" :src="PoI.img.url">
                </q-img>
                <q-item-label class="caption" v-model="PoI.img.showCaption" lines="4">
                {{PoI.img.caption}}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label overline class="infotextheader">
                  {{PoI.name}}
                </q-item-label>
                  <q-item-label caption class="gpscords">
                  {{PoI.coordinates}}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-scroll-area class="infotext">
                  <div>
                  {{PoI.infotext}}
                  </div>
                </q-scroll-area>
              </q-item-section>
            </q-item>

            <q-separator color="dark" />

            <q-item clickable v-ripple style="padding-top:10px">
            <q-item-section avatar class="playaudio" color="secondary">
               <div color="secondary">Audiotrack abspielen</div>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="play_circle" v-on:click="chooseTrack(PoI.id)" />
              </q-item-section>
              <q-item-section avatar>
                {{PoI.duration}}
              </q-item-section>
            </q-item>
          </q-list>
      </q-drawer>
      </transition-group>

  <div style="height:76.8vh" class="trackMap">
    <l-map
      v-if="map.showMap"
      :zoom="map.zoom"
      :center="map.center"
      :options="map.mapOptions"
      style="height: 100%; position: absolute-top"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="map.url"
        :attribution="map.attribution"
      />
      <template >
      <l-polyline :lat-lngs="map.polyline.latlngs" :color="map.polyline.color" >
      </l-polyline>
       <l-marker :lat-lng="currentPosition" :icon="map.iconCurrPosition"></l-marker>
            <l-marker :lat-lng="PoI.markers.Viktoriatempel" :icon="map.iconMarker" v-on:click="openDrawer(1)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.Kocherfels" :icon="map.iconMarker" v-on:click="openDrawer(2)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.FalkensteinerHain" :icon="map.iconMarker" v-on:click="openDrawer(3)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.BurgFalkenstein" :icon="map.iconMarker" v-on:click="openDrawer(4)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.TurmburgNuerings" :icon="map.iconMarker" v-on:click="openDrawer(5)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.DettweilerTempel" :icon="map.iconMarker" v-on:click="openDrawer(6)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.BurgKoenigstein" :icon="map.iconMarker" v-on:click="openDrawer(7)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.BurgKronberg" :icon="map.iconMarker" v-on:click="openDrawer(8)"> </l-marker>
      <l-marker :lat-lng="PoI.markers.JuedischerFriedhof" :icon="map.iconMarker" v-on:click="openDrawer(9)"> </l-marker>
     </template>
     <l-control position="topright">
       <q-chip
      clickable
      size="md"
      icon="gps_fixed"
      v-on:click="toPosition(currentPosition)"
      :label="currentPositionLabel"
      >
       </q-chip>
      </l-control>
    </l-map>
  </div>
       <q-footer class='bottommenu'
        v-touch-swipe.down="swipeDownFooter"
        v-touch-swipe.up="swipeUpFooter"
           >
            <transition-group
      name="component-fade"
      mode="in-out"
      >
      <q-toolbar key="animation-bottom">
        <q-expansion-item
          class="window-width"
          expand-icon-class="absolute-center"
          expand-icon="drag_handle"
          expand-icon-toggle
          v-model="swipeHandlerFooter"
          :duration="700"
          align-items="center"
          toggle
          v-touch-swipe.up="swipeUpFooter"
          v-touch-swipe.down="swipeDownFooter"
        >

          <div class="q-p-md q-pt-none q-mb-md">
            <q-card  v-touch-swipe.up="swipeUpFooter" v-touch-swipe.down="swipeDownFooter" flat square class="bg-primary">
              <q-card-section align="center" class="text-secondary q-pt-none">
              <q-icon class="infoicon" v-on:click="openDrawer(currentTrack.PoI_id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 25.881 25.881">
                <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M13.5.563A12.94,12.94,0,1,0,26.443,13.5,12.942,12.942,0,0,0,13.5.563Zm0,5.74a2.192,2.192,0,1,1-2.192,2.192A2.192,2.192,0,0,1,13.5,6.3Zm2.922,13.253a.626.626,0,0,1-.626.626H11.207a.626.626,0,0,1-.626-.626V18.3a.626.626,0,0,1,.626-.626h.626V14.338h-.626a.626.626,0,0,1-.626-.626V12.459a.626.626,0,0,1,.626-.626h3.339a.626.626,0,0,1,.626.626v5.218H15.8a.626.626,0,0,1,.626.626Z" transform="translate(-0.563 -0.563)" fill="#869e9c"/>
              </svg>
              </q-icon>
                <q-badge
                  class="trackname"
                  color="primary"
                  >
                  {{currentTrack.PoIname}}
                </q-badge>
                <q-slider
                class="mpslider"
                :min="0"
                :max="currentTrack.audio.duration"
                :step="1"
                v-model="audioTimeStamp"
                label
                color="info">
                </q-slider>
                <q-badge class="timestamp" color="primary">
                  {{audioTimeStampFormatted}}
                </q-badge>

                <q-badge class="tracklength" color="primary">
                  {{currentTrack.maxDuration}}
                </q-badge>
                <q-btn
                outline
                round
                dense
                v-on:click="pausePlay(playing)"
                v-model="playing"
                size="lg"
                color="secondary"
                :icon="audioplayericon"
                ></q-btn>

                <q-toggle
                class="autoplaytoggle"
                v-model="autoplay"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                label="Autoplay"
                left-label
                >
                </q-toggle>
              </q-card-section>
            </q-card>
          </div>
        </q-expansion-item>
      </q-toolbar>
      </transition-group>
    </q-footer>
    </template>
    <template v-else>
        <q-icon name="img:img/trackLogoLoading.gif" class="loadingTrack absolute-center"></q-icon>
    </template >
        </q-page>
    </q-page-container>
</template>

<script>

import { LMap, LTileLayer, LMarker, LControl, LPolyline } from 'vue2-leaflet'
import L from 'leaflet'

export default {
  name: 'Testpage',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LPolyline
  },
  async created () {
    this.startingScreen = true
    setTimeout(() => {
      this.startingScreen = false
      this.loadDB()
      if (this.db.ready === undefined) {
        this.$q.loading.show()
      }
      this.loading = setInterval(() => {
        if (this.db.ready === undefined) {
          this.loadDB()
        } else {
          this.loadDB()
          clearInterval(this.loading)
          this.$q.loading.hide()
        }
      }, 3000)

      this.$nextTick(function () {
        setInterval(() => {
          this.viewCurrentPosition()
        }, 3000)
      })
    }, 3500)
  },
  watch: {
    play_PoI: function (newPlayPoI, oldPlayPoI) {
      if (this.autoplay) {
        if (this.playing || this.paused) {} else {
          this.choosePoI(this.play_PoI)
          this.chooseTrack(this.play_PoI)
        }
      }
    },
    deep: true
  },
  data () {
    return {
      paused: false,
      startingScreen: true,
      location2: this.$location.response,
      autoplay: false,
      loading: null,
      alert: false,
      drawer: false,
      splitterModel: 0,
      expanded: false,
      latitude: null,
      longitude: null,
      duration: '-',
      currentPosition: L.latLng(0, 0),
      currentPositionLabel: null,
      newAudio: null,
      play_PoI: null,
      PoI_id: null,
      db: null,
      db2: [],
      location: null,
      tracks: [],
      tracksAudio: [],
      audioTimeStamp: 0,
      audioTimeStampFormatted: null,
      swipeHandlerFooter: false,
      swipeHandlerHeader: false,
      audioplayericon: 'play_arrow',
      playing: false,
      timer: null,
      currentTrack: {
        audio: {
          duration: 0,
          currentTime: 0
        },
        duration: null,
        maxDuration: '',
        PoIname: '',
        PoI_id: null,
        currentTime: '00:00',
        showInfo: false
      },
      map: {
        width: '50%',
        zoom: 14,
        center: L.latLng(0, 0),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        currentZoom: 10,
        currentCenter: L.latLng(0, 0),
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        showMap: false,
        iconMarker: L.icon({
          iconUrl: 'icons/baseline_room_black_18dp.png',
          iconAnchor: [16, 37]
        }),
        iconCurrPosition: L.icon({
          iconUrl: 'icons/baseline_gps_fixed_black_18dp.png',
          iconAnchor: [16, 37]
        }),
        polyline: {
          latlngs: [],
          color: '#445957',
          opacity: 0.8
        }
      },
      PoI: {
        id: 1,
        duration: null,
        markers: {
        },
        img: { url: 'img/mountains.jpg' }
      },
      tourName: '',
      regionName: '',
      infotext: ''
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.map.currentZoom = zoom
      this.map.zoom = zoom
    },
    centerUpdate (center) {
      this.map.center = center
    },
    toPosition (center) {
      this.centerUpdate(center)
      this.zoomUpdate(15)
    },
    openDrawer (id) {
      if ((this.currentTrack.showInfo === false || this.currentTrack.showInfo === undefined) && id === null) {
        return
      }
      this.drawer = !this.drawer
      this.choosePoI(id)
    },
    getGPS () {
      this.$getPosition()
      this.viewCurrentPosition()
    },
    setPlayPoI (id) {
      this.play_PoI = id
    },
    afterAlert () {
      this.getGPS()
      setTimeout(() => {
        this.toPosition(this.currentPosition)
      }, 3000)
    },
    viewCurrentPosition () {
      this.location = this.$location
      if (this.location.error === 1) {
        this.alert = true
        return
      }
      if (Object.prototype.hasOwnProperty.call(this.location, 'response')) {
        this.setPlayPoI(this.location.response.play_PoI)
      }
      this.latitude = this.location.data.lat
      this.longitude = this.location.data.lon
      this.currentPosition = L.latLng(this.location.data.lat, this.location.data.lon)
      if (this.location.data.lat >= 0) this.latitude = `${this.location.data.lat}°N`
      if (this.location.data.lat < 0) this.latitude = `${this.location.data.lat}°S`
      if (this.location.data.lon >= 0) this.longitude = `${this.location.data.lon}°E`
      if (this.location.data.lon < 0) this.longitude = `${this.location.data.lon}°W`
      this.currentPositionLabel = `${this.latitude}, ${this.longitude}`
    },
    loadDB () {
      this.db = this.$db
      this.$nextTick(function () {
        this.loadTracks()
        this.loadRoute()
        this.viewCurrentPosition()
        this.loadPoI()
      })
    },
    loadPoI () {
      this.PoI.markers = {
        Viktoriatempel: L.latLng(this.db.poi[0].lat_start, this.db.poi[0].lon_start),
        Kocherfels: L.latLng(this.db.poi[1].lat_start, this.db.poi[1].lon_start),
        FalkensteinerHain: L.latLng(this.db.poi[2].lat_start, this.db.poi[2].lon_start),
        BurgFalkenstein: L.latLng(this.db.poi[3].lat_start, this.db.poi[3].lon_start),
        TurmburgNuerings: L.latLng(this.db.poi[4].lat_start, this.db.poi[4].lon_start),
        DettweilerTempel: L.latLng(this.db.poi[5].lat_start, this.db.poi[5].lon_start),
        BurgKoenigstein: L.latLng(this.db.poi[6].lat_start, this.db.poi[6].lon_start),
        BurgKronberg: L.latLng(this.db.poi[7].lat_start, this.db.poi[7].lon_start),
        JuedischerFriedhof: L.latLng(this.db.poi[8].lat_start, this.db.poi[8].lon_start),
        AutoplayTest: L.latLng(this.db.poi[9].lat_start, this.db.poi[9].lon_start)
      }
      this.PoI.images = [{
        url: 'img/poi/viktoriatempel.jpg',
        showCaption: false,
        caption: '',
        name: 'Viktoriatempel'
      },
      {
        url: 'img/poi/kocherfels.jpg',
        showCaption: true,
        caption: 'http://taunuswiesbaden.blogspot.com/2019/07/kocherfels.html',
        name: 'Kocherfels'
      },
      {
        url: 'img/poi/falkensteiner_hain.jpg',
        showCaption: true,
        caption: 'https://pixabay.com/de/users/valiphotos-1720744/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1072828',
        name: 'Falkensteiner Hain'
      },
      {
        url: 'img/poi/burg_falkenstein.jpg',
        showCaption: false,
        caption: '',
        name: 'Burg Falkenstein'
      },
      {
        url: 'img/poi/turmburg_nuerings.jpg',
        showCaption: true,
        caption: 'https://de.wikipedia.org/wiki/Burg_N%C3%BCrings',
        name: 'Turmburg Nürings'
      },
      {
        url: 'img/poi/dettweiler_tempel.jpg',
        showCaption: false,
        caption: '',
        name: 'Dettweiler Tempel'
      },
      {
        url: 'img/poi/burg_koenigstein.jpg',
        showCaption: true,
        caption: 'https://commons.wikimedia.org/wiki/File:Burg-Koenigstein-JR-E-106-2010-04-25.jpg',
        name: 'Burg Königstein'
      },
      {
        url: 'img/poi/burg_kronberg.jpg',
        showCaption: true,
        caption: 'https://commons.wikimedia.org/wiki/File:Burg-Kronberg-JR-E-65-2010-04-18.jpg',
        name: 'Burg Kronberg'
      },
      {
        url: 'img/poi/juedischer_friedhof.jpg',
        showCaption: false,
        caption: '',
        name: 'Jüdischer Friedhof'
      }]
      this.map.showMap = true
      this.centerUpdate(this.currentPosition)
    },
    loadTracks () {
      this.$axios.get(`${process.env.API}/tracks`).then(response => {
        this.db.tracks = response.data
        this.tracksAudio = []
        response.data.forEach(track => {
          const trackAudio = new Audio(track.file_path)
          trackAudio.id = track.id
          trackAudio.name = track.name
          this.tracksAudio.push(trackAudio)
        })
      }).catch(err => console.error(err))
    },
    async loadRoute () {
      this.$axios.get(`${process.env.API}/route`).then(response => {
        this.db.route = response.data
        this.regionName = this.db.route[0].region
        this.tourName = this.db.route[0].name
        this.map.polyline.latlngs = this.$polyline
      }).catch(err => console.error(err))
    },
    async choosePoI (id) {
      const PoI = this.db.poi.find(p => p.id === id)
      const img = this.PoI.images.find(i => i.name === PoI.name)
      this.PoI.img = img
      this.PoI.id = id
      this.PoI.name = PoI.name
      this.PoI.coordinates = PoI.gps_point
      this.PoI.infotext = PoI.info_text
      this.choosePoITrack(id)
    },
    async choosePoITrack (id) {
      this.PoI.track = this.db.tracks.find(e => e.id === id)
      this.PoI.track.audio = this.tracksAudio.find(e => e.name === this.PoI.track.name)
      var durmins = Math.floor(this.PoI.track.audio.duration / 60)
      var dursecs = Math.floor(this.PoI.track.audio.duration - durmins * 60)
      if (dursecs < 10) { dursecs = '0' + dursecs }
      if (durmins < 10) { durmins = '0' + durmins }
      this.PoI.duration = durmins + ':' + dursecs
    },
    async chooseTrack (id) {
      if (this.currentTrack !== this.PoI.track && Object.prototype.toString.call(this.currentTrack.audio) === '[object HTMLAudioElement]') {
        this.reset()
      }
      this.currentTrack.showInfo = true
      this.currentTrack = this.PoI.track
      this.currentTrack.duration = this.PoI.track.audio.duration
      this.currentTrack.PoIname = this.PoI.name
      this.currentTrack.PoI_id = id
      if (this.currentTrack.duration) {
        var durmins = Math.floor(this.currentTrack.duration / 60)
        var dursecs = Math.floor(this.currentTrack.duration - durmins * 60)
        if (dursecs < 10) { dursecs = '0' + dursecs }
        if (durmins < 10) { durmins = '0' + durmins }
        this.currentTrack.maxDuration = durmins + ':' + dursecs
      }
      this.reset()
      this.pausePlay(this.playing)
    },
    checkPoI () {
      this.play_PoI = this.$location.response.play_PoI
    },
    swipeDownFooter (evt) {
      if (this.swipeHandlerFooter) this.swipeHandlerFooter = !this.swipeHandlerFooter
    },
    swipeUpFooter (evt) {
      if (!this.swipeHandlerFooter) this.swipeHandlerFooter = !this.swipeHandlerFooter
    },
    swipeDownHeader (evt) {
      if (!this.swipeHandlerHeader) this.swipeHandlerHeader = !this.swipeHandlerHeader
    },
    swipeUpHeader (evt) {
      if (this.swipeHandlerHeader) this.swipeHandlerHeader = !this.swipeHandlerHeader
    },
    pausePlay (playing) {
      if (!playing) {
        this.audioplayericon = 'pause'
        this.setAudioTime()
        this.currentTrack.audio.play()
        this.paused = false
        this.playing = true
        this.timer = setInterval(() => {
          if (this.currentTrack.audio.ended) {
            return this.reset()
          }
          this.audioTimeStamp++
          this.setAudioTime()
        }, 1000)
      }
      if (playing) {
        this.audioplayericon = 'play_arrow'
        this.currentTrack.audio.pause()
        this.paused = true
        this.playing = false
        clearInterval(this.timer)
      }
    },
    reset () {
      this.playing = false
      this.paused = false
      this.audioplayericon = 'play_arrow'
      clearInterval(this.timer)
      this.currentTrack.audio.load()
      this.audioTimeStamp = 0
      this.setAudioTime()
      this.audioTimeStampFormatted = '00:00'
    },
    setAudioTime () {
      this.currentTrack.currentTime = this.audioTimeStamp
      this.currentTrack.audio.currentTime = this.audioTimeStamp
      var curmins = Math.floor(this.currentTrack.audio.currentTime / 60)
      var cursecs = Math.floor(this.currentTrack.audio.currentTime - curmins * 60)
      if (cursecs < 10) { cursecs = '0' + cursecs }
      if (curmins < 10) { curmins = '0' + curmins }
      this.audioTimeStampFormatted = curmins + ':' + cursecs
    }
  }
}
</script>

<style lang="scss">
  .loadingTrack {
    width: 70vw;
    height: auto;
  }
  .trackMap {
    z-index: -1
  }
  .currentPosition {
    margin: 20px;
    position: absolute;
    top: 15px;
    left:15px;
    z-index: 10
  }
  .drawerLeft {
    padding: 10px;
  }
  .infotext {
    min-height: 25vh;
    max-height: 50vh;
    height: auto;
    font-size: 13px;
  }
  .infoimg {
    max-height: 20vh;
    display: block;
  }
  .caption {
    padding-top: 1px;
    font-size: 0.4rem;
    color: #869e9c;
  }
  .infotextheader {
    font-size: 20px;
  }
  .tourname {
    font-size: 20px;
  }
  .region {
    color: #869e9c;
    font-size: 15px;
  }
  .gpscords {
    font-size: 12px;
  }
  .playaudio {
    font-size: 10px;
  }
  .aside.q-drawer {
    bottom: 0px;
  }
  .bottommenu {
  max-height: 33vh;
  border-radius: 15px 15px 0px 0px;
    .q-item__section--side > .q-icon {
      font-size:40px;
       color: #445957;
    };
    .q-item__section--main ~ .q-item__section--side {
    padding-left: 0px;
    };
    .mpslider {
      width: 70vw;
    }
    .timestamp {
      color: #364144;
      position: absolute;
      top: 30px;
      left: -3px;
      cursor: inherit;
    }
    .tracklength {
      color: #364144;
      position: absolute;
      top: 30px;
      right: -3px;
      cursor: inherit;
    }
    .trackname {
      color: #364144;
      position: relative;
      top: 7px;
      cursor: inherit;
    }
    .autoplaytoggle {
      position: absolute;
      right: 5px;
      font-size: 15px;
    }
    .infoicon {
      position: absolute;
      top: -15px;
      right: 15px;
      font-size: 25px
    }
  }
  .topmenu {
    max-height: 20vh;
    min-height: 8vh;
    .q-toolbar {
    };
    .menubar {
      width: 100vw;
      padding-top: 0px;
    }
    .q-item__section--side > .q-icon {
      font-size: 50px;
       color: #445957;
      align-items: start;
    };
  }
  .burgermenu {
        font-size:70px;
  }
  .q-item-q-item-type-row-no-wrap {
      padding-top: 0px;
  }
</style>
