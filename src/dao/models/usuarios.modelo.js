import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: String, 
    email: {
        type: String, 
        unique: true
    }, 
    apellido: String, 
    password: String,            
    role: {
        type: String,
        enum: ['user', 'premium', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true, 
    strict: false
});

// Método para verificar roles
usuarioSchema.methods.hasRole = function(role) {
    return this.role === role;
};

// Método para verificar múltiples roles
usuarioSchema.methods.hasAnyRole = function(roles) {
    return roles.includes(this.role);
};

const usuariosModelo = mongoose.model('usuarios', usuarioSchema);

export default usuariosModelo;