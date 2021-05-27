let express = require('express');
let router = express.Router();
const edicionControllers = require('../controllers/edicionControllers');

/* GET registration page. */
router.get('/', edicionControllers.index);
router.post('/', edicionControllers.edicion);
module.exports = router;