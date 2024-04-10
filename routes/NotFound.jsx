import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
        <p>There's nothing here!</p>
        <Link style={{ color: "white" }} to="/">
          Back to Home
        </Link>
    </div>
  );
};
export default NotFound;
