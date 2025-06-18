import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./assets";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Min 6 chars";
    if (!formData.phoneCode || !formData.phoneNumber) newErrors.phone = "Phone code and number required";
    if (!formData.country) newErrors.country = "Select country";
    if (!formData.city) newErrors.city = "Select city";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = "Invalid PAN";
    if (!formData.aadhar || !/^[0-9]{12}$/.test(formData.aadhar)) newErrors.aadhar = "Invalid Aadhar";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>

      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <div className="error">{errors.firstName}</div>

      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <div className="error">{errors.lastName}</div>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <div className="error">{errors.username}</div>

      <input name="email" placeholder="E-mail" onChange={handleChange} />
      <div className="error">{errors.email}</div>

      <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="button" onClick={() => setShowPassword((p) => !p)}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <div className="error">{errors.password}</div>

      <div className="phone-inputs">
        <input name="phoneCode" placeholder="+Code" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
      </div>
      <div className="error">{errors.phone}</div>

      <select name="country" onChange={handleChange}>
        <option value="">Select Country</option>
        {Object.keys(countries).map((ctry) => (
          <option key={ctry} value={ctry}>{ctry}</option>
        ))}
      </select>
      <div className="error">{errors.country}</div>

      <select name="city" onChange={handleChange}>
        <option value="">Select City</option>
        {formData.country &&
          countries[formData.country].map((cty) => (
            <option key={cty} value={cty}>{cty}</option>
          ))}
      </select>
      <div className="error">{errors.city}</div>

      <input name="pan" placeholder="PAN No." onChange={handleChange} />
      <div className="error">{errors.pan}</div>

      <input name="aadhar" placeholder="Aadhar No." onChange={handleChange} />
      <div className="error">{errors.aadhar}</div>

      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  );
}

export default FormPage;
