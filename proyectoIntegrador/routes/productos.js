let express = require('express');
let router = express.Router();
const productosControllers = require('../controllers/productosControllers');

/* GET registration page. */
router.get('/', productosControllers);

module.exports = router;