<template>

  <div style="height: 500px; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      // <l-marker :lat-lng="withPopup" :icon="icon">
      //   <l-popup>
      //     <div @click="innerClick">
      //       I am a popup
      //       <p v-show="showParagraph">
      //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
      //         sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
      //         Donec finibus semper metus id malesuada.
      //       </p>
      //     </div>
      //   </l-popup>
      // </l-marker>
      // <l-marker :lat-lng="withTooltip" :icon="icon">
      //   <l-tooltip :options="{ permanent: true, interactive: true }">
      //     <div @click="innerClick">
      //       I am a tooltip
      //       <p v-show="showParagraph">
      //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
      //         sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
      //         Donec finibus semper metus id malesuada.
      //       </p>
      //     </div>
      //   </l-tooltip>
      // </l-marker>
    </l-map>
  </div>
</template>

<script>

import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet'

export default {
  name: 'TrackMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(50.16906, 8.45674),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: L.latLng(50.18238, 8.46327),
      withTooltip: L.latLng(50.19758, 8.49676),
      currentZoom: 14,
      currentCenter: L.latLng(50.16906, 8.45674),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      width: '100%',
      showMap: true,
      icon: L.icon({
        iconUrl: 'icons/baseline_room_black_18dp.png'
      })
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('Click!')
    }
  }
}
</script>

<style>

</style>
