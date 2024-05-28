import React, { useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Missing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle error or redirection logic here
    console.log("Page Not Found");

    // You can use navigate to redirect the user to a specific page
    // navigate('/');
  }, []);

  return (
    <article style={{ padding: '100px' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
      {/* You can use Outlet here if you are using nested routes */}
      <Outlet />
    </article>
  );
};

export default Missing;
