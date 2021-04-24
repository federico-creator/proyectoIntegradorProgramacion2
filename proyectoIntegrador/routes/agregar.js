let express = require('express');
let router = express.Router();
const agregarControllers = require('../controllers/agregarControllers');

/* GET registration page. */
router.get('/', agregarControllers.index);

module.exports = router;