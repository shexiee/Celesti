import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap"; 

const ViewAllSellers = () => {
  const [allSeller, setAllSeller] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllSeller(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Seller",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const handleDeleteClick = (userId) => {
    setSelectedSellerId(userId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      deleteSeller(selectedSellerId);
    }
    setShowConfirmationModal(false);
  };

  const deleteSeller = (userId) => {
    fetch("http://localhost:8080/api/user/delete/seller?sellerId=" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
    })
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
          <h2>All Sellers</h2>
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
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allSeller.map((seller) => {
                  return (
                    <tr key={seller.id}>
                      <td>
                        <b>{seller.firstName}</b>
                      </td>
                      <td>
                        <b>{seller.lastName}</b>
                      </td>
                      <td>
                        <b>{seller.emailId}</b>
                      </td>
                      <td>
                        <b>{seller.phoneNo}</b>
                      </td>
                      <td>
                        <b>
                          {seller.address.street +
                            ", " +
                            seller.address.city +
                            ", " +
                            seller.address.pincode}
                        </b>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteClick(seller.id)}
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
          <Modal.Title>Deactivate Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deactivate this seller?</Modal.Body>
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

export default ViewAllSellers;
