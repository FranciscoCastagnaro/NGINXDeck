const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const apikeysController = require('../controllers/apikeysController');

router.get('/', auth, apikeysController.getAll);
router.post('/', auth, apikeysController.create);



module.exports = router;