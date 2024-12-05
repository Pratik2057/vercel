// api/register.js
const { Client } = require('pg');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // Check if the user already exists
      const checkUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      if (checkUser.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Insert the new user into the database
      await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
      res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
