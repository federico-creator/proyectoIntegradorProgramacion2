module.exports= (sequelize, dataTypes)=>{

    let alias = "Producto";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        marca:{
            type: dataTypes.STRING,
            allowNull: true
        },
        modelo:{
            type: dataTypes.STRING,
            allowNull: true
        },
        año:{
            type: dataTypes.DATE,
            allowNull: true
        },
        color:{
            type: dataTypes.STRING,
            allowNull: true
        },
        foto:{
            type: dataTypes.STRING,
            allowNull: true
        },
        descripcion:{
            type: dataTypes.STRING,
            allowNull: true
        },
        comentarios:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        descripcionlarga:{
            type: dataTypes.STRING,
            allowNull: true
        },
        usuarios_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
    };
    let config={
        table: "productos",
        timestamps: false,
        underscored: true,
    };

    const Producto = sequelize.define(alias, cols,config)
    return Producto
}