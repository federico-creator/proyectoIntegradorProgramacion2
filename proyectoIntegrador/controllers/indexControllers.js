const db = require("../database/models")
const op = db.Sequelize.Op;
let indexControllers ={
    index:function(req, res) {
        db.Producto.findAll({order:[["updated_at","desc"]]})
        .then(products=>
            {db.Producto.findAll({order:[["comentarios","desc"]]})
                .then(autos=>{ return res.render("index", {products,autos});
            })
        })
        .catch(err=> console.log(err))
    },
    }

module.exports = indexControllers;