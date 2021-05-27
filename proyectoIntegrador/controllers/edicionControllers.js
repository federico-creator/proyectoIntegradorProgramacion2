const db = require("../database/models")
const op = db.Sequelize.Op;
let edicionControllers = {
        index:(req, res) =>{    
                db.Usuario.findByPk(`${req.session.user.id}`)
            .then(resultados=> res.render("edicion",{resultados}))
            .catch(err => console.log(err))
            
        },
        edicion:(req,res)=>{
                let primaryKey = req.session.user.id; 
                let actualizarusuario = req.body
                db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
                    .then(()=> res.redirect("/"))
                    .catch(err => console.log(err))
            },
};

module.exports = edicionControllers;