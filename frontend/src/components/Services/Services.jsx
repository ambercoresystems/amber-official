import React, { useEffect, useState } from 'react';

const API = '';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const staticServices = [
        {
            title: "Product Design & Development",
            description: "End-to-end conceptualization and engineering of smart products from circuit design to enclosure modeling.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Manufacturing & Assembly",
            description: "High-precision PCB assembly and mechanical hardware integration built for industrial-grade durability.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Installation & Deployment",
            description: "Expert on-site setup, network configuration, and live testing of IoT gateway systems for seamless connectivity.",
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Maintenance & Support",
            description: "24/7 system monitoring, firmware updates over-the-air (OTA), and proactive hardware health checks.",
            image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Embedded & IoT Solutions",
            description: "Custom firmware development and cloud-native IoT platforms for real-time data visualization.",
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Consulting & Custom Solutions",
            description: "Strategic technology roadmapping and tailored engineering to solve unique operational challenges.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Training & Skill Development",
            description: "Comprehensive technical training programs to upskill teams on emerging technologies and industry best practices.",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
        }
    ];

    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetch(API + '/api/services');
                const data = await response.json();
                setServices(data.length > 0 ? data : staticServices);
            } catch {
                setServices(staticServices);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section id="services" style={{ padding: '5rem 5%', background: '#fff' }}>
            {/* Embedded styles for advanced hover effects */}
            <style>
                {`
                .srv-card {
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.06);
                    box-shadow: 0 10px 30px -15px rgba(0,0,0,0.05);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    cursor: pointer;
                }
                .srv-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px -10px rgba(255, 140, 0, 0.15);
                    border-color: rgba(255, 140, 0, 0.3);
                }
                .srv-img-wrap {
                    height: 200px;
                    overflow: hidden;
                    position: relative;
                }
                .srv-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .srv-card:hover .srv-img {
                    transform: scale(1.08);
                }
                .srv-arrow {
                    transition: transform 0.3s ease;
                    color: #ff8c00;
                    font-weight: bold;
                }
                .srv-card:hover .srv-arrow {
                    transform: translateX(5px);
                }
                `}
            </style>

            <div className="section-label" style={{ textAlign: 'center' }}>Expertise</div>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                Service <span className="dim">Offerings</span>
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', /* Safe mobile width */
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                {!loading && services.map((s, i) => (
                    <div className="srv-card" key={i}>
                        <div className="srv-img-wrap">
                            <img src={s.image} alt={s.title} className="srv-img" />
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <h3 style={{ fontFamily: 'Syne', fontSize: '1.2rem', marginBottom: '0.8rem', color: '#111' }}>
                                {s.title}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: '1.7', flexGrow: 1 }}>
                                {s.description}
                            </p>
                           
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;