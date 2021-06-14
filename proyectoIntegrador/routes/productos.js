let express = require('express');
let router = express.Router();
const multer = require("multer")
const path = require("path")
const productosControllers = require('../controllers/productosControllers');
const agregarControllers = require('../controllers/agregarControllers');
const editarControllers = require('../controllers/editarproductoController');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

/* GET products page. */
router.get('/', productosControllers.index); 
router.get('/busqueda/:id', productosControllers.busqueda);
router.get('/logueado/:id', productosControllers.logueado);
router.get("/agregar",agregarControllers.index);
router.post('/agregar', upload.single("foto") , agregarControllers.agregar)
router.get("/borrar/:id",productosControllers.borrar);
router.get("/editar/:id",editarControllers.index);
router.post("/editar/:id",editarControllers.post);
router.post('/busqueda/:id/comentario', productosControllers.comentar);


module.exports = router;