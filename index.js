const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'bd'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'contraseña  requerida' });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error' });
    }
    db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash], (err, result) => {
      if (err) {
        console.error('Error registrando:', err);
        return res.status(500).json({ error: 'Error registrando' });
      }
      res.status(201).json({ message: 'Usuario registrado' });
    });
  });
});



app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Intento de inicio de sesión para el usuario:', username);

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err || results.length === 0) {
      console.log('Usuario no encontrado en la base de datos');
      return res.status(401).json({ error: 'ususario o contraseñas invalidas' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err || !result) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      console.log('Inicio de sesión exitoso para el usuario:', username);
      const token = jwt.sign({ id: user.id, username: user.username }, 'clave secreta', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});



app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error' });
    }
    res.json(results);
  });
});


app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE idusers = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
});


app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Error' });
    }
    db.query('UPDATE users SET username = ?, password_hash = ? WHERE idusers = ?', [username, hash, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error actualizando usuario' });
      }
      res.json({ message: 'Usuario actualizado' });
    });
  });
});


app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE idusers = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error eliminando' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});