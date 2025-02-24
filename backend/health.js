const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.get('/health', async (req, res) => {
    const HuggingFaceToken = process.env.HUGGING_FACE_TOKEN;
    let huggingFaceStatus = 'unknown';

    if (HuggingFaceToken) {
        try {
            await axios.get('https://api-inference.huggingface.co/', {
                headers: { 'Authorization': `Bearer ${HuggingFaceToken}` }
            });
            huggingFaceStatus = 'available';
        } catch (error) {
            huggingFaceStatus = 'unavailable';
            console.log('stg happend within hugging face, error: ' + error);
        }
    }
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        services: {
            huggingFaceAPI: huggingFaceStatus,
        }
    });
});

module.exports = router;