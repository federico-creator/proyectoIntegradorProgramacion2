let express = require('express');
let router = express.Router();
const loginControllers = require('../controllers/loginControllers');

/* GET registration page. */
router.get('/', loginControllers.index);

module.exports = router;