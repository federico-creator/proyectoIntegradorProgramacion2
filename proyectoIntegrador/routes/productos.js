let express = require('express');
let router = express.Router();
const productosControllers = require('../controllers/productosControllers');
const agregarControllers = require('../controllers/agregarControllers');
const editarControllers = require('../controllers/editarproductoController');

/* GET products page. */
router.get('/', productosControllers.index); 
router.get('/busqueda/:id', productosControllers.busqueda);
router.get('/logueado/:id', productosControllers.logueado);
router.get("/agregar",agregarControllers.index);
router.post("/agregar",agregarControllers.agregar);
router.get("/borrar/:id",productosControllers.borrar);
router.get("/editar/:id",editarControllers.index);
router.post("/editar/:id",editarControllers.post);


module.exports = router;