const express = require("express");
const pacienteController = require('../controllers/pacienteController.js');
const router = express.Router();
const multer = require('multer');

const { checkToken } = require('../../utils/middlewares.js');
const userEsp = require("../models/userEsp.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.use('/usersReg', require('./usersReg.js'));

router.use('/usersEsp', require('./userEsp.js'));

//reestablecer contraseña
//router.put('/forgotPassword').post(resetPassword.forgotPassword);
//router.put('/resetPassword').post(resetPassword.resetPassword);
router.get('/restablecer',pacienteController.formRestContraseña);
//enviar token
router.post('/restablecer', pacienteController.EnviarToken);

//token
router.get('/restablecer-password/:Token', pacienteController.ValidarToken);



router.post('/pac', upload.fields([{ name: 'foto' }, { name: 'cert' }]), pacienteController.guardarPaciente);

router.get('/pac',pacienteController.obtenerPacientes);

router.get('/pac/ciu',checkToken,pacienteController.obtenerCiudades);

router.get('/pac/:id',checkToken,pacienteController.obtenerPaciente);

router.delete('/pac/:id', pacienteController.eliminarPaciente);


module.exports = router;