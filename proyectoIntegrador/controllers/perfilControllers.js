const db = require("../database/models")
const op = db.Sequelize.Op;
let perfilControllers = {
        index:(req, res) =>{   
            if (req.session.user != null) {
                db.Usuario.findByPk(`${req.session.user.id}`,{include: [{ association: "productos" },{ association: "comentarios" }]})
                .then(resultados=> res.render("miPerfil",{resultados}))
                .catch(err => console.log(err))
            } else {
                res.redirect("/")
            }

        },
        borrar: (req, res)=>{
            let primaryKey = req.session.user.id;
            db.Comentario.destroy({
                where: {
                    usuarios_id: primaryKey
                }
            })
                .then(()=> db.Producto.destroy({
                    where: {
                        usuarios_id: primaryKey
                    }
                })
                    .then(()=>db.Usuario.destroy({
                        where: {
                            id: primaryKey
                        }
                    })
                        .then(()=>{
                        req.session.destroy()
                        res.clearCookie('usuarioId')
                  
                        return res.redirect('/')})))
            .catch(err=> console.log(err))
        },

};
module.exports = perfilControllers;