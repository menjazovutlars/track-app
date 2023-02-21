const mysql = require('mysql')

function loadDB () {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'trackapp',
    password: 'p3quasartrackapp2020'
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    this.con.query(this.query, function (err, result) {
      if (err) throw err
      console.log('Result: ' + result)
    })
  })
}

loadDB()
