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
                let primaryKey = req.session.user.id; 
                let actualizarusuario =  {
                        id:req.session.user.id,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        documento: req.body.documento,
                        fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                        mail: req.body.mail,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: `/images/users/${req.file.filename}`}
                db.Usuario.update(actualizarusuario,{where:{id:primaryKey}})
                    .then(()=>{
                        req.session.user = actualizarusuario
                        res.redirect("/")
                    })
                    .catch(err => console.log(err))
            },
};

module.exports = edicionControllers;