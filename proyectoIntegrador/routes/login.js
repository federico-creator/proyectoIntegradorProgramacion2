let express = require('express');
let router = express.Router();
const loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.index);
router.post ('/', loginControllers.processLogin)
module.exports = router;