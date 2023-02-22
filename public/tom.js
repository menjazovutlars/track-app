function jumpTo (lon, lat, zoom) {
  var x = Lon2Merc(lon)
  var y = Lat2Merc(lat)
  map.setCenter(new OpenLayers.LonLat(x, y), zoom)
  return false
}

function Lon2Merc (lon) {
  return (20037508.34 * lon) / 180
}

function Lat2Merc (lat) {
  var PI = 3.14159265358979323846
  lat = Math.log(Math.tan(((90 + lat) * PI) / 360)) / (PI / 180)
  return (20037508.34 * lat) / 180
}

function addMarker (layer, lon, lat, id) {
  var ll = new OpenLayers.LonLat(Lon2Merc(lon), Lat2Merc(lat))

  var marker = new OpenLayers.Marker(ll)

  // das ist die Klickfunktion für den Marker, funktion reinschreiben, wass dann genau
  var markerClick = function (evt) {
    // durch die id weiß an, welches PoI man sieht
    console.log(id)
    OpenLayers.Event.stop(evt)
  }

  marker.icon.url = 'img/marker-map.svg'

  marker.events.register('mousedown', id, markerClick)

  layer.addMarker(marker)
}

function getCycleTileURL (bounds) {
  var res = this.map.getResolution()
  var x = Math.round(
    (bounds.left - this.maxExtent.left) / (res * this.tileSize.w)
  )
  var y = Math.round(
    (this.maxExtent.top - bounds.top) / (res * this.tileSize.h)
  )
  var z = this.map.getZoom()
  var limit = Math.pow(2, z)

  if (y < 0 || y >= limit) {
    return null
  } else {
    x = ((x % limit) + limit) % limit

    return this.url + z + '/' + x + '/' + y + '.' + this.type
  }
}
