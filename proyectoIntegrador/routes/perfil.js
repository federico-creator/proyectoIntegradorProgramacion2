let express = require('express');
let router = express.Router();
const perfilControllers = require('../controllers/perfilControllers');

/* GET registration page. */
router.get('/', perfilControllers.index);

module.exports = router;