const { Schema, model } = require('mongoose');
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidoPaterno: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    apellidoMaterno: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatorio'],
    },
    creado: { 
        type: Date, 
        default: Date.now 
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, creado, password, ...usuario} = this.toObject();
    //usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario' , UsuarioSchema );