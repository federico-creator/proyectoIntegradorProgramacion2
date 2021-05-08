let express = require('express');
let router = express.Router();
let sqlControllers = require("../controllers/sqlControllers")

router.get('/', sqlControllers.index);

module.exports = router;