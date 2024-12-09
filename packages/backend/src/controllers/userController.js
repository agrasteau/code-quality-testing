const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

exports.registerUser = (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const database = db.getDb();

  database.run(
    `INSERT INTO users (username, password, firstname, lastname) VALUES (?, ?, ?, ?)`,
    [username, hashedPassword, firstname, lastname],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating user' });
      }

      const token = jwt.sign({ id: this.lastID }, 'your-super-secret-key-that-should-not-be-hardcoded', {
        expiresIn: 86400
      });

      res.status(201).json({ auth: true, token });
    }
  );
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const database = db.getDb();

  database.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error on the server.' });
    if (!user) return res.status(404).json({ error: 'No user found.' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'your-super-secret-key-that-should-not-be-hardcoded', { expiresIn: 86400 });

    res.status(200).json({
      auth: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
    });
  });
};

exports.getAllUsers = (req, res) => {
  const database = db.getDb();

  database.all(`SELECT id, username, firstname, lastname, created_at FROM users`, [], (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error getting users' });
    }
    res.json(users);
  });
};
