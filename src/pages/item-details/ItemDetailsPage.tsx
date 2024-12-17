import React from "react";
import { useLocation } from "react-router-dom";
import { IItem } from "@types";
import ImageSlider from "./components/image-slider/ImageSlider"; // Import the new slider component

import "./itemDetails-styles.scss";

const ItemDetailsPage: React.FC = () => {
  const location = useLocation();
  const { item }: { item: IItem } = location.state;

  const getImageSrc = (image: File | string): string => {
    return typeof image === "string"
      ? image // Direct URL string
      : URL.createObjectURL(image as File); // Convert File to URL
  };

  const images: string[] = item.imageNames.map((image) => getImageSrc(image));

  return (
    <div className="itemDetailsPage__container">
      {/* Image Slider */}
      <ImageSlider images={images} />

      {/* Item Details */}
      <div className="itemDetailsPage__details">
        <h1 className="itemDetailsPage__title">{item.title}</h1>
        <p className="itemDetailsPage__description">{item.description}</p>
        <p className="itemDetailsPage__info">
          <strong>Price:</strong> ₹{item.amount}
        </p>
        <p className="itemDetailsPage__info">
          <strong>Gender:</strong> {item.gender}
        </p>
        <p className="itemDetailsPage__info">
          <strong>Metal Type:</strong> {item.metalType}
        </p>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
