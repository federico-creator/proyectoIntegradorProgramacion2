let express = require('express');
let router = express.Router();
const productosControllers = require('../controllers/productosControllers');

/* GET products page. */
router.get('/', productosControllers.index); //esta ruta nunca se usa por eso no tiene nada (decisión propia)
router.get('/busqueda/:productos', productosControllers.busqueda);
router.get('/logueado/:productos', productosControllers.logueado);


module.exports = router;