import { allocationEngine } from "../bootstrap.js";

export const getSlotStatus = (req, res) => {
  const { slotId } = req.params;
  const slot = allocationEngine.slots.get(slotId);

  if (!slot) {
    return res.status(404).json({ error: "Slot not found" });
  }

  res.json({
    slotId: slot.slotId,
    doctorId: slot.doctorId,
    capacity: slot.capacity,
    activeTokens: slot.activeTokens,
    waitingQueue: slot.waitingQueue
  });
};
