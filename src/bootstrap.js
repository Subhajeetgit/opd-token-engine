
import { AllocationEngine } from "./services/allocationEngine.js";
import { Slot } from "./models/slot.js";

export const allocationEngine = new AllocationEngine();


allocationEngine.registerSlot(
  new Slot({
    slotId: "D1-9-10",
    doctorId: "D1",
    startTime: "09:00",
    endTime: "10:00",
    capacity: 3
  })
);

allocationEngine.registerSlot(
  new Slot({
    slotId: "D1-10-11",
    doctorId: "D1",
    startTime: "10:00",
    endTime: "11:00",
    capacity: 2
  })
);


allocationEngine.registerSlot(
  new Slot({
    slotId: "D2-9-10",
    doctorId: "D2",
    startTime: "09:00",
    endTime: "10:00",
    capacity: 1
  })
);


// allocationEngine.registerSlot(
//   new Slot({
//     slotId: "D3-9-10",
//     doctorId: "D3",
//     startTime: "09:00",
//     endTime: "10:00",
//     capacity: 1
//   })
// );
