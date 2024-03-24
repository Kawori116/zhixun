import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <main>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/map">Map</Link>
      </div>
      <div>
        <Link to="/client">Client</Link>
      </div>
    </main>
  );
};

export default Navigation;
