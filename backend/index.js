const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require("express-rate-limit");
const path = require("path");
const cors = require('cors');
const { summarize } = require('./summarize');
const healthRoutes = require('./health');

dotenv.config();

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 429, message: "Too many requests, please try again later." },
}); 

const app = express();

//IMPORTANT to allow the frontend to work with the backend
app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || origin === "http://localhost:5173" || origin === "https://clipnote-frontend.onrender.com") {
          return callback(null, true); // Allow the request
        }
        return callback(new Error('Not allowed by CORS'), false); // Reject request
      },
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
    })
  );  

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter);
app.use('/', healthRoutes);
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).render('index', { data: { status: 200 } });
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