let express = require('express');
let router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');
const multer = require("multer")
const path = require("path")
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

// usuarios general y otros usuarios
router.get('/', usuariosControllers.index);
router.get('/users/:id', usuariosControllers.individuales);
//registro
router.get('/registro', usuariosControllers.registration);
router.post('/registro', usuariosControllers.registrationstore);
//login
router.get('/login', usuariosControllers.login);
router.post ('/login', usuariosControllers.processLogin)
router.post ("/login/logout", usuariosControllers.logout)
//perfil
router.get('/perfil', usuariosControllers.perfil);
router.get('/perfil/borrar', usuariosControllers.borrar);
router.get('/perfil/editar', usuariosControllers.edicion);
router.post('/perfil/editar',usuariosControllers.edicionpost);
router.get('/perfil/foto', usuariosControllers.foto);
router.post('/perfil/foto', upload.single("avatar"),usuariosControllers.agregarfoto);
router.get('/perfil/borrarfoto', usuariosControllers.borrarfoto);

module.exports = router;