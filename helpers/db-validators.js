
const { Usuario } = require('../models');

const usuarioExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      throw new Error(`El email; ${email}, ya esta registrado.`)
    }
}

module.exports = {
  usuarioExiste
}