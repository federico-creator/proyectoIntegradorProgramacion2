let autos= require("../data/autos")
let indexControllers ={
        index: (req, res) => {
            let productos = []
            for(let i=0;i<autos.lista.length;i+=1){
                productos.push(autos.lista[i])   
            }
            res.render("index.ejs", {"products": productos})
        }, 
    }

module.exports = indexControllers;