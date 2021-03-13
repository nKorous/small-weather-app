const mysql = require('mysql')

const connString = process.env.JAWSDB_URL

const db = mysql.createConnection(connString)

db.connect(err => {
    if(err){
        console.log(`error connecting to database`)
        console.log(err)
    } else {
        console.log(`connected to database`)
    }
})


module.exports = db
