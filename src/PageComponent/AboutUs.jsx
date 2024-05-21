import React from 'react';

const TeamMemberCard = ({ name, image, motto }) => (
  <div className="card text-center">
    <img src={image} alt={name} className="card-img-top rounded-circle" style={{ width: '150px', height: '150px', margin: 'auto', marginTop: '15px' }} />
    <div className="card-body">
      <h5 className="card-title"><strong>{name}</strong></h5>
      <p className="card-text">Motto: "{motto}"</p>
    </div>
  </div>
);

const AboutUs = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">About Us</h2>

      <div className="card mb-4">
        <div className="card-body">
          <p className="card-text">
            Welcome to Cranvas, your ultimate destination for personalized arts and crafts! At Cranvas, we specialize in print-on-demand creations, bringing a world of customized products right to your fingertips. Our platform is a haven for both buyers seeking unique items and sellers with a passion for crafting personalized goods.
          </p>
          <p className="card-text">
            We understand the power of self-expression and individuality. That's why Cranvas is dedicated to offering a diverse range of products that can be tailored to suit your taste. Whether you're a seller looking to showcase your artistic skills or a buyer in search of one-of-a-kind items, Cranvas is the place where creativity meets customization.
          </p>
          <p className="card-text">
            For buyers, Cranvas provides a curated selection of customizable products that you won't find anywhere else. Whether you're looking for personalized gifts, home décor, or fashion accessories, our platform connects you with talented sellers who turn ordinary items into extraordinary expressions of creativity.
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <p className="card-text">
            <strong>Our Commitment:</strong>
          </p>
          <p className="card-text">
            <strong>Quality:</strong> We prioritize the quality of our products, ensuring that each item is crafted with care and attention to detail.
          </p>
          <p className="card-text">
            <strong>Customization:</strong> Cranvas is all about customization. We believe in the power of personalization to make every product uniquely yours.
          </p>
          <p className="card-text">
            <strong>Community:</strong> Join our community of sellers and buyers who share a love for arts, crafts, and creativity. Cranvas is a place to connect, inspire, and support one another in our creative journeys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
