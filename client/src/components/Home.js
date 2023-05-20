import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from 'axios'; // Make sure axios is installed

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services data when component mounts
    axios.get(`${process.env.REACT_APP_API_URL}/services`).then(response => {
      setServices(response.data);
    })
      .catch(error => {
        console.error('Error fetching services: ', error);
      })
  }, []);

  return (
    <>
      <div className="home">
        <div className="intro">
          <div className="intro-text">
            <h1>Premier bookkeeping & payroll services in Canada</h1>
            <p>Tailored Bookkeeping Solutions for Your Business</p>
          </div>
          <div className="intro-image">
            <img src={process.env.PUBLIC_URL + '/images/tree.jpg'} alt="Mountain" />
          </div>
        </div>
      </div>
      <hr className="section-break" />
      <div className="home">
        <div className="services-section">
          <h2 className="section-header">Experience peace of mind with our bookkeeping and back office services</h2>

          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <img src={process.env.PUBLIC_URL + '/images/gear.jpg'} alt="Service" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Rest of the content... */}
    </>
  );
};

export default Home;
