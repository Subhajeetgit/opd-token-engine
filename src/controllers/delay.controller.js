import { allocationEngine } from "../bootstrap.js";

export const handleDoctorDelay = (req, res) => {
  try {
    const { slotId, delayMinutes } = req.body;

    if (!slotId || delayMinutes === undefined) {
      return res.status(400).json({
        error: "slotId and delayMinutes are required"
      });
    }

    const displaced = allocationEngine.handleDoctorDelay(
      slotId,
      delayMinutes
    );

    res.json({
      message: "Doctor delay handled successfully",
      slotId,
      delayMinutes,
      displacedPatients: displaced
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
