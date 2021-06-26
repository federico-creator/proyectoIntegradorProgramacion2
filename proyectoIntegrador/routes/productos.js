let express = require('express');
let router = express.Router();
const multer = require("multer")
const path = require("path")
const productosControllers = require('../controllers/productosControllers');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

//todos los productos
router.get('/', productosControllers.index); 
//productos seleccionados por id
router.get('/busqueda/:id', productosControllers.busqueda);
//agregar productos
router.get("/agregar",productosControllers.agregar);
router.post('/agregar', upload.single("foto") , productosControllers.agregarpost)
//borrar productos
router.get("/borrar/:id",productosControllers.borrar);
//editar productos
router.get("/editar/:id",productosControllers.editar);
router.post("/editar/:id",upload.single("foto"),productosControllers.editarpost);
//escribir comentarios en productos
router.post('/busqueda/:id/comentario', productosControllers.comentar);
router.get('/busqueda/:id/borrarcomentario/:idcomentario', productosControllers.borrarcomentario);
//busqueda de productos por metodo search
router.get('/search', productosControllers.search);


module.exports = router;