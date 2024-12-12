import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { PJButton } from "@components";
import { IItem } from "@types";
import "./homeItemsCard-styles.scss";

interface IHomeItemsCardProps {
  item: IItem;
}

const HomeItemsCard: React.FC<IHomeItemsCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/items/${item._id}`, { state: { item } });
  };

  const getImageSrc = (): string => {
    if (item.imageNames && item.imageNames.length > 0) {
      const firstImage = item.imageNames[0];
      return typeof firstImage === "string"
        ? firstImage // Direct URL string
        : URL.createObjectURL(firstImage as File); // Convert File to URL
    }
    return "path/to/default/image.jpg"; // Fallback to a default image
  };

  return (
    <div className="homeItemsCard__container">
      {/* Image Section */}
      <div className="homeItemsCard__imageContainer">
        <img
          className="homeItemsCard__image"
          src={getImageSrc()}
          alt={item.title}
        />
      </div>

      {/* Content Section */}
      <div className="homeItemsCard__contentContainer">
        {/* Title and Amount */}
        <div className="homeItemsCard__titleContainer">
          <Typography className="homeItemsCard__title">{item.title}</Typography>
          <Typography className="homeItemsCard__subTitle">₹{item.amount}</Typography>
        </div>

        {/* Description */}
        <div className="homeItemsCard__descriptionContainer">
          <p className="homeItemsCard__description">
            {item.description.slice(0, 150)}...
          </p>
          <PJButton
            handleClick={handleReadMore}
            title="Read More"
            buttonClass="homeItemsCard__descriptionButton"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeItemsCard;
