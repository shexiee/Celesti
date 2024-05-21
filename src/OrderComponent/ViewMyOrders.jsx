import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [orders, setOrders] = useState([]);
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await retrieveOrders();
      if (allOrders) {
        setOrders(allOrders);
      }
    };

    getAllOrders();
  }, []);

  const retrieveOrders = async () => {
    try {
      const response = await axios.get(
        "https://api.paymongo.com/v1/payments",
        {
          headers: {
            Authorization: `Basic ${btoa("sk_test_dAye3rYrDM8EZzv6jAtFfiEp:")}`,
          },
        }
      );

      console.log("Payments fetched:", response.data.data);

      // Map the payment data to the order format
      const mappedOrders = response.data.data.map((payment) => ({
        orderId: payment.id,
        product: {
          image1: "default-image.jpg", // Replace with actual product image if available
          name: "Product Name", // Replace with actual product name if available
          category: { name: "Category" }, // Replace with actual category if available
          seller: { firstName: "Seller" }, // Replace with actual seller name if available
          price: payment.attributes.amount / 100,
        },
        quantity: 1, // Replace with actual quantity if available
        orderTime: payment.attributes.created_at * 1000,
        status: payment.attributes.status,
        deliveryPerson: null,
        deliveryDate: null,
        deliveryTime: null,
      }));

      return mappedOrders;
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch orders. Please try again.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return [];
    }
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Orders</h2>
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
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Order Time</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Contact</th>
                  <th scope="col">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td><b>{order.orderId}</b></td>
                    <td>
                      <img
                        src={"http://localhost:8080/api/product/" + order.product.image1}
                        className="img-fluid"
                        alt="product_pic"
                        style={{ maxWidth: "90px" }}
                      />
                    </td>
                    <td><b>{order.product.name}</b></td>
                    <td><b>{order.product.category.name}</b></td>
                    <td><b>{order.product.seller.firstName}</b></td>
                    <td><b>{order.product.price}</b></td>
                    <td><b>{order.quantity}</b></td>
                    <td><b>{formatDateFromEpoch(order.orderTime)}</b></td>
                    <td><b>{order.status}</b></td>
                    <td>
                      {order.deliveryPerson ? (
                        <b>{order.deliveryPerson.firstName}</b>
                      ) : (
                        <b className="text-danger">Pending</b>
                      )}
                    </td>
                    <td>
                      {order.deliveryPerson ? (
                        <b>{order.deliveryPerson.phoneNo}</b>
                      ) : (
                        <b className="text-danger">Pending</b>
                      )}
                    </td>
                    <td>
                      {order.deliveryDate ? (
                        <b>{order.deliveryDate + " " + order.deliveryTime}</b>
                      ) : (
                        <b className="text-danger">Pending</b>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyOrders;
