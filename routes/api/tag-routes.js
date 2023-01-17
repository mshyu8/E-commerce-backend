const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ 
      include: { all: true, nested: true },
    })
    return res.json(tags)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      include: { all: true, nested: true },
    })
    return res.json(tag)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    return res.json(tag)
  } catch (error) {
    return res.status(500).json(error)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try {
  const tag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  return res.json(tag)
} catch (error) {
  return res.status(500).json(error)
}
});

module.exports = router;

// include: { all: true, nested: true },
 