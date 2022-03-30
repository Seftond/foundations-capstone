require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {SERVER_PORT} = process.env



const {seed, createUser, login, getLeagues, addWager, getAllWagers, changeResult, getRecord} = require('./controller.js')

const app = express();

app.use(express.json());
app.use(cors());


//Seed database
app.post('/seed', seed);


//create user in database
app.post("/create", createUser);
app.post("/login", login);
app.post("/wager", addWager);
app.get("/wagers", getAllWagers);
app.put("/wagers/:id", changeResult);
app.get("/record", getRecord)



app.listen(SERVER_PORT, () => {
    console.log(`Docked at ${SERVER_PORT}`);
});