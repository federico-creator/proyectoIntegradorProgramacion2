const db = require("../database/models")
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');


let registrationControllers =  {
        index:(req, res) =>{    
                res.render('registration')
        },
        registro:(req, res) =>{  
                let passEncriptada = bcrypt.hashSync(`${req.body.password}`, 10);  
                let usuario = {  
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        documento: req.body.documento,
                        fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                        mail: req.body.mail,
                        password: passEncriptada,
                    }
                    db.Usuario.create(usuario)
                        .then(() => res.redirect("/"))
                        .catch(err=>console.log(err))
        }
        
};

module.exports = registrationControllers;