const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose')
const MONGODB = require('../../passwords.json')

const app = express();
const port = 3000;

const Produto = mongoose.model('Produto', {
    name: String,
    description: String,
    price: Number,
    image_url: String
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
});



app.get('/produtos', async(req,res) =>{
    const produtos = await Produto.find()
    return res.send(produtos)
})

app.post('/produto', async (req, res) => {
    const produto = new Produto({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.image_url
    })
    await produto.save()
    return res.send(produto)
})

app.put('/produto/:id', async(req,res)=>{
    const produto = await Produto.findOneAndUpdate({_id:req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.image_url
    }, { new: true})

    return res.send(produto) 
})

app.delete('/produto/:id', async (req,res) =>{
    //findByIdAndDelete é um metodo que procura no banco de dados pelo id e já deleta
    const produto = await Produto.findByIdAndDelete(req.params.id)
    return res.send(produto)
})

app.listen(port, () => {
    mongoose.connect(`mongodb+srv://${MONGODB.DB_USER}:${MONGODB.DB_PASSWORD}@mercadoversatil.xaww1st.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Servidor está rodando na porta: ' + port);
});
