import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ViewMyCart = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const [carts, setCarts] = useState([]);
  const [cartAmount, setCartAmount] = useState("0.0");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getAllCart = async () => {
      const allCart = await retrieveCart();
      if (allCart) {
        setCarts(allCart.carts);
        if (allCart.totalCartAmount) {
          setCartAmount(allCart.totalCartAmount);
        }
      }
    };
    getAllCart();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/cart/fetch?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken,
        },
      }
    );
    return response.data;
  };

  const deleteCart = (cartId, e) => {
    const data = { id: cartId, userId: user.id };
    fetch("http://localhost:8080/api/cart/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
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
            }, 1000);
          } else {
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
        toast.error("It seems server is down.", {
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

  const incrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity + 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
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
            }, 1000);
          } else {
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
        toast.error("It seems server is down.", {
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

  const decrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity - 1 };
    fetch("http://localhost:8080/api/cart/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
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
            }, 1000);
          } else {
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
        toast.error("It seems server is down.", {
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

  const checkout = async (e) => {
    e.preventDefault();

    if (carts === null || carts.length < 1) {
      toast.error("No Products in Cart to Order", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api.paymongo.com/v1/links",
        {
          data: {
            attributes: {
              amount: cartAmount * 100, // PayMongo accepts amount in cents
              description: "Cart Payment",
              redirect: {
                success: "http://localhost:3000/payment/success",
                failed: "http://localhost:3000/payment/failed",
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Basic ${btoa("sk_test_dAye3rYrDM8EZzv6jAtFfiEp:")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const checkoutUrl = response.data.data.attributes.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating PayMongo checkout link:", error);
      toast.error("Failed to initiate checkout. Please try again.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmationModal(false);
    if (confirmed) {
      if (selectedCartId) {
        deleteCart(selectedCartId);
      }
    }
  };

  const showDeleteConfirmation = (cartId) => {
    setSelectedCartId(cartId);
    setShowConfirmationModal(true);
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{ height: "40rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>My Cart</h2>
        </div>
        <div
          className="card-body"
          style={{ overflowY: "auto" }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <tr key={cart.id}>
                    <td>
                      <img
                        src={"http://localhost:8080/api/product/" + cart.product.image1}
                        className="img-fluid"
                        alt="product_pic"
                        style={{ maxWidth: "90px" }}
                      />
                    </td>
                    <td><b>{cart.product.name}</b></td>
                    <td><b>{cart.product.category.name}</b></td>
                    <td><b>{cart.product.seller.firstName}</b></td>
                    <td><b>{cart.product.price}</b></td>
                    <td>
                      <button
                        onClick={() => decrementCart(cart)}
                        className="btn btn-sm bg-color custom-bg-text me-2"
                      >-</button>
                      <b>{cart.quantity}</b>
                      <button
                        onClick={() => incrementCart(cart)}
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >+</button>
                    </td>
                    <td>
                      <button
                        onClick={() => showDeleteConfirmation(cart.id)}
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer custom-bg">
          <div className="float-right">
            <div className="text-color me-2" style={{ textAlign: "right" }}>
              <h5>Total Price: ₱{cartAmount}/-</h5>
            </div>
            <div className="float-end me-2">
              <button
                type="submit"
                className="btn bg-color custom-bg-text mb-3"
                onClick={checkout}
              >Checkout</button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showConfirmationModal} onHide={() => handleConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product from your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleConfirmation(true)}>Yes</Button>
          <Button variant="secondary" onClick={() => handleConfirmation(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewMyCart;
