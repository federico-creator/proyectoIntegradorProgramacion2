let express = require('express');
let router = express.Router();
const comentariosControllers = require('../controllers/comentariosControllers');

/* GET registration page. */
router.get('/', comentariosControllers);

module.exports = router;