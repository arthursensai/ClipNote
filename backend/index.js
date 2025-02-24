const express = require('express');
const dotenv = require('dotenv');
const { summarize } = require('./summarize');
const healthRoutes = require('./health');


//limiter
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 429, message: "Too many requests, please try again later." },
}); 

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

//health check
app.use('/', healthRoutes);

app.use(limiter);

//debug requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.get('/summarize', (req, res) => {
    res.status(200).send({message: 'API is working fine'}); 
});

app.post('/summarize', async (req, res) => {
    const text = req.body.text;
    const type = req.body.type;
    console.log('new summarizing request!');
    const response = await summarize(text, type);

    if (!req.body.text || typeof req.body.text !== "string") {
        return res.status(400).json({ message: "Invalid text input" });
    }

    return res.status(response.status).send({message: response.message});
});

app.listen(PORT, () => {
    console.log(`working on Port:${PORT}`);
});