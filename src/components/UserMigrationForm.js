import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserMigrationForm = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [targetCompany, setTargetCompany] = useState('');

  useEffect(() => {
    axios.get(`/companies/${id}/users`)
      .then((response) => {
        setUsers(response.data);
        if (response.data.length > 0) {
          setSelectedUser(response.data[0].id); // Set the initial selected user
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setTargetCompany(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const migrationData = {
      userId: selectedUser,
      targetCompany,
    };

    axios.post('/user-migration', migrationData)
      .then((response) => {
        console.log(response.data);
        // Reset form fields
        setSelectedUser('');
        setTargetCompany('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>User Migration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Select User</label>
          {users.length > 0 ? (
            <select id="user" value={selectedUser} onChange={handleUserChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading users...</p>
          )}
        </div>
        <div>
          <label htmlFor="company">Select Target Company</label>
          <input type="text" id="company" value={targetCompany} onChange={handleCompanyChange} />
        </div>
        <button type="submit">Migrate User</button>
      </form>
    </div>
  );
};

export default UserMigrationForm;
