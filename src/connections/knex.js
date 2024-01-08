const knex = require("knex")({
    client: 'pg',
    connection:{
        host: 'localhost',
        user: 'postgres',
        password: '316407',
        database: 'banco_digital'
    },
});

module.exports = knex;