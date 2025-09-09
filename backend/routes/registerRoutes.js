const express = require('express');
const { createRegister, getRegisters, getAllParticipants } = require('../controllers/registerController');

const router = express.Router();

router.post('/', createRegister);
router.get('/', getRegisters);
router.get('/participants/all', getAllParticipants);  


module.exports = router;
