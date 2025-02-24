const axios = require('axios');

const dontenv = require('dotenv');

dontenv.config();

const HuggingFaceToken = process.env.HUGGING_FACE_TOKEN;

const summarize = async (text, type="short") => {
    if (!HuggingFaceToken) {
        return { status: 400, message: 'Invalid Hugging Face token' };
    }
    
    const lengthSettings = {
        short: { min_length: 20, max_length: 50 },
        medium: { min_length: 50, max_length: 150 },
        detailed: { min_length: 100, max_length: 300 },
    };

    const { min_length, max_length } = lengthSettings[type] || lengthSettings.medium;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            {   inputs: text,
                parameters: { min_length, max_length }
             },
            {
                headers: {
                    'Authorization': `Bearer ${HuggingFaceToken}`,
                },
            }
        );

        return { status: 200, message: response.data[0].summary_text };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

module.exports = { summarize };