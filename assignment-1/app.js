/**
 * LabShaib — Campus Laboratory Equipment Reservation Suite
 * Modular Vanilla ES6+ JavaScript Engine
 * Author: Muhammad Hammad Butt (CMS: 501399) - SE15B
 * National University of Sciences & Technology (NUST) - SEECS
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CENTRAL IN-MEMORY STATE STORE (Defensive & Future-Proofed)
  // ==========================================================================
  const appState = {
    currentRole: 'student', // 'student' | 'instructor' | 'superadmin'
    currentUser: {
      name: 'Muhammad Hammad Butt',
      cmsId: '501399',
      email: 'mbutt.se15@seecs.edu.pk',
      section: 'SE15B',
      department: 'BS Software Engineering'
    },
    // The active lab assigned to the logged-in Lab Instructor
    activeInstructorLabId: 'LAB-01', // Embedded Systems Lab (Room A-204)
    activeInstructor: {
      id: 'INST-01',
      name: 'Engr. Asif Bilal',
      staffId: 'ES-108',
      labId: 'LAB-01',
      extension: '4210'
    },

    // 4 Campus University Laboratories
    labs: [
      {
        id: 'LAB-01',
        name: 'Embedded Systems Lab',
        room: 'Academic Block 1, Room A-204',
        school: 'SEECS - Department of Computing',
        engineerName: 'Engr. Asif Bilal',
        capacity: 35,
        hours: '08:30 AM – 05:00 PM'
      },
      {
        id: 'LAB-02',
        name: 'Circuits & Telecom Lab',
        room: 'Academic Block 1, Room B-102',
        school: 'SEECS - Department of Electrical Engg',
        engineerName: 'Engr. Maria Siddiqui',
        capacity: 40,
        hours: '09:00 AM – 05:30 PM'
      },
      {
        id: 'LAB-03',
        name: 'AI & Robotics Lab',
        room: 'Academic Block 2, Room C-305',
        school: 'SEECS - Department of Computing',
        engineerName: 'Engr. Zeeshan Tariq',
        capacity: 25,
        hours: '08:30 AM – 06:00 PM'
      },
      {
        id: 'LAB-04',
        name: 'FabLab Prototyping Workshop',
        room: 'Mechanical Wing, Room W-01',
        school: 'SMME - School of Mechanical & Mfg',
        engineerName: 'Engr. Bilal Farooq',
        capacity: 20,
        hours: '09:00 AM – 04:30 PM'
      }
    ],

    // 8 Preloaded High-Fidelity Engineering Hardware Records
    equipment: [
      {
        id: 'EQ-001',
        tag: 'NUST-SEECS-EQ-001',
        name: 'Rigol DS1054Z 4-Ch Digital Storage Oscilloscope',
        category: 'Oscilloscopes',
        labId: 'LAB-02',
        totalQty: 6,
        availableQty: 4,
        status: 'Available', // 'Available' | 'Reserved' | 'Maintenance'
        clearance: 'Open',
        specs: '50 MHz Bandwidth, 4 Analog Channels, 1 GSa/s Real-time Sample Rate, 24 Mpts Memory Depth with 4x 10:1 passive probes included.'
      },
      {
        id: 'EQ-002',
        tag: 'NUST-SEECS-EQ-002',
        name: 'Xilinx Basys 3 Artix-7 FPGA Trainer Board',
        category: 'FPGA Boards',
        labId: 'LAB-01',
        totalQty: 8,
        availableQty: 5,
        status: 'Available',
        clearance: 'Open',
        specs: 'Artix-7 XC7A35T-1CPG236C, 33,280 Logic Cells, 16 User Switches, 16 LEDs, 4-digit 7-segment display, USB-JTAG onboard.'
      },
      {
        id: 'EQ-003',
        tag: 'NUST-SEECS-EQ-003',
        name: 'NVIDIA Jetson Orin Nano AI Development Kit (8GB)',
        category: 'AI & Robotics',
        labId: 'LAB-03',
        totalQty: 4,
        availableQty: 2,
        status: 'Available',
        clearance: 'FYP/Research',
        specs: '40 TOPS AI compute, 6-core ARM Cortex-A78AE v8.2, 1024-core NVIDIA Ampere GPU with 32 Tensor Cores, pre-flashed JetPack 6.0.'
      },
      {
        id: 'EQ-004',
        tag: 'NUST-SEECS-EQ-004',
        name: 'Keysight 33220A 20MHz Arbitrary Waveform Generator',
        category: 'Signal Generators',
        labId: 'LAB-02',
        totalQty: 3,
        availableQty: 3,
        status: 'Available',
        clearance: 'Open',
        specs: '20 MHz Sine & Square waveforms, Ramp, Triangle, Noise, 14-bit 50 MSa/s 64 k-point Arbitrary Waveforms, USB & GPIB interfaces.'
      },
      {
        id: 'EQ-005',
        tag: 'NUST-SEECS-EQ-005',
        name: 'Ultimaker S3 Dual-Extrusion 3D Rapid Printer',
        category: '3D Printers',
        labId: 'LAB-04',
        totalQty: 2,
        availableQty: 0,
        status: 'Maintenance',
        clearance: 'FYP/Research',
        specs: 'Dual print heads, 230 x 190 x 200 mm build volume, PLA/Tough PLA/ABS compatible, undergoing heated-bed recalibration.'
      },
      {
        id: 'EQ-006',
        tag: 'NUST-SEECS-EQ-006',
        name: 'Saleae Logic Pro 16 USB Logic Analyzer',
        category: 'Logic Analyzers',
        labId: 'LAB-01',
        totalQty: 4,
        availableQty: 3,
        status: 'Available',
        clearance: 'Open',
        specs: '16 digital/analog channels, 500 MS/s digital sampling, 50 MS/s analog, supports SPI, I2C, CAN, UART, USB packet decode.'
      },
      {
        id: 'EQ-007',
        tag: 'NUST-SEECS-EQ-007',
        name: 'Raspberry Pi 5 (8GB) Edge IoT Sensor Cluster',
        category: 'AI & Robotics',
        labId: 'LAB-01',
        totalQty: 5,
        availableQty: 3,
        status: 'Available',
        clearance: 'Open',
        specs: 'Quad-core ARM Cortex-A76 @ 2.4GHz, 8GB LPDDR4X, PCIe 2.0 interface, dual 4K HDMI, equipped with BME680 environmental sensor shield.'
      },
      {
        id: 'EQ-008',
        tag: 'NUST-SEECS-EQ-008',
        name: 'Meta Quest 3 VR Development Headset with Spatial Anchors',
        category: 'AI & Robotics',
        labId: 'LAB-03',
        totalQty: 3,
        availableQty: 1,
        status: 'Available',
        clearance: 'FYP/Research',
        specs: 'Snapdragon XR2 Gen 2, 4K+ Infinite Display, Full-color passthrough cameras for MR robotics teleoperation, Touch Plus controllers.'
      }
    ],

    // Seeded Reservations (Includes existing bookings to demonstrate algorithmic conflict detection)
    reservations: [
      {
        id: 'PASS-2026-501399-01',
        bookingRef: '#BK-2026-01',
        equipmentId: 'EQ-002', // Basys 3 FPGA
        studentName: 'Muhammad Hammad Butt',
        cmsId: '501399',
        email: 'mbutt.se15@seecs.edu.pk',
        department: 'BS Software Engineering - SE15B',
        purpose: 'Course Lab Assignment (CS344 Web Engg)',
        supervisor: 'Dr. Adeel / Engr. Usama',
        date: getFormattedDate(0), // Today
        startTime: '10:00',
        endTime: '12:30',
        durationHours: 2.5,
        status: 'CONFIRMED' // 'CONFIRMED' | 'IN-LAB' | 'RETURNED' | 'CANCELLED'
      },
      {
        id: 'PASS-2026-501140-02',
        bookingRef: '#BK-2026-02',
        equipmentId: 'EQ-001', // Rigol Oscilloscope
        studentName: 'Ayesha Malik',
        cmsId: '501140',
        email: 'amalik.ee12@seecs.edu.pk',
        department: 'BS Electrical Engineering - EE12',
        purpose: 'Final Year Project (FYP) Milestone',
        supervisor: 'Dr. Rizwan',
        date: getFormattedDate(0),
        startTime: '13:00',
        endTime: '16:00',
        durationHours: 3.0,
        status: 'CONFIRMED'
      },
      {
        id: 'PASS-2026-489211-03',
        bookingRef: '#BK-2026-03',
        equipmentId: 'EQ-006', // Saleae Logic Analyzer
        studentName: 'Daniyal Khan',
        cmsId: '489211',
        email: 'dkhan.cs14@seecs.edu.pk',
        department: 'BS Computer Science - CS14A',
        purpose: 'Faculty Supervised Research',
        supervisor: 'Dr. Zafar',
        date: getFormattedDate(1), // Tomorrow
        startTime: '09:00',
        endTime: '11:00',
        durationHours: 2.0,
        status: 'CONFIRMED'
      }
    ]
  };

  // Helper function to get YYYY-MM-DD offset from today
  function getFormattedDate(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ==========================================================================
  // 2. DOM ELEMENT CACHING
  // ==========================================================================
  const dom = {
    // Role switchers & Views
    roleRadios: document.querySelectorAll('input[name="app-role-selector"]'),
    viewStudent: document.getElementById('view-student'),
    viewInstructor: document.getElementById('view-instructor'),
    viewSuperAdmin: document.getElementById('view-superadmin'),
    activeUserBadge: document.getElementById('active-user-badge'),

    // Global Search & Alert
    globalSearchInput: document.getElementById('global-search-input'),
    btnDismissAlert: document.getElementById('btn-dismiss-alert'),
    campusAlertStrip: document.getElementById('campus-alert-strip'),

    // Student View Catalogue & KPIs
    kpiTotal: document.getElementById('kpi-total-equipment'),
    kpiAvailable: document.getElementById('kpi-available-units'),
    kpiActive: document.getElementById('kpi-active-reservations'),
    kpiUtilization: document.getElementById('kpi-utilization-rate'),
    catalogueGrid: document.getElementById('equipment-catalogue-grid'),
    emptyState: document.getElementById('empty-catalogue-state'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    btnEmptyReset: document.getElementById('btn-empty-reset'),
    filteredCount: document.getElementById('filtered-records-count'),
    totalCount: document.getElementById('total-records-count'),
    studentPassesContainer: document.getElementById('student-passes-container'),
    studentPassesCount: document.getElementById('count-student-passes'),

    // Filter Controls
    filterKeyword: document.getElementById('filter-keyword'),
    filterLab: document.getElementById('filter-lab'),
    filterStatus: document.getElementById('filter-status'),
    filterClearance: document.getElementById('filter-clearance'),

    // Instructor View Elements
    instructorLabName: document.getElementById('instructor-lab-name'),
    instructorManagerName: document.getElementById('instructor-manager-name'),
    kpiInstrTotal: document.getElementById('kpi-instr-total'),
    kpiInstrActive: document.getElementById('kpi-instr-active'),
    kpiInstrInLab: document.getElementById('kpi-instr-inlab'),
    tbodyInstructorEquipment: document.getElementById('tbody-instructor-equipment'),
    tbodyInstructorReservations: document.getElementById('tbody-instructor-reservations'),
    instructorLedgerFilter: document.getElementById('instructor-ledger-filter'),
    btnOpenAddEquipment: document.getElementById('btn-open-add-equipment'),

    // Super Admin View Elements
    tbodySuperAdminLabs: document.getElementById('tbody-superadmin-labs'),
    btnOpenAddLab: document.getElementById('btn-open-add-lab'),
    formBrandingCustomizer: document.getElementById('form-branding-customizer'),
    inputTenantName: document.getElementById('input-tenant-name'),
    inputTenantSub: document.getElementById('input-tenant-sub'),
    inputBrandPrimary: document.getElementById('input-brand-primary'),
    inputBrandAccent: document.getElementById('input-brand-accent'),
    hexBrandPrimary: document.getElementById('hex-brand-primary'),
    hexBrandAccent: document.getElementById('hex-brand-accent'),
    btnResetBranding: document.getElementById('btn-reset-branding'),
    displayInstName: document.getElementById('display-institution-name'),
    displayInstSub: document.getElementById('display-institution-sub'),

    // Modals
    modalBooking: document.getElementById('modal-booking'),
    btnCloseBooking: document.getElementById('btn-close-booking'),
    btnCancelBooking: document.getElementById('btn-cancel-booking'),
    formReservation: document.getElementById('form-reservation'),
    bookingEqId: document.getElementById('booking-equipment-id'),
    bookingEqSummary: document.getElementById('booking-modal-equipment-summary'),
    bookingLabBadge: document.getElementById('booking-modal-lab-badge'),
    bookingDate: document.getElementById('booking-date'),
    bookingStartTime: document.getElementById('booking-start-time'),
    bookingEndTime: document.getElementById('booking-end-time'),
    bookingDurationCalc: document.getElementById('display-duration-calc'),
    bookingQuotaBadge: document.getElementById('badge-quota-status'),
    bookingProgressBar: document.getElementById('quota-progress-bar'),
    bookingConflictAlert: document.getElementById('booking-conflict-alert'),
    bookingConflictMessage: document.getElementById('conflict-alert-message'),
    btnSubmitBooking: document.getElementById('btn-submit-booking'),

    // Voucher Modal
    modalPass: document.getElementById('modal-pass'),
    btnClosePass: document.getElementById('btn-close-pass'),
    btnDismissPass: document.getElementById('btn-dismiss-pass'),
    btnPrintVoucher: document.getElementById('btn-print-voucher'),
    vRefCode: document.getElementById('voucher-ref-code'),
    vStudentName: document.getElementById('v-student-name'),
    vCmsId: document.getElementById('v-cms-id'),
    vEquipmentName: document.getElementById('v-equipment-name'),
    vAssetTag: document.getElementById('v-asset-tag'),
    vLabRoom: document.getElementById('v-lab-room'),
    vLabInCharge: document.getElementById('v-lab-incharge'),
    vDate: document.getElementById('v-date'),
    vTimeSlot: document.getElementById('v-time-slot'),
    vPurpose: document.getElementById('v-purpose'),
    vTimestamp: document.getElementById('v-timestamp'),

    // Add Equipment Modal
    modalAddEquipment: document.getElementById('modal-add-equipment'),
    btnCloseAddEq: document.getElementById('btn-close-add-eq'),
    btnCancelAddEq: document.getElementById('btn-cancel-add-eq'),
    formAddEquipment: document.getElementById('form-add-equipment'),

    // Inspection Modal
    modalInspection: document.getElementById('modal-inspection'),
    btnCloseInspection: document.getElementById('btn-close-inspection'),
    btnCancelInspection: document.getElementById('btn-cancel-inspection'),
    formInspection: document.getElementById('form-inspection'),
    inspectionBookingId: document.getElementById('inspection-booking-id'),
    inspectionSummary: document.getElementById('inspection-session-summary'),

    // Add Lab Modal
    modalAddLab: document.getElementById('modal-add-lab'),
    btnCloseAddLab: document.getElementById('btn-close-add-lab'),
    btnCancelAddLab: document.getElementById('btn-cancel-add-lab'),
    formAddLab: document.getElementById('form-add-lab')
  };

  // ==========================================================================
  // 3. CORE RENDERING ENGINE & COMPUTED METRICS
  // ==========================================================================

  // Recalculates and updates the aggregate KPI dashboard
  function updateAggregateKPIs() {
    const totalEquipment = appState.equipment.length;
    const availableUnits = appState.equipment.reduce((acc, eq) => acc + (eq.status === 'Available' ? eq.availableQty : 0), 0);
    const activeBookings = appState.reservations.filter(r => r.status === 'CONFIRMED' || r.status === 'IN-LAB').length;
    
    // Utilization Rate % = (Reserved/In-Use Units / Total Units) * 100
    const totalUnits = appState.equipment.reduce((acc, eq) => acc + eq.totalQty, 0);
    const inUseUnits = totalUnits - availableUnits;
    const utilization = totalUnits > 0 ? Math.round((inUseUnits / totalUnits) * 100) : 0;

    if (dom.kpiTotal) dom.kpiTotal.textContent = totalEquipment;
    if (dom.kpiAvailable) dom.kpiAvailable.textContent = availableUnits;
    if (dom.kpiActive) dom.kpiActive.textContent = activeBookings;
    if (dom.kpiUtilization) dom.kpiUtilization.textContent = `${utilization}%`;
  }

  // Renders the Student Equipment Catalogue Grid based on current filters
  function renderCatalogue() {
    const keyword = (dom.filterKeyword ? dom.filterKeyword.value : '').trim().toLowerCase();
    const labFilter = dom.filterLab ? dom.filterLab.value : 'ALL';
    const statusFilter = dom.filterStatus ? dom.filterStatus.value : 'ALL';
    const clearanceFilter = dom.filterClearance ? dom.filterClearance.value : 'ALL';

    const filtered = appState.equipment.filter(item => {
      // Keyword matching across title, specs, tag, and category
      const matchesKeyword = !keyword || 
        item.name.toLowerCase().includes(keyword) ||
        item.specs.toLowerCase().includes(keyword) ||
        item.tag.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      // Lab facility filter
      const matchesLab = (labFilter === 'ALL') || (item.labId === labFilter);

      // Availability status filter
      const matchesStatus = (statusFilter === 'ALL') || (item.status === statusFilter);

      // Clearance level filter
      const matchesClearance = (clearanceFilter === 'ALL') || (item.clearance === clearanceFilter);

      return matchesKeyword && matchesLab && matchesStatus && matchesClearance;
    });

    // Update result counters
    if (dom.filteredCount) dom.filteredCount.textContent = filtered.length;
    if (dom.totalCount) dom.totalCount.textContent = appState.equipment.length;

    if (filtered.length === 0) {
      dom.catalogueGrid.innerHTML = '';
      dom.emptyState.classList.remove('hidden');
      return;
    }

    dom.emptyState.classList.add('hidden');

    const html = filtered.map(item => {
      const lab = appState.labs.find(l => l.id === item.labId) || { name: 'Unknown Lab', room: 'Campus' };
      const statusClass = item.status === 'Available' ? 'status-available' :
                          item.status === 'Reserved' ? 'status-reserved' : 'status-maintenance';
      const isBookable = item.status === 'Available' && item.availableQty > 0;

      return `
        <article class="equipment-card" data-eq-id="${escapeHtml(item.id)}">
          <header class="eq-card-header">
            <div class="eq-card-facility">
              <span class="eq-facility-room">${escapeHtml(lab.name)}</span>
              <span class="eq-asset-code">${escapeHtml(item.tag)}</span>
            </div>
            <span class="status-badge ${statusClass}">${escapeHtml(item.status)}</span>
          </header>

          <div class="eq-card-body">
            <h3 class="eq-item-title">${escapeHtml(item.name)}</h3>
            <p class="eq-specs-text">${escapeHtml(item.specs)}</p>
            
            <div class="eq-meta-pills">
              <span class="meta-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Max 4h Quota
              </span>
              <span class="meta-pill ${item.clearance !== 'Open' ? 'meta-pill-clearance' : ''}">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                ${escapeHtml(item.clearance)}
              </span>
              <span class="meta-pill">
                ${escapeHtml(item.category)}
              </span>
            </div>
          </div>

          <footer class="eq-card-footer">
            <div class="eq-availability-info">
              <span class="eq-stock-count font-tabular">Available: ${item.availableQty} of ${item.totalQty}</span>
              <span class="eq-quota-hint">${escapeHtml(lab.room)}</span>
            </div>
            <button 
              type="button" 
              class="btn btn-primary btn-sm btn-initiate-booking" 
              data-id="${escapeHtml(item.id)}"
              ${!isBookable ? 'disabled aria-disabled="true"' : ''}
            >
              ${isBookable ? 'Reserve Slot' : 'Unavailable'}
            </button>
          </footer>
        </article>
      `;
    }).join('');

    dom.catalogueGrid.innerHTML = html;

    // Attach click listeners to all "Reserve Slot" buttons
    dom.catalogueGrid.querySelectorAll('.btn-initiate-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openBookingModal(id);
      });
    });
  }

  // Renders the Student's active digital reservation passes
  function renderStudentPasses() {
    const studentPasses = appState.reservations.filter(
      r => r.cmsId === appState.currentUser.cmsId && r.status !== 'CANCELLED'
    );

    if (dom.studentPassesCount) dom.studentPassesCount.textContent = studentPasses.length;

    if (studentPasses.length === 0) {
      dom.studentPassesContainer.innerHTML = `
        <div class="empty-state-card" style="grid-column: 1 / -1; padding: 2rem;">
          <p class="empty-state-desc" style="margin-bottom: 0;">You have no active reservation passes. Select an available equipment item above to book your time slot.</p>
        </div>
      `;
      return;
    }

    const html = studentPasses.map(pass => {
      const eq = appState.equipment.find(e => e.id === pass.equipmentId) || { name: 'Lab Hardware', tag: 'TAG' };
      const lab = appState.labs.find(l => l.id === eq.labId) || { name: 'Lab Facility', room: 'SEECS' };
      const statusClass = pass.status === 'CONFIRMED' ? 'status-reserved' :
                          pass.status === 'IN-LAB' ? 'status-available' : 'status-maintenance';

      return `
        <article class="pass-card" data-pass-id="${escapeHtml(pass.id)}">
          <div class="pass-card-header">
            <span class="pass-ref-code">${escapeHtml(pass.id)}</span>
            <span class="status-badge ${statusClass}">${escapeHtml(pass.status)}</span>
          </div>
          <div class="pass-equipment-name">${escapeHtml(eq.name)}</div>
          <div class="pass-time-details">
            <div><strong>Location:</strong> ${escapeHtml(lab.name)} (${escapeHtml(lab.room)})</div>
            <div><strong>Session:</strong> ${escapeHtml(pass.date)} • ${escapeHtml(pass.startTime)} – ${escapeHtml(pass.endTime)} (${pass.durationHours}h)</div>
            <div><strong>Supervisor:</strong> ${escapeHtml(pass.supervisor)}</div>
          </div>
          <div class="pass-actions-row">
            <button type="button" class="btn btn-outline btn-sm btn-view-voucher" data-pass-id="${escapeHtml(pass.id)}">
              View Digital Pass
            </button>
            ${pass.status === 'CONFIRMED' ? `
              <button type="button" class="btn btn-sm btn-cancel-pass text-danger" data-pass-id="${escapeHtml(pass.id)}">
                Cancel Booking
              </button>
            ` : `<span class="badge-scope-pill" style="margin: 0;">Checked In</span>`}
          </div>
        </article>
      `;
    }).join('');

    dom.studentPassesContainer.innerHTML = html;

    // Attach listeners for pass actions
    dom.studentPassesContainer.querySelectorAll('.btn-view-voucher').forEach(b => {
      b.addEventListener('click', () => {
        const passId = b.getAttribute('data-pass-id');
        displayVoucherPass(passId);
      });
    });

    dom.studentPassesContainer.querySelectorAll('.btn-cancel-pass').forEach(b => {
      b.addEventListener('click', () => {
        const passId = b.getAttribute('data-pass-id');
        cancelReservation(passId);
      });
    });
  }

  // Renders the Scoped Lab Instructor Tables
  function renderInstructorPortal() {
    const activeLab = appState.labs.find(l => l.id === appState.activeInstructorLabId) || appState.labs[0];
    if (dom.instructorLabName) dom.instructorLabName.textContent = `${activeLab.name} (${activeLab.room})`;
    if (dom.instructorManagerName) dom.instructorManagerName.textContent = appState.activeInstructor.name;

    // Filter equipment scoped to this lab only
    const scopedEquipment = appState.equipment.filter(e => e.labId === activeLab.id);
    const scopedReservations = appState.reservations.filter(r => {
      const eq = appState.equipment.find(e => e.id === r.equipmentId);
      return eq && eq.labId === activeLab.id;
    });

    // Update scoped KPIs
    if (dom.kpiInstrTotal) dom.kpiInstrTotal.textContent = `${scopedEquipment.length} Items`;
    if (dom.kpiInstrActive) dom.kpiInstrActive.textContent = scopedReservations.filter(r => r.status === 'CONFIRMED').length;
    if (dom.kpiInstrInLab) dom.kpiInstrInLab.textContent = scopedReservations.filter(r => r.status === 'IN-LAB').length;

    // Render Scoped Equipment Inventory Table
    if (dom.tbodyInstructorEquipment) {
      dom.tbodyInstructorEquipment.innerHTML = scopedEquipment.map(item => {
        const statusClass = item.status === 'Available' ? 'status-available' :
                            item.status === 'Reserved' ? 'status-reserved' : 'status-maintenance';
        return `
          <tr>
            <td class="font-tabular font-bold">${escapeHtml(item.tag)}</td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.category)}</td>
            <td class="font-tabular">${item.availableQty} / ${item.totalQty}</td>
            <td><span class="status-badge ${statusClass}">${escapeHtml(item.status)}</span></td>
            <td><span class="meta-pill ${item.clearance !== 'Open' ? 'meta-pill-clearance' : ''}">${escapeHtml(item.clearance)}</span></td>
            <td class="text-right">
              <button type="button" class="btn btn-outline btn-sm btn-toggle-maint" data-id="${escapeHtml(item.id)}">
                ${item.status === 'Maintenance' ? 'Mark Operational' : 'Log Maintenance'}
              </button>
            </td>
          </tr>
        `;
      }).join('');

      dom.tbodyInstructorEquipment.querySelectorAll('.btn-toggle-maint').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          toggleEquipmentMaintenance(id);
        });
      });
    }

    // Render Scoped Student Reservation Ledger Table
    renderInstructorReservationLedger();
  }

  function renderInstructorReservationLedger() {
    if (!dom.tbodyInstructorReservations) return;

    const activeLab = appState.labs.find(l => l.id === appState.activeInstructorLabId) || appState.labs[0];
    const cmsFilter = (dom.instructorLedgerFilter ? dom.instructorLedgerFilter.value : '').trim();

    const scopedReservations = appState.reservations.filter(r => {
      const eq = appState.equipment.find(e => e.id === r.equipmentId);
      const matchesLab = eq && eq.labId === activeLab.id;
      const matchesCms = !cmsFilter || r.cmsId.includes(cmsFilter);
      return matchesLab && matchesCms;
    });

    if (scopedReservations.length === 0) {
      dom.tbodyInstructorReservations.innerHTML = `
        <tr><td colspan="8" class="text-center" style="padding: 2rem; color: var(--color-text-muted);">No student bookings recorded for this laboratory.</td></tr>
      `;
      return;
    }

    dom.tbodyInstructorReservations.innerHTML = scopedReservations.map(res => {
      const eq = appState.equipment.find(e => e.id === res.equipmentId) || { name: 'Hardware', tag: 'TAG' };
      const statusClass = res.status === 'CONFIRMED' ? 'status-reserved' :
                          res.status === 'IN-LAB' ? 'status-available' :
                          res.status === 'RETURNED' ? 'status-available' : 'status-maintenance';

      return `
        <tr>
          <td class="font-tabular font-bold">${escapeHtml(res.id)}</td>
          <td class="font-tabular">${escapeHtml(res.cmsId)}</td>
          <td><strong>${escapeHtml(res.studentName)}</strong></td>
          <td>${escapeHtml(eq.name)}</td>
          <td class="font-tabular">${escapeHtml(res.date)} • ${escapeHtml(res.startTime)}–${escapeHtml(res.endTime)}</td>
          <td class="font-tabular">${res.durationHours}h</td>
          <td><span class="status-badge ${statusClass}">${escapeHtml(res.status)}</span></td>
          <td class="text-right">
            ${res.status === 'CONFIRMED' ? `
              <button type="button" class="btn btn-secondary btn-sm btn-checkin" data-id="${escapeHtml(res.id)}">Check Out (In-Lab)</button>
            ` : res.status === 'IN-LAB' ? `
              <button type="button" class="btn btn-primary btn-sm btn-inspect" data-id="${escapeHtml(res.id)}">Inspect Return</button>
            ` : `<span class="badge-scope-pill" style="margin: 0;">Completed</span>`}
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions
    dom.tbodyInstructorReservations.querySelectorAll('.btn-checkin').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        markStudentInLab(id);
      });
    });

    dom.tbodyInstructorReservations.querySelectorAll('.btn-inspect').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        openInspectionModal(id);
      });
    });
  }

  // Renders the Super Admin Facilities Directory Table
  function renderSuperAdminPortal() {
    if (!dom.tbodySuperAdminLabs) return;

    dom.tbodySuperAdminLabs.innerHTML = appState.labs.map(lab => {
      const items = appState.equipment.filter(e => e.labId === lab.id);
      const totalUnits = items.reduce((acc, eq) => acc + eq.totalQty, 0);
      const availUnits = items.reduce((acc, eq) => acc + (eq.status === 'Available' ? eq.availableQty : 0), 0);

      return `
        <tr>
          <td class="font-tabular font-bold">${escapeHtml(lab.id)}</td>
          <td><strong>${escapeHtml(lab.name)}</strong></td>
          <td>${escapeHtml(lab.room)}</td>
          <td>${escapeHtml(lab.school)}</td>
          <td>${escapeHtml(lab.engineerName)}</td>
          <td class="font-tabular">${lab.capacity} seats</td>
          <td class="font-tabular">${escapeHtml(lab.hours)}</td>
          <td class="text-right">
            <span class="meta-pill font-tabular">${items.length} Assets (${availUnits}/${totalUnits} free)</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================================================
  // 4. INTERACTION: SLOT AVAILABILITY & CONFLICT PREVENTION ENGINE
  // ==========================================================================

  /**
   * Conflict Condition Rule (from agents.md):
   * A new booking [StartA, EndA] on date D conflicts with an existing booking [StartB, EndB] if:
   * StartA < EndB AND EndA > StartB (for the same equipment and date)
   */
  function checkSlotConflict(equipmentId, date, startTime, endTime) {
    if (!equipmentId || !date || !startTime || !endTime) {
      return { hasConflict: false };
    }

    // Convert "HH:MM" to decimal minutes from midnight for exact comparison
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);

    // Rule: End time cannot be less than or equal to start time
    if (endMins <= startMins) {
      return {
        hasConflict: true,
        reason: 'Invalid time sequence: Session End Time must be strictly later than Start Time.'
      };
    }

    // Rule: Single-session anti-hogging duration cap is 4.0 hours (240 minutes)
    const durationMinutes = endMins - startMins;
    if (durationMinutes > 240) {
      return {
        hasConflict: true,
        reason: `Exceeds university quota: Maximum single-session reservation is 4.0 hours (requested: ${(durationMinutes / 60).toFixed(1)} hrs).`
      };
    }

    // Find conflicting confirmed/in-lab reservations for the same equipment and date
    const clashing = appState.reservations.find(r => {
      if (r.equipmentId !== equipmentId || r.date !== date || r.status === 'CANCELLED') {
        return false;
      }
      const existingStart = timeToMinutes(r.startTime);
      const existingEnd = timeToMinutes(r.endTime);

      // Algorithmic overlap check: StartA < EndB AND EndA > StartB
      return (startMins < existingEnd) && (endMins > existingStart);
    });

    if (clashing) {
      return {
        hasConflict: true,
        reason: `Scheduling Conflict: Unit is already reserved on ${clashing.date} between ${clashing.startTime} and ${clashing.endTime} (Booking ${clashing.id} by CMS ${clashing.cmsId.slice(0, 3)}***). Please select an earlier or later time slot.`
      };
    }

    return {
      hasConflict: false,
      durationHours: Number((durationMinutes / 60).toFixed(1)),
      durationText: formatMinutesToHours(durationMinutes)
    };
  }

  function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return (h * 60) + m;
  }

  function formatMinutesToHours(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) return `${mins} Minutes`;
    if (mins === 0) return `${hours} Hour${hours > 1 ? 's' : ''}`;
    return `${hours} Hour${hours > 1 ? 's' : ''} ${mins} Minutes`;
  }

  // Live validator called on time/date input changes in the booking modal
  function evaluateBookingInputs() {
    const eqId = dom.bookingEqId.value;
    const date = dom.bookingDate.value;
    const startTime = dom.bookingStartTime.value;
    const endTime = dom.bookingEndTime.value;

    const result = checkSlotConflict(eqId, date, startTime, endTime);

    if (result.hasConflict) {
      dom.bookingConflictAlert.className = 'conflict-alert-box alert-conflict mt-3';
      dom.bookingConflictMessage.textContent = result.reason;
      dom.btnSubmitBooking.disabled = true;

      dom.bookingQuotaBadge.className = 'quota-pill quota-fail';
      dom.bookingQuotaBadge.textContent = 'Quota Exceeded / Conflict';
      dom.bookingProgressBar.style.width = '100%';
      dom.bookingProgressBar.style.backgroundColor = 'var(--red-600)';
    } else {
      dom.bookingConflictAlert.className = 'conflict-alert-box alert-success mt-3';
      dom.bookingConflictMessage.textContent = `Slot is completely available! Verified no overlapping bookings for this equipment on ${date}.`;
      dom.btnSubmitBooking.disabled = false;

      dom.bookingDurationCalc.textContent = result.durationText;
      dom.bookingQuotaBadge.className = 'quota-pill quota-pass';
      dom.bookingQuotaBadge.textContent = `Within 4.0h Quota (${result.durationHours}h)`;

      const pct = Math.min(100, Math.round((result.durationHours / 4.0) * 100));
      dom.bookingProgressBar.style.width = `${pct}%`;
      dom.bookingProgressBar.style.backgroundColor = 'var(--brand-accent)';
    }
  }

  // ==========================================================================
  // 5. MODAL WORKFLOWS & RESERVATION LIFECYCLE
  // ==========================================================================

  function openBookingModal(equipmentId) {
    const item = appState.equipment.find(e => e.id === equipmentId);
    if (!item) return;

    const lab = appState.labs.find(l => l.id === item.labId) || { name: 'Lab', room: 'Campus' };

    dom.bookingEqId.value = item.id;
    dom.bookingLabBadge.textContent = `${lab.name} (${lab.room})`;
    dom.bookingEqSummary.innerHTML = `
      <strong>${escapeHtml(item.name)}</strong> (${escapeHtml(item.tag)})<br>
      <span style="font-size: 0.78rem; opacity: 0.9;">${escapeHtml(item.specs)}</span>
    `;

    // Set default date to today (and min date constraint to prevent past bookings)
    const today = getFormattedDate(0);
    dom.bookingDate.min = today;
    if (!dom.bookingDate.value || dom.bookingDate.value < today) {
      dom.bookingDate.value = today;
    }

    evaluateBookingInputs();
    dom.modalBooking.showModal();
  }

  function handleBookingFormSubmit(e) {
    e.preventDefault();

    const form = dom.formReservation;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const eqId = dom.bookingEqId.value;
    const date = dom.bookingDate.value;
    const startTime = dom.bookingStartTime.value;
    const endTime = dom.bookingEndTime.value;

    // Run final conflict validation
    const check = checkSlotConflict(eqId, date, startTime, endTime);
    if (check.hasConflict) {
      alert(check.reason);
      return;
    }

    const item = appState.equipment.find(e => e.id === eqId);
    if (!item) return;

    // Generate unique sequential reference
    const passCount = appState.reservations.length + 1;
    const bookingRef = `#BK-2026-${String(passCount).padStart(2, '0')}`;
    const passId = `PASS-2026-${dom.formReservation.cmsId.value}-${String(passCount).padStart(2, '0')}`;

    const newReservation = {
      id: passId,
      bookingRef: bookingRef,
      equipmentId: item.id,
      studentName: dom.formReservation.studentName.value.trim(),
      cmsId: dom.formReservation.cmsId.value.trim(),
      email: dom.formReservation.email.value.trim(),
      department: dom.formReservation.department.value,
      purpose: dom.formReservation.purpose.value,
      supervisor: dom.formReservation.supervisor.value.trim(),
      date: date,
      startTime: startTime,
      endTime: endTime,
      durationHours: check.durationHours,
      status: 'CONFIRMED'
    };

    // Update state
    appState.reservations.unshift(newReservation);

    // Update equipment inventory count
    item.availableQty = Math.max(0, item.availableQty - 1);
    if (item.availableQty === 0) {
      item.status = 'Reserved';
    }

    // Refresh UI
    updateAggregateKPIs();
    renderCatalogue();
    renderStudentPasses();
    if (appState.currentRole === 'instructor') renderInstructorPortal();

    dom.modalBooking.close();

    // Immediately display the generated Digital Pass Voucher
    displayVoucherPass(newReservation.id);
  }

  // Displays the Printable Digital Reservation Pass
  function displayVoucherPass(passId) {
    const res = appState.reservations.find(r => r.id === passId);
    if (!res) return;

    const eq = appState.equipment.find(e => e.id === res.equipmentId) || { name: 'Hardware', tag: 'TAG' };
    const lab = appState.labs.find(l => l.id === eq.labId) || { name: 'Lab Facility', room: 'SEECS', engineerName: 'Lab Staff' };

    dom.vRefCode.textContent = res.id;
    dom.vStudentName.textContent = res.studentName;
    dom.vCmsId.textContent = res.cmsId;
    dom.vEquipmentName.textContent = eq.name;
    dom.vAssetTag.textContent = eq.tag;
    dom.vLabRoom.textContent = `${lab.name} (${lab.room})`;
    dom.vLabInCharge.textContent = `${lab.engineerName} (${lab.school})`;
    dom.vDate.textContent = res.date;
    dom.vTimeSlot.textContent = `${res.startTime} – ${res.endTime} (${res.durationHours} hrs)`;
    dom.vPurpose.textContent = `${res.purpose} — Sup: ${res.supervisor}`;
    dom.vTimestamp.textContent = `Generated: ${new Date().toLocaleString()} PKT • Verified by LabShaib Engine`;

    dom.modalPass.showModal();
  }

  // Cancels an active reservation and releases the equipment back into the pool
  function cancelReservation(passId) {
    const resIndex = appState.reservations.findIndex(r => r.id === passId);
    if (resIndex === -1) return;

    const res = appState.reservations[resIndex];
    if (!confirm(`Are you sure you want to cancel reservation ${res.id}? This will immediately release the equipment back into the available pool.`)) {
      return;
    }

    res.status = 'CANCELLED';

    // Restore equipment available quantity
    const eq = appState.equipment.find(e => e.id === res.equipmentId);
    if (eq) {
      eq.availableQty = Math.min(eq.totalQty, eq.availableQty + 1);
      if (eq.status === 'Reserved' && eq.availableQty > 0) {
        eq.status = 'Available';
      }
    }

    updateAggregateKPIs();
    renderCatalogue();
    renderStudentPasses();
    if (appState.currentRole === 'instructor') renderInstructorPortal();
  }

  // ==========================================================================
  // 6. INSTRUCTOR ACTIONS: CHECK-IN & RETURN INSPECTION
  // ==========================================================================

  function markStudentInLab(passId) {
    const res = appState.reservations.find(r => r.id === passId);
    if (!res) return;

    res.status = 'IN-LAB';
    renderInstructorPortal();
    updateAggregateKPIs();
  }

  function openInspectionModal(passId) {
    const res = appState.reservations.find(r => r.id === passId);
    if (!res) return;

    const eq = appState.equipment.find(e => e.id === res.equipmentId) || { name: 'Hardware', tag: 'TAG' };

    dom.inspectionBookingId.value = res.id;
    dom.inspectionSummary.innerHTML = `
      <strong>Return of ${escapeHtml(eq.name)}</strong> (${escapeHtml(eq.tag)})<br>
      Student: ${escapeHtml(res.studentName)} (CMS: ${escapeHtml(res.cmsId)}) • Session: ${res.startTime}–${res.endTime}
    `;

    dom.formInspection.reset();
    dom.modalInspection.showModal();
  }

  function handleInspectionSubmit(e) {
    e.preventDefault();

    const passId = dom.inspectionBookingId.value;
    const res = appState.reservations.find(r => r.id === passId);
    if (!res) return;

    const condition = document.getElementById('inspection-condition-select').value;
    const eq = appState.equipment.find(e => e.id === res.equipmentId);

    if (condition === 'Damaged') {
      alert(`Equipment ${eq.tag} flagged for hardware inspection/repair. Student CMS ${res.cmsId} record placed on academic hold.`);
      if (eq) eq.status = 'Maintenance';
    } else {
      res.status = 'RETURNED';
      if (eq) {
        eq.availableQty = Math.min(eq.totalQty, eq.availableQty + 1);
        if (eq.status === 'Reserved' && eq.availableQty > 0) {
          eq.status = 'Available';
        }
      }
    }

    dom.modalInspection.close();
    renderInstructorPortal();
    renderCatalogue();
    renderStudentPasses();
    updateAggregateKPIs();
  }

  function toggleEquipmentMaintenance(equipmentId) {
    const item = appState.equipment.find(e => e.id === equipmentId);
    if (!item) return;

    if (item.status === 'Maintenance') {
      item.status = 'Available';
      item.availableQty = item.totalQty;
    } else {
      item.status = 'Maintenance';
      item.availableQty = 0;
    }

    renderInstructorPortal();
    renderCatalogue();
    updateAggregateKPIs();
  }

  function handleAddEquipmentSubmit(e) {
    e.preventDefault();
    const form = dom.formAddEquipment;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById('eq-input-name').value.trim();
    const tag = document.getElementById('eq-input-tag').value.trim();
    const category = document.getElementById('eq-input-category').value;
    const qty = parseInt(document.getElementById('eq-input-qty').value, 10);
    const clearance = document.getElementById('eq-input-clearance').value;
    const specs = document.getElementById('eq-input-specs').value.trim();

    const newId = `EQ-${String(appState.equipment.length + 1).padStart(3, '0')}`;

    appState.equipment.push({
      id: newId,
      tag: tag,
      name: name,
      category: category,
      labId: appState.activeInstructorLabId, // Locked strictly to instructor's lab
      totalQty: qty,
      availableQty: qty,
      status: 'Available',
      clearance: clearance,
      specs: specs
    });

    form.reset();
    dom.modalAddEquipment.close();
    renderInstructorPortal();
    renderCatalogue();
    updateAggregateKPIs();
  }

  // ==========================================================================
  // 7. SUPER ADMIN: ADD LAB & LIVE MULTI-TENANT BRANDING CUSTOMIZER
  // ==========================================================================

  function handleAddLabSubmit(e) {
    e.preventDefault();
    const form = dom.formAddLab;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const code = document.getElementById('lab-input-code').value.trim().toUpperCase();
    const name = document.getElementById('lab-input-name').value.trim();
    const room = document.getElementById('lab-input-room').value.trim();
    const school = document.getElementById('lab-input-school').value;
    const engineer = document.getElementById('lab-input-engineer').value.trim();

    appState.labs.push({
      id: code,
      name: name,
      room: room,
      school: school,
      engineerName: engineer,
      capacity: 30,
      hours: '08:30 AM – 05:00 PM'
    });

    form.reset();
    dom.modalAddLab.close();
    renderSuperAdminPortal();
  }

  // Live Multi-Tenant Customizer: Updates CSS Custom Properties dynamically on :root
  function handleBrandingCustomizerSubmit(e) {
    e.preventDefault();

    const instName = dom.inputTenantName.value.trim();
    const instSub = dom.inputTenantSub.value.trim();
    const primaryHex = dom.inputBrandPrimary.value;
    const accentHex = dom.inputBrandAccent.value;

    // Update Live CSS Variables on root document
    document.documentElement.style.setProperty('--brand-primary', primaryHex);
    document.documentElement.style.setProperty('--brand-accent', accentHex);

    // Update Header labels
    if (dom.displayInstName) dom.displayInstName.textContent = instName;
    if (dom.displayInstSub) dom.displayInstSub.textContent = instSub;

    alert(`Live Branding Applied!\nInstitution updated to "${instName}".\nCSS variable --brand-primary updated to ${primaryHex}.`);
  }

  function resetBrandingToStandard() {
    document.documentElement.style.removeProperty('--brand-primary');
    document.documentElement.style.removeProperty('--brand-accent');

    dom.inputTenantName.value = 'NUST — SEECS';
    dom.inputTenantSub.value = 'National University of Sciences & Technology';
    dom.inputBrandPrimary.value = '#002D62';
    dom.inputBrandAccent.value = '#0D9488';
    dom.hexBrandPrimary.textContent = '#002D62';
    dom.hexBrandAccent.textContent = '#0D9488';

    if (dom.displayInstName) dom.displayInstName.textContent = 'NUST — SEECS';
    if (dom.displayInstSub) dom.displayInstSub.textContent = 'National University of Sciences & Technology';
  }

  // ==========================================================================
  // 8. ROLE SWITCHER & GLOBAL NAVIGATION CONTROLLER
  // ==========================================================================

  function switchRole(role) {
    appState.currentRole = role;

    // Toggle panel visibility
    dom.viewStudent.classList.toggle('hidden', role !== 'student');
    dom.viewInstructor.classList.toggle('hidden', role !== 'instructor');
    dom.viewSuperAdmin.classList.toggle('hidden', role !== 'superadmin');

    // Update user identity badge in header
    if (role === 'student') {
      dom.activeUserBadge.innerHTML = `
        <span class="user-avatar-circle" aria-hidden="true">HB</span>
        <div class="user-meta-text">
          <strong class="user-full-name">Hammad Butt</strong>
          <span class="user-sub-id">CMS: 501399 (SE15B)</span>
        </div>
      `;
      renderCatalogue();
      renderStudentPasses();
    } else if (role === 'instructor') {
      dom.activeUserBadge.innerHTML = `
        <span class="user-avatar-circle" style="background-color: var(--tech-teal-600);" aria-hidden="true">AB</span>
        <div class="user-meta-text">
          <strong class="user-full-name">Engr. Asif Bilal</strong>
          <span class="user-sub-id">Lab In-Charge (A-204)</span>
        </div>
      `;
      renderInstructorPortal();
    } else if (role === 'superadmin') {
      dom.activeUserBadge.innerHTML = `
        <span class="user-avatar-circle" style="background-color: var(--slate-800);" aria-hidden="true">SA</span>
        <div class="user-meta-text">
          <strong class="user-full-name">Central Labs Admin</strong>
          <span class="user-sub-id">Dean / Super Admin</span>
        </div>
      `;
      renderSuperAdminPortal();
    }

    updateAggregateKPIs();
  }

  // ==========================================================================
  // 9. EVENT LISTENERS INITIALIZATION (Zero Inline JS)
  // ==========================================================================

  function initEventListeners() {
    // Role Switching
    dom.roleRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) switchRole(e.target.value);
      });
    });

    // Dismiss Announcement Strip
    if (dom.btnDismissAlert) {
      dom.btnDismissAlert.addEventListener('click', () => {
        dom.campusAlertStrip.classList.add('hidden');
      });
    }

    // Live Filtering Listeners
    if (dom.filterKeyword) dom.filterKeyword.addEventListener('input', renderCatalogue);
    if (dom.filterLab) dom.filterLab.addEventListener('change', renderCatalogue);
    if (dom.filterStatus) dom.filterStatus.addEventListener('change', renderCatalogue);
    if (dom.filterClearance) dom.filterClearance.addEventListener('change', renderCatalogue);

    // Global Search Bar in Header
    if (dom.globalSearchInput) {
      dom.globalSearchInput.addEventListener('input', (e) => {
        if (appState.currentRole !== 'student') {
          // Auto switch to student view to view search results
          document.getElementById('role-student').checked = true;
          switchRole('student');
        }
        if (dom.filterKeyword) dom.filterKeyword.value = e.target.value;
        renderCatalogue();
      });
    }

    // Reset Filters Actions
    const resetFn = () => {
      if (dom.filterKeyword) dom.filterKeyword.value = '';
      if (dom.globalSearchInput) dom.globalSearchInput.value = '';
      if (dom.filterLab) dom.filterLab.value = 'ALL';
      if (dom.filterStatus) dom.filterStatus.value = 'ALL';
      if (dom.filterClearance) dom.filterClearance.value = 'ALL';
      renderCatalogue();
    };
    if (dom.btnResetFilters) dom.btnResetFilters.addEventListener('click', resetFn);
    if (dom.btnEmptyReset) dom.btnEmptyReset.addEventListener('click', resetFn);

    // Booking Modal Live Duration & Conflict Triggers
    if (dom.bookingDate) dom.bookingDate.addEventListener('change', evaluateBookingInputs);
    if (dom.bookingStartTime) dom.bookingStartTime.addEventListener('change', evaluateBookingInputs);
    if (dom.bookingEndTime) dom.bookingEndTime.addEventListener('change', evaluateBookingInputs);

    // Close Modal Buttons
    if (dom.btnCloseBooking) dom.btnCloseBooking.addEventListener('click', () => dom.modalBooking.close());
    if (dom.btnCancelBooking) dom.btnCancelBooking.addEventListener('click', () => dom.modalBooking.close());
    if (dom.btnClosePass) dom.btnClosePass.addEventListener('click', () => dom.modalPass.close());
    if (dom.btnDismissPass) dom.btnDismissPass.addEventListener('click', () => dom.modalPass.close());

    // Submit Reservation
    if (dom.formReservation) dom.formReservation.addEventListener('submit', handleBookingFormSubmit);

    // Print Voucher
    if (dom.btnPrintVoucher) {
      dom.btnPrintVoucher.addEventListener('click', () => {
        window.print();
      });
    }

    // Instructor Desk Search
    if (dom.instructorLedgerFilter) {
      dom.instructorLedgerFilter.addEventListener('input', renderInstructorReservationLedger);
    }

    // Add Equipment Dialog
    if (dom.btnOpenAddEquipment) {
      dom.btnOpenAddEquipment.addEventListener('click', () => {
        dom.modalAddEquipment.showModal();
      });
    }
    if (dom.btnCloseAddEq) dom.btnCloseAddEq.addEventListener('click', () => dom.modalAddEquipment.close());
    if (dom.btnCancelAddEq) dom.btnCancelAddEq.addEventListener('click', () => dom.modalAddEquipment.close());
    if (dom.formAddEquipment) dom.formAddEquipment.addEventListener('submit', handleAddEquipmentSubmit);

    // Inspection Dialog
    if (dom.btnCloseInspection) dom.btnCloseInspection.addEventListener('click', () => dom.modalInspection.close());
    if (dom.btnCancelInspection) dom.btnCancelInspection.addEventListener('click', () => dom.modalInspection.close());
    if (dom.formInspection) dom.formInspection.addEventListener('submit', handleInspectionSubmit);

    // Add Lab Dialog
    if (dom.btnOpenAddLab) {
      dom.btnOpenAddLab.addEventListener('click', () => {
        dom.modalAddLab.showModal();
      });
    }
    if (dom.btnCloseAddLab) dom.btnCloseAddLab.addEventListener('click', () => dom.modalAddLab.close());
    if (dom.btnCancelAddLab) dom.btnCancelAddLab.addEventListener('click', () => dom.modalAddLab.close());
    if (dom.formAddLab) dom.formAddLab.addEventListener('submit', handleAddLabSubmit);

    // Live Color Pickers Hex Display updates
    if (dom.inputBrandPrimary) {
      dom.inputBrandPrimary.addEventListener('input', (e) => {
        dom.hexBrandPrimary.textContent = e.target.value.toUpperCase();
      });
    }
    if (dom.inputBrandAccent) {
      dom.inputBrandAccent.addEventListener('input', (e) => {
        dom.hexBrandAccent.textContent = e.target.value.toUpperCase();
      });
    }

    // Apply & Reset Branding
    if (dom.formBrandingCustomizer) dom.formBrandingCustomizer.addEventListener('submit', handleBrandingCustomizerSubmit);
    if (dom.btnResetBranding) dom.btnResetBranding.addEventListener('click', resetBrandingToStandard);
  }

  // Basic HTML Escaper to guard dynamic template literals against XSS
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================================================
  // 10. SYSTEM BOOTSTRAP
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateAggregateKPIs();
    renderCatalogue();
    renderStudentPasses();
  });

})();
