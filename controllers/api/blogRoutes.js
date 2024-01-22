const router = require('express').Router();
const { Blog } = require('../../models');
const sessionAuth = require('../../utils/auth');

router.post('/', sessionAuth, async (req, res) => {
  try{
    const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/', sessionAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', sessionAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        if (!blogData) {
            res.status(404).json({message: 'No blog found with this id.'});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', sessionAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id.'});
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;