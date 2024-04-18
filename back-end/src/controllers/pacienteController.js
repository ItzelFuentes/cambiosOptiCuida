const Paciente = require("../models/paciente.js");
const Ciudades = require("../models/ciudad.js");
const multer = require('multer')
const { notificarPaciente } = require('../service/notifi.service.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const Crypto = require ('crypto');


exports.guardarPaciente = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { nom, apeP, apeM, calle, no, col, ciudad, cp, numTelCa, numTelAsp, numTelMaPa, mail, cD, pD, SLAO, SLOD, SLOI, CLAO, CLOD, CLOI } = req.body;

        const mat = generarMatricula(apeP, apeM, nom);
        const foto = req.files['foto'][0];
        const cert = req.files['cert'][0];

        const fechReg = new Date();
        fechReg.setHours(0, 0, 0, 0);

        const paciente = new Paciente({
            mat,
            nom,
            apeP,
            apeM,
            calle,
            no,
            col,
            ciudad,
            cp,
            numTelCa,
            numTelAsp,
            numTelMaPa,
            mail,
            cD, 
            pD, 
            SLAO, 
            SLOD, 
            SLOI, 
            CLAO, 
            CLOD, 
            CLOI,
            fechReg,
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            },
            cert: {
                data: cert.buffer,
                contentType: cert.mimetype
            }
        });

        await paciente.save();

        notificarPaciente(mail, mat, nom, apeP, apeM);

        res.send(paciente);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


function quitarAcentos(texto) {
    if(texto && texto.normalize){
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
    console.error("La cadena es nula o no tiene el método 'normalize'.");
  }
}

function generarMatricula(apeP, apeM, nom) {
    // Quitar acentos de los apellidos y del primer nombre
    const apePaternoSinAcentos = quitarAcentos(apeP);
    const apeMaternoSinAcentos = quitarAcentos(apeM);
    const primerNombreSinAcentos = quitarAcentos(nom);

    // Obtener las dos primeras letras del apellido paterno y materno, y la primera letra del primer nombre
    const letras = `${apePaternoSinAcentos.slice(0, 2)}${apeMaternoSinAcentos.slice(0, 2)}${primerNombreSinAcentos.charAt(0)}`;

    // Obtener dos dígitos del mes y los dos últimos dígitos del año
    const fecha = new Date();
    const mes = `0${fecha.getMonth() + 1}`.slice(-2);
    const año = fecha.getFullYear().toString().slice(-2);

    // Formar la matrícula sin números aleatorios
    const matricula = `${letras}-${mes}${año}`;

    return matricula.toUpperCase();
}

exports.obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        const pacientesConBase64 = pacientes.map(paciente => {
            const fotoBase64 = paciente.foto.data.toString('base64');
            const certBase64 = paciente.cert.data.toString('base64');
            return {
                ...paciente.toObject(),
                foto: fotoBase64,
                cert: certBase64,
            };
        });
        res.json(pacientesConBase64);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudades.find();
        res.json(ciudades);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPaciente = async (req, res) => {
    try {
        let paciente = await paciente.findById(req.params.id);

        if (!paciente) {
            return res.status(404).json({ msg: "No existe el paciente" });
        }
        res.json({
            _id: paciente._id,
            nom: paciente.nom,
            apeP: paciente.apeP,
            cert: {
                contentType: paciente.cert.contentType,
                data: paciente.cert.data
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarPaciente = async(req,res) =>{
    try {
        let paciente = await Paciente.findById(req.params.id);
        if(!paciente){
            return res.status(404).json({msg: "No existe el paciente"});
        }
        await Paciente.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Paciente eliminado con éxito'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
}

exports.formRestContraseña = (req,res)=> {
    res.render('restablecer contraseña');

}

exports.EnviarToken = async (req, res, next) => {
    const Email = req.body.Email;
    const usuario = await Usuario.findOne(Email);

    if(!Usuario){
        req.flash('error', 'Usuario no encontrado');
        return res.redirect('/Login');
    }
    //ususario existe
    usuario.Token = Crypto.randomBytes(20).toString('hex');
    //console.log(Crypto.randomBytes(20).toString('hex'))
    usuario.expira = Date.now() + 3600000;
    //guardar el BD
    usuario.save();
    const ResetUrl = `http://${req.headers.host}/restablecer-contraseña/${usuario.Token}`;
    console.log(ResetUrl);

    req.flash('correcto', 'Revisa tu bandeja de Email');
    res.redirect('Login');

}

exports.ValidarToken = async (req, res) => {
    res.render('resetPassword');

}


/*
const Token  = req.params.Token;
    const usuario = await Usuario.findOne({Token});
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/restablecer');
    }
    res.render('restablecer-password', {
    });*/ 
exports.ActualizarContraseña = async (req, res) => {
    const usuario = await Usuario.findOne({
        Token: req.params.Token, 
        expira:{$gt:Date.now()}
    });
    
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/restablecer');
    }

    usuario.Token=null
    usuario.expira= null
    usuario.Contraseña =req.body,Contraseña

    //guardar contraseña
    await usuario.save();

    req.flash('correcto', 'Tu contraseña se ha cambiado correctamente')
    res.redirect('/Login');
    
}