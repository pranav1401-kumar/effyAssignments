import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const UserList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`/companies/${id}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <h2>User List</h2>
      <Link to={`/companies/${id}/users/create`}>Create User</Link>

      <div>
        <h2>User List</h2>
        <Link to={`/companies/${id}/users/migrate`}>Migrate User</Link>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
