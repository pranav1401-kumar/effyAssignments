const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000


// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pranav@5january',
  database: 'effy',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors());
app.get('/companies', (req, res) => {
  const query = 'SELECT * FROM companies';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a specific company by ID
app.get('/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const query = 'SELECT * FROM companies WHERE id = ?';
  db.query(query, [companyId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a company
app.post('/companies', (req, res) => {
  const { name, address, coordinates } = req.body;
  const query = 'INSERT INTO companies (name, address, coordinates) VALUES (?, ?, ?)';
  db.query(query, [name, address, coordinates], (err, results) => {
    if (err) throw err;
    const newCompanyId = results.insertId;
    res.json({ id: newCompanyId, name, address, coordinates });
  });
});

// Update a company
app.put('/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const { name, address, coordinates } = req.body;
  const query = 'UPDATE companies SET name = ?, address = ?, coordinates = ? WHERE id = ?';
  db.query(query, [name, address, coordinates, companyId], (err, results) => {
    if (err) throw err;
    res.json({ id: companyId, name, address, coordinates });
  });
});

// Add a user to a company
app.post('/companies/:id/users', (req, res) => {
  const companyId = req.params.id;
  const { firstName, lastName, email, designation, dateOfBirth, active } = req.body;
  const query = 'INSERT INTO users (company_id, first_name, last_name, email, designation, date_of_birth, active) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [companyId, firstName, lastName, email, designation, dateOfBirth, active], (err, results) => {
    if (err) throw err;
    const newUserId = results.insertId;
    res.json({ id: newUserId, companyId, firstName, lastName, email, designation, dateOfBirth, active });
  });
});



// Remove a user from a company
app.delete('/companies/:id/users/:userId', (req, res) => {
  const companyId = req.params.id;
  const userId = req.params.userId;
  const query = 'DELETE FROM users WHERE id = ? AND company_id = ?';
  db.query(query, [userId, companyId], (err, results) => {
    if (err) throw err;
    res.json({ message: 'User removed from company' });
  });
});

// Delete a company
app.delete('/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const query = 'DELETE FROM companies WHERE id = ?';
  db.query(query, [companyId], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Company deleted' });
  });
});

// List users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a user
app.post('/users', (req, res) => {
  const { companyId, firstName, lastName, email, designation, dateOfBirth, active } = req.body;
  const query = 'INSERT INTO users (company_id, first_name, last_name, email, designation, date_of_birth, active) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [companyId, firstName, lastName, email, designation, dateOfBirth, active], (err, results) => {
    if (err) throw err;
    const newUserId = results.insertId;
    res.json({ id: newUserId, companyId, firstName, lastName, email, designation, dateOfBirth, active });
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { companyId, firstName, lastName, email, designation, dateOfBirth, active } = req.body;
  const query = 'UPDATE users SET company_id = ?, first_name = ?, last_name = ?, email = ?, designation = ?, date_of_birth = ?, active = ? WHERE id = ?';
  db.query(query, [companyId, firstName, lastName, email, designation, dateOfBirth, active, userId], (err, results) => {
    if (err) throw err;
    res.json({ id: userId, companyId, firstName, lastName, email, designation, dateOfBirth, active });
  });
});

// Deactivate a user
app.patch('/users/:id/deactivate', (req, res) => {
  const userId = req.params.id;
  const query = 'UPDATE users SET active = false WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json({ message: 'User deactivated' });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
});
function getUsersByCompanyId(companyId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE company_id = ?";
    db.query(query, [companyId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



app.get('/companies/:id/users', (req, res, next) => {
  const companyId = req.params.id;
  const query = 'SELECT * FROM users WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      return next(err);
    }
    res.json(results);
  });
});

const handleSubmit = (event) => {
  event.preventDefault();

  const migrationData = {
    userId: selectedUser,
    targetCompany: parseInt(targetCompany),
  };

  // Retrieve the user's current company ID from the database
  axios.get(`/users/${selectedUser}`)
    .then((response) => {
      const currentUser = response.data;
      const currentCompany = currentUser.company_id;

      // Perform the migration only if the user's current company is different from the target company
      if (currentCompany !== migrationData.targetCompany) {
        // Update the user's company ID
        axios.put(`/users/${selectedUser}`, migrationData)
          .then((response) => {
            console.log(response.data);
            // Reset form fields
            setSelectedUser('');
            setTargetCompany('');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log('User is already part of the target company.');
        // Reset form fields
        setSelectedUser('');
        setTargetCompany('');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};



// Handle user migration request
app.post('/user-migration', (req, res, next) => {
  const { userId, targetCompany } = req.body;
  const query = 'UPDATE users SET company_id = ? WHERE id = ?';

  db.query(query, [targetCompany, userId], (err, results) => {
    if (err) {
      console.error('Error migrating user:', err);
      return next(err);
    }

    res.json({ message: 'User migration successful' });
  });
});







app.use(cors({
  origin: 'http://localhost:3001' // Replace with the appropriate origin
}));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
