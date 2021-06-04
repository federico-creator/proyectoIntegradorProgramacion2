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
        },
        modelo:{
            type: dataTypes.STRING,
        },
        año:{
            type: dataTypes.DATEONLY,
        },
        color:{
            type: dataTypes.STRING,
        },
        foto:{
            type: dataTypes.STRING,
            allowNull: true
        },
        descripcion:{
            type: dataTypes.STRING,
        },
        comentarios:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        descripcionlarga:{
            type: dataTypes.STRING,
            allowNull: true
        },
        created_at:{
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        update_at:{
            type: dataTypes.DATEONLY,
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