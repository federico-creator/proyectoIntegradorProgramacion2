const db = require("../database/models")
const op = db.Sequelize.Op;
let productosControllers = {
    index: (req, res) => {
        db.Producto.findAll({include:[
            { association: "usuarios" },
            { association: "comentarios"}
        ]})
        .then(products=>{return res.render("allProducts", { products })})
        .catch((err)=>{console.log(err)})
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
        if(req.session.user == undefined){
            return res.redirect(`/usuarios/login`)
        }
        else{
            const comentario = {
                created_at: new Date(),//eso esta creado así para mostrar que hay otra forma de hacer el created at sin timestamps
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
    borrar: (req, res) => {
        let primaryKey = req.params.id;
        db.Producto.findByPk(primaryKey)
        .then(auto=>{
            if (req.session.user == undefined){
                res.redirect(`/productos/busqueda/${req.params.id}`)
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
                res.redirect(`/productos/busqueda/${req.params.id}`)
            }
        })
        },

        //busqueda por metodo search
        search: (req, res) => {
            let busqueda= req.query.search
            db.Producto.findAll({
                where: {[op.or]: [
                    { marca: {[op.like]: busqueda} },
                    { modelo: {[op.like]: busqueda} },
                    { año: {[op.like]: busqueda} },
                    // este sería el comando si año fuese una date{año: {[op.between]: [`${busqueda}-01-01` ,`${busqueda}-12-30` ]}},
                    {color: {[op.like]: busqueda}},
                    {descripcion: {[op.like]: `%${busqueda}%`}}
                  ]
                },include: [
                    { association: "usuarios" },
                    { association: "comentarios" },
                ],})
                .then(resultados=>{
                    return res.render("busqueda", {"search": resultados,busqueda})})
                .catch(err=> console.log(err))
        },

        //editar producto

        editar:(req, res) =>{    
            let primaryKey = req.params.id;
            db.Producto.findByPk(primaryKey)
            .then((auto)=>{
                if (req.session.user == undefined){
                    res.redirect(`/productos/busqueda/${req.params.id}`)
                }
                else if (auto.usuarios_id == req.session.user.id){
                    db.Producto.findByPk(primaryKey)
                    .then(resultados=> res.render("editarproducto",{resultados}))
                    .catch(err => console.log(err))
                }
                else{
                    res.redirect(`/productos/busqueda/${req.params.id}`)
                }
            })
        },
        editarpost:(req,res)=>{
            let primaryKey = req.params.id;
            db.Producto.findByPk(primaryKey)
            .then((auto)=>{
                if (req.session.user == undefined){
                    res.redirect(`/productos/busqueda/${req.params.id}`)
                }
                else if (auto.usuarios_id == req.session.user.id){
                    let actualizarauto = {marca: req.body.marca,
                        modelo: req.body.modelo,
                        año: req.body.año,
                        color: req.body.color,
                        foto: `/images/products/${req.file.filename}`,
                        descripcion: req.body.descripcion,
                        descripcionlarga: req.body.descripcionlarga,
                        usuarios_id: req.session.user.id}
                    db.Producto.update(actualizarauto,{where:{id:primaryKey}})
                        .then(()=> res.redirect("/"))
                        .catch(err => console.log(err))
                }
                else{
                    res.redirect(`/productos/busqueda/${req.params.id}`)
                }
            })
            },

    // agregar producto
    agregar:(req, res) =>{    
        if (req.session.user != null) {
            res.render('agregar')
        } else {
            res.redirect("/")
        }
    },
    agregarpost:(req, res) =>{   
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

}

module.exports = productosControllers;