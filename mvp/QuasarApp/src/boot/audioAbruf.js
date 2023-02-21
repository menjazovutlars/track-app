// const sqlite3 = require("sqlite3");
// const db = new sqlite3.Database("track-database.db");

// const query = "SELECT points_of_interest_id AND file_path FROM audiotracks";
// var newAudio;
// // var poi
// //db.all
// //select poi id audio

// //npm install express

// // if play poi = row.poiid dann gib den fad aus
// db.all(query, (err, rows) => {
//     rows.forEach((row) => {
//       if (play_PoI===PoI_id) {
//         newAudio= row.file_path;
//         return newAudio;
//       }
//     })
// })

// const sqlite3 = require('sqlite3')

// export default {
//   data() {
//     return {
//       db: new sqlite3.Database('track-database.db'),
//       query: 'SELECT points_of_interest_id AND file_path FROM audiotracks',
//       newAudio: null
//     }
//   },
//   methods: {
//     loadDB() {
//       this.db.all(this.query, (rows, err) => {
//         rows.forEach((row) => {
//           // eslint-disable-next-line camelcase
//           if (play_PoI === PoI_id) {
//             this.newAudio = row.file_path
//             return this.newAudio
//           }
//         })
//       })
//     }
//   }
// }
