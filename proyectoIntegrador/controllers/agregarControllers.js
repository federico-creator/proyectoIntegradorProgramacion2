const db = require("../database/models")
const op = db.Sequelize.Op;
let agregarControllers = {
    index:(req, res) =>{    
        res.render("agregar")
    },
    agregar:(req, res) =>{   
        console.log(req.file.filename); 
        let producto = {  
            marca: req.body.marca,
            modelo: req.body.modelo,
            año: req.body.año,
            color: req.body.color,
            foto: `/images/products/${req.file.filename}`,
            descripcion: req.body.descripcion,
            descripcionlarga: req.body.descripcionlarga,
            usuarios_id: req.session.user.id
        }
        db.Producto.create(producto)
            .then(() => res.redirect("/"))
            .catch(err=>console.log(err))
    },
};

module.exports = agregarControllers;