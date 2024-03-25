import React from "react";
import "./DeleteModal.css";

export default function DeleteModal({isOpen, onOk, closeModal}) {
    if (!isOpen) return null;
    return (
        <div className="delete-modal">
            <div className="delete-modal__content">
                <span
                    className="close"
                    onClick={() => {
                        closeModal();
                    }}
                >
                    &times;
                </span>
                <p>Bạn có chắc muốn xóa người dùng này không?</p>
                <div className="button-group">
                    <button className="btn btn-ok" onClick={onOk}>
                        OK
                    </button>
                    <button
                        className="btn btn-cancel"
                        onClick={(e) => {
                            console.log("=====>abc");
                            closeModal();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
