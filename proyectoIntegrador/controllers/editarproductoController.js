const db = require("../database/models")
const op = db.Sequelize.Op;

let agregarControllers = {
    index:(req, res) =>{    
        let primaryKey = req.params.id;
        db.Producto.findByPk(primaryKey)
        .then((auto)=>{
            console.log(`hola esto es el usuario ${user}`);
            if (req.session.user == undefined){
                res.redirect("/")
            }
            else if (auto.usuarios_id == req.session.user.id){
                db.Producto.findByPk(primaryKey)
                .then(resultados=> res.render("editarproducto",{resultados}))
                .catch(err => console.log(err))
            }
            else{
                res.redirect("/")
            }
        })
    },
    post:(req,res)=>{
        let primaryKey = req.params.id;
        db.Producto.findByPk(primaryKey)
        .then((auto)=>{
            if (req.session.user == undefined){
                res.redirect("/")
            }
            else if (auto.usuarios_id == req.session.user.id){
                let actualizarauto = req.body
                db.Producto.update(actualizarauto,{where:{id:primaryKey}})
                    .then(()=> res.redirect("/"))
                    .catch(err => console.log(err))
            }
            else{
                res.redirect("/")
            }
        })
        },
    
};

module.exports = agregarControllers;