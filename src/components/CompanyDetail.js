// CompanyDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axios.get(`/companies/${id}`)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Company Detail</h2>
      <p>Name: {company.name}</p>
      <p>Address: {company.address}</p>
      <LoadScript googleMapsApiKey="AIzaSyCUEItLvMu4i8AtxZltHRFjkoJnjCdXtlU">
        <GoogleMap
          center={{ lat: company.latitude, lng: company.longitude }}
          zoom={14}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          <Marker position={{ lat: company.latitude, lng: company.longitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CompanyDetail;
