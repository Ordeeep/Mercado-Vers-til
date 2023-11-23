const mongoose = require('mongoose')

const User = mongoose.model("User",{
    nome: String,
    age: Number,
    approved:Boolean,
})

module.exports = User