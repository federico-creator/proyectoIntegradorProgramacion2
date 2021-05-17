const db = require("../database/models")
const op = db.Sequelize.Op;
let agregarControllers = {
    index:(req, res) =>{    
        res.render("agregar")
    },
    agregar:(req, res) =>{    
        let producto = {  
            marca: req.body.marca,
            modelo: req.body.modelo,
            año: req.body.año,
            color: req.body.color,
            foto: req.body.foto,
            descripcion: req.body.descripcion,
            descripcionlarga: req.body.descripcionlarga,
        }
        db.Producto.create(producto)
            .then(() => res.redirect("/"))
            .catch(err=>console.log(err))
    },
};

module.exports = agregarControllers;