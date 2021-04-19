let autos= require("../data/autos")
let indexControllers ={
        index: (req, res) => {
            let productos = autos
            res.render("index.ejs", {"products": productos})
        }        
    }

module.exports = indexControllers;