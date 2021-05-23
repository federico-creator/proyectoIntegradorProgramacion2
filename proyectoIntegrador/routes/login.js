let express = require('express');
let router = express.Router();
const loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.index);
router.post ('/', loginControllers.processLogin)
router.post ("/logout", loginControllers.logout)
module.exports = router;