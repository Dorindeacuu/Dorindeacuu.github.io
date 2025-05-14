import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>About Page</h1>
      <p>This is the about page. Routing to this page means react-router-dom is functioning.</p>
      <p><a href="/">Go to Home Page</a></p>
    </div>
  );
};

export default AboutPage;
