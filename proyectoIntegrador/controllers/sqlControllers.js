const db = require("../database/models")
const op = db.Sequelize.Op;

let controller = {
    index:function(req, res) {
        db.Producto.findAll()
        .then(resultados=>{
            return res.send(resultados)
        })
    },

}


module.exports = controller