const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
    console.log('✅ Servidor rodando');
}).on('error', (err) => {
    console.error('❌ Erro ao iniciar o servidor', err.message);
});