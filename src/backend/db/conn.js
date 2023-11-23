const mongoose = require('mongoose')
const dbCredenciais = require('../../../passwords.json')

mongoose.connect(`mongodb+srv://${dbCredenciais.DB_USER}:${dbCredenciais.DB_PASSWORD}@mercadoversatil.xaww1st.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Conexão feita com o banco de dados")
    
}).catch((err) => console.log(err))

module.exports = mongoose;