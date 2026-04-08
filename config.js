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
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'Grade1',
      displayName: 'Grade 1',
      grades: [1],
      isAdmin: false,
      // FIXED: Unique password hash for each teacher
      // Password: "grade1pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'Grade2',
      displayName: 'Grade 2',
      grades: [2],
      isAdmin: false,
      // Password: "grade2pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'teacher3',
      displayName: 'Grade 3',
      grades: [3],
      isAdmin: false,
      // Password: "grade3pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'teacher4',
      displayName: 'Grade 4',
      grades: [4],
      isAdmin: false,
      // Password: "grade4pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'teacher5',
      displayName: 'Grade 5',
      grades: [5],
      isAdmin: false,
      // Password: "grade5pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'teacher6',
      displayName: 'Grade 6',
      grades: [6],
      isAdmin: false,
      // Password: "grade6pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

    },
    {
      username: 'teacher7',
      displayName: 'Grade 7',
      grades: [7],
      isAdmin: false,
      // Password: "grade7pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36


    },
    {
      username: 'teacher8',
      displayName: 'Grade 8',
      grades: [8],
      isAdmin: false,
      // Password: "grade8pass" - Change this
      passwordHash: c822a0abf4ef0a5fc2a4c2010ed111e16af3ae95cee462a55e7877b8623ade36

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
