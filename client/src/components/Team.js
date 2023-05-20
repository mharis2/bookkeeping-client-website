import React, { useEffect, useState } from "react";
import "./Team.css"; // Create a Team.css file for specific styles

function Team() {
    const [teamData, setTeamData] = useState([]);
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/teams`)
        .then(response => response.json())
        .then(data => setTeamData(data))
        .catch(err => console.error(err));
    }, []);
  
    return (
      <div className="team-page">
        <h1 className="team-title-unique">Meet the Team</h1> {/* Change here */}
        <div className="team-grid">
          {teamData.map(member => (
            <div key={member.id} className="team-card">
              <img className="team-image" src={member.image} alt={member.name} />
              <h2 className="team-name-unique">{member.name}</h2> {/* Change here */}
              <h3 className="team-position-unique">{member.position}</h3> {/* Change here */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Team;
  