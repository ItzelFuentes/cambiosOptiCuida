const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorgelamanrique@gmail.com',
        pass: 'lyip gnpf itaa nbnk'
    },
    tls: {
        rejectUnauthorized: false // Desactivar la validación del certificado
    },
});

// Función que envía el correo
exports.notificarPaciente = (mail, mat, nom, apeP, apeM) => {
    const mailOptions = {
        from: 'jorgelamanrique@gmail.com',
        to: mail,
        subject: `Bienvenido ${nom} ${apeP} ${apeM}!`,
        text: `Prueba de matrícula: ${mat}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
