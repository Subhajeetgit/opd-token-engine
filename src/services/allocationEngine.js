import { v4 as uuidv4 } from "uuid";
import { PRIORITY } from "../utils/priority.js";
import { Token } from "../models/token.js";

export class AllocationEngine{
    constructor(){
        this.slots=new Map();
    }

    registerSlot(slot){
        this.slots.set(slot.slotId, slot);
    }

    createToken({ slotId, patientId, source }) {
    const slot = this.slots.get(slotId);
    if (!slot) throw new Error("Slot not found");

    const token = new Token({
      tokenId: uuidv4(),
      patientId,
      source,
      priority: PRIORITY[source]
    });

    this.allocate(slot, token);
    return token;
  }

  allocate(slot, token) {
    if (slot.activeTokens.length < slot.capacity) {
      slot.activeTokens.push(token);
      this.sort(slot.activeTokens);
      return;
    }

    const weakest = slot.activeTokens[slot.activeTokens.length - 1];

    if (token.priority < weakest.priority) {
      slot.activeTokens.pop();
      slot.waitingQueue.push(weakest);
      slot.activeTokens.push(token);
      this.sort(slot.activeTokens);
    } else {
      slot.waitingQueue.push(token);
    }
  }

  cancelToken(slotId, tokenId) {
    const slot = this.slots.get(slotId);
    if (!slot) return;

    slot.activeTokens = slot.activeTokens.filter(
      t => t.tokenId !== tokenId
    );

    if (slot.waitingQueue.length > 0) {
      const next = slot.waitingQueue.shift();
      slot.activeTokens.push(next);
      this.sort(slot.activeTokens);
    }
  }

  sort(tokens) {
    tokens.sort(
      (a, b) =>
        a.priority - b.priority ||
        a.createdAt - b.createdAt
    );
  }
}