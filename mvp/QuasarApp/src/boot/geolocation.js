const location = {}

function showError (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      location.error = error.code
      break
    case error.POSITION_UNAVAILABLE:
      location.error = error.code
      break
    case error.TIMEOUT:
      location.error = error.code
      break
    case error.UNKNOWN_ERROR:
      location.error = error.code
      break
  }
}

var timer = 0

function updatePosition () {
  navigator.geolocation.watchPosition(async (position, err) => {
    if (err) throw err
    location.error = null
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const alt = position.coords.altitude
    const data = { lat, lon, alt }
    location.data = data
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    if (timer === 0) {
      const response = await fetch(`${process.env.API}/api`, options)
      const json = await response.json()
      location.response = json
      console.log(location.response)
      timer = 1
      setTimeout(() => {
        timer = 0
      }, 3000)
    }
  })
}

function getPosition () {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(updatePosition, showError)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

getPosition()

export default ({ Vue }) => {
  Vue.prototype.$location = location
  Vue.prototype.$getPosition = getPosition
}
export { location }
