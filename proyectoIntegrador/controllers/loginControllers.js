const db = require("../database/models")
const op = db.Sequelize.Op;
let loginControllers = {
        index:(req, res) =>{    
                res.render('login.ejs');
        },
        processLogin: (req, res) => {
                db.Usuario.findOne({
                        where:[{mail: req.body.mail}]
                })
                        .then(user => {
                                req.session.user = user
                                if(req.body.recordame){
                                        res.cookie('usuarioId', user.id, {maxAge: 1000 * 60 * 60})
                                }
                                return res.redirect('/')
                        })
                        .catch(error => console.log(error))
        },
        logout: (req, res) => {
                req.session.destroy()
      
                return res.redirect('/')
        }
};

module.exports = loginControllers;

