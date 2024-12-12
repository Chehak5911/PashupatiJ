import './homeNavBar-styles.scss';

interface IHomeNavBarProps {
  categories: string[];
  handleOpenModal: () => void;
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

const HomeNavBar = (props: IHomeNavBarProps) => {
  const { categories, handleCategoryClick, selectedCategory } = props;
  console.log(categories)

  return (
    <div className="homeNavBar__container">
      <ul className="homeNavBar__list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`homeNavBar__listItem ${category === selectedCategory ? 'homeNavBar__selectedItem' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeNavBar;
