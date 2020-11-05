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


//CORS: Cross-Origin Resource Sharing
app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/clientes', (req, res, next) => {
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
})

app.get('/api/clientes/:id', (req, res, next) => {
  Cliente.findById(req.params.id).then( cli => {
    if (cli)
      res.status(200).json(cli)
    else
      res.status(404).json({mensagem: "Cliente não encontrado!"})
  })
})

//DELETE /api/clientes/5f91c274c2f25bff67d2f4da
app.delete('/api/clientes/:id', (req, res, next) => {
  Cliente.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Cliente removido"});
  })
});

app.put ('/api/clientes/:idCliente', (req, res, next) => {
  const cliente = new Cliente({
    _id: req.params.idCliente,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  Cliente.updateOne(
    { _id: req.params.idCliente},
    cliente
  ).then(resultado => {
    console.log("Atualizou: " + JSON.stringify(resultado))
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
  })
})



module.exports = app;
