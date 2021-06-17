const db = require("../database/models")
const op = db.Sequelize.Op;
let indexControllers ={
    index:function(req, res) {
        db.Producto.findAll({order:[["updated_at","desc"]],
        include:[
            { association: "usuarios" },
            { association: "comentario"}
        ]})
        .then(products=>
            {db.Producto.findAll({order:[["comentarios","desc"]],
            include:[
                { association: "usuarios" },
                { association: "comentario" }
            ]})
            .then(autos=>{ return res.render("index", {products,autos});
            })
        })
        .catch(err=> console.log(err))
    
    },
}
    

module.exports = indexControllers;