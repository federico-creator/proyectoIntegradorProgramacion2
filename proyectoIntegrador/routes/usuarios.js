let express = require('express');
let router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');

/* GET registration page. */
router.get('/', usuariosControllers.index);

module.exports = router;