require('dotenv').config();

const bcryptjs = require('bcryptjs');

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
        let seedPassword = "sefton";
        let salt = bcryptjs.genSaltSync(5);
        let seedPassHash = bcryptjs.hashSync(seedPassword, salt);
        sequelize.query(`
            drop table if exists users;
            drop table if exists wagers;

            CREATE TABLE users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(100),
                pass_hash TEXT,
                wins INTEGER,
                losses INTEGER,
                pushes INTEGER
            );

            CREATE TABLE wagers(
                bet_id SERIAL PRIMARY KEY,
                league VARCHAR(100),
                type VARCHAR(100),
                team1 VARCHAR(100),
                team2 VARCHAR(100),
                bet VARCHAR(100),
                result VARCHAR(30)
            );

            INSERT INTO wagers (league, type, team1, team2, bet, result)
            VALUES ('NBA', 'Spread', 'Utah Jazz', 'Phoenix Suns', 'Suns -3 -110', 'NONE'),
            ('NBA', 'Spread', 'Utah Jazz', 'Phoenix Suns', 'Suns -3 -110', 'NONE'),
            ('NBA', 'Spread', 'Utah Jazz', 'Phoenix Suns', 'Suns -3 -110', 'NONE');
               
            INSERT INTO users (username, pass_hash, wins, losses, pushes)
            VALUES ('Sefton', '${seedPassHash}', 74, 47, 2);
            `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    createUser: (req, res) => {
        let {username, password} = req.body;
        
        sequelize.query(`
        SELECT 1 FROM users 
        WHERE username = '${username}';
        `)
        .then (dbRes => { 
            if(dbRes[0][0] === undefined){
                let salt = bcryptjs.genSaltSync(5);
                let pass_hash = bcryptjs.hashSync(password, salt);
                sequelize.query(`
                INSERT INTO users (username, pass_hash, wins, losses, pushes)
                VALUES ('${username}', '${pass_hash}', 0, 0, 0)
                `)
                .then ((dbRes) => {
                    let secureObj = {...dbRes[0][0]};
                    delete secureObj.pass_hash;
            
                    res.status(200).send(secureObj);
                    return;
                })
                .catch(err => console.log(err));
            } else if(dbRes[0][0][Object.keys(dbRes[0][0])[0]] === 1){
                res.sendStatus(400);
            };
        });
    },
    login: (req, res) => {

        console.log('Logging In User')
  
        const { username, password } = req.body;


        sequelize.query(`
        SELECT * FROM users
        WHERE username = '${username}';
        `)
        .then(dbRes => {
            if(dbRes[0][0].username){
                let existingPassword = bcryptjs.compareSync(password, dbRes[0][0].pass_hash);
                if(existingPassword){
                    let secureObj = {...dbRes[0][0]};
                    delete secureObj.pass_hash;

                    res.status(200).send(secureObj);
                    return;
                };
            };
            res.status(400).send("Incorrect username and/or password")
        });
    },
    addWager: (req, res) => {
        const { league, type, team1, team2, bet } = req.body;
        sequelize.query(`
        INSERT INTO wagers (league, type, team1, team2, bet, result)
        VALUES ('${league}', '${type}', '${team1}', '${team2}', '${bet}', 'NONE')
        `)
        .then(dbRes => {
            res.status(200).send("Wager added successfully")
        })
    },
    getAllWagers: (req, res) => {
        sequelize.query(`
        SELECT * FROM wagers
        WHERE result = 'NONE';
        `)
        .then (dbRes => {
            res.status(200).send(dbRes[0]);
        })
    },
    changeResult: (req, res) => {
        let {id} = req.params;
        let {result} = req.body;
        if(result === "win"){
            sequelize.query(`
            SELECT wins FROM users
            WHERE user_id = 1;
            `)
            .then(dbRes => {
                let {wins} = dbRes[0][0];
                wins = wins + 1;
                sequelize.query(`
                UPDATE users
                SET wins = ${wins}
                WHERE user_id = 1;
                `)
            })
        } else if(result === "loss"){
            sequelize.query(`
            SELECT losses FROM users
            WHERE user_id = 1;
            `)
            .then(dbRes => {
                let {losses} = dbRes[0][0];
                losses = losses + 1;
                sequelize.query(`
                UPDATE users
                SET losses = ${losses}
                WHERE user_id = 1;
                `)
            })
        } else if(result === "push"){
            sequelize.query(`
            SELECT pushes FROM users
            WHERE user_id = 1;
            `)
            .then(dbRes => {
                let {pushes} = dbRes[0][0];
                pushes = pushes + 1;
                sequelize.query(`
                UPDATE users
                SET pushes = ${pushes}
                WHERE user_id = 1;
                `)
            })
        }
        sequelize.query(`
        UPDATE wagers
        SET result = '${result}'
        WHERE bet_id = ${id};
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
    },
    getRecord: (req, res) => {
        sequelize.query(`
        SELECT wins, losses, pushes FROM users
        WHERE user_id = 1;
        `)
        .then(dbRes => {
            let {wins, losses, pushes} = dbRes[0][0];
            let obj ={
                wins,
                losses,
                pushes,
            }
            res.status(200).send(obj)
        })
    }
}