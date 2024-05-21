import React, { useState } from 'react';

import carousel1 from "../images/carousel_1.png";
import carousel2 from "../images/carousel_2.png";
import carousel3 from "../images/carousel_3.png";



const ContactUs = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const faqData = [
    {
      question: "Will I receive the same product seen in the picture?",
      answer:
        "When making an online purchase, it is reasonable to expect that the product received closely aligns with the image presented; however, there can be variations due to factors like lighting, screen resolution, and manufacturing discrepancies. To mitigate any discrepancies, it is advisable to carefully review the product description, read customer reviews, and reach out to the seller for additional information if needed.",
    },
    {
      question: "Where can I view my sales receipt?",
      answer:
        "You can view your sales receipt by logging into your account and navigating to the 'Order History' section. There, you will find a list of your past orders, and you can view and print your sales receipts.",
    },
    {
      question: "Will you restock items that say 'out of stock'?",
      answer:
        "Our restocking policies vary for different items. While some items may be restocked regularly, others may have limited availability. If an item is currently out of stock, you can sign up for notifications to be informed when it becomes available again. Additionally, feel free to contact our customer support for more information on specific products.",
    },
  ];

  const toggleQuestion = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submission form
    console.log('Form submitted:', formData);
  };

  return (
    <><div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={carousel1} class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src={carousel2} class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src={carousel3} class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div><div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '18px' }}>Information Questions</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Frequently Asked Questions
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqData.map((item, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: selectedQuestion === index ? '#f0f0f0' : 'inherit',
                  }}
                  onClick={() => toggleQuestion(index)}
                >
                  {item.question}
                  <div style={{ fontSize: '12px', marginLeft: '10px' }}>&#9660;</div>
                </div>
                {selectedQuestion === index && (
                  <div
                    style={{
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderTop: 'none',
                      borderRadius: '0 0 5px 5px',
                    }}
                  >
                    {/* Render your answer here */}
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <p style={{ fontSize: '18px' }}>Information About Us</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Contact Us for Any Questions
            </p>
          </div>
          <p style={{ fontSize: '20px', marginBottom: '50px' }}>
            <strong>Facebook:</strong> <a href="https://www.facebook.com" style={{ fontSize: '20px', color: 'black', textDecoration: 'none' }}>Cranvas</a>
          </p>
          <p style={{ fontSize: '20px', marginBottom: '50px' }}>
            <strong>Phone Number:</strong> <a href="tel:+09089393324" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>+09089393324</a>
          </p>
          <p style={{ fontSize: '20px', marginBottom: '50px' }}>
            <strong>Email:</strong> <a href="mailto:Cranvas@gmail.com" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>Cranvas@gmail.com</a>
          </p>

        </div>
      </div></>
  );
};

export default ContactUs;
