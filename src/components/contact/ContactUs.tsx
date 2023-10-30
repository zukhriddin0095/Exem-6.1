import React, { useState } from "react";



import "./style.scss"
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Formni yuborish uchun kerakli kodni qo'shing
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="text">Contact us Form</div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>First Name</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Last Name</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Email Address</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Website Name</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data textarea">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <br />
            <div className="underline"></div>
            <label>Write your message</label>
            <br />
          </div>
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
