require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  });


module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists users;

            CREATE TABLE users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50),
                password TEXT,
                image TEXT,
                wins INTEGER,
                losses INTEGER,
                pushes INTEGER
            );
            
            
            insert into users (username, password)
            values ('Sefton', 123456789'),
            ('Sefton2', '987654321');
            `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    // getCountries: (req, res) => {
    //     sequelize.query(`
    //     SELECT * FROM countries;
    //     `)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log(err))
    // },
    
    // createCity: (req, res) => {
    //     let {name, rating, countryId} = req.body;
    //     sequelize.query(`
    //     INSERT INTO cities (name, rating, country_id)
    //     VALUES('${name}', ${rating}, ${countryId});
    //     `)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log(err))
    // },

    // getCities: (req, res) => {
    //     sequelize.query(`
    //     SELECT cities.city_id, cities.name AS city, cities.rating, countries.country_id, countries.name AS country
    //     FROM cities 
    //     JOIN countries
    //     ON cities.country_id = countries.country_id
    //     ORDER BY rating DESC;
    //     `)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log(err))
    // },

    // deleteCity: (req, res) => {
    //     let {id} = req.params
    //     sequelize.query(`
    //     DELETE 
    //     FROM cities
    //     WHERE city_id = ${id};
    //     `)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log(err))
    // }
}