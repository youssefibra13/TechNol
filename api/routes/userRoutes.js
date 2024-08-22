const { Router } = require('express');


const { registerUser, loginUser, getUser, changePicture, editUser, getAuthors } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.post('/change-picture', authMiddleware, changePicture);
router.patch('/edit-user', authMiddleware, editUser);
router.get('/', getAuthors);

module.exports = router;