const db = require("../database/models")
const op = db.Sequelize.Op;
let indexControllers ={
    index:function(req, res) {
        db.Producto.findAll()
        .then(products=>{
            return res.render("index", {products});
        })
        .catch(err=> console.log(err))
    },
    }

module.exports = indexControllers;