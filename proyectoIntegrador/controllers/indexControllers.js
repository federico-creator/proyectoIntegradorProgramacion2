const db = require("../database/models")
const op = db.Sequelize.Op;
let indexControllers ={
    index:function(req, res) {
        db.Producto.findAll({order:[["updated_at","desc"]],
        include:[
            { association: "usuarios" },
            { association: "comentarios"}
        ]})
        .then(products=> {db.Producto.findAll({include:[
                { association: "usuarios" },
                { association: "comentarios" }
            ],order:[["comentarios", "updated_at","desc"]],
            })
            .then(autos=>{ return res.render("index", {products,autos});
            })
        })
        .catch(err=> console.log(err))
    
    },
}
    

module.exports = indexControllers;