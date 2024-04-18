import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllCustomer(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Customer",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const handleDeleteClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      deleteCustomer(selectedCustomerId);
    }
    setShowConfirmationModal(false);
  };

  const deleteCustomer = (customerId) => {
    axios
      .delete(`http://localhost:8080/api/user/delete/customer?customerId=${customerId}`, {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      })
      .then((response) => {
        toast.success(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Refresh the customer list after deletion
        const updatedCustomers = allCustomer.filter((customer) => customer.id !== customerId);
        setAllCustomer(updatedCustomers);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error deleting customer", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
          <h2>All Customers</h2>
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
                {allCustomer.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <b>{customer.firstName}</b>
                    </td>
                    <td>
                      <b>{customer.lastName}</b>
                    </td>
                    <td>
                      <b>{customer.emailId}</b>
                    </td>
                    <td>
                      <b>{customer.phoneNo}</b>
                    </td>
                    <td>
                      <b>
                        {customer.address.street +
                          ", " +
                          customer.address.city +
                          ", " +
                          customer.address.pincode}
                      </b>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteClick(customer.id)}
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => handleConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
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

export default ViewAllCustomers;
