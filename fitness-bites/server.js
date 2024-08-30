const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://juanstebanvalverde:AIcnluNZrG7bATQJ@cluster0.dohfa.mongodb.net/ProyectoDiseñoWeb?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });

// Definir un esquema de datos para los contactos
const contactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    mensaje: { type: String, required: true }
});

// Crear un modelo basado en el esquema
const Contacto = mongoose.model('Contacto', contactoSchema);

// Ruta para manejar las solicitudes del formulario de contacto
app.post('/api/contacto', (req, res) => {
    const nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        correo: req.body.correo,
        mensaje: req.body.mensaje
    });

    nuevoContacto.save()
        .then(() => res.status(200).json({ message: 'Contacto guardado exitosamente' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
