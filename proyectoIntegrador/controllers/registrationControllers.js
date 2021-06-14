const db = require("../database/models")
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const usuarios = db.Usuario


let registrationControllers =  {
        index:(req, res) =>{    
                res.render('registration')
        },
        store: (req,res) => {
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
                                        console.log(user)
                                        db.Usuario.create(user)
                                        .then(user => {
                                                req.session.user = user
                                                if (req.body.recordame != null) {
                                                        res.cookie('usuarioId', user.id, { maxAge: 1000 * 60 * 60 })
                                                }
                                                return res.redirect('/')
                                        })
                                        .catch(err => console.log(`el error es ${err}`))
                               }
                        })
                        .catch(err => console.log(err))
                }
        }
        
};


module.exports = registrationControllers;

