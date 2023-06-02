// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [date_of_birth, setDateofbirth] = useState('');
  const [active,setActive ] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      designation,
      date_of_birth,
      active,
    };

    axios.post(`/companies/${id}/users`, newUser)
      .then((response) => {
        console.log(response.data);
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setDesignation('');
        setDateofbirth('');
        setActive('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="designation">Designation</label>
          <input type="text" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </div>

        <div>
          <label htmlFor="date_of_birth">DateOfBirth</label>
          <input type="text" id="date_of_birth" value={date_of_birth} onChange={(e) =>setDateofbirth (e.target.value)} />
        </div>

        <div>
          <label htmlFor="active">Active</label>
          <input type="text" id="active" value={active} onChange={(e) =>setActive (e.target.value)} />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
