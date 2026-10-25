# LabShaib — Campus Laboratory Equipment Reservation Suite (NUST SEECS)
**Course:** CS344 — Web Engineering (Spring/Fall 2026)  
**Assignment 1:** Client-Side Web Application (30 Marks)  
**Student Name:** Muhammad Hammad Butt  
**CMS ID:** 501399  
**Section:** SE15B  
**Institution:** National University of Sciences and Technology (NUST), Islamabad — SEECS  
**Assigned Topic:** Idea #04 — Lab Equipment Reservation (from the 41-topic bank)  
**Submission Due Date:** Friday, 30 October 2026, 11:59 PM  

---

## 📸 System Interface Preview

![LabShaib Dashboard Preview](./assets/dashboard-preview.jpg)

---

## 📑 Table of Contents
1. [User Persona & Problem Statement](#1-user-persona--problem-statement)
2. [WDLC Design Note (Web Development Life Cycle)](#2-wdlc-design-note)
3. [Client vs. Server Architectural Analysis](#3-client-vs-server-architectural-analysis)
4. [Implemented Features & Interactive Logic](#4-implemented-features--interactive-logic)
5. [Three-Tier Hierarchical Scoped Architecture](#5-three-tier-hierarchical-scoped-architecture)
6. [Preloaded Engineering Dataset](#6-preloaded-engineering-dataset)
7. [Step-by-Step Setup & Local Execution](#7-step-by-step-setup--local-execution)
8. [Viva Defense & In-Class Live Modification Cheat Sheet](#8-viva-defense--in-class-live-modification-cheat-sheet)
9. [Attribution & Academic Integrity Statement](#9-attribution--academic-integrity-statement)

---

## 1. User Persona & Problem Statement

### The Problem in University Laboratories
In academic engineering institutions like NUST (SEECS, SMME, SCME), high-value laboratory equipment (Digital Storage Oscilloscopes, Xilinx FPGA trainer boards, NVIDIA Jetson AI kits, Dual-extrusion 3D printers, Logic Analyzers) represents a scarce, mission-critical resource shared across undergraduate coursework, FYP milestones, and faculty research.

Manual paper logbooks and informal verbal reservations lead to:
1. **Equipment Hoarding / "The 8-Hour Loophole":** Students book equipment for an entire day "just in case", but only use it for an hour, locking out fellow researchers.
2. **Double-Booking & Schedule Clashes:** Two project groups show up at the same workbench simultaneously.
3. **Unexpected Maintenance Downtime:** Students travel across campus only to find handwritten "Out of Order" notes.
4. **Lack of Return Inspection Accountability:** Hardware is returned with blown fuses, broken probe tips, or missing JTAG cables with no legible paper trail.

### The Defined User Persona
* **Primary User (Student / FYP Researcher):** Muhammad Hammad Butt (CMS: 501399, BS Software Engineering, SE15B). Needs to search hardware specs, verify workbench availability, reserve an anti-hogged 2-to-4 hour window, and present a verified Digital Pass at the lab desk.
* **Secondary User (Lab In-Charge / Lab Engineer):** Engr. Asif Bilal (Staff #ES-108, Embedded Systems Lab A-204). Needs scoped authority over their room's hardware, student check-in desks, and return inspection checklists.
* **Institutional User (Super Admin / Dean of Laboratories):** Oversees cross-campus facilities, commissions new labs, appoints lab engineers, and white-labels the platform.

---

## 2. WDLC Design Note (Web Development Life Cycle)

The development of **LabShaib** strictly followed the 5 stages of the Web Development Life Cycle taught in CS344:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  STAGE 1:       │     │  STAGE 2:       │     │  STAGE 3:       │     │  STAGE 4:       │     │  STAGE 5:       │
│  Requirements   │────▶│  UI/UX Design   │────▶│  Implementation │────▶│  Testing &      │────▶│  Deployment &   │
│  Analysis       │     │  & Wireframes   │     │  (Pure HTML/CSS)│     │  Edge Cases     │     │  Maintenance    │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Stage 1: Requirements Analysis
* Analyzed the 41-topic bank and identified Idea #04.
* Conducted academic workflow research into university lab scheduling friction (Reddit `r/labrats`, NUST SEECS lab engineering workflows).
* Derived core functional rules: mathematical conflict detection, 4-hour academic quota limit, multi-criteria filtering, and scoped role views.

### Stage 2: UI/UX System Design & Wireframing
* Produced full ASCII wireframes and functional blueprints across Mobile (<640px), Tablet (640–1024px), and Desktop (>1024px) viewports (see [`WIREFRAMES.md`](../WIREFRAMES.md)).
* Designed a decoupled 4-layer design token system in [`docs/brand.md`](../docs/brand.md) with NUST Deep Navy (`#002D62`) and Engineering Teal (`#0d9488`).
* Designed the **LabShaib** minimal oscilloscope reticle vector logo mark.

### Stage 3: Technical Implementation (Pure Vanilla Stack)
* Handcrafted **Semantic HTML5** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`) with 100% accessible `<label for="">` associations and ARIA live regions.
* Built **Pure CSS3 Layouts** utilizing CSS Grid for the catalogue and KPI cards, and Flexbox for navigation, filters, and forms. Strictly zero external CSS libraries.
* Programmed the **Vanilla ES6+ JavaScript Engine** (`app.js`) handling in-memory state, event delegation, conflict detection, duration math, and dynamic modal rendering.

### Stage 4: Testing & Edge Case Verification
* Tested boundary conditions: Start time $\ge$ End time, past date selections, session duration $> 4.0$ hours, and interval overlap clashes.
* Tested responsive behavior across standard viewport widths: 375px (iPhone SE), 768px (iPad), and 1440px (Desktop).
* Tested accessibility via keyboard navigation (Tab/Shift+Tab) and screen reader landmarks.

### Stage 5: Maintenance & Multi-Stage Evolution
* Architected clean data models (`labs`, `equipment`, `reservations`) that map directly to relational SQL tables in Assignment 2 and Mongoose schemas in Assignment 3.

---

## 3. Client vs. Server Architectural Analysis

The course curriculum divides the system into three progressive stages. Below is the technical breakdown of what executes in the browser client today versus what migrates to the backend in upcoming assignments:

| Functionality / Concern | Assignment 1 (Current Client-Side) | Assignment 2 (PHP 8.5 + PDO Backend) | Assignment 3 (Full-Stack MERN) |
| :--- | :--- | :--- | :--- |
| **State Storage & Persistence** | In-memory JavaScript arrays (`appState`). State resets on hard refresh. | Relational database (SQLite/MySQL PDO) with ACID transactions and foreign keys. | MongoDB document store with Mongoose schemas and indexes. |
| **Data Fetching** | Synchronous client-side JavaScript object filtering. | Asynchronous `Fetch API` (`async/await`) consuming structured JSON endpoints. | Axios / React Query communicating with Express RESTful API routes. |
| **Conflict & Quota Validation** | Client-side validation in `app.js` providing instant UI feedback. | **Dual-layer validation:** Browser validation + strict server-side SQL overlap queries. | Express middleware validation schemas (`zod` or `joi`) with MongoDB date queries. |
| **User Roles & Auth** | Segmented UI toggle pills (`Student`, `Lab In-Charge`, `Super Admin`). | Server-side PHP sessions, hashed passwords, CSRF protection, and session ownership. | JWT (JSON Web Tokens) with cryptographically verified role-based access control. |
| **Data Sanitization** | `escapeHtml()` helper escaping dynamic innerHTML strings against XSS. | `htmlspecialchars()` on output, PDO prepared statements against SQL injection. | Server-side sanitization + React JSX automated escaping. |

---

## 4. Implemented Features & Interactive Logic

### Interaction 1: Real-Time Multi-Criteria Filter & Search Console
* **Instant Keyword Filter:** Filters simultaneously across equipment title, model, technical specs, and asset tags.
* **Dropdown Filters:** Filter by Laboratory Room, Availability Status (`Available`, `Reserved`, `Maintenance`), and Access Clearance (`Open` vs. `FYP/Research`).
* **Empty State Handling:** If a search returns 0 results, the grid displays a friendly "No equipment found" card with a 1-click **Reset Filters** button.

### Interaction 2: Algorithmic Slot Conflict Prevention Engine
Whenever a student adjusts the date or time in the booking dialog, the engine validates the requested interval $[\text{Start}_A, \text{End}_A]$ against all existing confirmed/in-lab bookings $[\text{Start}_B, \text{End}_B]$ for that physical hardware item:
$$\text{Conflict Condition: } \text{Start}_A < \text{End}_B \quad \text{AND} \quad \text{End}_A > \text{Start}_B$$
* If a conflict occurs, the booking button is disabled, the alert turns red, and the student is shown the conflicting booking reference, masked CMS ID, and advice to pick an alternative window.
* If free, the alert turns green and confirms slot availability.

### Interaction 3: Dynamic Duration & Anti-Hogging Quota Calculator
* Dynamically calculates session length in hours and minutes from the time inputs.
* Enforces the university's **4.0-hour maximum single-session limit**. If a student attempts to book a 5-hour window, the system blocks submission with: *"Exceeds university quota: Maximum single-session reservation is 4.0 hours"*.

### Interaction 4: Instant Digital Reservation Pass & Lifecycle Management
* On submission, generates a unique booking reference (e.g., `#PASS-2026-501399-01`).
* Updates the equipment available count; if available units reach 0, the badge dynamically turns to `Reserved`.
* Renders a printable/downloadable **Digital Reservation Voucher** with barcode simulation and university verification timestamps.
* Students can cancel reservations at any time, which immediately releases the equipment back into the available pool.

### Interaction 5: Lab In-Charge Desk & Condition Inspection
* Lab Instructors can mark arriving students as `IN-LAB` (Checked-out).
* When equipment is returned, instructors run a physical inspection checklist (power diagnostic, intact probes, unbroken pins) and can mark returns as `Pristine` (releases unit) or `Damaged` (holds student record and logs equipment maintenance).

### Interaction 6: Live Multi-Tenant Branding Customizer (Super Admin)
* Demonstrates the SaaS white-label engine live: change the university name or pick custom brand colors using native color pickers to update `--brand-primary` and `--brand-accent` on `:root` dynamically without page reload.

---

## 5. Three-Tier Hierarchical Scoped Architecture

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

---

## 6. Preloaded Engineering Dataset

The system includes **8 realistic sample records** matching real laboratory gear at NUST SEECS:

1. **EQ-001 (`NUST-SEECS-EQ-001`):** *Rigol DS1054Z 4-Ch Digital Storage Oscilloscope* — Circuits Lab (Room B-102)
2. **EQ-002 (`NUST-SEECS-EQ-002`):** *Xilinx Basys 3 Artix-7 FPGA Trainer Board* — Embedded Systems Lab (Room A-204)
3. **EQ-003 (`NUST-SEECS-EQ-003`):** *NVIDIA Jetson Orin Nano AI Development Kit (8GB)* — AI & Robotics Lab (Room C-305)
4. **EQ-004 (`NUST-SEECS-EQ-004`):** *Keysight 33220A 20MHz Arbitrary Waveform Generator* — Circuits Lab (Room B-102)
5. **EQ-005 (`NUST-SEECS-EQ-005`):** *Ultimaker S3 Dual-Extrusion 3D Rapid Printer* — FabLab Workshop (Room W-01)
6. **EQ-006 (`NUST-SEECS-EQ-006`):** *Saleae Logic Pro 16 USB Logic Analyzer* — Embedded Systems Lab (Room A-204)
7. **EQ-007 (`NUST-SEECS-EQ-007`):** *Raspberry Pi 5 (8GB) Edge IoT Sensor Cluster* — Embedded Systems Lab (Room A-204)
8. **EQ-008 (`NUST-SEECS-EQ-008`):** *Meta Quest 3 VR Development Headset* — AI & Robotics Lab (Room C-305)

---

## 7. Step-by-Step Setup & Local Execution

**LabShaib** runs 100% self-contained in the browser without requiring npm, node modules, or backend databases.

### Method 1: Direct File Execution (Zero Setup)
1. Clone or download this repository.
2. Navigate into the `assignment-1/` directory.
3. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari.

### Method 2: VS Code Live Server (Recommended)
1. Open the repository root in VS Code.
2. Right-click `assignment-1/index.html` and select **"Open with Live Server"**.
3. The application will launch at `http://127.0.0.1:5500/assignment-1/index.html`.

### Method 3: Python Built-in HTTP Server
Run from your terminal:
```bash
cd assignment-1
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

---

## 8. Viva Defense & In-Class Live Modification Cheat Sheet

During in-class evaluation, instructors typically ask students to explain their code or make a live change. Here is your cheat sheet:

### Modification 1: "Change the maximum booking quota from 4.0 hours to 3.0 hours"
* **File:** [`assignment-1/app.js`](./app.js)
* **Function:** `checkSlotConflict()` around line 350.
* **Edit:** Change `if (durationMinutes > 240)` to `if (durationMinutes > 180)` and update the error text to `3.0 hours`.

### Modification 2: "Add a new equipment record to the preloaded dataset"
* **File:** [`assignment-1/app.js`](./app.js)
* **Location:** `appState.equipment` array around line 130.
* **Edit:** Copy any object and add `id: 'EQ-009'`, `tag: 'NUST-SEECS-EQ-009'`, `name: 'Fluke 87V Digital Multimeter'`, etc.

### Modification 3: "Change the primary brand color to Deep Crimson"
* **File:** [`assignment-1/styles.css`](./styles.css)
* **Location:** `:root` selector around line 45.
* **Edit:** Change `--brand-primary: #002D62;` to `--brand-primary: #800000;`.

### Modification 4: "Explain the conflict detection algorithm"
* **Explanation:** Open `app.js` at `checkSlotConflict()`. Explain that we convert start and end times to total minutes from midnight. We compare against every reservation on that date for that equipment: if `(startMins < existingEnd) && (endMins > existingStart)`, an overlap exists. If true, we disable the submit button and display the conflicting booking reference.

---

## 9. Attribution & Academic Integrity Statement

* **Course Concept Alignment:** Concepts implemented from Weeks 1–5: Client-server basics, WDLC, HTML5 forms and accessibility, CSS3 box model and responsive design, ES6+ JavaScript fundamentals, and DOM event handling.
* **Asset Citations:**
  - Official vector logo (`logo.svg`) and icon (`logo-icon.svg`) handcrafted by Muhammad Hammad Butt.
  - UI vector icons styled using native inline SVGs adapted from open-source Lucide/Feather icon guidelines (`stroke-width: 2`, `currentColor`).
  - No external JavaScript libraries (jQuery, React, Vue, Lodash, Moment.js) or CSS frameworks (Bootstrap, Tailwind) were used.
* **AI Assistance Disclosure:** AI agent assistance was utilized for architecture drafting, design token planning, and test scenario generation under student oversight. All code and logic have been verified and defended by the author.
