const express = require('express');
const { createRegister, getAllParticipants, getLatestRegister } = require('../controllers/registerController');

const router = express.Router();

router.post('/', createRegister);
router.get('/latest', getLatestRegister); 
router.get('/participants/all', getAllParticipants);

module.exports = router;
