import { PJButton, PJInput } from "@components";
import { useState } from "react";

interface IEditCategoryModalProps {
  selectedCategory: string;
  onEditCategory: (editedCategory: string) => void;
  onClose: () => void;
}

const EditCategoryModal = (props: IEditCategoryModalProps) => {
    const { selectedCategory, onEditCategory, onClose } = props;
    const [editedCategory, setEditedCategory] = useState(selectedCategory);
    const [isCategoryError, setIsCategoryError] = useState(false);   

    const handleCategoryInputChange = (value:string) => {
        setEditedCategory(value);
    }

    const handleSaveChanges = () => {
        if(editedCategory.trim() === ''){
            setIsCategoryError(true);
            return;
        }
        onEditCategory(editedCategory);
        onClose();
    }
  return (
    <div>
        <div className="addItemModal__container">
            <PJInput
            containerClass="addItemModal__inputFieldContainer"
            errorMessage="This field is required"
            handleChange={handleCategoryInputChange}
            hasBorder
            isError={isCategoryError}
            isFullWidth
            label="Category Name"
            placeholder="Enter the category name here"
            value={editedCategory}
            />
            <PJButton handleClick={handleSaveChanges} title="Add" buttonClass='addItemModal__button' isFullWidth />
      </div>
    </div>
  )
}

export default EditCategoryModal;
