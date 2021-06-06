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
                                               fechaNacimiento: req.body.fecha_de_nacimiento,
                                               mail: req.body.mail,
                                               password: bcrypt.hashSync(req.body.password, 10),
                                               repetir: req.body.repassword
                                        }
                                        usuarios.create(user)
                                        .then(user => {
                                                return res.redirect ('registration')
                                        })
                                        .catch(err => console.log(err))
                               }
                        })
                                .catch(err => console.log(err))
                }
        }
        
};


module.exports = registrationControllers;

