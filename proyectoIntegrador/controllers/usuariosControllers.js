const db = require("../database/models")
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const usuarios = db.Usuario

let usuariosControllers = {
    // todos los usuarios
    index: (req, res) => {
        db.Usuario.findAll({ include: [{ association: "productos" }, { association: "comentarios" }] })
        .then(products => {
            return res.render("allUsers",{products})
        })
        .catch(err => console.log(err))
    },
    //usuarios individuales
    individuales: (req, res) => {
        db.Usuario.findByPk(`${req.params.id}`, { include: [{ association: "productos" }, { association: "comentarios" }] })
        .then(resultados => {
            return res.render("usuarios", {resultados})
        })
        .catch(err => console.log(err))
    },
    // registration
    registration:(req, res) =>{
        if (req.session.user == null) {
                res.render('registration')
        } else {
                res.redirect("/")
        }
    },
    registrationstore: (req,res) => {
        let errors = {};

        if(req.body.mail == ""){ //Ver si el mail está vacío
                errors.message = "Email no puede estar vacío";
                res.locals.errors = errors;

                return res.render('registration');

        } else if (req.body.password == "") { //Ver si el password no está vacío
                errors.message = "Password no puede estar vacío";
                res.locals.errors = errors;

                return res.render('registration');

        } else if(req.body.password != req.body.repassword){
                errors.message = "Las contraseñas no coinciden";
                res.locals.errors = errors;

                return res.render('registration');
        } else {
                usuarios.findOne({
                        where:[{mail: req.body.mail}]
                })
                .then(usuarios => {
                        if(usuarios !== null){
                                errors.message = "El mail ingresado ya existe";
                                res.locals.errors = errors;

                                return res.render('registration');
                        } 

                       else {
                               let user = {
                                       nombre: req.body.nombre,
                                       apellido: req.body.apellido,
                                       documento: req.body.documento,
                                       fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                                       mail: req.body.mail,
                                       password: bcrypt.hashSync(req.body.password, 10)
                                }
                                db.Usuario.create(user)
                                .then(user => {
                                        req.session.user = user
                                        return res.redirect('/')
                                })
                                .catch(err => console.log(`el error es ${err}`))
                       }
                })
                .catch(err => console.log(err))
        }
    },

    //login de usuario

    login:(req, res) =>{    
        if (req.session.user == null) {
                res.render('login')
    } else {
            res.redirect("/")
        }
    },
    processLogin: (req, res) => {
        let errors={}
        db.Usuario.findOne({
                where:[{mail: req.body.mail}]
        })
                .then(user =>{
                        if(user==null){
                                errors.message="Los datos son incorrectos";
                                res.locals.errors=errors;
                                return res.render("login")
                        }
                        else if(bcrypt.compareSync(req.body.password, user.password)==false){
                                if(req.body.password==user.password){
                                        req.session.user = user
                                        if(req.body.recordame != null){
                                        res.cookie('usuarioId', user.id, {maxAge: 1000 * 60 * 60})
                                }
                                return res.redirect('/')    
                                }
                                else{
                                        errors.message="Los datos son incorrectos";
                                  res.locals.errors=errors;
                                  return res.render("login")
                                }
                                 
                        }
                        else {
                                req.session.user = user
                                if(req.body.recordame != null){
                                        res.cookie('usuarioId', user.id, {maxAge: 1000 * 60 * 60})
                                }
                                return res.redirect('/')

                        }
                })
                
                .catch(error => console.log(error))
    },
    logout: (req, res) => {
            req.session.destroy()
            res.clearCookie('usuarioId')

            return res.redirect('/')
    },

    //mi perfil controllers

    perfil:(req, res) =>{   
        if (req.session.user != null) {
            db.Usuario.findByPk(`${req.session.user.id}`,{include: [{ association: "productos" },{ association: "comentarios" }]})
            .then(resultados=> res.render("miPerfil",{resultados}))
            .catch(err => console.log(err))
        } else {
            res.redirect("/")
        }

    },
    borrar: (req, res)=>{
        if(req.session.user != null) {
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
        }
        else{
            res.redirect("/")
        }
    },
    edicion:(req, res) =>{   
        if (req.session.user != null) {
                db.Usuario.findByPk(`${req.session.user.id}`)
                .then(resultados => res.render("edicion", { resultados }))
                .catch(err => console.log(err))
        } else {
                res.redirect("/")
        } 
    },
    //edición de perfil
    edicionpost:(req,res)=>{
            let errors = {};
            let primaryKey = req.session.user.id;

            if(req.body.mail == ""){ //Ver si el mail está vacío
                    errors.message = "Email no puede estar vacío";
                    res.locals.errors = errors;

                    return res.redirect('/edicion');

            } 
            else { if(req.body.password == ""){
                            let actualizarusuario =  {
                                    id:req.session.user.id,
                                    nombre: req.body.nombre,
                                    apellido: req.body.apellido,
                                    documento: req.body.documento,
                                    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                                    mail: req.body.mail,
                                    password: req.session.user.password,
                                    avatar: req.session.user.avatar}
                            db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
                            .then(()=>{
                                    req.session.user = actualizarusuario
                                    res.redirect("/")
                            })
                            .catch(err => console.log(err))
                    
                    }
                    else{     
                            if(bcrypt.compareSync(req.body.confirmpassword, req.session.user.password)==false){
                                    errors.message="Los datos de la contraseña son incorrectos";
                                    res.locals.errors=errors;
                                    return res.redirect("/edicion");}
                            else{let actualizarusuario =  {
                                    id:req.session.user.id,
                                    nombre: req.body.nombre,
                                    apellido: req.body.apellido,
                                    documento: req.body.documento,
                                    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                                    mail: req.body.mail,
                                    password: bcrypt.hashSync(req.body.password, 10),
                                    avatar: req.session.user.avatar}
                            db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
                            .then(()=>{
                                    req.session.user = actualizarusuario
                                    res.redirect("/")
                            })
                            .catch(err => console.log(err))
                            }
                    }
            }
        },
    foto:(req, res) =>{   
            if (req.session.user != null) {
                    db.Usuario.findByPk(`${req.session.user.id}`)
                    .then(resultados => res.render("edicionfoto", { resultados }))
                    .catch(err => console.log(err))
            } else {
                    res.redirect("/")
            } 
    },
    agregarfoto:(req, res) =>{ 
            let primaryKey = req.session.user.id;  
            let actualizarusuario =  {
                    id:req.session.user.id,
                    nombre: req.session.user.nombre,
                    apellido: req.session.user.apellido,
                    documento: req.session.user.documento,
                    fecha_de_nacimiento: req.session.user.fecha_de_nacimiento,
                    mail: req.session.user.mail,
                    password: req.session.user.password,
                    avatar:`/images/users/${req.file.filename}`}
            db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
            .then(()=>{
                    req.session.user = actualizarusuario
                    res.redirect("/usuarios/perfil")
            })
            .catch(err => console.log(err))
            
    },
    borrarfoto:(req, res) =>{   
            let primaryKey = req.session.user.id;  
            let actualizarusuario =  {
                    id:req.session.user.id,
                    nombre: req.session.user.nombre,
                    apellido: req.session.user.apellido,
                    documento: req.session.user.documento,
                    fecha_de_nacimiento: req.session.user.fecha_de_nacimiento,
                    mail: req.session.user.mail,
                    password: req.session.user.password,
                    avatar:null}
            db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
            .then(()=>{
                    req.session.user = actualizarusuario
                    res.redirect("/usuarios/perfil")
            })
            .catch(err => console.log(err))
    },

};

module.exports = usuariosControllers;