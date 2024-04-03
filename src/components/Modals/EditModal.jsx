import React, { useEffect, useState } from "react";

import "./EditModal.scss";

import { useSelector } from "react-redux";

export default function EditModal({ isOpen, onSave, closeModal }) {
  
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber,
      city: user.city,
      score: user.score,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onSave(formData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name....."
        />
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number....."
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city....."
        />
        <label htmlFor="score">Score:</label>
        <input
          type="text"
          name="score"
          value={formData.score}
          onChange={handleChange}
          placeholder="Enter score....."
        />
        <div className="button-group">
          <button className="save-button" onClick={handleUpdate}>
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
