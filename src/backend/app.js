const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const { data } = await axios.get("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=testando");
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("Algo deu errado:", error.message);
        res.status(500).send('Erro interno do servidor');
    }
});

app.listen(port, () => {
    console.log('Servidor está rodando na porta: ' + port);
});
