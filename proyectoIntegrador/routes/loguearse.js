let express = require('express');
let router = express.Router();
const loguearseControllers = require('../controllers/loguearseControllers');

router.get('/', loguearseControllers.index);

module.exports = router;