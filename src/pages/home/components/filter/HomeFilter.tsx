import React, { useState } from "react";
import "./homeFilter-styles.scss";

interface HomeFilterProps {
  onApplyFilters: (selectedGender: string[], selectedMetalType: string[]) => void;
}

const HomeFilter: React.FC<HomeFilterProps> = ({ onApplyFilters }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedMetalType, setSelectedMetalType] = useState<string[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCheckboxChange = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedGender, selectedMetalType);
    setIsMenuOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedGender([]);
    setSelectedMetalType([]);
    onApplyFilters([], []); 
  };

  return (
    <div className="homeFilter">
      <button className="homeFilter__button" onClick={toggleMenu}>
        Filter
      </button>

      {isMenuOpen && (
        <div className="homeFilter__menu">
          <div className="homeFilter__section">
            <h4 className="homeFilter__sectionTitle">Gender</h4>
            <div className="homeFilter__options">
              <label>
                Male
                <input
                  type="checkbox"
                  value="male"
                  checked={selectedGender.includes("male")}
                  onChange={() =>
                    handleCheckboxChange("male", selectedGender, setSelectedGender)
                  }
                />
              </label>
              <label>
                Female
                <input
                  type="checkbox"
                  value="female"
                  checked={selectedGender.includes("female")}
                  onChange={() =>
                    handleCheckboxChange("female", selectedGender, setSelectedGender)
                  }
                />
              </label>
            </div>
          </div>

          <div className="homeFilter__section">
            <h4 className="homeFilter__sectionTitle">Material</h4>
            <div className="homeFilter__options">
              <label>
                Gold
                <input
                  type="checkbox"
                  value="gold"
                  checked={selectedMetalType.includes("gold")}
                  onChange={() =>
                    handleCheckboxChange("gold", selectedMetalType, setSelectedMetalType)
                  }
                />
              </label>
              <label>
                Silver
                <input
                  type="checkbox"
                  value="silver"
                  checked={selectedMetalType.includes("silver")}
                  onChange={() =>
                    handleCheckboxChange("silver", selectedMetalType, setSelectedMetalType)
                  }
                />
              </label>
              <label>
                Platinum
                <input
                  type="checkbox"
                  value="platinum"
                  checked={selectedMetalType.includes("platinum")}
                  onChange={() =>
                    handleCheckboxChange("platinum", selectedMetalType, setSelectedMetalType)
                  }
                />
              </label>
              <label>
                Other
                <input
                  type="checkbox"
                  value="other"
                  checked={selectedMetalType.includes("other")}
                  onChange={() =>
                    handleCheckboxChange("other", selectedMetalType, setSelectedMetalType)
                  }
                />
              </label>
            </div>
          </div>

          <div className="homeFilter__applyButtonContainer">
            <button className="homeFilter__applyButton" onClick={handleApplyFilters}>
              Apply Filters
            </button>
            <button className="homeFilter__clearButton" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeFilter;
