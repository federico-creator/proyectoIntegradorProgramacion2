const db = require("../database/models")
const op = db.Sequelize.Op;
let productosControllers = {
    index: (req, res) => {
        res.render(`secreto`);
    },
    busqueda: (req, res) => {
        db.Producto.findByPk(`${req.params.id}`)
            .then(products => {
                db.Comentario.findAll({
                    where: {

                        productos_id: products.id
                    },
                    include: [
                        { association: "usuarios" },
                    ]

                })
                    .then(comentarios => {
                        return res.render("products", { products, comentarios });
                    }
                    )

            })

            .catch(err => console.log(err))
    },
    comentar: (req, res) => {
        const comentario = {
            created_at: new Date(),
            updated_at: new Date(),
            texto: req.body.comentario,
            productos_id: req.params.id,
            usuarios_id: req.session.user.id
        }
        db.Comentario.create(comentario)
            .then(() =>
                res.redirect(`/productos/busqueda/${req.params.id}`)
            )
            .catch(err => console.log(`el error es ${err}`))



    },
    logueado: (req, res) => {
        let logueado = "logueado"
        db.Producto.findByPk(`${req.params.id}`)
            .then(products => {
                return res.render("products", { products, logueado });
            })
            .catch(err => console.log(err))
    },
    borrar: (req, res) => {
        let primaryKey = req.params.id;
        db.Comentario.destroy({
            where: {
                productos_id: primaryKey
            }
        })
            .then(()=>db.Producto.destroy({
                where: {
                    id: primaryKey
                }
                })
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err))
            )
        },

}

module.exports = productosControllers;