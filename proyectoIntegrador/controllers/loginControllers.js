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
                                return res.redirect('/')
                        })
                        .catch(error => console.log(error))
        }
};

module.exports = loginControllers;

