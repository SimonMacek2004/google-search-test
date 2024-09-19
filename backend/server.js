
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://simonmacek2004.github.io/google-search-test/' // Replace with your frontend URL
}));
app.use(express.json());

app.post('/search', async (req, res) => {
    const { query } = req.body;
    const { language } = req.body

    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                q: query,
                key: process.env.API_KEY,  
                cx: process.env.CX,
                start: 1,
                lr: language
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});