import React from "react";
import { useState, useRef, useEffect } from "react";
import "./table.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Modal } from "antd";
import ModalUser from "../Modals/ModalUser";
import EditModal from "../Modals/EditModal";
import { useDispatch, useSelector } from "react-redux";
import {
    addUser,
    loadUser,
    editModalOpen,
    createModalOpen,
    setPreviousUser,
    setUserId,
    setAction,
    setNotification,
} from "../../redux/actions";

const tableIndex = ["1", "2", "3", "4", "5", "6"];

export default function Table() {
    const api = "https://60becf8e6035840017c17a48.mockapi.io/users";
    const selector = useSelector((store) => store);
    const dispatch = useDispatch();
    const users = selector.users;
    const statusEdit = selector.statusEdit;
    const statusCreate = selector.statusCreate;
    const previousUser = selector.prevUser;
    const userIdSelected = selector.userIdSelected;
    const action = selector.action;
    const notification = selector.notification;
    const [currentPage, setCurrentPage] = useState(0);
    const [currentTable, setCurrentTable] = useState([]);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [modalText, setModalText] = useState("");
    const itemPerPage = useRef(10);
    useEffect(() => {
        getUsers();
    }, []);
    
    useEffect(() => {
        if (action === "delete") {
            setTitle("Xoa");
            setModalText("Xoa nguoi dung nay ?");
        } else if (action === "save") {
            setTitle("Luu");
            setModalText("Luu thay doi");
        } else if (action === "create") {
            setTitle("Tao");
            setModalText("Xac nhan tao nguoi dung moi");
        }
    }, [action]);

    useEffect(() => {
        const startIndex = currentPage * itemPerPage.current;
        const endIndex = Math.min(
            users.length,
            startIndex + itemPerPage.current
        );
        setCurrentTable(users.slice(startIndex, endIndex));
    }, [currentPage, users]);

    const closeModal = () => {
        dispatch(createModalOpen(false));
    };

    const handleModalOpen = () => {
        dispatch(createModalOpen(true));
    };

    const closeEditModal = () => {
        dispatch(editModalOpen(false));
    };

    const handleEditModalOpen = () => {
        dispatch(editModalOpen(true));
    };

    //Xu ly notification
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Modal antd
    const showModal = (id, action) => {
        dispatch(setUserId(id));
        console.log("id dang duoc chon la: ", userIdSelected)
        setOpen(true);
        setAction(action);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        if (action === "delete") {
            deleteUser(userIdSelected);
        }
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // Cac ham them sua xoa Users
    const getUsers = () => {
        axios
            .get(api)
            .then((res) => {
                dispatch(loadUser(res.data));
            })
            .catch((error) => {
                console.log("Error fetching users: ", error);
            });
    };

    const handleSaveUser = (data) => {
        axios
            .post(api, data)
            .then(() => {
                getUsers();
                dispatch(setNotification("User created!"));
                setTimeout(() => {
                    dispatch(setNotification(""));
                }, 2000);
                scrollToTop();
                closeModal();
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    const deleteUser = (id) => {
        axios
            .delete(api + "/" + id)
            .then(() => {
                dispatch(setNotification("User deleted!"));
                setTimeout(() => {
                    dispatch(setNotification(""));
                }, 2000);
                getUsers();
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    const editUser = (data) => {
        console.log(data);
        axios
            .put(api + "/" + userIdToEdit, data)
            .then((response) => {
                getUsers();
                dispatch(setNotification("User edited!"));
                setTimeout(() => {
                    dispatch(setNotification(""));
                }, 2000);
                scrollToTop();
                closeEditModal();
            })
            .catch((error) => {
                console.error("Error editing user:", error);
            });
    };
    // Ham xu ly chuyen doi table

    const handleClickPagination = (index) => {
        setCurrentPage(index);
    };

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleClickPrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    //return
    return (
        <div>
            <ModalUser
                isOpen={statusCreate}
                closeModal={closeModal}
                onSave={handleSaveUser}
            />
            <EditModal
                isOpen={statusEdit}
                previousUser={previousUser}
                onSave={editUser}
                closeModal={closeEditModal}
            />
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                mask={false}
            >
                <p>{modalText}</p>
            </Modal>
            <div className="table__component">
                <div className="table__header">
                    <div className="table__header--left">
                        <h3>Data tables</h3>
                        <span>advanced table</span>
                        {notification && (
                            <div className="notification-container">
                                <div
                                    className="success-message"
                                    style={
                                        notification === "User deleted!"
                                            ? {
                                                  background: "red",
                                              }
                                            : {
                                                  background: "green",
                                              }
                                    }
                                >
                                    {notification}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="table__header--right">
                        <div>
                            <i className="fa-solid fa-gauge"></i>
                            <span>Home</span>
                        </div>
                        <i className="fa-solid fa-chevron-right"></i>
                        <a>Tables</a>
                        <i className="fa-solid fa-chevron-right"></i>
                        <a style={{ color: "#777777" }}>Data Tables</a>
                    </div>
                </div>

                <div className="Table">
                    <div className="title__group">
                        <h3 className="table__title">Hover Data Tables</h3>
                        <button
                            className="create-button"
                            onClick={() => {
                                handleModalOpen();
                            }}
                        >
                            Create
                        </button>
                    </div>
                    <div className="table__content">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        ID
                                        <i
                                            className="fa-solid fa-arrow-down-short-wide"
                                            style={{
                                                opacity: "0.7",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Name
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Phone number
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        City
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Score
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Options
                                        <i
                                            className="fa-solid fa-prescription-bottle"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTable.map(function (user, index) {
                                    return (
                                        <tr key={user.id + index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.city}</td>
                                            <td>{user.score}</td>
                                            <td className="button-group">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        dispatch(
                                                            setPreviousUser(
                                                                user
                                                            )
                                                        );
                                                        setUserIdToEdit(
                                                            user.id
                                                        );
                                                        console.log(
                                                            "user dang duoc chonn: ",
                                                            user
                                                        );
                                                        handleEditModalOpen();
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                    />
                                                </button>
                                                <button
                                                    type="primary"
                                                    className="delete-btn"
                                                    onClick={() => {
                                                        showModal(
                                                            user.id,
                                                            "delete"
                                                        );
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Score</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="table__action">
                        <div className="table__action--left">
                            {`Showing ${
                                currentPage * itemPerPage.current + 1
                            } to
                ${Math.min(
                    currentPage * itemPerPage.current + itemPerPage.current,
                    users.length
                )} of ${users.length + 1} entries`}
                        </div>

                        <div className="table__action--right">
                            <div className="table__pagination">
                                <ul className="list__action">
                                    <li
                                        className="previous"
                                        style={{
                                            pointerEvents:
                                                currentPage === 0
                                                    ? "none"
                                                    : "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            handleClickPrevious();
                                        }}
                                    >
                                        Previous
                                    </li>
                                    {tableIndex.map((item, index) => {
                                        return (
                                            <li
                                                className={
                                                    currentPage === index
                                                        ? "pagination__item active"
                                                        : "pagination__item"
                                                }
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleClickPagination(
                                                        index
                                                    );
                                                }}
                                            >
                                                {item}
                                            </li>
                                        );
                                    })}

                                    <li
                                        className="next"
                                        style={{
                                            pointerEvents:
                                                currentPage === 5
                                                    ? "none"
                                                    : "auto",
                                        }}
                                        onClick={handleClickNext}
                                    >
                                        Next
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
