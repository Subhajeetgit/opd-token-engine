import { allocationEngine } from "../bootstrap.js";
import { AllocationEngine } from "../services/allocationEngine.js";
console.log("Opd Simulation start");

allocationEngine.createToken({
    slotId: "D1-9-10",
    patientId: "P1",
    source: "ONLINE"
});

allocationEngine.createToken({
    slotId: "D1-9-10",
    patientId: "P2",
    source: "WALK_IN"
});

allocationEngine.createToken({
    slotId: "D1-9-10",
    patientId: "P3",
    source: "PAID"
});

allocationEngine.createToken({
    slotId: "D1-9-10",
        patientId: "P4",
  source: "EMERGENCY"
});

console.log("D1-9-10 STATUS:");
console.log(allocationEngine.slots.get("D1-9-10"));

console.log("Opd Simulation end");