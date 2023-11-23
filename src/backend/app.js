const express = require('express')
//Conn é a conexão do banco de dados
const conn = require('./db/conn');
const userController = require('./controllers/userController');

const app = express()
const port = 3000

//Fazendo o express ler .json
app.use(express.json())

app.post('/user', userController.createUser);

//Express podendo enviar .json ou middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get("/", (request, response) => {
    response.json({ messagem: 'HelloWorld' })
})


app.listen(port, () => {
    console.log('Servidor está rodando na porta: ' + port)
})
