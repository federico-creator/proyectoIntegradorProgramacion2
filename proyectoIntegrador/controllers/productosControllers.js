const db = require("../database/models")
const op = db.Sequelize.Op;
let productosControllers = {
    index: (req, res) => {
        res.render(`secreto`);
    },
    busqueda: (req, res) => {
        db.Producto.findByPk(`${req.params.id}`, {include: [
            { association: "usuarios" },
        ]})
            .then(products => {
                db.Comentario.findAll({
                    where: {
                        productos_id: products.id
                    },
                    include: [
                        { association: "usuarios" },
                    ],
                    order: [
                        ['updated_at', 'DESC' ]
                    ],

                })
                    .then(comentarios => {
                        return res.render("products", { products, comentarios });
                    }
                    )

            })

            .catch(err => console.log(err))
    },
    comentar: (req, res) => {
        let errors = {}
        if(req.session.user == undefined){
            errors.message="No posee un usuario para cargar comentarios, cree uno ahora mismo";
            res.locals.errors=errors;
            console.log(res.locals.errors); 
            return res.redirect(`/productos/busqueda/${req.params.id}`)
        }
        else{
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
        }
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
        db.Producto.findByPk(primaryKey)
        .then(auto=>{
            if (req.session.user == undefined){
                res.redirect("/")
            }
            else if (auto.usuarios_id == req.session.user.id){
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
            }
            else{
                res.redirect("/")
            }
        })
        },

}

module.exports = productosControllers;