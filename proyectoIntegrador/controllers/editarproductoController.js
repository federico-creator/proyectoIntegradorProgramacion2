const db = require("../database/models")
const op = db.Sequelize.Op;

let agregarControllers = {
    index:(req, res) =>{    
        db.Producto.findByPk(`${req.params.id}`)
            .then(resultados=> res.render("editarproducto",{resultados}))
            .catch(err => console.log(err))
    },
    post:(req,res)=>{
        let primaryKey = req.params.id; 
        let actualizarauto = req.body
        console.log(primaryKey);
        console.log(actualizarauto);
        db.Producto.update(actualizarauto,{where:{id:primaryKey}})
            .then(resultados=> res.redirect("/"))
            .catch(err => console.log(err))
    },
    
};

module.exports = agregarControllers;