const db = require("../database/models")
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
let loginControllers = {
        index:(req, res) =>{    
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
                                        errors.message="Los datos son incorrectos";
                                        res.locals.errors=errors;
                                        return res.render("login")
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
        }
};

module.exports = loginControllers;

