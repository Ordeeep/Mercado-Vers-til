const express = require('express')
const mysqlConnection = require('./mysqlConnection')
const path = require('path')
const app = express()
const port = 3000
app.get('/', (request, response) => {
    response.send("hello world")
})

app.get('/login', (request, response) => {
    mysqlConnection.login(request.query.email, request.query.password, (err, user) => {
        if (!err) {
            if (user) {
                response.send('Login realizado com sucesso!');
            } else {
                response.send('Email ou senha estão incorretos');
            }
        }
        else {
            response.send('Erro: consulta não realizada com sucesso');
        }
    });
});

app.get('/criarConta', (request, response) => {
    response.sendFile(path.resolve('./src/FrontEnd/createAccount.html'));
})

app.post('/criarConta', (request, response) => {
    const email = request.body.email;
    const user = request.body.user;
    const password = request.body.password;

    console.log(email)

})

app.listen(port, () => {
    console.log('Servidor está rodando na porta: ' + port)
})
