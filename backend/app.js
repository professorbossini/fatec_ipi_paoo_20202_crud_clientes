const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const Cliente = require ('./models/cliente');
const mongoose = require ('mongoose');

/*app.use ((req, res, next) => {
  console.log ("Chegou uma requisição...");
  next();
});*/

mongoose.connect('mongodb+srv://fatec_ipi:fatec_ipi@cluster0.ssm0w.mongodb.net/fatec_ipi?retryWrites=true&w=majority')
.then(() => console.log ("Conexão OK"))
.catch((e) => console.log ("Conexão falhou: " + e));

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
  /*const cliente = req.body;
  clientes.push(cliente);
  console.log (cliente);*/
  const cliente = new Cliente ({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  cliente.save()
    .then((clienteInserido) => {
      console.log(`Inserção ok: ${clienteInserido}`);
    res.status(201).json({
      mensagem: 'Cliente Inserido',
      id: clienteInserido._id
    });
  })
  .catch((error) => {
    console.log (`Inserção NOK: ${error}`);
    res.status(404).json({
      mensagem: 'Cliente não foi inserido, tente novamente mais tarde'
    })
  })
});



app.get ('/api/clientes', (req, res, next) =>{
  Cliente.find()
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: 'Tudo ok',
      clientes: documents
    })
  })
  .catch ((error) => {
    console.log ('Busca falhou: ' + error)
    res.status(404).json({
      mensagem: 'Falhou',
      clientes: []
    })
  })
  /*//res.send ("Hello From the Back End monitorado");
  res.status(200).json({
    mensagem: "Tudo ok",
    clientes: clientes
  });*/
})

//DELETE /api/clientes/5f91c274c2f25bff67d2f4da
app.delete('/api/clientes/:id', (req, res, next) => {
  Cliente.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Cliente removido"});
  })
});



module.exports = app;
