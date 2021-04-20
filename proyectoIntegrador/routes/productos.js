let express = require('express');
let router = express.Router();
const productosControllers = require('../controllers/productosControllers');

/* GET products page. */
router.get('/', productosControllers.index);
router.get('/busqueda/:productos', productosControllers.busqueda);


module.exports = router;