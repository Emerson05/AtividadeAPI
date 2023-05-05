const express = require('express');
const app = express();
const musicasRoutes = express.Router();

let Musicas = require('../model/musicas');

// api to add musica
musicasRoutes.route('/adicionar').post(function (req, res) {
  let musica = new Musicas(req.body);
  musica.save()
  .then(musica => {
    res.status(200).json({'status': 'success','mssg': 'Musica adicionada com Sucesso'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'Erro ao adicionar musica'});
  });
});

// api to get musicas
musicasRoutes.route('/').get(function (req, res) {
  Musicas.find(function (err, musicas){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'algo deu errado'});
    }
    else {
      res.status(200).json({'status': 'success','musicas': musicas});
    }
  });
});

// api to get musica
musicasRoutes.route('/musica/:id').get(function (req, res) {
  let id = req.params.id;
  Musicas.findById(id, function (err, musica){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','musica': musica});
    }
  });
});

// api to update route
musicasRoutes.route('/update/:id').put(function (req, res) {
    Musicas.findById(req.params.id, function(err, musica) {
    if (!musica){
      res.status(400).send({'status': 'failure','mssg': 'Não foi possivel Encontrar'});
    } else {
        musica.nome = req.body.nome;
        musica.genero = req.body.genero;
        musica.cantor = req.body.cantor;

        musica.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Atualizado com sucesso'});
      })
    }
  });
});

// api for delete
musicasRoutes.route('/delete/:id').delete(function (req, res) {
  Musicas.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Algo deu errado'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Deletado'});
    }
  });
});

module.exports = musicasRoutes;