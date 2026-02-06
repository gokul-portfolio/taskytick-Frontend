import React from "react";
import notfound from '../assets/images/home/page-not-found.webp'
import Button from "../components/common/Button";


const PageNotFound = () => {
  return (
    <div className="pnf-wrapper">
      <div className="pnf-card">

        {/* IMAGE */}
        <div className="pnf-image">
          <img
            src={notfound} className="img-fluid"
            alt="Page Not Found"
          />
        </div>

        {/* TEXT */}
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-subtitle">Page Not Found</h2>
        <p className="pnf-text">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Button
          label="Go Back"
          onClick={() => window.history.back()}
        />

      </div>
    </div>
  );
};

export default PageNotFound;
