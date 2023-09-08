const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT, emailRegistro, crearLink } = require("../helpers");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario no registrado",
            });
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: "Usuario y/o Password son incorrectos",
        });
        }
        //Generar JWT
        const token = await generarJWT(usuario._id);
        res.json({
            token,
            usuario,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

const registrarUsuario = async (req, res = response) => {
    try {
        const {
            nombre,
            apellido,
            email,
            password,
            banco
        } = req.body;
        const uuid = await crearLink(banco);
        if(!uuid){
            console.log("uuid fail");
            return res.status(500).json(
                { 
                    msg : `El banco ${banco} no esta disponible por el momento`
                }
            );
        }
        const usuario = new Usuario({
            nombre,
            apellido,
            email,
            password,
            banco,
            uuid
        });
        console.log( email, banco);
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        //Guardar en BD
        await usuario.save();
        //Enviamos registro
        await emailRegistro({ nombre, apellido, email });
        res.json({
            msg: "Usuario regitrado,hemos enviado un correo de confirmación.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    login,
    registrarUsuario,
};
