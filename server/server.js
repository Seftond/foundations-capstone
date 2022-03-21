const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());



const SERVER_PORT = 4500;

app.listen(SERVER_PORT, () => {
    console.log(`Docked at ${SERVER_PORT}`);
});