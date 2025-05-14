import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <p>If you see this, your basic component rendering is working!</p>
      <p>Navigate to <a href="/about">About Page</a> (if using HashRouter, this link might need adjustment, but with BrowserRouter and --spa flag, it should work).</p>
    </div>
  );
};

export default HomePage;
