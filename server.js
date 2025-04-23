const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/html_pdf', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'produtos.html'));
})

app.get('/html_site', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/apiUrl', (req, res) => {
    const apiUrl = process.env.API_URL;
    res.json({ API_URL: apiUrl });
});

app.listen(port, '0.0.0.0', () => {
    console.log('Servidor rodando');
  });
  