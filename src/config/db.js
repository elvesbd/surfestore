const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: '173E8966C14',
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})