// api/login.js
const { Client } = require('pg');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // Check if the user exists and password matches
      const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);

      if (user.rows.length > 0) {
        if (user.rows[0].password === password) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        return res.status(400).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
