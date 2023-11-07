const mysql = require('mysql2');
const passwordMysql = require('./mysqPassword.json')

const connection = mysql.createConnection({
  host: passwordMysql.host,
  user: passwordMysql.user,
  password: passwordMysql.password,
  database: passwordMysql.database
});
connection.connect((err) => {
  console.log('Conexão com o banco foi feita com sucesso')
})


function login(email, password, callback) {
  connection.query(`SELECT username FROM usuarios WHERE email = '${email}' AND password = '${password}'`, (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        // Usuário encontrado, chame o callback com os detalhes do usuário
        callback(null, rows[0]);
      } else {
        
        // Email ou senha incorretos
        callback(false); // Altere esta mensagem para "Usuário não encontrado"
      }
    } else {
      // Outro erro na consulta
      console.log('Erro: consulta não realizada com sucesso', err);
      callback(err, null);
    }
  });
}



module.exports = {
  login: login
};