const Register = require('../models/Register');

// Create or update register
exports.createRegister = async (req, res) => {
  try {
    const { date, activityName, providerName, participants = [] } = req.body;

    // Filter only valid participants
    const cleanParticipants = participants.filter(
      p => p.name && p.idNumber
    );

    // Check if register exists for the same day/activity/provider
    let register = await Register.findOne({ date, activityName, providerName });

    if (register) {
      // Add new participants to existing register
      register.participants.push(...cleanParticipants);
      await register.save();
      return res.status(200).json({ message: "Register updated", register });
    } else {
      // Create a new register
      register = new Register({
        ...req.body,
        participants: cleanParticipants,
      });
      await register.save();
      return res.status(201).json({ message: "Register created", register });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get register by date
exports.getRegisterByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const register = await Register.findOne({ date }).lean();
    if (!register) {
      return res.status(404).json({ message: "No register found for this date" });
    }
    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get latest register
exports.getLatestRegister = async (req, res) => {
  try {
    const register = await Register.findOne().sort({ createdAt: -1 }).lean();
    if (!register) {
      return res.status(404).json({ message: "No register found" });
    }
    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all participants across all registers
exports.getAllParticipants = async (req, res) => {
  try {
    const registers = await Register.find({}, "participants").lean();
    const allParticipants = registers.flatMap(reg => reg.participants);
    res.json(allParticipants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
