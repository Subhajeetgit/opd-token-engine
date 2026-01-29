OPD Token Allocation Engine:

Introduction

This project is a backend system designed to manage OPD (OutPatient Department) token allocation in a hospital environment.
The goal is to simulate how hospitals actually work — where doctors have fixed slots, patients come from different sources, priorities matter, and real-world situations like delays and cancellations happen.

Instead of focusing only on CRUD APIs, this project focuses on decision-making logic, fair allocation, and dynamic rebalancing of patients in real time.



Problem Statement:

Doctors work in fixed time slots (example: 9:00–10:00)

Each slot has limited capacity

Patients can come from multiple sources:

1-Online booking

2-Walk-in

3-Paid priority

4-Emergency

The system must:

* Respect slot capacity

* Always prioritize critical patients

* Handle doctor delays

* Handle cancellations

* Adjust automatically when conditions change




Tech Stack:

* Node.js – Runtime environment

* Express.js – API framework

* JavaScript (ES Modules) – Clean modular code

* UUID – Unique token generation

* Postman – API testing

* In-memory storage – Used for simplicity and clarity of logic

* Note: Database is intentionally not used to keep focus on algorithm design.



High-Level System Design:

The system is built around a central Allocation Engine which is responsible for all decisions.

Main layers:

Services – Core allocation logic

Controllers – API request handling

Routes – API endpoints

Simulation – Manual OPD day simulation

Bootstrap – Initial data setup

This separation keeps the logic clean, testable, and scalable.


Allocation Algorithm:

The algorithm works like a real OPD desk.

Priority Rules

Each patient source is mapped to a priority:

| Source    | Priority |
| --------- | -------- |
| Emergency | 0        |
| Paid      | 1        |
| Follow-up | 2        |
| Online    | 3        |
| Walk-in   | 4        |

Lower number = Higher Priority  


How Token Allocation Works

1-When a patient requests a token, the system checks the slot.

2-If the slot has space:

    * Patient is added directly.

3-If the slot is full:

    * The system compares priorities.

    * If the new patient has higher priority:

    * Lowest-priority patient is moved to the waiting queue.

    * Otherwise:

        * New patient goes to the waiting queue.

4-Active patients are always sorted by priority.

This ensures:

* Emergency patients are never blocked

* Fairness is maintained

* Slot limits are never violated


Doctor Delay Handling (Key Feature):

Doctor delays are common in real hospitals, so this system handles them explicitly.

Assumption

 * Average consultation time = 10 minutes per patient

How Delay is Handled

1-Delay time is converted into number of patients affected.

        * Example: 20 minutes delay → 2 patients overflow

2-Lowest-priority patients are removed from the active slot.

3-These patients are moved into the waiting queue.

4-Emergency and high-priority patients remain unaffected.

This keeps the system realistic without overcomplicating time calculations.



Implementation Overview:
Core Components

* AllocationEngine

* Token creation

* Priority sorting

* Slot capacity enforcement

* Delay handling

* Cancellation handling

* Controllers

* Validate API inputs

* Call allocation engine

* Return clean responses

* Routes

    * Clean REST-style endpoints



* API Endpoints:
Create Token
POST /api/tokens

{
  "slotId": "D1-9-10",
  "patientId": "P1",
  "source": "ONLINE"
}

Get Slot Status
GET /api/slots/:slotId


Returns:

Active tokens

Waiting queue

Slot details

Handle Doctor Delay
POST /api/delay

{
  "slotId": "D1-9-10",
  "delayMinutes": 20
}

Cancel Token
DELETE /api/tokens/:tokenId


Automatically promotes waiting patient if available.

Testing the System

All APIs are tested using Postman.

Screenshots demonstrating:

Priority allocation, Emergency handling, Doctor delay impact, Slot rebalancing are available inside - docs/screenshots/

These screenshots act as visual proof of correct behavior.

Edge Cases Handled

Slot overflow

Emergency insertion into full slot

Doctor arriving late

Patient cancellation

Empty slot delay (no unnecessary changes)

Invalid input handling

Failure Handling

The system fails safely:

Missing fields return 400 Bad Request

Invalid slot IDs are rejected

No silent failures

Clear error messages returned

This ensures predictable behavior even with incorrect input.

How to Run the Project
Prerequisites

Node.js (v18+ recommended)

Steps
git clone https://github.com/Subhajeetgit/opd-token-engine
cd opd-token-engine
npm install
node src/index.js


Server will start on:

http://localhost:3000

Future Improvements

* PostgreSQL integration for persistence

* Transaction-based allocation

* Real-time notifications

* Slot auto-extension logic

The current design allows these features to be added without changing the core algorithm.

Conclusion:

This project focuses on real-world reasoning, not just APIs.

It demonstrates:

* Practical prioritization

* Dynamic reallocation

* Handling uncertainty

* Clean system design

The allocation engine is deterministic, explainable, and scalable — making it suitable for real hospital OPD systems with further extensions.