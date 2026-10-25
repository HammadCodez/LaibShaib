# 📐 LabEquip Reserve — System Wireframes & Specification Document
**Course:** CS344 — Web Engineering (Assignment 1)  
**Assigned Topic:** Idea #04 — Lab Equipment Reservation  
**Student Name:** Muhammad Hammad Butt  
**CMS ID:** 501399  
**Section:** SE15B  
**Institution:** NUST (School of Electrical Engineering & Computer Science - SEECS)  

---

## 📑 Table of Contents
1. [Executive Summary & Multi-Tier Role Hierarchy](#1-executive-summary--multi-tier-role-hierarchy)
2. [Global Navigation & Role Switcher Bar](#2-global-navigation--role-switcher-bar)
3. [Page View 1: Student Equipment Discovery & Booking Hub](#3-page-view-1-student-equipment-discovery--booking-hub)
4. [Page View 2: Interactive Reservation & Conflict Detection Modal](#4-page-view-2-interactive-reservation--conflict-detection-modal)
5. [Page View 3: Digital Reservation Pass & Checkout Verification Slip](#5-page-view-3-digital-reservation-pass--checkout-verification-slip)
6. [Page View 4: Lab Instructor Scoped Management Portal](#6-page-view-4-lab-instructor-scoped-management-portal)
7. [Page View 5: Super Admin Institutional Command Center](#7-page-view-5-super-admin-institutional-command-center)
8. [Modals & Action Dialogs (Add Lab, Add Equipment, Return Inspection)](#8-modals--action-dialogs)
9. [Responsive Breakpoint Layout Specifications](#9-responsive-breakpoint-layout-specifications)
10. [Client-Side State Architecture & Future Server Integration](#10-client-side-state-architecture--future-server-integration)

---

## 1. Executive Summary & Multi-Tier Role Hierarchy

The application implements a 3-tier hierarchical role structure to mirror the real-world operational chain of custody in university laboratories:

```
                      ┌─────────────────────────────────┐
                      │          SUPER ADMIN            │
                      │  (Dean / Head of Laboratories)  │
                      └────────────────┬────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     LAB INSTRUCTOR / ENGR     │             │     LAB INSTRUCTOR / ENGR     │
│   (e.g., Embedded Systems)    │             │   (e.g., Circuits & Telecom)  │
└───────────────┬───────────────┘             └───────────────┬───────────────┘
                │ Scoped control only                         │ Scoped control only
                ▼                                             ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│ • Lab Equipment Inventory     │             │ • Lab Equipment Inventory     │
│ • Unit Maintenance Logs       │             │ • Unit Maintenance Logs       │
│ • Student Check-in / Return   │             │ • Student Check-in / Return   │
└───────────────────────────────┘             └───────────────────────────────┘
                                       ▲
                                       │ Submits Requests
                      ┌────────────────┴────────────────┐
                      │      STUDENT / RESEARCHER       │
                      │   (CMS: 501399, FYP / Courses)  │
                      └─────────────────────────────────┘
```

### Role Capabilities Matrix:
| Feature / Action | Student | Lab Instructor (Scoped) | Super Admin (Institutional) |
| :--- | :---: | :---: | :---: |
| Browse catalogue & search specs across all labs | ✅ | ✅ | ✅ |
| Check real-time slot availability & conflicts | ✅ | ✅ | ✅ |
| Book equipment (enforcing 4h max quota) | ✅ | ❌ | ❌ |
| View own digital passes & cancel booking | ✅ | ❌ | ❌ |
| Manage equipment for assigned lab (Add / Edit / Retire) | ❌ | ✅ (Own Lab Only) | ✅ (All Labs) |
| Toggle equipment status (Operational / Maintenance) | ❌ | ✅ (Own Lab Only) | ✅ (All Labs) |
| Student check-out verification & return inspection | ❌ | ✅ (Own Lab Only) | ✅ (All Labs) |
| Add new laboratory facilities | ❌ | ❌ | ✅ |
| Appoint & re-assign Lab Instructors to labs | ❌ | ❌ | ✅ |
| Global institutional analytics & audit logs | ❌ | ❌ | ✅ |

---

## 2. Global Navigation & Role Switcher Bar

The application uses a persistent top bar featuring institutional branding, global metrics, and an active **Role Switcher** that allows instant switching between the three personas for seamless grading demonstration.

### Desktop Layout:
```
+---------------------------------------------------------------------------------------------------------+
| [LOGO] NUST SEECS - LabEquip Reserve           [Global Search: Equipment, Lab, CMS...] [Active Lab: All] |
|                                                                                                         |
| Current Role: (o) Student [Hammad Butt - 501399]   ( ) Lab Instructor [Engr. Asif]   ( ) Super Admin     |
| Nav Tabs: [Equipment Catalogue] [My Active Passes (2)] [Quick Help / Policies]         [Current Time: 10:45 AM] |
+---------------------------------------------------------------------------------------------------------+
```

### Responsive Header Elements:
- **Branding:** University crest/icon + "LabEquip Reserve" portal title + subtitle.
- **Role Switcher Pills:** Radio-group styled as interactive toggle pills (`Student`, `Lab Instructor`, `Super Admin`). Changing this immediately shifts visible views without page reloading.
- **Active User Context Pill:** Displays the active persona's name, CMS/Staff ID, and clearance level.
- **Alert Ticker Banner (Dismissible):** Displays scheduled calibration or emergency lab closures (e.g., *"Notice: Circuits Lab (B-102) high-voltage bench maintenance on Friday 2 PM"*).

---

## 3. Page View 1: Student Equipment Discovery & Booking Hub

The primary landing view for students to search, filter, inspect, and initiate equipment reservations.

```
+---------------------------------------------------------------------------------------------------------+
| STATS KPI BAR:                                                                                         |
| [ Total Available: 18 Items ] [ In-Use Now: 6 Items ] [ Maintenance: 2 Items ] [ Your Quota: 3.5h left ]|
+---------------------------------------------------------------------------------------------------------+
| FILTER & SEARCH CONTROL CONSOLE:                                                                        |
| [ Search Equipment name, model, tag...                       ] [ Lab: All Labs          v ]             |
| [ Category: [x] Oscilloscopes [x] FPGAs [x] AI Kits [ ] 3D Printers ] [ Status: [ Available Only v ] ]  |
+---------------------------------------------------------------------------------------------------------+
| EQUIPMENT CATALOGUE GRID (Showing 8 of 8 items)                                                         |
|                                                                                                         |
| +-----------------------------------+ +-----------------------------------+ +-------------------------+ |
| | [IMG/ICON] Basys 3 Artix-7 FPGA   | | [IMG/ICON] Rigol 4-Ch Oscilloscope | | [IMG/ICON] Jetson Orin  | |
| | Tag: NUST-SEECS-EQ-002            | | Tag: NUST-SEECS-EQ-001            | | Tag: NUST-SEECS-EQ-003  | |
| | Lab: Embedded Systems (A-204)     | | Lab: Circuits & Telecom (B-102)   | | Lab: AI & Robotics      | |
| | Status: [ AVAILABLE (3 of 4) ]    | | Status: [ IN USE (Return 12:00) ] | | Status: [ AVAILABLE ]   | |
| | Specs: 33K Logic Cells, USB-JTAG  | | Specs: 50MHz, 1GSa/s, 4 Ch Probes | | Specs: 8GB 40 TOPS      | |
| | Max Slot: 4 Hours | Level: Open   | | Max Slot: 3 Hours | Level: Open   | | Max Slot: 4h | Cert Req | |
| |                                   | |                                   | |                         | |
| | [ View Schedule ] [ RESERVE NOW ] | | [ View Schedule ] [ JOIN WAITLIST]| | [ RESERVE NOW ]         | |
| +-----------------------------------+ +-----------------------------------+ +-------------------------+ |
|                                                                                                         |
| +-----------------------------------+ +-----------------------------------+ +-------------------------+ |
| | [IMG/ICON] Ultimaker S3 3D Print  | | [IMG/ICON] Keysight Waveform Gen  | | [IMG/ICON] Saleae Logic | |
| | Tag: NUST-SEECS-EQ-005            | | Tag: NUST-SEECS-EQ-004            | | Tag: NUST-SEECS-EQ-006  | |
| | Lab: FabLab & Prototyping (W-01)  | | Lab: Circuits & Telecom (B-102)   | | Lab: Embedded Systems   | |
| | Status: [ CALIBRATING / MAINT ]   | | Status: [ AVAILABLE (2 of 2) ]    | | Status: [ AVAILABLE ]   | |
| | Specs: Dual Extrusion, PLA/Tough  | | Specs: 20MHz Sine/Square, Arb     | | Specs: 16-Ch USB 3.0    | |
| |                                   | |                                   | |                         | |
| | [ View Schedule ] [ DISABLED ]    | | [ View Schedule ] [ RESERVE NOW ] | | [ RESERVE NOW ]         | |
| +-----------------------------------+ +-----------------------------------+ +-------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

### Key Student Actions on this Screen:
1. **Keyword Filtering:** Typing "FPGA" immediately narrows the grid to Xilinx boards.
2. **Department Filter:** Selecting "Embedded Systems" filters out items from other labs.
3. **Availability Filter:** Toggle to hide equipment currently under maintenance or in-use.
4. **Trigger Reservation:** Clicking **[ RESERVE NOW ]** opens the Booking Modal (Section 4) with the chosen equipment pre-selected.

---

## 4. Page View 2: Interactive Reservation & Conflict Detection Modal

Accessible modal dialog (`<dialog>` or ARIA-modal container) where students configure their session parameters, validate time availability, and confirm reservations.

```
+---------------------------------------------------------------------------------------------+
| [x] CLOSE                                                                                    |
|                               RESERVE LABORATORY EQUIPMENT                                  |
| Equipment: Xilinx Basys 3 Artix-7 FPGA Board (Tag: NUST-SEECS-EQ-002)                        |
| Location: Embedded Systems Lab (Room A-204) | In-Charge: Engr. Asif Bilal (Ext 4210)         |
+---------------------------------------------------------------------------------------------+
| STEP 1: STUDENT IDENTIFICATION                                                              |
| * Student Name:     [ Muhammad Hammad Butt                 ]                                |
| * CMS ID:           [ 501399                             ] (Validated: 6-digit NUST CMS)    |
| * NUST Email:       [ mbutt.se15@seecs.edu.pk             ]                                |
| * Degree & Section: [ BS Software Engineering - SE15B    v ]                                |
| * Academic Purpose: (o) Course Lab Task  ( ) Final Year Project (FYP)  ( ) Research Paper   |
| * Supervisor/Instr: [ Dr. Adeel / Engr. Usama             ]                                |
+---------------------------------------------------------------------------------------------+
| STEP 2: SESSION SCHEDULE & AVAILABILITY ENGINE                                              |
| * Reservation Date: [ 2026-10-30 ] (Prevents past dates)                                    |
| * Start Time:       [ 10:00 AM   ]                                                          |
| * End Time:         [ 12:30 PM   ]                                                          |
|                                                                                             |
| [!] LIVE DURATION ENGINE: 2 Hours 30 Minutes (Allowed: Max 4 Hours/day) [PASS: Within Quota] |
|                                                                                             |
| CONFLICT CHECKER STATUS:                                                                    |
| [OK] "Slot is available! No overlapping reservations found for Unit #2 on 30-Oct-2026."    |
| (If Conflict detected):                                                                     |
| [!] "CONFLICT: Unit #2 is already booked by CMS 499120 from 11:00 AM - 01:00 PM.            |
|      Recommended available slots: 01:30 PM - 05:00 PM."                                     |
+---------------------------------------------------------------------------------------------+
| STEP 3: LABORATORY COMPLIANCE ACKNOWLEDGEMENT                                               |
| [x] I agree to follow SEECS Lab Safety Guidelines and return all probes/cables intact.     |
+---------------------------------------------------------------------------------------------+
|                                  [ CANCEL ]   [ CONFIRM & GENERATE PASS (Enter) ]            |
+---------------------------------------------------------------------------------------------+
```

### Form Validations & Logic:
- **CMS ID Validation:** Regex pattern `^[0-9]{6}$` (e.g., `501399`).
- **Date Constraints:** `min="YYYY-MM-DD"` set dynamically to today’s date.
- **Time Window Rules:** `EndTime > StartTime`; calculates duration in real time.
- **Anti-Hogging Rule:** Duration $\le 4.0\text{ hours}$. If user enters 5 hours, submit button is disabled with error: *"Exceeds university maximum single-session limit (4 hours)"*.
- **Conflict Algorithm:** Checks if `(RequestedStart < ExistingEnd) && (RequestedEnd > ExistingStart)` for the same equipment ID and date.

---

## 5. Page View 3: Digital Reservation Pass & Checkout Verification Slip

Generated immediately upon successful booking. Serves as the student’s digital authorization slip to present to the Lab Instructor upon physical entry into the lab.

```
+---------------------------------------------------------------------------------------------+
|                                    NUST SEECS LAB PASS                                      |
|                             DIGITAL RESERVATION VOUCHER                                     |
|                                                                                             |
| PASS REFERENCE: #PASS-2026-501399-04              STATUS: [ CONFIRMED / READY FOR PICKUP ]  |
+---------------------------------------------------------------------------------------------+
| STUDENT: Muhammad Hammad Butt                     CMS ID: 501399                            |
| DEPARTMENT: Department of Computing               SECTION: SE15B                            |
| EQUIPMENT: Xilinx Basys 3 Artix-7 FPGA Trainer     TAG ID: NUST-SEECS-EQ-002                |
| LABORATORY: Embedded Systems Lab (Room A-204)     LAB ENGR: Engr. Asif Bilal (Ext 4210)     |
| DATE: Friday, 30 October 2026                     TIME SLOT: 10:00 AM - 12:30 PM (2.5 hrs)  |
| PURPOSE: Course Lab Project (CS344 Web Engg)      SUPERVISOR: Dr. Adeel                     |
+---------------------------------------------------------------------------------------------+
| ACCESS INSTRUCTIONS FOR STUDENT:                                                            |
| 1. Arrive at Room A-204 within 15 minutes of slot start time (10:15 AM cut-off).            |
| 2. Present your original NUST Student ID Card alongside this digital pass.                  |
| 3. Complete visual inspection of board and JTAG cable with Lab Attendant before power-on.   |
+---------------------------------------------------------------------------------------------+
| ACTIONS:                                                                                    |
| [ Print / Save Voucher ]   [ Add to Calendar (.ics) ]   [ CANCEL RESERVATION (Free slot) ]  |
+---------------------------------------------------------------------------------------------+
```

---

## 6. Page View 4: Lab Instructor Scoped Management Portal

Accessible when role is switched to **Lab Instructor**. The UI automatically scopes all views, statistics, and tables to **only the lab assigned to that instructor** (e.g., Engr. Asif Bilal $\rightarrow$ *Embedded Systems Lab (Room A-204)*).

```
+---------------------------------------------------------------------------------------------------------+
| LAB INSTRUCTOR DASHBOARD - [ LAB: Embedded Systems Lab (Room A-204) ]                                  |
| Assigned Manager: Engr. Asif Bilal (Staff #ES-108) | Office: A-205 | Extension: 4210                   |
+---------------------------------------------------------------------------------------------------------+
| SCOPED METRICS:                                                                                         |
| [ Total Equipment: 12 Units ] [ Active Bookings Today: 5 ] [ Overdue / In Lab: 1 ] [ Flagged: 0 ]        |
+---------------------------------------------------------------------------------------------------------+
| SUB-NAV TABS:  [ Equipment Inventory (6) ]  [ Student Reservation Ledger (8) ]  [ Maintenance / Logs ]  |
+---------------------------------------------------------------------------------------------------------+
| TAB 1: EQUIPMENT INVENTORY FOR ROOM A-204                        [ + Add New Equipment to this Lab ]   |
|                                                                                                         |
| Asset Code        | Equipment Name        | Total Qty | Avail | Status        | Actions                 |
| ----------------- | --------------------- | --------- | ----- | ------------- | ----------------------- |
| NUST-SEECS-EQ-002 | Xilinx Basys 3 FPGA   | 4 units   | 2     | [OPERATIONAL] | [Edit] [Log Maint] [Del]|
| NUST-SEECS-EQ-006 | Saleae Logic Pro 16   | 2 units   | 1     | [OPERATIONAL] | [Edit] [Log Maint] [Del]|
| NUST-SEECS-EQ-010 | STM32 ARM Cortex Kits | 6 units   | 4     | [OPERATIONAL] | [Edit] [Log Maint] [Del]|
| NUST-SEECS-EQ-014 | Soldering & Rework Stn | 2 units   | 0     | [CALIBRATING] | [Mark Ready] [View Log] |
+---------------------------------------------------------------------------------------------------------+
| TAB 2: STUDENT RESERVATION LEDGER & CHECK-IN DESK                                                       |
| Filter by CMS: [ Search CMS... ]  Date: [ Today v ]  Status: [ All Statuses v ]                         |
|                                                                                                         |
| Booking ID  | CMS ID  | Student Name     | Equipment       | Time Slot     | Status     | Actions    |
| ----------- | ------- | ---------------- | --------------- | ------------- | ---------- | ---------- |
| #BK-2026-01 | 501399  | Hammad Butt      | Basys 3 FPGA    | 10:00 - 12:30 | CONFIRMED  | [CHECK OUT]|
| #BK-2026-02 | 501140  | Ayesha Malik     | Saleae Logic 16 | 09:00 - 11:00 | IN-LAB     | [INSPECT]  |
| #BK-2026-03 | 489211  | Daniyal Khan     | STM32 Kit #4    | 08:00 - 10:00 | OVERDUE 15m| [NOTIFY]   |
| #BK-2026-04 | 502011  | Fatima Noor      | Basys 3 FPGA    | 02:00 - 04:00 | CONFIRMED  | [CANCEL]   |
+---------------------------------------------------------------------------------------------------------+
```

### Instructor Actions:
1. **[CHECK OUT]:** Student has physically arrived. Changes reservation status from `CONFIRMED` $\rightarrow$ `IN-LAB`.
2. **[INSPECT / RETURN]:** Student is returning device. Opens Condition Inspection Dialog (Section 8C) to check for missing probes or faults before releasing the equipment back to `AVAILABLE`.
3. **[+ Add New Equipment]:** Opens equipment creation modal strictly bound to this lab.

---

## 7. Page View 5: Super Admin Institutional Command Center

Accessible when role is switched to **Super Admin** (e.g., Dean, Head of Laboratories, Central Admin). Has unrestricted visibility and authority over all campus labs.

```
+---------------------------------------------------------------------------------------------------------+
| SUPER ADMIN INSTITUTIONAL CONTROL HUB - NUST SEECS & SMME CENTRAL LABS                                 |
| Logged in as: Prof. Dr. Central Labs Director | Scope: ALL DEPARTMENTS & FACILITIES                     |
+---------------------------------------------------------------------------------------------------------+
| CAMPUS-WIDE AGGREGATE KPI CARDS:                                                                        |
| [ Total Labs: 6 Facilities ] [ Total Assets: 48 Devices ] [ Total Bookings: 124 ] [ Fleet Health: 94% ] |
+---------------------------------------------------------------------------------------------------------+
| MANAGEMENT CONTROLS:                                                                                   |
| [ + CREATE NEW LABORATORY ]   [ + ASSIGN / RE-APPOINT LAB INSTRUCTOR ]   [ EXPORT AUDIT LOG (CSV) ]      |
+---------------------------------------------------------------------------------------------------------+
| LABORATORY DIRECTORY & INSTRUCTOR ASSIGNMENTS TABLE:                                                    |
|                                                                                                         |
| Lab Code | Lab Name                | Room #  | School | Assigned Instructor     | Active Assets | Util%|
| -------- | ----------------------- | ------- | ------ | ----------------------- | ------------- | ---- |
| LAB-01   | Embedded Systems Lab    | A-204   | SEECS  | Engr. Asif Bilal (ES-108)| 12 items       | 68%  |
| LAB-02   | Circuits & Telecom Lab  | B-102   | SEECS  | Engr. Maria Siddiqui     | 10 items       | 82%  |
| LAB-03   | AI & Robotics Lab       | C-305   | SEECS  | Engr. Zeeshan Tariq      | 8 items        | 90%  |
| LAB-04   | FabLab & Rapid Prototyp | W-01    | SMME   | Engr. Bilal Farooq       | 6 items        | 45%  |
| LAB-05   | Networks & IoT Lab      | A-110   | SEECS  | Engr. Sana Javed         | 7 items        | 55%  |
| LAB-06   | HCI & Interactive Media | C-201   | SEECS  | Engr. Hamza Rauf         | 5 items        | 40%  |
+---------------------------------------------------------------------------------------------------------+
| ACTIONS ON LABS: [Edit Lab Info]  [Re-Assign In-Charge]  [View Full Equipment Audit]  [Decommission]     |
+---------------------------------------------------------------------------------------------------------+
```

---

## 8. Modals & Action Dialogs

### 8A. Modal: Create New Laboratory (Super Admin Only)
```
+-----------------------------------------------------------------------+
| [x] CLOSE                      CREATE NEW LABORATORY FACILITY         |
+-----------------------------------------------------------------------+
| * Lab Code / Identifier:  [ LAB-07                         ]          |
| * Laboratory Title:       [ Cyber Security & Digital Forensics Lab ]  |
| * School / Faculty:       [ SEECS - Computing Wing       v ]          |
| * Building & Room Number: [ Academic Block 1, Room B-312   ]          |
| * Max Student Capacity:   [ 30                             ]          |
| * Assign Lab In-Charge:   [ Engr. Kashif Mehmood (Staff #CS-402) v ]  |
| * Operating Hours:        [ 08:30 AM ] to [ 05:00 PM ]                |
| * Safety Level / Rules:   [ High-Voltage & ESD safety protocols... ]  |
+-----------------------------------------------------------------------+
|                           [ Cancel ]   [ Save Laboratory (Enter) ]    |
+-----------------------------------------------------------------------+
```

### 8B. Modal: Add Equipment to Lab (Lab Instructor or Super Admin)
```
+-----------------------------------------------------------------------+
| [x] CLOSE                   ADD EQUIPMENT ITEM TO INVENTORY           |
| Target Laboratory: Embedded Systems Lab (Room A-204) [LOCKED TO LAB]  |
+-----------------------------------------------------------------------+
| * Equipment Title:      [ Xilinx Kria KV260 Vision AI Starter Kit   ] |
| * Asset Tracking Code:  [ NUST-SEECS-EQ-018                         ] |
| * Category / Tag:       [ FPGA / AI Edge Accelerator              v ] |
| * Quantity in Stock:    [ 3                                         ] |
| * Technical Specs:      [ Quad-core ARM A53, 4GB DDR4, H.264/265... ] |
| * Max Booking Hours:    [ 4                                         ] |
| * Clearance Required:   ( ) Open to All  (o) Level 2: FYP/Cert Only   |
| * Initial Status:       (o) Operational  ( ) Maintenance  ( ) Calibr  |
+-----------------------------------------------------------------------+
|                           [ Cancel ]   [ Add Item to Inventory ]      |
+-----------------------------------------------------------------------+
```

### 8C. Modal: Equipment Return Inspection & Condition Clearance
```
+-----------------------------------------------------------------------+
| [x] CLOSE                  EQUIPMENT RETURN & INSPECTION CHECK        |
| Booking Ref: #BK-2026-01 | Student: Hammad Butt (CMS: 501399)         |
| Equipment: Xilinx Basys 3 Artix-7 FPGA (Tag: NUST-SEECS-EQ-002)       |
+-----------------------------------------------------------------------+
| INSPECTION CHECKLIST:                                                 |
| [x] Main trainer board powered off cleanly and power LED functions.   |
| [x] USB-JTAG programming cable returned in functional state.          |
| [x] All 16 toggle switches and 7-segment displays unbroken.           |
|                                                                       |
| RETURN CONDITION RATING:                                              |
| (o) Pristine / Normal Wear   ( ) Minor Issue (Reported)  ( ) DAMAGED  |
|                                                                       |
| Lab Engineer Notes:                                                   |
| [ Board tested clean on Vivado test bitstream. Cleared.             ] |
+-----------------------------------------------------------------------+
|               [ Flag Student / Hold Record ]   [ CLEAR RETURN & RESTORE ASSET ] |
+-----------------------------------------------------------------------+
```

---

## 9. Responsive Breakpoint Layout Specifications

The layout is engineered to adapt across three strict screen tiers using custom CSS Grid and Flexbox:

```
+-----------------------------------------------------------------------------+
| 1. DESKTOP VIEW (> 1024px)                                                  |
| +-------------------------------------------------------------------------+ |
| | Header: Full branding + inline Role Switcher pills + Live Clock         | |
| | Main Grid: 3-column / 4-column auto-fit equipment cards                 | |
| | Ledger: Side-by-side split screen (Catalogue on left, Live Ledger right)| |
| +-------------------------------------------------------------------------+ |
|                                                                             |
| 2. TABLET VIEW (640px – 1024px)                                             |
| +-------------------------------------------------------------------------+ |
| | Header: Compact branding + 3-pill toggle wraps neatly                   | |
| | Main Grid: 2-column balanced equipment cards                            | |
| | Ledger: Stacked below catalogue with horizontal overflow table scroll   | |
| +-------------------------------------------------------------------------+ |
|                                                                             |
| 3. MOBILE VIEW (< 640px)                                                    |
| +-------------------------------------------------------------------------+ |
| | Header: Brand title + hamburger or vertical segmented role control      | |
| | Main Grid: 1-column cards (full touch width, large 48px tap targets)    | |
| | Modals: Fullscreen drawer layout with fixed bottom action buttons       | |
| +-------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------+
```

---

## 10. Client-Side State Architecture & Future Server Integration

### 10A. Client-Side State Objects (Assignment 1 Vanilla JS):
```javascript
// Central in-memory state store
const appState = {
  currentRole: 'student', // 'student' | 'instructor' | 'superadmin'
  currentUser: {
    name: 'Muhammad Hammad Butt',
    cmsId: '501399',
    email: 'mbutt.se15@seecs.edu.pk',
    role: 'student'
  },
  activeInstructorLabId: 'LAB-01', // Scoped lab for instructor mode
  labs: [...], // Array of Lab objects
  equipment: [...], // Array of 8+ equipment items
  reservations: [...], // Active and past reservations
  instructors: [...] // Registered lab engineers
};
```

### 10B. Seamless Mapping to Assignment 2 (PHP 8.5 + SQLite/MySQL PDO):
```sql
-- Future Relational Tables:
CREATE TABLE labs (id VARCHAR(20) PRIMARY KEY, name VARCHAR(100), room VARCHAR(50), instructor_id VARCHAR(50));
CREATE TABLE equipment (id VARCHAR(30) PRIMARY KEY, lab_id VARCHAR(20), name VARCHAR(100), total_qty INT, status VARCHAR(20));
CREATE TABLE reservations (id VARCHAR(40) PRIMARY KEY, equipment_id VARCHAR(30), cms_id VARCHAR(10), start_time DATETIME, end_time DATETIME, status VARCHAR(20));
```

### 10C. Seamless Mapping to Assignment 3 (MERN Stack):
- **MongoDB Collections:** `labs`, `equipments`, `reservations`, `users`.
- **JWT Roles:** Payload contains `{ cmsId: '501399', role: 'student' }` or `{ staffId: 'ES-108', role: 'instructor', assignedLab: 'LAB-01' }`.
- **React Components:** `<StudentCatalogue />`, `<InstructorLabPanel />`, `<SuperAdminHub />`, `<BookingModal />`.

---
*Created for Muhammad Hammad Butt (CMS: 501399) - Web Engineering Assignment 1.*
