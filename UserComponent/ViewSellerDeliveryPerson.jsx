import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ViewSellerDeliveryPerson = () => {
  const [allDelivery, setAllDelivery] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deliveryToDelete, setDeliveryToDelete] = useState(null);
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");
  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllDelivery(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/seller/delivery-person?sellerId=" +
        seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const handleDelete = (delivery) => {
    setDeliveryToDelete(delivery);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    if (deliveryToDelete) {
      try {
        console.log(`Deleting delivery person with ID: ${deliveryToDelete.id}`);
        
        await axios.delete(
          `http://localhost:8080/api/user/delete/seller/delivery-person?deliveryId=${deliveryToDelete.id}`,
          {
            headers: {
              Authorization: "Bearer " + seller_jwtToken,
            },
          }
        );

        setAllDelivery((prevDelivery) => prevDelivery.filter((item) => item.id !== deliveryToDelete.id));

        toast.success("Delivery person deleted successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("Error deleting delivery person:", error);
        toast.error("Error deleting delivery person", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setShowConfirmationModal(false);
        setDeliveryToDelete(null);
      }
    }
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
    setDeliveryToDelete(null);
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
          <h2>All Delivery Persons</h2>
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
                {allDelivery.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>
                      <b>{delivery.firstName}</b>
                    </td>
                    <td>
                      <b>{delivery.lastName}</b>
                    </td>
                    <td>
                      <b>{delivery.emailId}</b>
                    </td>
                    <td>
                      <b>{delivery.phoneNo}</b>
                    </td>
                    <td>
                      <b>
                        {delivery.address.street +
                          ", " +
                          delivery.address.city +
                          ", " +
                          delivery.address.pincode}
                      </b>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(delivery)}
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

      <Modal show={showConfirmationModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this delivery person?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewSellerDeliveryPerson;
