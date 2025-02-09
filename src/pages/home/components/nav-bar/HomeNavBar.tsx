import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; 
import CloseIcon from '@mui/icons-material/Close'; 
import './homeNavBar-styles.scss';

interface IHomeNavBarProps {
  categories: string[];
  handleOpenModal: () => void;
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

const HomeNavBar = (props: IHomeNavBarProps) => {
  const { categories, handleCategoryClick, selectedCategory } = props;
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Menu Icon */}
      <div className="homeNavBar__menuIcon" onClick={toggleMenu}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* Sidebar Navigation */}
      <div className={`homeNavBar__container ${isOpen ? 'homeNavBar__open' : 'homeNavBar__closed'}`}>
        <ul className="homeNavBar__list">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`homeNavBar__listItem ${category === selectedCategory ? 'homeNavBar__selectedItem' : ''}`}
              onClick={() => {
                handleCategoryClick(category);
                setIsOpen(false); // Close menu after selection
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeNavBar;
