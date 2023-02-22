/* eslint-disable camelcase */
var map
var layer_mapnik
var layer_tah
var layer_markers

function drawmap () {
  // console.log(OpenLayers.Control.PanZoomBar.zoomBarDrag);
  OpenLayers.Lang.setCode('de')

  // Position und Zoomstufe der Karte muss man noch anpassen aud die größe der app
  var lon = 8.45674
  var lat = 50.16906
  var zoom = 14

  // Block "Layer mit GPX-Track" - Start
  var GPXVariable_1 = new OpenLayers.Layer.Vector(
    '3 Burgenweg Taunus - Königstein, Falkenstein, Kronberg',
    {
      strategies: [new OpenLayers.Strategy.Fixed()],
      protocol: new OpenLayers.Protocol.HTTP({
        url: 'gpx/3-burgenweg-koenigstein-falkenstein-kronberg-taunus.gpx',
        format: new OpenLayers.Format.GPX()
      }),
      style: { strokeColor: '#445957', strokeWidth: 5, strokeOpacity: 0.8 },
      projection: new OpenLayers.Projection('EPSG:4326')
    }
  )

  map = new OpenLayers.Map('map', {
    projection: new OpenLayers.Projection('EPSG:900913'),
    displayProjection: new OpenLayers.Projection('EPSG:4326'),
    controls: [
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.LayerSwitcher(),
      new OpenLayers.Control.PanZoomBar()
    ],
    maxExtent: new OpenLayers.Bounds(
      -20037508.34,
      -20037508.34,
      20037508.34,
      20037508.34
    ),
    numZoomLevels: 18,
    maxResolution: 156543,
    units: 'meters'
  })

  layer_mapnik = new OpenLayers.Layer.OSM.Mapnik('Mapnik')

  layer_markers = new OpenLayers.Layer.Markers('Address', {
    projection: new OpenLayers.Projection('EPSG:4326'),
    visibility: true,
    displayInLayerSwitcher: false
  })

  map.addLayers([layer_mapnik, GPXVariable_1, layer_markers])
  jumpTo(lon, lat, zoom)

  // Position des Markers
  // kocherfels
  addMarker(layer_markers, 8.487386, 50.192796, 1)
  // viktoriatempel
  addMarker(layer_markers, 8.502409, 50.194256, 2)
  // Falkensteiner Hain
  addMarker(layer_markers, 8.47411, 50.18849, 3)
  // Burg Falkenstein
  addMarker(layer_markers, 8.476667, 50.190278, 4)
  // Turmburg Nüringd
  addMarker(layer_markers, 8.475999, 50.189571, 5)
  // Dettweiler tempel
  addMarker(layer_markers, 8.476442, 50.189122, 6)
  // burg Konigstein
  addMarker(layer_markers, 8.460977, 50.182506, 7)
  // Burg kronberg
  addMarker(layer_markers, 8.506664, 50.181091, 8)
  // jüdischer friedhof
  addMarker(layer_markers, 8.497313, 50.197239, 9)

  // norden
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/north-mini.png',
    'img/switcher-north.svg'
  )
  // westen
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/west-mini.png',
    'img/switcher-west.svg'
  )
  // osten
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/east-mini.png',
    'img/switcher-east.svg'
  )
  // süden
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/south-mini.png',
    'img/switcher-south.svg'
  )
  // plus
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/zoom-plus-mini.png',
    'img/switcher-maximize.svg'
  )
  // minus
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/zoom-minus-mini.png',
    'img/switcher-minimize.svg'
  )
  // manuel
  ChangeImageSrc(
    'http://www.openlayers.org/api/img/slider.png',
    'img/switcher-manuel.svg'
  )
}

function ChangeImageSrc (oldSrc, newSrc) {
  var imgElements = document.getElementsByTagName('img')
  for (i = 0; i < imgElements.length; i++) {
    if (imgElements[i].src == oldSrc) {
      imgElements[i].src = newSrc
      break
    }
  }
}
