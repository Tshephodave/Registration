const express = require('express');
const { createRegister, getAllParticipants, getLatestRegister, getRegisterByDate } = require('../controllers/registerController');

const router = express.Router();

router.post('/', createRegister);
router.get('/latest', getLatestRegister);
router.get('/participants/all', getAllParticipants);
router.get('/event/:date', getRegisterByDate); // New route

module.exports = router;
