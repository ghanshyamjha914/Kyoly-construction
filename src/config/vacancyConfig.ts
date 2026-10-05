/**
 * Centralized Vacancy Configuration for Kyoly Construction Pvt. Ltd.
 * 
 * To turn the Vacancy section ON or OFF:
 * Change `status: 'ON'` to `status: 'OFF'` (or use the interactive toggle on the Career page).
 * 
 * When 'ON':
 *   - The single official vacancy post, requirements, responsibilities, deadline,
 *     and online CV application form are visible.
 * 
 * When 'OFF':
 *   - The vacancy post, card, requirements, deadline, application button, and form
 *     are completely hidden from the public website (no empty or 'No Vacancy' cards).
 */

export interface VacancyRecord {
  /** Vacancy Status: 'ON' to publish the vacancy, 'OFF' to completely hide it */
  status: 'ON' | 'OFF';
  /** CV Attachment Option: 'ON' to enable CV upload on application form, 'OFF' to disable/hide it */
  cvAttachmentOption: 'ON' | 'OFF';
  /** Whether CV attachment is mandatory when ON (default true) */
  isCvMandatory?: boolean;
  /** Official Notice Reference Number */
  noticeRefNo?: string;
  /** Date Published */
  publishedDate?: string;
  /** Official Notice Attachment File Name */
  noticeAttachmentFileName?: string;
  /** Official Notice File Size */
  noticeAttachmentFileSize?: string;
  /** Job Position */
  position: string;
  /** Department */
  department: string;
  /** Number of Vacancies */
  vacanciesCount: number;
  /** Employment Type */
  employmentType: string;
  /** Work Location */
  location: string;
  /** Minimum Educational Qualification */
  qualification: string;
  /** Required Experience */
  experience: string;
  /** Comprehensive Job Description */
  description: string;
  /** List of core technical responsibilities */
  responsibilities: string[];
  /** Application Deadline Date */
  deadline: string;
  /** HR Contact Email for application inquiries */
  applyEmail: string;
  /** HR Phone number */
  applyPhone: string;
}

export const defaultVacancy: VacancyRecord = {
  // === EASY ON/OFF CONTROL ===
  status: 'ON', // 'ON' = Vacancy Open & Publicly Visible

  // === CV ATTACHMENT OPTION CONTROL ===
  cvAttachmentOption: 'ON', // 'ON' = CV Upload Enabled & Active
  isCvMandatory: true, // CV Attachment required for submission

  // === OFFICIAL VACANCY NOTICE ATTACHMENT ===
  noticeRefNo: 'KCPL/HR/VAC-01/2026',
  publishedDate: 'October 05, 2026',
  noticeAttachmentFileName: 'KYOLY-OFFICIAL-VACANCY-NOTICE-TOR-2026.pdf',
  noticeAttachmentFileSize: '385 KB',

  // === VACANCY DETAILS (SINGLE EDITABLE POST) ===
  position: 'Senior Transmission Line Project Engineer',
  department: 'High-Voltage Power & Electrical Infrastructure Division',
  vacanciesCount: 1,
  employmentType: 'Full-Time (Permanent)',
  location: 'Site Mobilization (Central & Eastern Nepal) / Kathmandu Corporate Office',
  qualification: 'B.E. Civil or Electrical Engineering · Nepal Engineering Council (NEC) Licensed',
  experience: '5+ Years in 132kV - 400kV Transmission Line Erection & Sagging',
  description:
    'Kyoly Construction Pvt. Ltd. is seeking a seasoned Senior Transmission Line Project Engineer to spearhead turnkey high-voltage transmission grid projects. The engineer will direct tower foundation spotting, chimney concrete pours, galvanized lattice steel erection, stringing across mountain terrain, and statutory pre-commissioning clearances with the Nepal Electricity Authority (NEA).',
  responsibilities: [
    'Supervise GPS-based tower spotting, benching, chimney foundations, lattice tower erection, and precision tension conductor stringing.',
    'Coordinate statutory inspections, pre-commissioning tests, and right-of-way (ROW) clearances with Nepal Electricity Authority (NEA) grid engineers.',
    'Enforce site Zero-Harm HSE compliance, live-line crossing protocols, and environmental guidelines across mountainous and river terrains.',
    'Manage sub-contractor crews, material reconciliation, bar bending schedules, and daily progress reporting to senior executive leadership.',
    'Certify contractor measurement sheets, bills of quantities (BOQ), and as-built alignment documentation.',
  ],
  deadline: 'November 30, 2026',
  applyEmail: 'kyolyconstruction1@gmail.com',
  applyPhone: '+977-9705551631',
};
