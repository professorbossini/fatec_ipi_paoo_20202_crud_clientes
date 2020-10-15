const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());

/*app.use ((req, res, next) => {
  console.log ("Chegou uma requisição...");
  next();
});*/

const clientes = [
  {
    id: '1',
    nome: 'Carlos',
    fone: '11223344',
    email: 'carlos@email.com'
  },
  {
    id: '2',
    nome: 'Catia',
    fone: '22334455',
    email: 'catia@email.com'
  }
]

//CORS: Cross-Origin Resource Sharing
app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = req.body;
  clientes.push(cliente);
  console.log (cliente);
  res.status(201).json({
    mensagem: 'Cliente Inserido'
  });
});



app.use ('/api/clientes', (req, res, next) =>{
  //res.send ("Hello From the Back End monitorado");
  res.status(200).json({
    mensagem: "Tudo ok",
    clientes: clientes
  });
})



module.exports = app;
