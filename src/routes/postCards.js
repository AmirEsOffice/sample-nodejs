const express = require('express');
const router = express.Router();
const { Case } = require('change-case-all');
const PostCardSequelize = require('../repositories/postCardSequelize.js');

const PostCard = require('../models/postCard.js');
const Category = require('../models/category.js');
const postDto = require('./../models/postCard');
const { authorize } = require('../common/authorize.js');

 

router.get('/', authorize, async (req, res) => {
    try {
      PostCardSequelize.getAllPostCards((err, card) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        if (!card) {
            res.status(404).json({ error: 'PostCard not found' });
            return;
        }
        console.log('card',card);
        res.status(200).json(card);
    });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 

router.get('/:id', authorize, async (req, res) => {
    try {
        const id = req.params.id;
        PostCardSequelize.getPostCardById(id, (err, card) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!card) {
                res.status(404).json({ error: 'PostCard not found' });
                return;
            }
            res.status(200).json(card);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authorize, (req, res) => {
     
    const { name, description, category,image } = req.body;
    const categoryObj = new Category(category);
    const card = new PostCard(name, description, category,image);
    console.log('card',card);
    PostCardSequelize.createPostCard(card);
    res.status(201).json({ message: 'PostCard created successfully' });
});

router.put('/:id', authorize, (req, res) => {
    const { id } = req.params;
    const { name, description,category ,image } = req.body;
    const card = new PostCard(name, description, category,image)
    PostCardSequelize.updatePostCardById(id, card);
    res.status(200).json({ message: 'PostCard updated successfully' });
});

router.delete('/:id', authorize, (req, res) => {
    const { id } = req.params;
    PostCardSequelize.deletePostCardById(id);
    res.status(200).json({ message: 'PostCard deleted successfully' });
});
 

module.exports = router;