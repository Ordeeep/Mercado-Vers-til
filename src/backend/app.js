const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose')
const MONGODB = require('../../passwords.json')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const Produto = mongoose.model('Produto', {
    productName: String,
    productDescription: String,
    productPrice: Number,
    productStock: Number,
    productImage1: String,
    productImage2: String,
    productImage3: String,
})

const Cliente = mongoose.model('Cliente', {
    email: String,
    user: String,
    password: String
})

app.use(bodyParser.json()); // Para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para dados de formulário HTML
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get('/produtos', async (req, res) => {
    const produtos = await Produto.find()
    return res.send(produtos)
})

app.get('/produtos/:id', async (req, res) => {
    const produtos = await Produto.findById(req.params.id)
    return res.send(produtos)
})
app.post('/produto', async (req, res) => {
    console.log(req.body)
    const produto = new Produto({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productStock: req.body.productStock,
        productImage1: req.body.productImage1,
        productImage2: req.body.productImage2,
        productImage3: req.body.productImage3,
    })
    await produto.save()
    return res.send(produto)
})

app.put('/produto/:id', async (req, res) => {
    console.log(req)
    // const produto = await Produto.findOneAndUpdate(
    //     { _id: req.params.id },
    //     {
    //         productName: req.body.productName,
    //         productDescription: req.body.productDescription,
    //         productPrice: req.body.productPrice,
    //         productStock: req.body.productStock,
    //         productImage1: req.body.productImage1,
    //         productImage2: req.body.productImage2,
    //         productImage3: req.body.productImage3,
    //     },
    //     { new: true }
    // );

    // return res.send(produto);
});

app.delete('/produto/:id', async (req, res) => {
    //findByIdAndDelete é um metodo que procura no banco de dados pelo id e já deleta
    const produto = await Produto.findByIdAndDelete(req.params.id)
    return res.send(produto)
})



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Verifique se os campos obrigatórios foram fornecidos
    if (!email || !password) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }
    try {
        // Tente encontrar o cliente no banco de dados
        const cliente = await Cliente.findOne({ email, password });
        // Se o cliente não for encontrado, retorne uma mensagem de erro
        if (!cliente) {
            return res.status(401).send('Credenciais inválidas.');
        }
        // Se o cliente for encontrado, você pode fazer algo com ele ou apenas retorná-lo
        res.redirect('http://127.0.0.1:5500/src/frontend/index.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.post('/cadastrar', async(req,res)=>{
    console.log(req.body)
    const cliente = new Cliente({
        email: req.body.email,
        user: req.body.user,
        password: req.body.password,
    })
    await cliente.save()
    res.redirect('http://127.0.0.1:5500/src/frontend/index.html');
    return res.send(cliente)

})

app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.find();
    return res.send(clientes);
});

app.put('/cliente/:id', async (req, res) => {
    const cliente = await Cliente.findOneAndUpdate({ _id: req.params.id }, {
        email: req.body.email,
        user: req.body.user,
        password: req.body.password,
    }, { new: true })

    return res.send(cliente)
})

app.delete('/cliente/:id', async (req, res) => {
    const cliente = await Cliente.findByIdAndDelete(req.params.id)
    return res.send(cliente)
})


app.listen(port, () => {
    mongoose.connect(`mongodb+srv://${MONGODB.DB_USER}:${MONGODB.DB_PASSWORD}@mercadoversatil.xaww1st.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Servidor está rodando na porta: ' + port);
});
