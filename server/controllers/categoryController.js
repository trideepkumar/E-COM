import {Category} from '../Model/category.js'; 
import {subCategory} from '../Model/subCategory.js'

export const addCategory = async (req, res) => {
    try {
      const categoryName = req.body.categoryName
      console.log("categoryName",categoryName)    
      const existingCategory = await Category.findOne({ categoryName: categoryName })
      console.log(existingCategory)
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      const newCategory = new Category({ categoryName: categoryName }); 
      await newCategory.save();
      res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export const addSubCategory = async (req, res) => {
    try {
        const { categoryName, subCategoryName } = req.body;
        console.log(categoryName,subCategoryName)
        const category = await Category.findOne({ categoryName });
        console.log(category)
        if (!category) {
            return res.status(400).send('Category not found');
        }
        console.log(category._id)
        console.log(subCategoryName)
        const newSubCategory = new subCategory({ subCategoryName:subCategoryName, Category: category._id });
        await newSubCategory.save();
        res.status(200).json({ message: 'SubCategory added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
