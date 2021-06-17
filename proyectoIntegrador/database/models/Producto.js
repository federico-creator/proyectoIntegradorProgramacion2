module.exports = (sequelize, dataTypes) => {

    let alias = "Producto";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        marca: {
            type: dataTypes.STRING,
        },
        modelo: {
            type: dataTypes.STRING,
        },
        año: {
            type: dataTypes.INTEGER,
        },
        color: {
            type: dataTypes.STRING,
        },
        foto: {
            type: dataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: dataTypes.STRING,
        },
        descripcionlarga: {
            type: dataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        usuarios_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
    };
    let config = {
        table: "productos",
        timestamps: true,
        underscored: true,
    };

    const Producto = sequelize.define(alias, cols, config)
    Producto.associate = function (models) {
        Producto.belongsTo(models.Usuario, {
            as: "usuarios",
            foreignKey: "usuarios_id"

        });
        Producto.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "productos_id"

        });  
    } 
    return Producto 
} 
