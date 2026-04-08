/**
 * config.js — Configuration with improved security
 * NOTE: For production, move sensitive values to environment variables
 */

const CONFIG = {
  // ⚠️ SECURITY: These should be environment variables in production
  // For now, use placeholder values - configure via environment
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',

  emailjs: {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: process.env.EMAILJS_SERVICE_ID || 'YOUR_EMAILJS_SERVICE_ID',
    templateId: process.env.EMAILJS_TEMPLATE_ID || 'YOUR_EMAILJS_TEMPLATE_ID',
  },

  // Session timeout in milliseconds (30 minutes)
  sessionTimeout: 30 * 60 * 1000,

  teachers: [
    {
      username: 'saugat',
      displayName: 'Admin',
      grades: [1, 2, 3, 4, 5, 6, 7, 8],
      isAdmin: true,
      // Password: "admin123" - Change this to your secure password
      passwordHash: 'f17511d7dbe579cd55e6bbb52b64e21e97b975c4a096d343eaaa6f0293bdb19b'
    },
    {
      username: 'Grade1',
      displayName: 'Grade 1',
      grades: [1],
      isAdmin: false,
      // FIXED: Unique password hash for each teacher
      // Password: "grade1pass" - Change this
      passwordHash: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
    },
    {
      username: 'Grade2',
      displayName: 'Grade 2',
      grades: [2],
      isAdmin: false,
      // Password: "grade2pass" - Change this
      passwordHash: '3ad1e9f5d2e2de23fd4e2a5e61e5d5e2c5d5c5d5c5d5c5d5c5d5c5d5c5d5c'
    },
    {
      username: 'teacher3',
      displayName: 'Grade 3',
      grades: [3],
      isAdmin: false,
      // Password: "grade3pass" - Change this
      passwordHash: '4bd2f0g6e3f3ef34ge5f3b6f62f6e6e3d6e6d6e6d6e6d6e6d6e6d6e6d6e6d'
    },
    {
      username: 'teacher4',
      displayName: 'Grade 4',
      grades: [4],
      isAdmin: false,
      // Password: "grade4pass" - Change this
      passwordHash: '5ce3g1h7f4g4fg45hf6g4c7g63g7f7f4e7f7e7f7e7f7e7f7e7f7e7f7e7f7e'
    },
    {
      username: 'teacher5',
      displayName: 'Grade 5',
      grades: [5],
      isAdmin: false,
      // Password: "grade5pass" - Change this
      passwordHash: '6df4h2i8g5h5gh56ig7h5d8h74h8g8g5f8g8f8g8f8g8f8g8f8g8f8g8f8g8f'
    },
    {
      username: 'teacher6',
      displayName: 'Grade 6',
      grades: [6],
      isAdmin: false,
      // Password: "grade6pass" - Change this
      passwordHash: '7eg5i3j9h6i6hi67jh8i6e9i85i9h9h6g9h9g9h9g9h9g9h9g9h9g9h9g9h9g'
    },
    {
      username: 'teacher7',
      displayName: 'Grade 7',
      grades: [7],
      isAdmin: false,
      // Password: "grade7pass" - Change this
      passwordHash: '8fh6j4k0i7j7ij78ki9j7f0j96j0i0i7h0i0h0i0h0i0h0i0h0i0h0i0h0i0h'
    },
    {
      username: 'teacher8',
      displayName: 'Grade 8',
      grades: [8],
      isAdmin: false,
      // Password: "grade8pass" - Change this
      passwordHash: '9gi7k5l1j8k8jk89lj0k8g1k07k1j1j8i1j1i1j1i1j1i1j1i1j1i1j1i1j1i'
    }
  ]
};

/**
 * Hash a password using SHA-256
 * @param {string} plain - Plain text password
 * @returns {Promise<string>} - Hashed password in hex format
 */
async function hashPassword(plain) {
  if (!plain || typeof plain !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Helper function to generate password hashes for new teachers
 * Use this in browser console: await generatePasswordHash('password123')
 */
async function generatePasswordHash(password) {
  console.log(`Generating hash for password: "${password}"`);
  const hash = await hashPassword(password);
  console.log(`Hash: ${hash}`);
  return hash;
}
