const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product]
    })

   return res.json(categories)
    
  } catch (error) {

   return res.status(500).json(error)

  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
       where: {
         id: req.params.id
       }, include: [Product]
     })
    return res.json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body)
    return res.json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {id: req.params.id}
    })
    return res.json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {id: req.params.id}
    })
    return res.json(category)
  } catch (error) {
    return res.status(500).json(error)
  }
});

module.exports = router;
