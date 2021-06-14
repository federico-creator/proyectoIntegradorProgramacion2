let express = require('express');
let router = express.Router();
const multer = require("multer")
const path = require("path")
const edicionControllers = require('../controllers/edicionControllers');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

/* GET registration page. */
router.get('/', edicionControllers.index);
router.post('/', upload.single("avatar"),edicionControllers.edicion);
module.exports = router;