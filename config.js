/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  ENGLISH DEPT. TRACKER — CONFIGURATION FILE                 ║
 * ║                                                              ║
 * ║  Edit this file to:                                          ║
 * ║    1. Set your admin email (where reports are sent)          ║
 * ║    2. Add/remove teacher accounts                            ║
 * ║    3. Enter your EmailJS credentials                         ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * SETUP INSTRUCTIONS:
 *
 * STEP 1 — EmailJS (free, takes ~5 minutes):
 *   a. Sign up at https://emailjs.com
 *   b. Add Gmail as an email service → copy the Service ID below
 *   c. Create an email template → copy the Template ID below
 *      Use these template variables: {{to_email}}, {{from_name}},
 *      {{student_name}}, {{report_body}}, {{extra_notes}}
 *   d. Copy your Public Key from Account > API Keys
 *
 * STEP 2 — Teacher passwords:
 *   Passwords below are stored as SHA-256 hashes for safety.
 *   To generate a hash for a new password, open browser console and run:
 *     hashPassword('yourpassword').then(console.log)
 *   Then paste the result into the teachers array below.
 *
 *   DEFAULT CREDENTIALS (change these before deploying!):
 *     admin    / admin123
 *     teacher1 / teach2024
 *     teacher2 / teach2024
 *     teacher3 / teach2024
 *     teacher4 / teach2024
 *     teacher5 / teach2024
 */

const CONFIG = {

  // ── Admin email: all reports will be sent here ──────────────
  adminEmail: 's51.saugatsingh@gmail.com',

  // ── EmailJS credentials ──────────────────────────────────────
  emailjs: {
    publicKey:  'nBrv0rPpGqu7UbhI9',
    serviceId:  'service_gw3kngx',
    templateId: 'template_eg2y64c',
  },

  // ── Teacher accounts ─────────────────────────────────────────
  // grades: array of grade numbers this teacher can access.
  // Use [1,2,3,4,5,6,7,8] for full access (admin).
  // passwordHash: SHA-256 of their password (hex string).
  teachers: [
    {
      username: 'admin',
      displayName: 'Admin',
      grades: [1,2,3,4,5,6,7,8],
      isAdmin: true,
      // Password: admin123
      passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
    },
    {
      username: 'Grade1',
      displayName: 'Grade 1',
      grades: [1],
      isAdmin: false,
      // Password: teach2026
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'Grade2',
      displayName: 'Grade 2',
      grades: [2],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher3',
      displayName: 'teacher3',
      grades: [3],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher4',
      displayName: 'teacher4',
      grades: [4],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher5',
      displayName: ',
      grades: [5],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher6',
      displayName: 'teacher6',
      grades: [6],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher7',
      displayName: 'teacher7',
      grades: [7],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    },
    {
      username: 'teacher8',
      displayName: 'teacher8',
      grades: [9],
      isAdmin: false,
      passwordHash: 'b9c950640b1e23e09b5a2cfd6b04b22b1a3d2d0f0dd67c7b68a0d8f1e2c3d4e5'
    }
  ]
};

// Helper: hash a plaintext password (run in browser console to generate hashes)
async function hashPassword(plain) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
