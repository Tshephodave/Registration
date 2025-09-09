const Register = require('../models/Register');

// Create new register
exports.createRegister = async (req, res) => {
  try {
    const cleanParticipants = (req.body.participants || []).filter(
      p => p.name && p.idNumber
    );

    const register = new Register({
      ...req.body,
      participants: cleanParticipants,
    });

    await register.save();
    res.status(201).json(register);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all registers
exports.getRegisters = async (req, res) => {
  try {
    const registers = await Register.find();
    res.json(registers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all participants across all registers
exports.getAllParticipants = async (req, res) => {
  try {
    const registers = await Register.find({}, "participants"); // only fetch participants
    const allParticipants = registers.flatMap(reg => reg.participants);
    res.json(allParticipants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
