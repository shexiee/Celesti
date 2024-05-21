import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const allCategories = await retrieveAllCategory();
      if (allCategories) {
        setAllCategories(allCategories.categories);
      }
    };

    getAllCategory();
  }, []);

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      deleteCategory(selectedCategoryId);
    }
    setShowConfirmationModal(false);
  };

  const deleteCategory = (categoryId) => {
    fetch(
      "http://localhost:8080/api/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems the server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Categories</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>
                        <b>{category.id}</b>
                      </td>
                      <td>
                        <b>{category.name}</b>
                      </td>
                      <td>
                        <b>{category.description}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => updateCategory(category)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDeleteClick(category.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => handleConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleConfirmation(true)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => handleConfirmation(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllCategories;
