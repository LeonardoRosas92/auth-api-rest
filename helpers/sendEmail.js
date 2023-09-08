const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require('path');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const emailRegistro = async (datos) => {
    console.log(datos.nombre,datos.apellido,datos.email,process.env.EMAIL_USER);
    try {
        const filePath = path.join(__dirname, '../templates/correoRegistro.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            nombre: datos.nombre,
            apellido: datos.apellido ,
            email: datos.email
        };
        const htmlToSend = template(replacements);
    
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: datos.email,
            subject: 'Registro exitoso',
            html: htmlToSend,
            attachments: [
                {
                    filename: 'image-1.png',
                    path: path.join(__dirname, '../templates/images/image-1.png'),
                    cid: 'image-1' //same cid value as in the html img src
                },
                {
                    filename: 'image-2.png', 
                    path: path.join(__dirname, '../templates/images/image-2.png'),
                    cid: 'image-2' //same cid value as in the html img src
                }
            ]
        }; 

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("ERROR MAIL: "+error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (e) {
        console.log("ERROR: "+e);
    }
}

module.exports = {
    emailRegistro
}