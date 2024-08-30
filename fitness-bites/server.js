const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb+srv://juanstebanvalverde:AIcnluNZrG7bATQJ@cluster0.dohfa.mongodb.net/ProyectoDiseñoWeb?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });


const contactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    mensaje: { type: String, required: true }
});


const Contacto = mongoose.model('Contacto', contactoSchema);


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


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
