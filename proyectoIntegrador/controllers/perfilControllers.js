const db = require("../database/models")
const op = db.Sequelize.Op;
let perfilControllers = {
        index:(req, res) =>{   
            if (req.session.user != null) {
                res.render('perfil')
            } else {
                res.redirect("/")
            }
            db.Usuario.findByPk(`${req.session.user.id}`,{include: [{ association: "productos" },{ association: "comentarios" }]})
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