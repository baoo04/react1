import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen, faL } from "@fortawesome/free-solid-svg-icons";
import ModalUser from "../Modals/ModalUser";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import {
    loadUser,
    editModalOpen,
    createModalOpen,
    setPreviousUser,
    setUserId,
    setAction,
    setNotification,
    setDeleteModalOpen,
    setLoading,
} from "../../redux/actions";
import "./table.css";

const tableIndex = ["1", "2", "3", "4", "5", "6"];

export default function Table() {
    const api = "https://60becf8e6035840017c17a48.mockapi.io/users";
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const statusEdit = useSelector((state) => state.statusEdit);
    const statusCreate = useSelector((state) => state.statusCreate);
    const statusDelete = useSelector((state) => state.statusDelete);
    const previousUser = useSelector((state) => state.prevUser);
    const userIdSelected = useSelector((state) => state.userIdSelected);
    const action = useSelector((state) => state.action);
    const notification = useSelector((state) => state.notification);
    const statusLoading = useSelector((state) => state.statusLoading);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentTable, setCurrentTable] = useState([]);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const itemPerPage = useRef(10);
    useEffect(() => {
        getUsers();
    }, []);

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

    // Modal delete
    const showModal = (id, action) => {
        dispatch(setUserId(id));
        dispatch(setDeleteModalOpen(true));
        dispatch(setAction(action));
    };

    const handleOk = () => {
        if (action === "delete") {
            deleteUser(userIdSelected);
            dispatch(setDeleteModalOpen(false));
        }
    };
    const handleCancel = () => {
        dispatch(setDeleteModalOpen(false));
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
        dispatch(setLoading(true));
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
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    const deleteUser = (id) => {
        dispatch(setLoading(true));
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
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    const editUser = (data) => {
        dispatch(setLoading(true));
        axios
            .put(api + "/" + userIdToEdit, data)
            .then(() => {
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
            })
            .finally(() => {
                dispatch(setLoading(false));
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
                    {statusLoading ? (
                        <div className="loader-container">
                            <ClipLoader color={"#000"} size={80} />
                        </div>
                    ) : (
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
                    )}
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
                                                key={index}
                                                className={
                                                    currentPage === index
                                                        ? "pagination__item active"
                                                        : "pagination__item"
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                }}
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
            <DeleteModal
                isOpen={statusDelete}
                closeModal={handleCancel}
                onOk={handleOk}
            />
        </div>
    );
}
