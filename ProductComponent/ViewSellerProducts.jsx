import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ViewSellerProducts = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  const [allProducts, setAllProducts] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/fetch/seller-wise?sellerId=" +
        seller.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProduct = (productId) => {
    fetch(
      "http://localhost:8080/api/product/delete?productId=" +
        productId +
        "&sellerId=" +
        seller.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + seller_jwtToken,
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
            }, 1000);
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
            }, 1000);
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
        }, 1000);
      });
  };

  const handleConfirmation = (confirmation) => {
    if (confirmation && productIdToDelete) {
      deleteProduct(productIdToDelete);
    }
    toggleConfirmationModal();
  };

  const toggleConfirmationModal = (productId = null) => {
    setProductIdToDelete(productId);
    setShowConfirmationModal(!showConfirmationModal);
  };

  const updateProduct = (product) => {
    navigate("/seller/product/update", { state: product });
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
          <h2>My Products</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <Modal show={showConfirmationModal} onHide={() => handleConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleConfirmation(true)}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => handleConfirmation(false)}>
                No
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            product.image1
                          }
                          className="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{product.name}</b>
                      </td>
                      <td>
                        <b>{product.description}</b>
                      </td>
                      <td>
                        <b>{product.category.name}</b>
                      </td>
                      <td>
                        <b>{product.quantity}</b>
                      </td>
                      <td>
                        <b>{product.price}</b>
                      </td>

                      <td>
                        <button
                          onClick={() => updateProduct(product)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => toggleConfirmationModal(product.id)}
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
    </div>
  );
};

export default ViewSellerProducts;
