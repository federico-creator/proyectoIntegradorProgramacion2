const db = require("../database/models")
const op = db.Sequelize.Op;
let perfilControllers = {
          index:(req, res) =>{    
                db.Usuario.findByPk(`${req.session.user.id}`)
            .then(resultados=> res.render("miPerfil",{resultados}))
            .catch(err => console.log(err))

        }

};

module.exports = perfilControllers;