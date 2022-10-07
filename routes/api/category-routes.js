const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryDataAll = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryDataAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataAll = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryDataAll) {
      res.status(404).json({ message: 'There is no product category found with this ID!'});
      return;
    }
    res.status(200).json(categoryDataAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({ category_name: req.body.category_name });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: { id: req.params.id },
    }
    );

    if (!updateCategory[0]) {
      res.status(404).json({ message: 'There is no product category found with this ID to update!'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'There is no product category found with this ID to delete'});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
