const { Router } = require('express');
const { postCreate, postsGet, postGet, postCategoryGet, userPostsGet, editPost, deletePost } = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/', authMiddleware, postCreate)
router.get('/', postsGet)
router.get('/:id', postGet)
router.patch('/:id', authMiddleware, editPost)
router.get('/categories/:category', postCategoryGet)
router.get('/users/:id', userPostsGet)
router.delete('/:id', authMiddleware, deletePost)



module.exports = router;