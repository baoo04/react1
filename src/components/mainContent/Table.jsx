import React from "react";

import axios from "axios";

import { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faPen, faL } from "@fortawesome/free-solid-svg-icons";

import ModalUser from "../Modals/ModalUser";

import EditModal from "../Modals/EditModal";

import DeleteModal from "../Modals/DeleteModal";

import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  loadUser,
  setEditModalOpen,
  setCreateModalOpen,
  setDeleteModalOpen,
  setLoading,
  setUser,
} from "../../redux/actions";

import "./table.scss";

const tableIndex = ["1", "2", "3", "4", "5", "6"];

export default function Table() {
  const api = "https://60becf8e6035840017c17a48.mockapi.io/users";

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const user = useSelector((state) => state.user);

  const isEditModalOpen = useSelector((state) => state.isEditModalOpen);

  const isCreateModalOpen = useSelector((state) => state.isCreateModalOpen);

  const isDeleteModalOpen = useSelector((state) => state.isDeleteModalOpen);

  const isLoading = useSelector((state) => state.isLoading);

  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [currentTable, setCurrentTable] = useState([]);

  const itemPerPage = useRef(10);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const startIndex = currentPage * itemPerPage.current;
    const endIndex = Math.min(users.length, startIndex + itemPerPage.current);
    setCurrentTable(users.slice(startIndex, endIndex));
  }, [currentPage, users]);

  const closeModal = () => {
    dispatch(setCreateModalOpen(false));
  };

  const handleModalOpen = () => {
    dispatch(setCreateModalOpen(true));
  };

  const closeEditModal = () => {
    dispatch(setEditModalOpen(false));
  };

  const handleEditModalOpen = () => {
    dispatch(setEditModalOpen(true));
  };

  //Xu ly notification
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const notify = (data) => {
    toast(data);
  };

  // Modal delete
  const showModal = (id) => {
    setUserIdToDelete(id);
    dispatch(setDeleteModalOpen(true));
  };

  const handleOk = () => {
    deleteUser(userIdToDelete);
    dispatch(setDeleteModalOpen(false));
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
        notify("User saved successfully!");
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
        notify("User Deleted successfully!");
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
      .put(api + "/" + user.id, data)
      .then(() => {
        notify("User Edited successfully!");
        getUsers();
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

  //RETURN
  return (
    <>
      <div className="table__component">
        <div className="table__header">
          <div className="table__header--left">
            <h3>Data tables</h3>
            <span>advanced table</span>
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
          {isLoading ? (
            <div className="loader-container">
              <ClipLoader color={"#000"} size={80} />
            </div>
          ) : null}
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
                {currentTable.map((user, index) => (
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
                          dispatch(setUser(user));
                          handleEditModalOpen();
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                          showModal(user.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
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
              {`Showing ${currentPage * itemPerPage.current + 1} to
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
                      pointerEvents: currentPage === 0 ? "none" : "auto",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleClickPrevious();
                    }}
                  >
                    Previous
                  </li>
                  {tableIndex.map((item, index) => (
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
                        handleClickPagination(index);
                      }}
                    >
                      {item}
                    </li>
                  ))}

                  <li
                    className="next"
                    style={{
                      pointerEvents: currentPage === 5 ? "none" : "auto",
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
        isOpen={isCreateModalOpen}
        closeModal={closeModal}
        onSave={handleSaveUser}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onSave={editUser}
        closeModal={closeEditModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={handleCancel}
        onOk={handleOk}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
}
