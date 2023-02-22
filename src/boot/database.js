/* eslint-disable camelcase */
import axios from 'axios'
const db = {}

async function loadDB () {
  await axios.get(`${process.env.API}/tracks`).then(response => {
    db.tracks = response.data
  }).catch(err => console.error(err))
  await axios.get(`${process.env.API}/route`).then(response => {
    db.route = response.data
  }).catch(err => console.error(err))
  await axios.get(`${process.env.API}/poi`).then(response => {
    db.poi = response.data
  }).catch(err => console.error(err))
  db.ready = true
}

loadDB()

export default ({ Vue }) => {
  Vue.prototype.$db = db
}
export { db, loadDB }
