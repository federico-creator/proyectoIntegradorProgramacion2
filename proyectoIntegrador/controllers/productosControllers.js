const db = require("../database/models")
const op = db.Sequelize.Op;
let productosControllers ={
        index: (req, res) => {
            res.render(`secreto`);
        },
        busqueda: (req, res) => {
            db.Producto.findByPk(`${req.params.id}`)
                .then(products=>{ 
                    return res.render("products", {products});
                })
                .catch(err=> console.log(err))
        },
        logueado: (req, res) => {
            let logueado = "logueado"
            db.Producto.findByPk(`${req.params.id}`)
                .then(products=>{ 
                    return res.render("products", {products,logueado});
                })
                .catch(err=> console.log(err))
        },
        borrar: (req, res)=>{
            let primaryKey = req.params.id;
            db.Producto.destroy({
                where: {
                    id: primaryKey
                }
            })
            .then(()=> res.redirect('/'))
            .catch(err=> console.log(err))
        },
        
    }

module.exports = productosControllers;