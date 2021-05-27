const db = require("../database/models")
const op = db.Sequelize.Op;
let productosControllers ={
    index: (req, res) => {
        let busqueda= req.query.search
        db.Producto.findAll({
            where: {[op.or]: [
                { marca: {[op.like]: busqueda} },
                { modelo: {[op.like]: busqueda} },
                {año: {[op.between]: [`${busqueda}-01-01` ,`${busqueda}-12-30` ]}},
                {color: {[op.like]: busqueda}}
              ]
            }})
            .then(resultados=>{
                console.log(resultados);
                return res.render("busqueda", {"search": resultados,busqueda})})
            .catch(err=> console.log(err))
    },
}

module.exports = productosControllers;