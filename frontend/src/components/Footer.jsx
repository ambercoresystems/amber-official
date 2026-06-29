import React from 'react';
import logo from '../assets/amber.png';

const Footer = () => {
    return (
        <footer style={{ 
            background: 'linear-gradient(180deg, #1a1c23 0%, #111111 100%)', 
            color: 'rgba(255, 255, 255, 0.8)', 
            padding: '4rem 0 0 0', // Remove bottom padding to let copyright bar hit the edge
            width: '100%'
        }}>
            {/* Main Content Grid */}
            <div className="footer-content" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '3rem',
                maxWidth: '1200px',
                margin: '0 auto 4rem',
                padding: '0 2rem',
                textAlign: 'center' 
            }}>
                {/* Brand & Mission */}
                <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                        <img src={logo} alt="Amber Core Systems" style={{ height: '32px', width: 'auto' }} />
                        <div className="logo-name" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#fff', letterSpacing: '1px' }}>
                            AMBERCORE <span style={{ color: '#ff8c00' }}>SYSTEMS</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.7', maxWidth: '350px', opacity: 0.7 }}>
                        Empowering businesses and consumers with innovative electronic hardware, smart technologies, and comprehensive system integrations.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: '600' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: '2.2' }}>
                        <li><a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
                        <li><a href="#team" style={{ color: 'inherit', textDecoration: 'none' }}>Team</a></li>
                        <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a></li>
                        <li><a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="footer-contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: '600' }}>Contact Information</h4>
                    <div style={{ fontSize: '0.85rem', lineHeight: '1.8', opacity: 0.8 }}>
                        376, Corporate Building, 3rd Floor,<br />
                        Room No. T-01,ASIET Kalady, Ernakulam,<br />
                        Kerala — 683574, India
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                        <strong>Email:</strong> connect.ambersystems@gmail.com<br />
                        <strong>Phone:</strong> 7306844692
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar - Correctly Aligned to the Very Bottom */}
            <div className="footer-bottom-bar" style={{ 
                borderTop: '1px solid rgba(255,255,255,0.1)', 
                padding: '1.5rem 2rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '0.8rem',
                opacity: 0.6
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span>© 2026 Ambercore Systems LLP. All rights reserved.</span>
                    <span style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', height: '12px' }}></span>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;