const { Router } = require("express");
const postController = require('../controllers/postController');
const router = Router();

router.post('/', postController.createPost);
router.get('/',postController.getAllPosts);
router.get('/:id',postController.getPostById);
router.patch('/:id', postController.updatePost);
router.delete('/:id',postController.deletePost);


module.exports = router;