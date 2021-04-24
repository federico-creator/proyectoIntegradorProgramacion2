let autos= require("../data/autos")
let indexControllers ={
        index: (req, res) => {
            let logueado = []
            for(let i=0;i<autos.lista.length;i+=1){
                logueado.push(autos.lista[i])   
            }
            logueado.push("logueado")
            res.render("index.ejs", {"products": logueado})
            
        }, 
    }

module.exports = indexControllers;