import React, { useState } from "react";
import "./ModalUser.css";

export default function ModalUser({ isOpen, closeModal, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        city: "",
        score: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        onSave(formData);
        closeModal();
    };
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
                <button className="save-button" onClick={handleSubmit}>
                    <span>Save</span>
                </button>
                <button className="cancel-button" onClick={closeModal}>
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    );
}
