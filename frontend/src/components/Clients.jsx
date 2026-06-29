import React from 'react';
// These will still error if the files don't exist
import iiitLogo from "../assets/iiitk.png";
import suryaLogo from "../assets/suryasanc.png";
import zooLogo from "../assets/zoopark.png";
const Clients = () => {
    const clientData = [
        // {
        //     name: "IIIT Kottayam",
        //     logo: iiitLogo,
        //     link: "https://www.iiitkottayam.ac.in/#!/home",
        // },
        {
            name: "Surya Sanc",
            logo: suryaLogo,
            link: "https://suryasanc.in/new1/index.php",
        },
        {
            name: "Thrissur Zoological Park",
            logo: zooLogo,
            link: "http://jeevdarshini.com/",
        }
    ];

    return (
        <section id="clients" style={{ background: 'var(--bg2)', padding: '5rem 4rem' }}>
            <div className="section-label" style={{ textAlign: 'center' }}>Collaborations</div>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                Our <span className="dim">Clients</span>
            </h2>

            <div className="clients-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
                {clientData.map((client, index) => (
                    <a key={index} href={client.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', textAlign: 'center' }}>
                        <div style={{
                            width: '200px', height: '100px', background: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}>
                            {client.logo ? (
                                <img src={client.logo} alt={client.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                            ) : (
                                <span style={{ color: '#ccc', fontWeight: 'bold' }}>LOGO</span>
                            )}
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>{client.name}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Clients;