import React from 'react';

const Team = () => {
  const leadership = [
    {
      name: "Abhijith P M",
      role: "Chief Technology Officer (CTO), Managing Partner",
      initial: "A"
    },
    {
      name: "Amaljith N Raj",
      role: "Chief Strategy Officer (CSO), Managing Partner",
      initial: "M"
    },
    {
      name: "Bhagyaraj J",
      role: "Chief Human Resource Officer (CHRO),Partner",
      initial: "B"
    },   
    {
      name: "Harikrishnan A",
      role: "Embedded Firmware Engineer,Partner",
      initial: "H"
    },
  ];

  return (
    <section id="team" style={{ background: '#fff', padding: '5rem 4rem' }}>
      <div className="section-label" style={{ textAlign: 'center' }}>The People</div>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        Leadership <span className="dim">Team</span>
      </h2>

      <div className="team-grid" style={{
        display: 'grid',
        // Increased minmax from 220px to 250px to provide more room
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {leadership.map((member, index) => (
          <div key={index} className="team-card" style={{ 
            textAlign: 'center',
            padding: '2.5rem 1.5rem', // Added more horizontal padding
            background: 'var(--bg2)',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Professional Initial Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--dark)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'Syne, sans-serif',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              {member.initial}
            </div>

            <h3 style={{ 
              fontFamily: 'Poppins, Syne, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.6rem',
              color: 'var(--dark)',
              lineHeight: '1.3',
              maxWidth: '100%',
              wordWrap: 'break-word',
              letterSpacing: '0.5px',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
            }}>
              {member.name}
            </h3>
            
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#ff8c00', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              fontWeight: '700'
            }}>
              {member.role}
            </div>

            <div style={{
              marginTop: '1.5rem',
              height: '1px',
              width: '40px',
              background: 'rgba(0,0,0,0.1)'
            }}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;