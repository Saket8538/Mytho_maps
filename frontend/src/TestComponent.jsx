import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#C8102E', fontSize: '3rem', marginBottom: '20px' }}>
        MythoMaps Test
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        If you can see this, React is working properly!
      </p>
      <div style={{ 
        backgroundColor: '#DAA520', 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '5px' 
      }}>
        System Status: ✅ Working
      </div>
    </div>
  );
};

export default TestComponent;