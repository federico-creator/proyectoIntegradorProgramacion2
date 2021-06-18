const db = require("../database/models")
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
let edicionControllers = {
        index:(req, res) =>{   
                if (req.session.user != null) {
                        db.Usuario.findByPk(`${req.session.user.id}`)
                        .then(resultados => res.render("edicion", { resultados }))
                        .catch(err => console.log(err))
                } else {
                        res.redirect("/")
                } 
        },
        edicion:(req,res)=>{
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
                        res.redirect("/perfil")
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
                        res.redirect("/perfil")
                })
                .catch(err => console.log(err))
        },
};

module.exports = edicionControllers;