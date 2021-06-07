const db = require("../database/models")
const op = db.Sequelize.Op;
let perfilControllers = {
          index:(req, res) =>{    
                db.Usuario.findByPk(`${req.session.user.id}`)
            .then(resultados=> res.render("miPerfil",{resultados}))
            .catch(err => console.log(err))

        },
        borrar: (req, res)=>{
            let primaryKey = req.params.id;
            db.Usuario.destroy({
                where: {
                    id: primaryKey
                }
            })
            .then(()=> res.redirect('/'))
            .catch(err=> console.log(err))
        },

};

module.exports = perfilControllers;