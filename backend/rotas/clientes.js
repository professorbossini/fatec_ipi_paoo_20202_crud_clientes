const express = require ('express');
const router = express.Router();
const Cliente = require('../models/cliente');

router.post('', (req, res, next) => {
  const cliente = new Cliente({
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
      console.log(`Inserção NOK: ${error}`);
      res.status(404).json({
        mensagem: 'Cliente não foi inserido, tente novamente mais tarde'
      })
    })
});



router.get('', (req, res, next) => {
  Cliente.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        mensagem: 'Tudo ok',
        clientes: documents
      })
    })
    .catch((error) => {
      console.log('Busca falhou: ' + error)
      res.status(404).json({
        mensagem: 'Falhou',
        clientes: []
      })
    })
})

router.get('/:id', (req, res, next) => {
  Cliente.findById(req.params.id).then(cli => {
    if (cli)
      res.status(200).json(cli)
    else
      res.status(404).json({ mensagem: "Cliente não encontrado!" })
  })
})

//DELETE /api/clientes/5f91c274c2f25bff67d2f4da
router.delete('/:id', (req, res, next) => {
  Cliente.deleteOne({ _id: req.params.id })
    .then((resultado) => {
      console.log(resultado);
      res.status(200).json({ mensagem: "Cliente removido" });
    })
});

router.put('/:idCliente', (req, res, next) => {
  const cliente = new Cliente({
    _id: req.params.idCliente,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  Cliente.updateOne(
    { _id: req.params.idCliente },
    cliente
  ).then(resultado => {
    console.log("Atualizou: " + JSON.stringify(resultado))
    res.status(200).json({ mensagem: 'Atualização realizada com sucesso' })
  })
})

module.exports = router;
