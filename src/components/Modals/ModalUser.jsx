import React, { useState, useEffect } from "react";

import "./ModalUser.scss";

export default function ModalUser({ isOpen, closeModal, onSave }) {
  
  const initialFormData = {
    name: "",
    phoneNumber: "",
    city: "",
    score: "",
  };

  const initialErrors = {
    name: "",
    phoneNumber: "",
    city: "",
    score: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
      closeModal();
      setFormData(initialFormData);
      setErrors(initialErrors);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setErrors(initialErrors);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create User</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name....."
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number....."
        />
        {errors.phoneNumber && (
          <span className="error">{errors.phoneNumber}</span>
        )}
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city....."
        />
        {errors.city && <span className="error">{errors.city}</span>}
        <label htmlFor="score">Score:</label>
        <input
          type="text"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="Enter score....."
        />
        {errors.score && (
          <span
            className="error"
            style={{ marginTop: "-100px", display: "inline-block" }}
          >
            {errors.score}
          </span>
        )}
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>
            <span>Save</span>
          </button>
          <button className="cancel-button" onClick={closeModal}>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
