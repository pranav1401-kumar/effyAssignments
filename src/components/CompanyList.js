import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    address: '',
    coordinates: '',
  });

  useEffect(() => {
    axios.get('/companies')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/companies', newCompany)
      .then((response) => {
        const newCompanyData = response.data;
        setCompanies((prevState) => [...prevState, newCompanyData]);
        setNewCompany({
          name: '',
          address: '',
          coordinates: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Company List</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Link to={`/companies/${company.id}`}>
              {company.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Create Company</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newCompany.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newCompany.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Coordinates:
          <input
            type="text"
            name="coordinates"
            value={newCompany.coordinates}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CompanyList;
