const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Musicas = new Schema({
  nome: {
    type: String
  },
  genero: {
    type: String
  },

  cantor: {
    type: String
  }
},{
    collection: 'musicas'
});

module.exports = mongoose.model('Musicas', Musicas);