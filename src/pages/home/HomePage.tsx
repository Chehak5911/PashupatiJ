import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import './home-styles.scss';
import { Category, IItem } from '@types';
import { fetchCategories, fetchProductsByCategoryId } from '../../utils/api';
import { HomeFilter, HomeItemsCard, HomeNavBar } from './components';

const DashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [products, setProducts] = useState<IItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        console.log('Fetched categories:', fetchedCategories);

        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
          setSelectedCategory(fetchedCategories[0].name);
          setSelectedCategoryId(fetchedCategories[0].id);

          const fetchedProducts = await fetchProductsByCategoryId(fetchedCategories[0].id);
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts); 
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!categories.some((cat) => cat.name === selectedCategory) && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    const selectedCat = categories.find((cat) => cat.name === category);

    if (selectedCat) {
      setSelectedCategoryId(selectedCat.id);
      setProducts([]);
      setFilteredProducts([]); // Clear filtered products while fetching

      try {
        const fetchedProducts = await fetchProductsByCategoryId(selectedCat.id);
        console.log('Fetched products:', fetchedProducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Reset filters when category changes
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  const handleApplyFilters = (selectedGender: string[], selectedMetalType: string[]) => {
    console.log("Selected Gender:", selectedGender);
    console.log("Selected Metal Type:", selectedMetalType);
  
    const filtered = products.filter((product) => {
      // Ensure product properties are present and normalized for comparison
      const gender = product.gender?.toLowerCase() || '';
      const metalType = product.metalType?.toLowerCase() || '';
  
      // Check if the product matches the selected filters
      const genderMatches = selectedGender.length === 0 || selectedGender.includes(gender);
      const metalMatches = selectedMetalType.length === 0 || selectedMetalType.includes(metalType);
  
      return genderMatches && metalMatches;
    });
  
    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  };     

  return (
    <div className="dashboardPage__container">
      <div className="dashboardPage__header">
        <Typography className="dashboardPage__title">Pashupati Jewellers</Typography>
      </div>
      <div className="dashboardPage__subContainer">
        <HomeNavBar
          categories={categories.map((category) => category.name)}
          handleOpenModal={handleToggleModal}
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
        {selectedCategory && (
          <div className="dashboardPage__cardsContainer">
            <div className="dashboardPage__cardsTitleContainer">
              <Typography className="dashboardPage__cardsContainerTitle">
                {selectedCategory}
              </Typography>
              <HomeFilter onApplyFilters={handleApplyFilters} />
            </div>
            <div className="dashboardPage__cardsSubContainer">
              {filteredProducts.map((product) => (
                <HomeItemsCard key={product._id} item={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
