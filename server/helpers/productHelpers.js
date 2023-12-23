export const validateProductDetails = (productDetails) => {
    const {
      title,
      subCategoryId,
      categoryId,
      description,
      price,
      totalProducts,
      images,
      ram,
    } = productDetails;
  
    if (
      !title ||
      !subCategoryId ||
      !categoryId ||
      !description ||
      !price ||
      !totalProducts ||
      !images ||
      !ram
    ) {
      return false;
    }
  
    const validationErrors = [];
  
    if (images.length < 2) {
      validationErrors.push('At least 2 images are required.');
    }
    if (totalProducts <= 1) {
      validationErrors.push('Stock must be greater than 1.');
    }
    if (title.length <= 2) {
      validationErrors.push('Title must be longer than 2 characters.');
    }
    if (description.length <= 5) {
      validationErrors.push('Description must be longer than 5 characters.');
    }
  
    return validationErrors.length === 0; 
  };
  