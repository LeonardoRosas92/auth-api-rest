const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');
const { registrarUsuario, login } = require('../controllers');
const { usuarioExiste } = require('../helpers');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] , login );

router.post('/registro', [  
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no tiene el formato correcto').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 8 letras').isLength({ min: 8 }),
    check('email').custom(usuarioExiste),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    validarCampos
], registrarUsuario);


module.exports = router;