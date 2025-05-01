// pages/api/register.js
import pool from '../../lib/db'; // Correct import for database connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, studentId, email, programme, year, semester, modules } = req.body;

    console.log('Received data:', req.body);  // Debugging line

    try {
      // Insert the registration data into the database
      const result = await pool.query(
        'INSERT INTO registrations (full_name, student_id, email, programme, year, semester, modules) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [fullName, studentId, email, programme, year, semester, modules.join(',')] // Joining modules as a string
      );
      console.log('Insertion result:', result); // Debugging line
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Database insertion error:', error);
      res.status(500).json({ success: false, error: 'Error inserting data into the database' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
