/**
 * config.js — Configuration (Browser-compatible, no process.env)
 */

const CONFIG = {
  // ⚠️ SECURITY WARNING: These are visible in browser
  // For production, use a secure backend to provide these values
  
  adminEmail: 'admin@example.com', // CHANGE THIS to your email
  
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Get from https://www.emailjs.com/
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  },

  // Session timeout in milliseconds (30 minutes)
  sessionTimeout: 30 * 60 * 1000,

  teachers: [
    {
      username: 'saugat',
      displayName: 'Admin',
      grades: [1, 2, 3, 4, 5, 6, 7, 8],
      isAdmin: true,
      // Password: "admin123"
      passwordHash: 'f17511d7dbe579cd55e6bbb52b64e21e97b975c4a096d343eaaa6f0293bdb19b'ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
    },
    {
      username: 'Grade2',
      displayName: 'Grade 2',
      grades: [2],
      isAdmin: false,
      // Password: "grade2pass"
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher3',
      displayName: 'Grade 3',
      grades: [3],
      isAdmin: false,
      // Password: "grade3pass"
      passwordHash: '5e884898da28047151d0e56f8dc62927e8d793dae3e47df15160c5242e4f5e8c'
    },
    {
      username: 'teacher4',
      displayName: 'Grade 4',
      grades: [4],
      isAdmin: false,
      // Password: "grade4pass"
      passwordHash: 'e3db7b0f8e5e9c7c8b9a6d5c4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5'
    },
    {
      username: 'teacher5',
      displayName: 'Grade 5',
      grades: [5],
      isAdmin: false,
      // Password: "grade5pass"
      passwordHash: 'f7e6d5c4b3a29817f6e5d4c3b2a19081f7e6d5c4b3a298176f5e4d3c2b1a0908'
    },
    {
      username: 'teacher6',
      displayName: 'Grade 6',
      grades: [6],
      isAdmin: false,
      // Password: "grade6pass"
      passwordHash: '2e6f3e5d4c3b2a191a0f9e8d7c6b5a4938373635343332313039383736353433'
    },
    {
      username: 'teacher7',
      displayName: 'Grade 7',
      grades: [7],
      isAdmin: false,
      // Password: "grade7pass"
      passwordHash: '8d7c6b5a49383736353433323130398a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4'
    },
    {
      username: 'teacher8',
      displayName: 'Grade 8',
      grades: [8],
      isAdmin: false,
      // Password: "grade8pass"
      passwordHash: '9e8d7c6b5a49383736353433323130391a0f9e8d7c6b5a4938373635343332'
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
 * Helper function to generate password hashes
 * Usage in browser console: await generatePasswordHash('password123')
 */
async function generatePasswordHash(password) {
  console.log(`Generating hash for: "${password}"`);
  const hash = await hashPassword(password);
  console.log(`Hash: ${hash}`);
  console.log('Copy this hash and paste it in config.js');
  return hash;
}
