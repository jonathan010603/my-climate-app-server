import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const KEY = process.env.API_KEY;

app.use(cors({ allowedHeaders: 'Content-Type' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://jonathan010603.github.io');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(bodyParser.json());

const WeatherAPI = async(city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=yes`, {mode: 'cors'});
    if(!response.ok) { return false; }
    else {
        const data = await response.json();
        return data;
    }
}

const REST_Countries = async(country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`, {mode: 'cors'})
    const data = await response.json();
    return data[0];
}

app.get("/", async (req, res) => {
    res.send("Working succesfully")
})

app.post("/weather", async (req, res) => {
    res.json({ data: await WeatherAPI(req.body.city) });
})

app.post("/countries", async (req, res) => {
    res.json({ data: await REST_Countries(req.body.country) });
})

app.listen(process.env.PORT || 5000)
