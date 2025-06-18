import React from "react";
import { useLocation, Link } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  if (!state) return <div>No data submitted. <Link to="/">Go back</Link></div>;

  return (
    <div className="success-container">
      <h2>Form Submitted Successfully!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Form</Link>
    </div>
  );
}

export default SuccessPage;
