const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/summarize', (req, res) => {
    const { text } = req.body;

    axios.post('http://127.0.0.1:5000/summarize', { text })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error forwarding message to Flask server:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
