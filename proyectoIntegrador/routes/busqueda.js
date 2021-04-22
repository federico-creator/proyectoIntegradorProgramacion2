let express = require('express');
let router = express.Router();
const busquedaController = require('../controllers/busquedaController');

/* GET products page. */
router.get('/', busquedaController.index);


module.exports = router;