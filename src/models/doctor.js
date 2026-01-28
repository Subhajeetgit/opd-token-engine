export class Doctor {
  constructor({ doctorId, name }) {
    this.doctorId = doctorId;
    this.name = name;
    this.slots = [];
  }
}