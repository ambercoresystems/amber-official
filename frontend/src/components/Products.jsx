import React from 'react';

const Products = () => {
  const products = [
    {
      title: "Comprehensive Electronic Solutions",
      category: "Integrated Systems",
      description: "End-to-end electronic solutions encompassing design, manufacturing, distribution, and complete technical support lifecycle.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      status: "Operational"
    },
    {
      title: "Hardware Engineering",
      category: "Design & Development",
      description: "Designing, developing, and manufacturing advanced electronic devices, computer hardware, and custom components.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      status: "Core Capability"
    },
    {
      title: "Smart Automation",
      category: "Intelligent Tech",
      description: "Integrating intelligent technologies and control systems to deliver enhanced functionality and seamless automation.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
      status: "Strategic Innovation"
    }
  ];

  return (
    <section id="products" style={{ background: 'var(--bg2)', padding: '5rem 5%' }}>
      {/* Embedded styles for advanced hover effects */}
      <style>
        {`
        .prod-card {
            background: #fff;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.04);
            transition: all 0.4s ease;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .prod-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        }
        .prod-img-wrap {
            height: 240px;
            overflow: hidden;
            position: relative;
        }
        .prod-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s ease;
        }
        .prod-card:hover .prod-img {
            transform: scale(1.05);
        }
        .prod-badge {
            position: absolute;
            top: 1.2rem;
            right: 1.2rem;
            background: rgba(17, 17, 17, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #ff8c00;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid rgba(255,140,0,0.3);
        }
        `}
      </style>

      <div className="section-label" style={{ textAlign: 'center' }}>Pioneering Advancement</div>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Our <span className="dim">Core Capabilities</span>
      </h2>
      
      <p style={{ 
        maxWidth: '750px', 
        color: 'rgba(0,0,0,0.6)', 
        margin: '0 auto 4rem', 
        textAlign: 'center',
        lineHeight: '1.8',
        fontSize: '1rem' 
      }}>
        At <strong>Ambercore Systems LLP</strong>, our primary objective is to carry on the business of 
        designing, developing, manufacturing, and assembling cutting-edge electronic hardware products.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', /* Safe mobile width */
        gap: '2.5rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.map((item, index) => (
          <div key={index} className="prod-card">
            <div className="prod-img-wrap">
              <img src={item.image} alt={item.title} className="prod-img" />
              <div className="prod-badge">{item.status}</div>
            </div>
            
            <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{ fontSize: '0.75rem', color: '#ff8c00', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', marginBottom: '0.8rem' }}>
                {item.category}
              </span>
              <h3 style={{ fontFamily: 'Syne', fontSize: '1.4rem', color: '#111', marginBottom: '1rem', lineHeight: '1.3' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: '1.7', flexGrow: 1 }}>
                {item.description}
              </p>
              
              <div style={{ 
                marginTop: '2rem', 
                paddingTop: '1.5rem', 
                borderTop: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;