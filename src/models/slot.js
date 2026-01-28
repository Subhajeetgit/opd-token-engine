export class Slot {
  constructor({ slotId, doctorId, startTime, endTime, capacity }) {
    this.slotId = slotId;
    this.doctorId = doctorId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;

    this.activeTokens = [];
    this.waitingQueue = [];
  }
}