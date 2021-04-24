const autos = require("../data/autos");
let agregarControllers = {
    index:(req, res) =>{    
        res.render("agregar")
    },
    detalle:(req, res) =>{ 
        let productos=req.params.detalle
        let resultados= []
        for(let i=0;i<autos.lista.length;i+=1){
            if(autos.lista[i].modelo==productos){
                resultados.push(autos.lista[i])
            }
        }
        res.render("agregar", {"informacion": resultados})
    }
};

module.exports = agregarControllers;